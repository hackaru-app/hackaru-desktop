import uniq from 'lodash.uniq';

export const SET_PROCESSES = 'SET_PROCESSES';

export const state = () => ({
  data: []
});

export const actions = {
  update({ commit }, payload) {
    commit(SET_PROCESSES, payload);
  }
};

export const mutations = {
  [SET_PROCESSES](state, payload) {
    state.data = uniq(payload.map(({ name }) => name));
  }
};

export const getters = {
  all(state) {
    return state.data;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
