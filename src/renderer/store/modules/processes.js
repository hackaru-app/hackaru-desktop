import uniq from 'lodash.uniq'

export const SET_PROCESSES = 'SET_PROCESSES'

export const state = () => ({
  items: []
})

export const actions = {
  updateProccesses ({ commit }, payload) {
    commit(SET_PROCESSES, payload)
  }
}

export const mutations = {
  [SET_PROCESSES] (state, payload) {
    state.items = uniq(payload.map(({ name }) => name))
  }
}

export const getters = {
  getProcesses (state) {
    return state.items
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
