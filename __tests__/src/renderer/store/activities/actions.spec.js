import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { actions } from '~/store/activities'
import { activity } from '~/schemas'

describe('Actions', () => {
  const mock = new MockAdapter(axios)

  beforeEach(() => {
    mock.reset()
    actions.$api = axios
  })

  describe('when dispatch fetchWorking', () => {
    const dispatch = jest.fn()

    beforeEach(() => {
      mock.onGet('/v1/activities/working').replyOnce(200, {})
      actions.fetchWorking({ dispatch })
    })

    it('dispatches entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: activity,
        },
        { root: true }
      )
    })
  })

  describe('when dispatch fetchWorking and working activity is null', () => {
    const dispatch = jest.fn()
    const getters = {
      working: { id: 1 },
    }

    beforeEach(() => {
      mock.onGet('/v1/activities/working').replyOnce(200, null)
      actions.fetchWorking({ dispatch, getters })
    })

    it('dispatches entities/delete', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/delete',
        { name: 'activities', id: 1 },
        { root: true }
      )
    })
  })

  describe('when dispatch add', () => {
    const dispatch = jest.fn()

    beforeEach(() => {
      mock
        .onPost('/v1/activities', {
          activity: {},
        })
        .replyOnce(200, {})
      actions.add({ dispatch }, {})
    })

    it('dispatches entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: activity,
        },
        { root: true }
      )
    })
  })

  describe('when dispatch delete', () => {
    const dispatch = jest.fn()

    beforeEach(() => {
      mock.onDelete('/v1/activities/1').replyOnce(200, {})
      actions.delete({ dispatch }, 1)
    })

    it('dispatches entities/delete', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/delete',
        { name: 'activities', id: 1 },
        { root: true }
      )
    })
  })

  describe('when dispatch update', () => {
    const dispatch = jest.fn()

    beforeEach(() => {
      mock.onPut('/v1/activities/1', { activity: { id: 1 } }).replyOnce(200, {})
      actions.update({ dispatch }, { id: 1 })
    })

    it('dispatches entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: activity,
        },
        { root: true }
      )
    })
  })
})
