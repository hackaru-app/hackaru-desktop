import MockDate from 'mockdate'
import { getters } from '~/store/auth'

describe('Getters', () => {
  let result

  MockDate.set('2019-01-31T01:23:45')

  beforeEach(() => {
    localStorage.clear()
  })

  describe('when call accessToken', () => {
    const state = { accessToken: 'accessToken' }

    beforeEach(() => {
      result = getters.accessToken(state)
    })

    it('returns accessToken', () => {
      expect(result).toBe('accessToken')
    })
  })

  describe('when call loggedIn and accessToken is stored', () => {
    const state = { accessToken: 'accessToken' }

    beforeEach(() => {
      result = getters.loggedIn(state)
    })

    it('returns true', () => {
      expect(result).toBe(true)
    })
  })

  describe('when call loggedIn and accessToken is not stored', () => {
    const state = { accessToken: '' }

    beforeEach(() => {
      result = getters.loggedIn(state)
    })

    it('returns false', () => {
      expect(result).toBe(false)
    })
  })
})
