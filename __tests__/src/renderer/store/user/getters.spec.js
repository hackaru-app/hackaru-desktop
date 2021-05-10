import { getters } from '~/store/user'

describe('Getters', () => {
  let result

  describe('when call id', () => {
    const state = { id: 1 }

    beforeEach(() => {
      result = getters.id(state)
    })

    it('returns id', () => {
      expect(result).toBe(1)
    })
  })
})
