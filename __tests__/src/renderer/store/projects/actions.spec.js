import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { project } from '~/schemas'
import { actions } from '~/store/projects'

describe('Actions', () => {
  const mock = new MockAdapter(axios)

  beforeEach(() => {
    mock.reset()
    actions.$api = axios
  })

  describe('when dispatch fetch', () => {
    const dispatch = jest.fn()

    beforeEach(() => {
      mock.onGet('/v1/projects').replyOnce(200, {})
      actions.fetch({ dispatch })
    })

    it('dispatches entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: [project],
        },
        { root: true }
      )
    })
  })
})
