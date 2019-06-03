import { getters } from '@/store/modules/processes';

describe('Getters', () => {
  let result;

  describe('when call processes', () => {
    const state = {
      data: ['Example']
    };

    beforeEach(() => {
      result = getters.processes(state);
    });

    it('returns unstopped activites', () => {
      expect(result).toEqual(['Example']);
    });
  });
});
