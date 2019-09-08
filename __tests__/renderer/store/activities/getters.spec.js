import { getters } from '@/store/modules/activities';

describe('Getters', () => {
  let result;

  describe('when call working', () => {
    const state = {
      working: {}
    };

    beforeEach(() => {
      result = getters.working(state);
    });

    it('returns unstopped activity', () => {
      expect(result).toEqual({});
    });
  });

  describe('when call initialized', () => {
    const state = {
      initialized: true
    };

    beforeEach(() => {
      result = getters.initialized(state);
    });

    it('returns initialized', () => {
      expect(result).toBe(true);
    });
  });
});
