import { mutations } from '~/store/auth'

describe('Mutations', () => {
  describe('when commit SET_ACCESS_TOKEN', () => {
    const state = { accessToken: '' }

    beforeEach(() => {
      mutations.SET_ACCESS_TOKEN(state, 'accessToken')
    })

    it('sets accessToken', () => {
      expect(state.accessToken).toBe('accessToken')
    })
  })

  describe('when commit LOGOUT', () => {
    const state = { accessToken: 'accessToken' }

    beforeEach(() => {
      mutations.LOGOUT(state)
    })

    it('removes accessToken', () => {
      expect(state.accessToken).toBe('')
    })
  })
})
