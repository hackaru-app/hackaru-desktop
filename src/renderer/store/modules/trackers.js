import { tracker } from '../schemas';
import uniqid from 'uniqid';

export const SET_STARTED = 'SET_STARTED';

export const state = () => ({
  started: undefined
});

export const actions = {
  update({ state, dispatch, getters }) {
    if (getters.tracking && !state.started && !getters.working) {
      return dispatch('start');
    }
    if (!getters.tracking && state.started) {
      return dispatch('stop');
    }
  },
  start({ dispatch, getters, commit }) {
    dispatch(
      'activities/add',
      {
        projectId: getters.tracking.project.id,
        description: getters.tracking.description,
        startedAt: `${new Date()}`
      },
      { root: true }
    );
    commit(SET_STARTED, true);
  },
  stop({ dispatch, commit }) {
    dispatch('activities/stop', undefined, { root: true });
    commit(SET_STARTED, false);
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
  [SET_STARTED](state, started) {
    state.started = started;
  }
};

export const getters = {
  working(state, getters, rootState, rootGetters) {
    return !!Object.keys(rootGetters['activities/working'] || {}).length;
  },
  all(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getEntities']('trackers', [tracker]).filter(
      tracker => tracker.project !== undefined
    );
  },
  tracking(state, getters, rootState, rootGetters) {
    const processes = rootGetters['processes/all'];
    return getters.all.find(tracker => processes.includes(tracker.process));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
