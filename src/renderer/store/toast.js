import get from 'lodash.get'

export const SHOW_ERROR = 'SHOW_ERROR'
export const SHOW_SUCCESS = 'SHOW_SUCCESS'

export const state = () => ({
  text: '',
  type: '',
  rand: 0,
  duration: 0,
})

export const actions = {
  error({ commit }, payload) {
    const text =
      get(payload, 'response.data.message') || get(payload, 'message')
    if (text) commit(SHOW_ERROR, text)
  },
  success({ commit }, payload) {
    commit(SHOW_SUCCESS, payload)
  },
}

export const mutations = {
  [SHOW_ERROR](state, payload) {
    state.text = payload
    state.type = 'error'
    state.duration = 5000
    state.rand = Math.random()
  },
  [SHOW_SUCCESS](state, payload) {
    state.text = payload
    state.type = 'success'
    state.duration = 3000
    state.rand = Math.random()
  },
}

export const getters = {
  message(state) {
    return {
      text: state.text,
      type: state.type,
      rand: state.rand,
      duration: state.duration,
    }
  },
}
