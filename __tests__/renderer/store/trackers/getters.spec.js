import { getters } from '@/store/modules/trackers';

describe('Getters', () => {
  let result;

  describe('when call working and activity is working', () => {
    const rootGetters = {
      'activities/working': { id: 1 }
    };

    beforeEach(() => {
      result = getters.working({}, {}, {}, rootGetters);
    });

    it('returns true', () => {
      expect(result).toBe(true);
    });
  });

  describe('when call working and activity is not working', () => {
    const rootGetters = {
      'activities/working': undefined
    };

    beforeEach(() => {
      result = getters.working({}, {}, {}, rootGetters);
    });

    it('returns true', () => {
      expect(result).toBe(false);
    });
  });

  describe('when call all', () => {
    const rootGetters = {
      'entities/getEntities': jest.fn(() => [{ project: { id: 1 } }])
    };

    beforeEach(() => {
      result = getters.all({}, {}, {}, rootGetters);
    });

    it('returns result', () => {
      expect(result).toEqual([{ project: { id: 1 } }]);
    });
  });

  describe('when call all but project is undefined', () => {
    const rootGetters = {
      'entities/getEntities': jest.fn(() => [
        { project: { id: 1 } },
        { project: undefined }
      ])
    };

    beforeEach(() => {
      result = getters.all({}, {}, {}, rootGetters);
    });

    it('omit if project is missing', () => {
      expect(result).toEqual([{ project: { id: 1 } }]);
    });
  });

  describe('when call tracking', () => {
    const mockGetters = {
      all: [
        { project: { id: 1 }, process: 'Firefox' },
        { project: { id: 2 }, process: 'Chrome' },
        { project: { id: 1 }, process: 'Safari' }
      ]
    };

    const rootGetters = {
      'processes/all': ['Firefox', 'Safari']
    };

    beforeEach(() => {
      result = getters.tracking({}, mockGetters, {}, rootGetters);
    });

    it('returns the first tracker found', () => {
      expect(result).toEqual({ project: { id: 1 }, process: 'Firefox' });
    });
  });
});
