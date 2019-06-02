import { project } from '../schemas';

export const actions = {
  async fetch({ commit, dispatch }) {
    try {
      const { data } = await dispatch(
        'auth-api/request',
        {
          url: '/v1/projects'
        },
        { root: true }
      );
      dispatch(
        'entities/merge',
        { json: data, schema: [project] },
        { root: true }
      );
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
  }
};

export const getters = {
  all(state, getters, rootState, rootGetters) {
    return rootGetters['entities/getEntities']('projects', [project]);
  }
};

export default {
  getters,
  actions
};
