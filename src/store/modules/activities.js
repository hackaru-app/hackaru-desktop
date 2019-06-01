import { activity } from '../schemas';
import notifier from 'node-notifier';
import path from 'path';

export const MERGE_ACTIVITIES = 'MERGE_ACTIVITIES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';

export const state = () => ({
  items: []
});

function notify({ title, message }) {
  notifier.notify({
    title,
    icon: path.join(
      process.env.NODE_ENV !== 'development' ? process.resourcesPath : '',
      './extra-resources/icon-notification.png'
    ),
    message
  });
}

export const actions = {
  async getWorkingActivities({ commit, dispatch }) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/activities',
          params: {
            working: true
          }
        },
        { root: true }
      );
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: [activity] },
        { root: true }
      );
      commit(MERGE_ACTIVITIES, data.result);
    } catch (e) {
      dispatch('toast/showError', e, { root: true });
    }
  },
  async updateActivity({ commit, dispatch }, payload) {
    const { id } = payload;
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: `/v1/activities/${id}`,
          method: 'put',
          data: {
            activity: payload
          }
        },
        { root: true }
      );
      await dispatch(
        'entities/normalize',
        { json: res.data, schema: activity },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/showError', e, { root: true });
      return false;
    }
  },
  async stopActivity({ commit, dispatch }, payload) {
    const { id } = payload;
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: `/v1/activities/${id}`,
          method: 'put',
          data: {
            activity: {
              id,
              stoppedAt: `${new Date()}`
            }
          }
        },
        { root: true }
      );
      await dispatch(
        'entities/normalize',
        { json: res.data, schema: activity },
        { root: true }
      );
      notify({
        title: 'Timer Stopped',
        message: res.data.project ? res.data.project.name : 'No Project'
      });
      return true;
    } catch (e) {
      dispatch('toast/showError', e, { root: true });
      return false;
    }
  },
  async addActivity({ commit, dispatch }, payload) {
    try {
      const res = await dispatch(
        'auth-api/request',
        {
          url: '/v1/activities',
          method: 'post',
          data: {
            activity: {
              ...payload
            }
          }
        },
        { root: true }
      );
      const data = await dispatch(
        'entities/normalize',
        { json: res.data, schema: activity },
        { root: true }
      );
      commit(ADD_ACTIVITY, data.result);
      notify({
        title: 'Timer Started',
        message: res.data.project ? res.data.project.name : 'No Project'
      });
      return true;
    } catch (e) {
      dispatch('toast/showError', e, { root: true });
      return false;
    }
  },
  async deleteActivity({ commit, dispatch }, id) {
    try {
      commit(REMOVE_ACTIVITY, { id });
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/activities/${id}`,
          method: 'delete'
        },
        { root: true }
      );
      await dispatch(
        'entities/deleteEntitiy',
        { path: `activities.${id}` },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/showError', e, { root: true });
      return false;
    }
  }
};

export const mutations = {
  [MERGE_ACTIVITIES](state, payload) {
    state.items = payload;
  },
  [ADD_ACTIVITY](state, payload) {
    state.items = [payload, ...state.items];
  },
  [REMOVE_ACTIVITY](state, payload) {
    state.items = state.items.filter(id => Number(id) !== Number(payload.id));
  }
};

export const getters = {
  getActivities(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getDenormalized'](state.items, [activity]);
  },
  getWorkingActivities(state, getters) {
    return getters.getActivities.filter(({ stoppedAt }) => !stoppedAt);
  },
  getActivityByProject: (state, getters) => projectId => {
    return getters.getWorkingActivities.find(
      ({ project }) => project && project.id === projectId
    );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
