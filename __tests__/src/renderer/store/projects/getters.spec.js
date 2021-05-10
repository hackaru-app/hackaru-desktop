import { getters } from '~/store/projects'

describe('Getters', () => {
  let result

  describe('when call all', () => {
    const rootGetters = {
      'entities/getEntities': jest.fn(() => ({})),
    }

    beforeEach(() => {
      result = getters.all({}, {}, {}, rootGetters)
    })

    it('returns result', () => {
      expect(result).toEqual({})
    })
  })
})
