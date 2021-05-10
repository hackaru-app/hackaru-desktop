import { project } from '~/schemas'

export const actions = {
  async fetch({ dispatch }) {
    const res = await this.$api.request(
      {
        url: '/v1/projects',
      },
      { root: true }
    )
    dispatch(
      'entities/merge',
      { json: res.data, schema: [project] },
      { root: true }
    )
  },
}

export const getters = {
  all(_state, _getters, _rootState, rootGetters) {
    return rootGetters['entities/getEntities']('projects', [project])
  },
}
