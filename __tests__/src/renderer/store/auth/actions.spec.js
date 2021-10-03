import { actions } from '~/store/auth'

describe('Actions', () => {
  describe('when dispatch restoreAccessToken and user is logged-in', () => {
    const commit = jest.fn()
    const state = { accessToken: '' }

    global.electron = {
      auth: {
        restoreAccessToken: () => 'accessToken',
        removeAccessToken: jest.fn(),
      },
    }

    beforeEach(() => {
      actions.restoreAccessToken({ state, commit })
    })

    it('commits SET_ACCESS_TOKEN', () => {
      expect(commit).toHaveBeenCalledWith('SET_ACCESS_TOKEN', 'accessToken')
    })
  })

  describe('when dispatch restoreAccessToken and user is not logged-in', () => {
    const commit = jest.fn()
    const state = { accessToken: '' }

    beforeEach(() => {
      global.electron.auth.restoreAccessToken = () => undefined
      actions.restoreAccessToken({ state, commit })
    })

    it('commits SET_ACCESS_TOKEN', () => {
      expect(commit).toHaveBeenCalledWith('SET_ACCESS_TOKEN', '')
    })
  })

  describe('when dispatch restoreAccessToken and already restored', () => {
    const commit = jest.fn()
    const state = { accessToken: 'accessToken' }

    beforeEach(() => {
      actions.restoreAccessToken({ state, commit })
    })

    it('does not commits SET_ACCESS_TOKEN', () => {
      expect(commit).not.toHaveBeenCalled()
    })
  })

  describe('when removeAccessToken', () => {
    const commit = jest.fn()
    const state = { accessToken: 'accessToken' }

    beforeEach(() => {
      actions.logout({ state, commit })
    })

    it('calls logout', () => {
      expect(global.electron.auth.removeAccessToken).toHaveBeenCalled()
    })

    it('commits LOGOUT', () => {
      expect(commit).toHaveBeenCalledWith('LOGOUT')
    })
  })
})
