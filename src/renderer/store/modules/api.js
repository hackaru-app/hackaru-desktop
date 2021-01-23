import merge from 'lodash.merge';
import axios from 'axios';
import { app } from 'electron';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export const actions = {
  async request({ state, rootGetters }, config) {
    const res = await axios.request(
      merge(
        {
          ...config,
          data: snakecaseKeys(config.data || {}),
          params: snakecaseKeys(config.params || {})
        },
        {
          baseURL: rootGetters['auth/apiUrl'],
          timeout: 10000,
          headers: {
            'Accept-Language': app.getLocale(),
            'X-Requested-With': 'XMLHttpRequest'
          }
        }
      )
    );
    return {
      data: camelcaseKeys(res.data || {}, { deep: true }),
      headers: res.headers
    };
  }
};

export default {
  actions
};
