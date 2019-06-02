import { tracker } from '../schemas';
import uniq from 'lodash.uniq';
import uniqid from 'uniqid';

export const ADD_TRACKER = 'ADD_TRACKER';
export const REMOVE_TRACKER = 'REMOVE_TRACKER';
export const SET_WORKINGS = 'SET_WORKINGS';
export const CLEAR_WORKINGS = 'CLEAR_WORKINGS';

export const state = () => ({
  workings: [],
  items: []
});

export const actions = {
  updateTrackings({ state, commit, dispatch, getters }) {
    const prevs = state.workings;
    const currents = getters.getWorkingProjectIds;

    // Stop activity when process was stopped.
    prevs
      .filter(id => !currents.includes(id))
      .forEach(id => {
        dispatch('stopActivity', id);
      });

    // Start activity when process was started.
    currents
      .filter(id => !prevs.includes(id))
      .forEach(id => {
        dispatch('startActivity', id);
      });

    // Update working processes.
    commit(SET_WORKINGS, currents);
  },
  startActivity({ dispatch, rootGetters }, projectId) {
    if (!rootGetters['activities/getActivityByProject'](projectId)) {
      dispatch(
        'activities/add',
        {
          projectId,
          startedAt: `${new Date()}`
        },
        { root: true }
      );
    }
  },
  stopActivity({ dispatch, rootGetters }, projectId) {
    const activity = rootGetters['activities/getActivityByProject'](projectId);
    if (activity) {
      dispatch(
        'activities/update',
        {
          id: activity.id,
          stoppedAt: `${new Date()}`
        },
        { root: true }
      );
    }
  },
  async addTracker({ commit, dispatch, rootGetters }, payload) {
    const data = await dispatch(
      'entities/normalize',
      {
        json: {
          id: uniqid(),
          apiUrl: rootGetters['auth/getApiUrl'],
          project: payload.projectId,
          process: payload.process
        },
        schema: tracker
      },
      { root: true }
    );
    commit(ADD_TRACKER, data.result);
  },
  deleteTracker({ commit, dispatch }, payload) {
    commit(REMOVE_TRACKER, { id: payload.id });
    dispatch(
      'entities/deleteEntitiy',
      { path: `trackers.${payload.id}` },
      { root: true }
    );
  },
  async stopAllTrackings({ dispatch, getters, commit }, projectId) {
    getters.getWorkingProjectIds.forEach(async projectId => {
      await dispatch('stopActivity', projectId);
    });
    commit(CLEAR_WORKINGS);
  }
};

export const mutations = {
  [ADD_TRACKER](state, payload) {
    state.items = [...state.items, payload];
  },
  [REMOVE_TRACKER](state, payload) {
    state.items = state.items.filter(id => id !== payload.id);
  },
  [SET_WORKINGS](state, payload) {
    state.workings = payload;
  },
  [CLEAR_WORKINGS](state, payload) {
    state.workings = [];
  }
};

export const getters = {
  getTrackers(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getDenormalized'](state.items, [tracker])
      .filter(({ project }) => project !== undefined)
      .filter(({ apiUrl }) => apiUrl === rootGetters['auth/getApiUrl']);
  },
  getWorkingProjectIds(state, getters, rootState, rootGetters) {
    return uniq(
      getters.getTrackers
        .filter(tracker =>
          rootGetters['processes/getProcesses'].includes(tracker.process)
        )
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
