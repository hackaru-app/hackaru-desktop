import { actions } from '@/store/modules/toast';

describe('Actions', () => {
  const commit = jest.fn();

  describe('when dispatch success', () => {
    beforeEach(() => {
      actions.success({ commit }, 'message');
    });

    it('show toast', () => {
      expect(commit).toHaveBeenCalledWith('SHOW_SUCCESS', 'message');
    });
  });

  describe('when error has message in error_description', () => {
    beforeEach(() => {
      actions.error(
        { commit },
        {
          response: {
            data: {
              error_description: 'message'
            }
          }
        }
      );
    });

    it('show response.data.error-description', () => {
      expect(commit).toHaveBeenCalledWith('SHOW_ERROR', 'message');
    });
  });

  describe('when error has message in data.message', () => {
    beforeEach(() => {
      actions.error(
        { commit },
        {
          response: {
            data: {
              message: 'message'
            }
          }
        }
      );
    });

    it('show response.data.message', () => {
      expect(commit).toHaveBeenCalledWith('SHOW_ERROR', 'message');
    });
  });

  describe('when error has message', () => {
    beforeEach(() => {
      actions.error({ commit }, { message: 'message' });
    });

    it('show message', () => {
      expect(commit).toHaveBeenCalledWith('SHOW_ERROR', 'message');
    });
  });

  describe('when error does not have message', () => {
    beforeEach(() => {
      actions.error({ commit }, undefined);
    });

    it('does not show toast', () => {
      expect(commit).not.toHaveBeenCalled();
    });
  });
});
