import { updateIn } from 'updeep'

const SET_CONFIG = 'SET_CONFIG'

export const state = () => ({
  data: {
    powerMonitor: {
      suspend: true,
      shutdown: true
    }
  }
})

export const actions = {
  async setConfig ({ commit, dispatch }, payload) {
    commit(SET_CONFIG, {
      path: payload.path,
      value: payload.value
    })
  }
}

export const mutations = {
  [SET_CONFIG] (state, payload) {
    state.data = updateIn(
      payload.path,
      payload.value,
      state.data
    )
  }
}

export const getters = {
  getConfig (state) {
    return state.data
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
