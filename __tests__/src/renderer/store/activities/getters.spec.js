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

  describe('when call prev', () => {
    const mockGetters = {
      all: [
        { id: 1, stoppedAt: '2019-01-01T01:23:45' },
        { id: 2, stoppedAt: '2019-01-02T01:23:45' },
        { id: 3, stoppedAt: null },
      ],
    }

    beforeEach(() => {
      result = getters.prev({}, mockGetters, {}, {})
    })

    it('returns prev activity', () => {
      expect(result.id).toEqual(2)
    })
  })

  describe('when call prev and activities is empty', () => {
    const mockGetters = {
      all: [],
    }

    beforeEach(() => {
      result = getters.prev({}, mockGetters, {}, {})
    })

    it('returns undefined', () => {
      expect(result).toBeUndefined()
    })
  })

  describe('when call prevDescription and prev has description', () => {
    const mockGetters = {
      prev: {
        id: 1,
        description: 'description',
        stoppedAt: '2019-01-01T01:23:45',
      },
    }

    beforeEach(() => {
      result = getters.prevDescription({}, mockGetters, {}, {})
    })

    it('returns description', () => {
      expect(result).toBe('description')
    })
  })

  describe('when call prevDescription and prev does not have description', () => {
    const mockGetters = {
      prev: {
        id: 1,
        project: { name: 'name' },
        stoppedAt: '2019-01-01T01:23:45',
      },
    }

    beforeEach(() => {
      result = getters.prevDescription({}, mockGetters, {}, {})
    })

    it('returns description', () => {
      expect(result).toBe('name')
    })
  })

  describe('when call prevDescription and prev does not have project and description', () => {
    const mockGetters = {
      prev: { id: 1, stoppedAt: '2019-01-01T01:23:45' },
    }

    beforeEach(() => {
      result = getters.prevDescription({}, mockGetters, {}, {})
    })

    it('returns undefined', () => {
      expect(result).toBeUndefined()
    })
  })

  describe('when call prevDescription and prev is undefined', () => {
    const mockGetters = {}

    beforeEach(() => {
      result = getters.prevDescription({}, mockGetters, {}, {})
    })

    it('returns undefined', () => {
      expect(result).toBeUndefined()
    })
  })
})
