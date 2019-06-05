import merge from 'lodash.merge';
import omit from 'lodash.omit';
import { normalize, denormalize } from 'normalizr';

const MERGE_ENTITIES = 'MERGE_ENTITIES';
const DELETE_ENTITY = 'DELETE_ENTITY';

export const state = () => ({
  data: {
    projects: {}
  }
});

export const actions = {
  merge({ commit }, { json, schema }) {
    const { entities } = normalize(json, schema);
    commit(MERGE_ENTITIES, entities);
  },
  delete({ commit }, { name, id }) {
    commit(DELETE_ENTITY, { name, id });
  }
};

export const mutations = {
  [MERGE_ENTITIES](state, payload) {
    state.data = { ...merge(state.data, payload) };
  },
  [DELETE_ENTITY](state, { name, id }) {
    state.data = {
      ...state.data,
      [name]: omit(state.data[name], id)
    };
  }
};

export const getters = {
  getEntities: state => (name, schema) => {
    const ids = Object.keys(state.data[name] || {});
    return denormalize(ids, schema, state.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
