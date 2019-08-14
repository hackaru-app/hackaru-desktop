import { tracker } from '../schemas';
import uniqid from 'uniqid';

export const SET_STARTED = 'SET_STARTED';

export const state = () => ({
  started: undefined
});

export const actions = {
  update({ state, commit, dispatch, getters, rootGetters }) {
    if (getters.tracking && !state.started) {
      dispatch('start');
    }
    if (!getters.tracking && state.started) {
      dispatch('activities/stop', undefined, { root: true });
    }
    commit(SET_STARTED, !!getters.tracking);
  },
  start({ dispatch, getters }) {
    dispatch(
      'activities/add',
      {
        projectId: getters.tracking.project.id,
        description: getters.tracking.description,
        startedAt: `${new Date()}`
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
  [SET_STARTED](state, started) {
    state.started = started;
  }
};

export const getters = {
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
