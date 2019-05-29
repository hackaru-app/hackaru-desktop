import u from 'updeep';
import { normalize, denormalize } from 'normalizr';

export const MERGE_ENTITIES = 'MERGE_ENTITIES';
export const DELETE_ENTITY = 'DELETE_ENTITY';

export const state = () => ({
  data: {}
});

export const actions = {
  async normalize({ commit }, { json, schema }) {
    const data = normalize(json, schema);
    commit(MERGE_ENTITIES, data.entities);
    return data;
  },
  deleteEntitiy({ commit }, { path }) {
    commit(DELETE_ENTITY, { path });
  }
};

export const mutations = {
  [MERGE_ENTITIES](state, payload) {
    state.data = u(payload, state.data);
  },
  [DELETE_ENTITY](state, payload) {
    state.data = u.updateIn(`${payload.path}`, undefined, state.data);
  }
};

export const getters = {
  getDenormalized: (state, getter) => (result, schema) => {
    return denormalize(result, schema, state.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
