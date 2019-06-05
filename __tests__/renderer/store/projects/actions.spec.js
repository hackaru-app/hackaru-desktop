import { actions } from '@/store/modules/projects';
import { project } from '@/store/schemas';

describe('Actions', () => {
  describe('when dispatch fetch', () => {
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.fetch({ dispatch });
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/projects'
        },
        { root: true }
      );
    });

    it('dispatch entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: [project]
        },
        { root: true }
      );
    });
  });
});
