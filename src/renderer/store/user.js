const SET_USER_ID = 'SET_USER_ID'

export const state = () => ({
  id: undefined,
})

export const actions = {
  async fetch({ commit }) {
    try {
      const res = await this.$api.request({
        url: '/v1/user',
        method: 'get',
      })
      commit(SET_USER_ID, res.data)
      return true
    } catch (e) {
      return false
    }
  },
}

export const mutations = {
  [SET_USER_ID](state, payload) {
    state.id = payload.id
  },
}

export const getters = {
  id: (state) => {
    return state.id
  },
}
