import { getters } from '@/store/modules/processes';

describe('Getters', () => {
  let result;

  describe('when call all', () => {
    const state = {
      data: ['Example']
    };

    beforeEach(() => {
      result = getters.all(state);
    });

    it('returns unstopped activites', () => {
      expect(result).toEqual(['Example']);
    });
  });
});
