const SET_SUGGESTIONS = 'SET_SUGGESTIONS'

export const state = () => ({
  data: [],
})

export const actions = {
  async fetch({ commit }, q) {
    const res = await this.$api.request(
      {
        url: '/v1/suggestions',
        params: {
          q,
          limit: 30,
        },
      },
      { root: true }
    )
    commit(SET_SUGGESTIONS, res.data)
  },
}

export const mutations = {
  [SET_SUGGESTIONS](state, payload) {
    state.data = payload
  },
}

export const getters = {
  all(state) {
    return state.data
  },
}
