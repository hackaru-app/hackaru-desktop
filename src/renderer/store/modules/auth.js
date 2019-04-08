import queryString from 'query-string'
import keytar from 'keytar'

export const SET_APP_TOKEN = 'SET_APP_TOKEN'
export const RESET_UID = 'RESET_UID'
export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN'
export const SET_API_URL = 'SET_API_URL'
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

const state = {
  name: 'DesktopApp',
  service: `hackaru-desktop-${process.env.NODE_ENV}`,
  redirectUri: 'urn:ietf:wg:oauth:2.0:oob',
  scopes: [
    'activities:read',
    'activities:write',
    'projects:read',
    'projects:write'
  ],
  appTokens: {},
  accessToken: undefined,
  apiUrl: 'https://api.hackaru.app'
}

const mutations = {
  [SET_API_URL] (state, payload) {
    state.apiUrl = payload
  },
  [SET_APP_TOKEN] (state, payload) {
    state.appTokens = {
      ...state.appTokens,
      [payload.apiUrl]: {
        webUrl: payload.webUrl,
        uid: payload.uid,
        secret: payload.secret
      }
    }
  },
  [SET_ACCESS_TOKEN] (state, payload) {
    state.accessToken = payload
  },
  [CLEAR_ACCESS_TOKEN] (state, payload) {
    state.accessToken = undefined
  }
}

const actions = {
  async fetchAppToken ({ state, commit, dispatch, getters }, apiUrl) {
    commit(SET_API_URL, apiUrl)
    try {
      if (getters.getCurrentAppToken) return
      const res = await dispatch('api/request',
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
      )
      commit(SET_APP_TOKEN, {
        apiUrl: apiUrl,
        webUrl: res.data.webUrl,
        uid: res.data.application.uid,
        secret: res.data.application.secret
      })
    } catch (e) {
      dispatch('toast/showError', e, { root: true })
    }
  },
  async logout ({ state, commit, dispatch, getters }) {
    const clientId = getters.getCurrentAppToken.uid
    const secret = getters.getCurrentAppToken.secret
    await dispatch('api/request',
      {
        url: '/v1/oauth/revoke',
        method: 'post',
        data: {
          'client_id': clientId,
          'client_secret': secret,
          'token': state.accessToken
        }
      },
      { root: true }
    )
    await keytar.deletePassword(
      state.service,
      clientId
    )
    commit(CLEAR_ACCESS_TOKEN)
  },
  async restoreAccessToken ({ state, commit, getters }, url) {
    if (state.accessToken) return state.accessToken
    try {
      commit(SET_ACCESS_TOKEN,
        await keytar.getPassword(
          state.service,
          getters.getCurrentAppToken.uid
        )
      )
      return state.accessToken
    } catch (e) {
      return null
    }
  },
  async storeAccessTokenByUrl ({ state, commit, getters }, url) {
    const regexp = `^${getters.getWebUrl}/.*?access_token=([^&]*)`
    const matched = url.match(new RegExp(regexp))
    if (!matched || !matched[1]) return false
    commit(SET_ACCESS_TOKEN, matched[1])
    keytar.setPassword(
      state.service,
      getters.getCurrentAppToken.uid,
      matched[1]
    )
    return true
  }
}

export const getters = {
  getApiUrl: state => {
    return state.apiUrl
  },
  getAccessToken: state => {
    return state.accessToken
  },
  isLoggedIn: state => {
    return state.accessToken
  },
  getCurrentAppToken: state => {
    return state.appTokens[state.apiUrl]
  },
  getWebUrl: (state, getters) => {
    return (getters.getCurrentAppToken || {}).webUrl
  },
  getAuthorizeUrl: (state, getters) => {
    return `${getters.getWebUrl}/oauth/authorize?${
      queryString.stringify({
        client_id: getters.getCurrentAppToken.uid,
        redirect_uri: state.redirectUri,
        response_type: 'token',
        scope: state.scopes.join(' ')
      })
    }`
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
