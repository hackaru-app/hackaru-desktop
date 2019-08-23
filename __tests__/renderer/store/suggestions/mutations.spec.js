import { mutations } from '@/store/modules/suggestions';

describe('Mutations', () => {
  describe('when commit SET_SUGGESTIONS', () => {
    const state = { data: [] };

    beforeEach(() => {
      mutations['SET_SUGGESTIONS'](state, [
        { project: undefined, description: 'Review' }
      ]);
    });

    it('set suggestions', () => {
      expect(state.data).toEqual([
        { project: undefined, description: 'Review' }
      ]);
    });
  });
});
