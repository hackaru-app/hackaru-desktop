import merge from 'lodash.merge';

export const actions = {
  async request({ dispatch, rootGetters }, config) {
    return dispatch(
      'api/request',
      merge(config, {
        headers: {
          Authorization: `Bearer ${rootGetters['auth/accessToken']}`
        }
      }),
      { root: true }
    );
  }
};

export default {
  actions
};
