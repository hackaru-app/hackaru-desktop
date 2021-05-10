import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { actions } from '~/store/user'

describe('Actions', () => {
  const mock = new MockAdapter(axios)

  beforeEach(() => {
    mock.reset()
    actions.$api = axios
  })

  describe('when dispatch fetch', () => {
    const commit = jest.fn()

    beforeEach(() => {
      mock.onGet('/v1/user').replyOnce(200, { id: 1 })
      actions.fetch({ commit })
    })

    it('commits SET_USER_ID', () => {
      expect(commit).toHaveBeenCalledWith('SET_USER_ID', { id: 1 })
    })
  })
})
