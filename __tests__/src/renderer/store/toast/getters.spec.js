import { getters } from '~/store/toast'

describe('Getters', () => {
  let result

  describe('when call message', () => {
    const state = {
      text: 'text',
      type: 'success',
      rand: 123,
      duration: 3000,
    }

    beforeEach(() => {
      result = getters.message(state)
    })

    it('returns correctly', () => {
      expect(result).toEqual({
        text: 'text',
        type: 'success',
        rand: 123,
        duration: 3000,
      })
    })
  })
})
