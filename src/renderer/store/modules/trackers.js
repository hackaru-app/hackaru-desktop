import { tracker } from '../schemas';
import uniqid from 'uniqid';

export const SET_ACTIVED = 'SET_ACTIVED';
export const SET_STOP_ALL_ON_SUSPEND = 'SET_STOP_ALL_ON_SUSPEND';
export const SET_STOP_ALL_ON_SHUTDOWN = 'SET_STOP_ALL_ON_SHUTDOWN';

export const state = () => ({
  actived: undefined,
  stopAllOnSuspend: true,
  stopAllOnShutdown: true
});

export const actions = {
  update({ state, commit, dispatch, getters, rootGetters }) {
    if (getters.active && !state.actived) dispatch('start');
    if (!getters.active && state.actived) dispatch('stop');
    commit(SET_ACTIVED, !!getters.active);
  },
  start({ dispatch, getters }) {
    dispatch(
      'activities/add',
      {
        projectId: getters.active.project.id,
        description: getters.active.description,
        startedAt: `${new Date()}`
      },
      { root: true }
    );
  },
  stop({ state, commit, dispatch, getters, rootGetters }) {
    dispatch(
      'activities/update',
      {
        id: rootGetters['activities/working'].id,
        stoppedAt: `${new Date()}`
      },
      { root: true }
    );
  },
  add({ dispatch }, payload) {
    dispatch(
      'entities/merge',
      {
        json: {
          id: uniqid(),
          project: payload.projectId,
          description: payload.description,
          process: payload.process
        },
        schema: tracker
      },
      { root: true }
    );
  },
  delete({ dispatch }, id) {
    dispatch('entities/delete', { name: 'trackers', id }, { root: true });
  }
};

export const mutations = {
  [SET_ACTIVED](state, tracker) {
    state.actived = tracker;
  },
  [SET_STOP_ALL_ON_SUSPEND](state, payload) {
    state.stopAllOnSuspend = payload;
  },
  [SET_STOP_ALL_ON_SHUTDOWN](state, payload) {
    state.stopAllOnShutdown = payload;
  }
};

export const getters = {
  all(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getEntities']('trackers', [tracker]).filter(
      tracker => tracker.project !== undefined
    );
  },
  active(state, getters, rootState, rootGetters) {
    const processes = rootGetters['processes/all'];
    return getters.all.find(tracker => processes.includes(tracker.process));
  },
  stopAllOnSuspend(state) {
    return state.stopAllOnSuspend;
  },
  stopAllOnShutdown(state) {
    return state.stopAllOnShutdown;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
