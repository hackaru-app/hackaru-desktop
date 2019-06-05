import { getters } from '@/store/modules/toast';

describe('Getters', () => {
  let result;

  describe('when call getMessage', () => {
    const state = {
      title: 'title',
      type: 'success',
      rand: 123
    };

    beforeEach(() => {
      result = getters.getMessage(state);
    });

    it('returns correctly', () => {
      expect(result).toEqual({
        title: 'title',
        type: 'success',
        rand: 123
      });
    });
  });
});
