import { getters } from '@/store/modules/trackers';

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

  describe('when call workingProjects', () => {
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
      result = getters.workingProjects({}, mockGetters, {}, rootGetters);
    });

    it('unique project-id', () => {
      expect(result).toEqual([1]);
    });
  });

  describe('when call workingProjects but project is undefined', () => {
    const mockGetters = {
      all: [{ project: undefined, process: 'Firefox' }]
    };

    const rootGetters = {
      'processes/all': ['Firefox']
    };

    beforeEach(() => {
      result = getters.workingProjects({}, mockGetters, {}, rootGetters);
    });

    it('returns null', () => {
      expect(result).toEqual([null]);
    });
  });
});
