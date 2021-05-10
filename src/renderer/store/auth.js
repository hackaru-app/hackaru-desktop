const LOGOUT = 'LOGOUT'
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'

export const state = () => ({
  accessToken: '',
})

export const actions = {
  async restoreAccessToken({ commit, state }) {
    if (state.accessToken) return
    const accessToken = await electron.restoreAccessToken()
    commit(SET_ACCESS_TOKEN, accessToken || '')
  },
  logout({ commit }) {
    electron.logout()
    commit(LOGOUT)
  },
}

export const mutations = {
  [SET_ACCESS_TOKEN](state, accessToken) {
    state.accessToken = accessToken
  },
  [LOGOUT](state) {
    state.accessToken = ''
  },
}

export const getters = {
  accessToken: (state) => {
    return state.accessToken
  },
  loggedIn: (state) => {
    return !!state.accessToken
  },
}
