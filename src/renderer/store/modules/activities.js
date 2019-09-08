import { notify } from '../../../main/notifier';

export const SET_WORKING = 'SET_WORKING';
export const DELETE_WORKING = 'DELETE_WORKING';
export const SET_STOP_ON_SUSPEND = 'SET_STOP_ON_SUSPEND';
export const SET_STOP_ON_SHUTDOWN = 'SET_STOP_ON_SHUTDOWN';

export const state = () => ({
  stopOnSuspend: true,
  stopOnShutdown: true,
  workingLoaded: false,
  working: {}
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
  async fetchWorking({ commit, dispatch }) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        { url: '/v1/activities/working' },
        { root: true }
      );
      commit(SET_WORKING, data);
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  },
  async update({ commit, dispatch }, payload) {
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
      commit(SET_WORKING, data);
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async stop({ commit, getters, dispatch }) {
    const id = getters.working.id;
    if (!id) return;
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
      commit(DELETE_WORKING);
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
  async add({ commit, dispatch }, payload) {
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
      commit(SET_WORKING, data);
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
  async delete({ commit, dispatch }, id) {
    try {
      await dispatch(
        'auth-api/request',
        {
          url: `/v1/activities/${id}`,
          method: 'delete'
        },
        { root: true }
      );
      commit(DELETE_WORKING);
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
  [SET_WORKING](state, data) {
    state.workingLoaded = true;
    state.working = data;
  },
  [DELETE_WORKING](state) {
    state.working = {};
  },
  [SET_STOP_ON_SUSPEND](state, stopOnSuspend) {
    state.stopOnSuspend = stopOnSuspend;
  },
  [SET_STOP_ON_SHUTDOWN](state, stopOnShutdown) {
    state.stopOnShutdown = stopOnShutdown;
  }
};

export const getters = {
  workingLoaded(state) {
    return state.workingLoaded;
  },
  working(state) {
    return state.working;
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
