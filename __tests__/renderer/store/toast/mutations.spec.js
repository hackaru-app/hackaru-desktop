import { mutations } from '@/store/modules/toast';

jest.mock('keytar', () => {});

describe('Mutations', () => {
  describe('when commit SHOW_ERROR', () => {
    const state = { rand: 0 };

    beforeEach(() => {
      mutations['SHOW_ERROR'](state, 'description');
    });

    it('set title', () => {
      expect(state.title).toBe('description');
    });

    it('set type', () => {
      expect(state.type).toBe('error');
    });

    it('set rand', () => {
      expect(state.rand).not.toBe(0);
    });
  });

  describe('when commit SHOW_SUCCESS', () => {
    const state = { rand: 0 };

    beforeEach(() => {
      mutations['SHOW_SUCCESS'](state, 'description');
    });

    it('set title', () => {
      expect(state.title).toBe('description');
    });

    it('set type', () => {
      expect(state.type).toBe('success');
    });

    it('set rand', () => {
      expect(state.rand).not.toBe(0);
    });
  });
});
