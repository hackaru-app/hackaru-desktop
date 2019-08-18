import { getters } from '@/store/modules/activities';

describe('Getters', () => {
  let result;

  describe('when call all', () => {
    const rootGetters = {
      'entities/getEntities': jest.fn(() => ({}))
    };

    beforeEach(() => {
      result = getters.all({}, {}, {}, rootGetters);
    });

    it('returns result', () => {
      expect(result).toEqual({});
    });
  });

  describe('when call working', () => {
    const mockGetters = {
      all: [
        { id: 1, stoppedAt: '2019-01-01T01:23:45' },
        { id: 2, stoppedAt: null }
      ]
    };

    beforeEach(() => {
      result = getters.working({}, mockGetters, {}, {});
    });

    it('returns unstopped activity', () => {
      expect(result.id).toBe(2);
    });
  });

  describe('when call findByProject', () => {
    const mockGetters = {
      workings: [{ project: { id: 2 } }]
    };

    beforeEach(() => {
      result = getters.findByProject({}, mockGetters, {}, {})(2);
    });

    it('returns activity', () => {
      expect(result).toEqual({ project: { id: 2 } });
    });
  });

  describe('when call findByProject but id is null', () => {
    const mockGetters = {
      workings: [{ project: null }]
    };

    beforeEach(() => {
      result = getters.findByProject({}, mockGetters, {}, {})(null);
    });

    it('returns activity', () => {
      expect(result).toEqual({ project: null });
    });
  });
});
