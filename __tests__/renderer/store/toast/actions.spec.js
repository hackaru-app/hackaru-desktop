import { actions } from '@/store/modules/toast';

describe('Actions', () => {
  describe('when dispatch success', () => {
    const commit = jest.fn();

    beforeEach(() => {
      actions.success({ commit }, 'message');
    });

    it('commit SHOW_SUCCESS', () => {
      expect(commit).toHaveBeenCalledWith('SHOW_SUCCESS', 'message');
    });
  });

  describe('when dispatch error and message is in error_description', () => {
    const commit = jest.fn();

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

    it('commit SHOW_ERROR', () => {
      expect(commit).toHaveBeenCalledWith('SHOW_ERROR', 'message');
    });
  });

  describe('when dispatch error and message is in data.message', () => {
    const commit = jest.fn();

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

    it('commit SHOW_ERROR', () => {
      expect(commit).toHaveBeenCalledWith('SHOW_ERROR', 'message');
    });
  });

  describe('when dispatch error and message is in message', () => {
    const commit = jest.fn();

    beforeEach(() => {
      actions.error(
        { commit },
        {
          message: 'message'
        }
      );
    });

    it('commit SHOW_ERROR', () => {
      expect(commit).toHaveBeenCalledWith('SHOW_ERROR', 'message');
    });
  });
});
