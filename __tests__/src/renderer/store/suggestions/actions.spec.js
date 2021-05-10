import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { actions } from '~/store/suggestions'

describe('Actions', () => {
  const mock = new MockAdapter(axios)

  beforeEach(() => {
    mock.reset()
    actions.$api = axios
  })

  describe('when dispatch fetch', () => {
    const commit = jest.fn()

    beforeEach(() => {
      mock
        .onGet('/v1/suggestions', {
          params: {
            q: 'query',
            limit: 30,
          },
        })
        .replyOnce(200, {})
      actions.fetch({ commit }, 'query')
    })

    it('commits SET_SUGGESTIONS', () => {
      expect(commit).toHaveBeenCalledWith('SET_SUGGESTIONS', {})
    })
  })
})
