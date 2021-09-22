import { compareDesc, parseISO, addDays } from 'date-fns'
import { activity } from '~/schemas'

export const actions = {
  async fetchWeeklyActivities({ dispatch }, date) {
    const res = await this.$api.request({
      url: '/v1/activities',
      params: {
        start: addDays(date, -7),
        end: date,
      },
    })
    dispatch(
      'entities/merge',
      { json: res.data, schema: [activity] },
      { root: true }
    )
  },
  async fetchWorking({ dispatch, getters }) {
    const res = await this.$api.request({
      url: '/v1/activities/working',
    })
    if (res.data !== null) {
      dispatch(
        'entities/merge',
        { json: res.data, schema: activity },
        { root: true }
      )
    } else if (getters.working) {
      dispatch(
        'entities/delete',
        { name: 'activities', id: getters.working.id },
        { root: true }
      )
    }
  },
  async add({ dispatch }, payload) {
    try {
      const res = await this.$api.request({
        url: '/v1/activities',
        method: 'post',
        data: {
          activity: payload,
        },
      })
      dispatch(
        'entities/merge',
        { json: res.data, schema: activity },
        { root: true }
      )
      return true
    } catch (e) {
      return false
    }
  },
  async delete({ dispatch }, id) {
    dispatch('entities/delete', { name: 'activities', id }, { root: true })
    await this.$api.request({
      url: `/v1/activities/${id}`,
      method: 'delete',
    })
  },
  async update({ dispatch }, payload) {
    try {
      const res = await this.$api.request({
        url: `/v1/activities/${payload.id}`,
        method: 'put',
        data: {
          activity: payload,
        },
      })
      dispatch(
        'entities/merge',
        { json: res.data, schema: activity },
        { root: true }
      )
      return true
    } catch (e) {
      return false
    }
  },
}

export const getters = {
  prev: (_state, getters) => {
    return getters.all
      .filter(({ stoppedAt }) => stoppedAt)
      .sort((a, b) =>
        compareDesc(parseISO(a.stoppedAt), parseISO(b.stoppedAt))
      )[0]
  },
  prevDescription: (_state, getters) => {
    return getters.prev?.description || getters.prev?.project?.name
  },
  all(_state, _getters, _rootState, rootGetters) {
    return rootGetters['entities/getEntities']('activities', [activity])
  },
  working(_state, getters) {
    return getters.all.find(({ stoppedAt }) => !stoppedAt)
  },
}
