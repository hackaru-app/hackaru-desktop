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

  describe('when call search', () => {
    const mockGetters = {
      all: [
        {
          id: 1,
          description: 'Review my tasks',
          startedAt: '2019-01-01T00:00:00',
          stoppedAt: '2019-01-01T01:00:00',
          duration: 3600
        },
        {
          id: 2,
          description: 'Review project',
          startedAt: '2019-01-02T00:00:00',
          stoppedAt: '2019-01-02T01:00:00',
          duration: 3600
        },
        {
          id: 3,
          description: 'Reading book',
          startedAt: '2019-01-03T00:00:00',
          stoppedAt: '2019-01-03T01:00:00',
          duration: 3600
        }
      ]
    };

    describe('when match activities', () => {
      beforeEach(() => {
        result = getters.search({}, mockGetters, {}, {})('Review');
      });

      it('returns matched activities', () => {
        expect(result.length).toBe(2);
      });

      it('returns activities in descending order of startedAt', () => {
        expect(result[0].id).toBe(2);
        expect(result[1].id).toBe(1);
      });
    });

    describe('when does not match activities', () => {
      beforeEach(() => {
        result = getters.search({}, mockGetters, {}, {})('Not found');
      });

      it('returns empty', () => {
        expect(result).toEqual([]);
      });
    });

    describe('when text is empty string', () => {
      beforeEach(() => {
        result = getters.search({}, mockGetters, {}, {})('');
      });

      it('returns empty', () => {
        expect(result).toEqual([]);
      });
    });

    describe('when text is undefined', () => {
      beforeEach(() => {
        result = getters.search({}, mockGetters, {}, {})();
      });

      it('returns empty', () => {
        expect(result).toEqual([]);
      });
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
});
