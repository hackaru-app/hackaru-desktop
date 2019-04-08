import { project } from '../schemas'

export const SET_PROJECTS = 'SET_PROJECTS'

export const state = () => ({
  items: []
})

export const actions = {
  async getProjects ({ commit, dispatch }) {
    try {
      const res = await dispatch('auth-api/request',
        { url: '/v1/projects' },
        { root: true }
      )
      const data = await dispatch('entities/normalize',
        { json: res.data, schema: [project] },
        { root: true }
      )
      commit(SET_PROJECTS, data.result)
    } catch (e) {
      dispatch('toast/showError', e, { root: true })
    }
  }
}

export const mutations = {
  [SET_PROJECTS] (state, payload) {
    state.items = payload
  }
}

export const getters = {
  getProjects (state, getters, rootState, rootGetters) {
    return rootGetters['entities/getDenormalized'](state.items, [project])
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
