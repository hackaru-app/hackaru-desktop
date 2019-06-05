import get from 'lodash.get';

export const SHOW_ERROR = 'SHOW_ERROR';
export const SHOW_SUCCESS = 'SHOW_SUCCESS';

export const state = () => ({
  title: '',
  type: '',
  rand: 0
});

export const actions = {
  async error({ commit }, payload) {
    const title =
      get(payload, 'response.data.error_description') ||
      get(payload, 'response.data.message') ||
      get(payload, 'message');
    commit(SHOW_ERROR, title);
  },
  async success({ commit }, payload) {
    commit(SHOW_SUCCESS, payload);
  }
};

export const mutations = {
  [SHOW_ERROR](state, payload) {
    state.title = payload;
    state.type = 'error';
    state.rand = Math.random();
  },
  [SHOW_SUCCESS](state, payload) {
    state.title = payload;
    state.type = 'success';
    state.rand = Math.random();
  }
};

export const getters = {
  getMessage(state, getters, rootState, rootGetters) {
    return {
      title: state.title,
      type: state.type,
      rand: state.rand
    };
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
