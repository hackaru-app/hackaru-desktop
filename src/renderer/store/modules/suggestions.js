const SET_SUGGESTIONS = 'SET_SUGGESTIONS';

export const state = () => ({
  data: []
});

export const actions = {
  async fetch({ commit, dispatch }, q) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/suggestions',
          params: {
            q,
            limit: 15
          }
        },
        { root: true }
      );
      commit(SET_SUGGESTIONS, data);
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  }
};

export const mutations = {
  [SET_SUGGESTIONS](state, payload) {
    state.data = payload;
  }
};

export const getters = {
  all(state, getters, rootState, rootGetters) {
    return state.data;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
