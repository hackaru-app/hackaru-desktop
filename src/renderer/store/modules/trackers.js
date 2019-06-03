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
    const started = difference(getters.workings, state.prevWorkings);
    const stopped = difference(state.prevWorkings, getters.workings);

    started.forEach(tracker => dispatch('start', tracker));
    stopped.forEach(tracker => dispatch('stop', tracker));

    commit(SET_PREV_WORKINGS, getters.workings);
  },
  start({ dispatch, rootGetters }, { project }) {
    const activity = rootGetters['activities/findByProject'](project.id);
    if (activity) return;
    dispatch(
      'activities/add',
      {
        projectId: project && project.id,
        startedAt: `${new Date()}`
      },
      { root: true }
    );
  },
  stop({ dispatch, rootGetters }, { project }) {
    const activity = rootGetters['activities/findByProject'](project.id);
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
  async add({ dispatch }, payload) {
    await dispatch(
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
  stopAll({ dispatch, getters, commit }, projectId) {
    getters.workings.forEach(tracker => dispatch('stop', tracker));
    commit(CLEAR_PREV_WORKINGS);
  }
};

export const mutations = {
  [SET_PREV_WORKINGS](state, payload) {
    state.workings = payload;
  },
  [CLEAR_PREV_WORKINGS](state, payload) {
    state.workings = [];
  }
};

export const getters = {
  trackers(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getEntities']('trackers', [tracker]);
  },
  workings(state, getters, rootState, rootGetters) {
    const processes = rootGetters['processes/all'];
    return uniq(
      getters.trackers.filter(tracker => processes.includes(tracker.process))
    );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
