import MockDate from 'mockdate';
import { actions } from '@/store/modules/activities';

describe('Actions', () => {
  MockDate.set('2019-01-31T01:23:45');

  describe('when dispatch fetchWorking', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.fetchWorking({ commit, dispatch });
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        { url: '/v1/activities/working' },
        { root: true }
      );
    });

    it('commit SET_WORKING', () => {
      expect(commit).toHaveBeenCalledWith('SET_WORKING', {});
    });
  });

  describe('when dispatch add', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.add({ commit, dispatch }, {});
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities',
          method: 'post',
          data: {
            activity: {}
          }
        },
        { root: true }
      );
    });

    it('commit SET_WORKING', () => {
      expect(commit).toHaveBeenCalledWith('SET_WORKING', {});
    });
  });

  describe('when dispatch stop', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({ data: {} }));
    const state = { working: { id: 1 } };

    beforeEach(() => {
      actions.stop({ state, commit, dispatch });
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities/1',
          method: 'put',
          data: {
            activity: {
              id: 1,
              stoppedAt: `${new Date()}`
            }
          }
        },
        { root: true }
      );
    });

    it('commit DELETE_WORKING', () => {
      expect(commit).toHaveBeenCalledWith('DELETE_WORKING');
    });
  });

  describe('when dispatch stop but activity is not working', () => {
    const dispatch = jest.fn(() => ({ data: {} }));
    const state = { working: {} };

    beforeEach(() => {
      actions.stop({ dispatch, state });
    });

    it('does not dispatch auth-api/request', () => {
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when dispatch delete', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      actions.delete({ dispatch }, 1);
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities/1',
          method: 'delete'
        },
        { root: true }
      );
    });
  });

  describe('when dispatch update', () => {
    const commit = jest.fn();
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.update({ commit, dispatch }, { id: 1 });
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities/1',
          method: 'put',
          data: {
            activity: { id: 1 }
          }
        },
        { root: true }
      );
    });

    it('commit SET_WORKING', () => {
      expect(commit).toHaveBeenCalledWith('SET_WORKING', {});
    });
  });
});
