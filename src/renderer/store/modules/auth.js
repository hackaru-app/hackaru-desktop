import queryString from 'query-string';
import keytar from 'keytar';

export const SET_APP_TOKEN = 'SET_APP_TOKEN';
export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN';
export const SET_API_URL = 'SET_API_URL';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const state = {
  name: 'Hackaru for Desktop',
  service: `hackaru-desktop-${process.env.NODE_ENV}`,
  redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
  accessToken: undefined,
  scopes: [
    'activities:read',
    'activities:write',
    'projects:read',
    'projects:write',
    'suggestions:read'
  ],
  uid: undefined,
  secret: undefined,
  webUrl: undefined,
  apiUrl: 'https://api.hackaru.app'
};

export const mutations = {
  [SET_API_URL](state, payload) {
    state.apiUrl = payload;
  },
  [SET_APP_TOKEN](state, payload) {
    state.uid = payload.uid;
    state.webUrl = payload.webUrl;
    state.secret = payload.secret;
  },
  [SET_ACCESS_TOKEN](state, payload) {
    state.accessToken = payload;
  },
  [CLEAR_ACCESS_TOKEN](state, payload) {
    state.accessToken = undefined;
  }
};

export const actions = {
  async fetchAppToken({ state, commit, dispatch }, apiUrl) {
    commit(SET_API_URL, apiUrl);
    try {
      const { data } = await dispatch(
        'api/request',
        {
          url: '/v1/oauth/applications',
          method: 'post',
          data: {
            name: state.name,
            redirectUri: state.redirectUri,
            scopes: state.scopes.join(' ')
          }
        },
        { root: true }
      );
      commit(SET_APP_TOKEN, {
        webUrl: data.webUrl,
        uid: data.application.uid,
        secret: data.application.secret
      });
      return true;
    } catch (e) {
      dispatch('toast/error', e, { root: true });
      return false;
    }
  },
  async logout({ state, commit, dispatch }) {
    try {
      await dispatch(
        'api/request',
        {
          url: '/v1/oauth/revoke',
          method: 'post',
          data: {
            client_id: state.uid,
            client_secret: state.secret,
            token: state.accessToken
          }
        },
        { root: true }
      );
    } catch (e) {
      dispatch('toast/error', e, { root: true });
    }
    await keytar.deletePassword(state.service, state.uid);
    commit(CLEAR_ACCESS_TOKEN);
  },
  async restoreAccessToken({ state, commit }, url) {
    if (state.accessToken) return state.accessToken;
    try {
      const accessToken = await keytar.getPassword(state.service, state.uid);
      commit(SET_ACCESS_TOKEN, accessToken);
      return accessToken;
    } catch (e) {
      return null;
    }
  },
  storeAccessToken({ state, commit }, accessToken) {
    commit(SET_ACCESS_TOKEN, accessToken);
    keytar.setPassword(state.service, state.uid, accessToken);
  }
};

export const getters = {
  apiUrl: state => {
    return state.apiUrl;
  },
  webUrl: (state, getters) => {
    return state.webUrl;
  },
  persistKey: (state, getters) => {
    const toBase64 = value => Buffer.from(value).toString('base64');
    return toBase64(`${state.apiUrl}}`);
  },
  accessToken: state => {
    return state.accessToken;
  },
  authorizeUrl: state => {
    return `${state.webUrl}/oauth/authorize?${queryString.stringify({
      client_id: state.uid,
      redirect_uri: state.redirectUri,
      response_type: 'token',
      scope: state.scopes.join(' ')
    })}`;
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
