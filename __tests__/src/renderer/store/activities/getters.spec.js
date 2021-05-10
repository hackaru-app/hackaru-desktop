import MockDate from 'mockdate'
import { getters } from '~/store/activities'

describe('Getters', () => {
  let result

  MockDate.set('2019-01-31T01:23:45')

  describe('when call all', () => {
    const rootGetters = {
      'entities/getEntities': () => ({}),
    }

    beforeEach(() => {
      result = getters.all({}, {}, {}, rootGetters)
    })

    it('returns result', () => {
      expect(result).toEqual({})
    })
  })

  describe('when call working', () => {
    const mockGetters = {
      all: [
        { id: 1, stoppedAt: '2019-01-01T01:23:45' },
        { id: 2, stoppedAt: null },
      ],
    }

    beforeEach(() => {
      result = getters.working({}, mockGetters, {}, {})
    })

    it('returns unstopped activity', () => {
      expect(result.id).toBe(2)
    })
  })
})
