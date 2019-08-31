import { activity } from '../schemas';
import { notify } from '../../../main/notifier';

export const SET_STOP_ON_SUSPEND = 'SET_STOP_ON_SUSPEND';
export const SET_STOP_ON_SHUTDOWN = 'SET_STOP_ON_SHUTDOWN';

export const state = () => ({
  stopOnSuspend: true,
  stopOnShutdown: true
});

function notifyActivity({ title, activity }) {
  notify({
    title,
    message: [
      activity.project ? activity.project.name : 'No Project',
      activity.description ? ` - ${activity.description}` : ''
    ].join('')
  });
}

export const actions = {
  async fetchWorking({ dispatch }) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        { url: '/v1/activities/working' },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: activity },
        { root: true }
      );
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async update({ dispatch }, payload) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: `/v1/activities/${payload.id}`,
          method: 'put',
          data: {
            activity: payload
          }
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: activity },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async stop({ commit, getters, dispatch }) {
    if (!getters.working) return;
    const id = getters.working.id;
    try {
      const { data } = await dispatch(
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
      dispatch(
        'entities/merge',
        { json: data, schema: activity },
        { root: true }
      );
      notifyActivity({
        title: 'Timer Stopped',
        activity: data
      });
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async add({ dispatch }, payload) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/activities',
          method: 'post',
          data: {
            activity: payload
          }
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: activity },
        { root: true }
      );
      notifyActivity({
        title: 'Timer Started',
        activity: data
      });
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async delete({ dispatch }, id) {
    try {
      dispatch('entities/delete', { name: 'activities', id }, { root: true });
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/activities/${id}`,
          method: 'delete'
        },
        { root: true }
      );
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  setStopOnSuspend({ commit }, stopOnSuspend) {
    commit(SET_STOP_ON_SUSPEND, stopOnSuspend);
  },
  setStopOnShutdown({ commit }, stopOnShutdown) {
    commit(SET_STOP_ON_SHUTDOWN, stopOnShutdown);
  }
};

export const mutations = {
  [SET_STOP_ON_SUSPEND](state, stopOnSuspend) {
    state.stopOnSuspend = stopOnSuspend;
  },
  [SET_STOP_ON_SHUTDOWN](state, stopOnShutdown) {
    state.stopOnShutdown = stopOnShutdown;
  }
};

export const getters = {
  all(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getEntities']('activities', [activity]);
  },
  working(state, getters) {
    return getters.all.find(({ stoppedAt }) => !stoppedAt);
  },
  stopOnSuspend(state) {
    return state.stopOnSuspend;
  },
  stopOnShutdown(state) {
    return state.stopOnShutdown;
  }
};

export default {
  state,
  actions,
  getters,
  mutations
};
