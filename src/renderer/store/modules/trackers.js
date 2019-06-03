import { tracker } from '../schemas';
import uniq from 'lodash.uniq';
import uniqid from 'uniqid';
import difference from 'lodash.difference';

export const SET_PREV_WORKINGS = 'SET_PREV_WORKINGS';
export const CLEAR_PREV_WORKINGS = 'CLEAR_PREV_WORKINGS';

export const state = () => ({
  prevWorkings: []
});

export const actions = {
  update({ state, commit, dispatch, getters }) {
    const started = difference(getters.workingProjects, state.prevWorkings);
    const stopped = difference(state.prevWorkings, getters.workingProjects);

    started.forEach(tracker => dispatch('start', tracker));
    stopped.forEach(tracker => dispatch('stop', tracker));

    commit(SET_PREV_WORKINGS, getters.workingProjects);
  },
  start({ dispatch, rootGetters }, projectId) {
    const activity = rootGetters['activities/findByProject'](projectId);
    if (activity) return;
    dispatch(
      'activities/add',
      {
        projectId,
        startedAt: `${new Date()}`
      },
      { root: true }
    );
  },
  stop({ dispatch, rootGetters }, projectId) {
    const activity = rootGetters['activities/findByProject'](projectId);
    if (!activity) return;
    dispatch(
      'activities/update',
      {
        id: activity.id,
        stoppedAt: `${new Date()}`
      },
      { root: true }
    );
  },
  add({ dispatch }, payload) {
    dispatch(
      'entities/normalize',
      {
        json: {
          id: uniqid(),
          project: payload.projectId,
          process: payload.process
        },
        schema: tracker
      },
      { root: true }
    );
  },
  delete({ dispatch }, id) {
    dispatch('entities/delete', { name: 'trackers', id }, { root: true });
  },
  stopAll({ dispatch, getters, commit }) {
    getters.workingProjects.forEach(id => dispatch('stop', id));
    commit(CLEAR_PREV_WORKINGS);
  }
};

export const mutations = {
  [SET_PREV_WORKINGS](state, payload) {
    state.prevWorkings = payload;
  },
  [CLEAR_PREV_WORKINGS](state, payload) {
    state.prevWorkings = [];
  }
};

export const getters = {
  all(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getEntities']('trackers', [tracker]);
  },
  workingProjects(state, getters, rootState, rootGetters) {
    const processes = rootGetters['processes/all'];
    return uniq(
      getters.all
        .filter(tracker => processes.includes(tracker.process))
        .map(({ project }) => (project ? project.id : null))
    );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
