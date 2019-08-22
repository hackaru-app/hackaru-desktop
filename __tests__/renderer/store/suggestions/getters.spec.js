import { getters } from '@/store/modules/suggestions';

describe('Getters', () => {
  let result;

  describe('when call all', () => {
    const state = {
      data: {}
    };

    beforeEach(() => {
      result = getters.all(state);
    });

    it('returns result', () => {
      expect(result).toEqual({});
    });
  });
});
