import { actions } from '@/store/modules/processes';

describe('Actions', () => {
  describe('when dispatch update', () => {
    const commit = jest.fn();

    beforeEach(() => {
      actions.update({ commit }, []);
    });

    it('commit SET_PROCESSES', () => {
      expect(commit).toHaveBeenCalledWith('SET_PROCESSES', []);
    });
  });
});
