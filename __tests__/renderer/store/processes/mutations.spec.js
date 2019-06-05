import { mutations } from '@/store/modules/processes';

describe('Mutations', () => {
  describe('when commit SET_PROCESSES', () => {
    const state = {};

    beforeEach(() => {
      mutations['SET_PROCESSES'](state, [
        { name: 'Firefox' },
        { name: 'Chrome' },
        { name: 'Chrome' }
      ]);
    });

    it('unique processes', () => {
      expect(state.data.length).toBe(2);
      expect(state.data).toEqual(['Firefox', 'Chrome']);
    });
  });
});
