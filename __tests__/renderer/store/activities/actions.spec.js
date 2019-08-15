import MockDate from 'mockdate';
import { actions } from '@/store/modules/activities';
import { activity } from '@/store/schemas';

describe('Actions', () => {
  MockDate.set('2019-01-31T01:23:45');

  describe('when dispatch fetchWorkings', () => {
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.fetchWorkings({ dispatch });
    });

    it('dispatch auth-api/request', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'auth-api/request',
        {
          url: '/v1/activities',
          params: {
            working: true
          }
        },
        { root: true }
      );
    });

    it('dispatch entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: [activity]
        },
        { root: true }
      );
    });
  });

  describe('when dispatch add', () => {
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.add({ dispatch }, {});
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

    it('dispatch entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: activity
        },
        { root: true }
      );
    });
  });

  describe('when dispatch stop', () => {
    const dispatch = jest.fn(() => ({ data: {} }));
    const getters = { working: { id: 1 } };

    beforeEach(() => {
      actions.stop({ dispatch, getters });
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

    it('dispatch entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: activity
        },
        { root: true }
      );
    });
  });

  describe('when dispatch stop but activity is not working', () => {
    const dispatch = jest.fn(() => ({ data: {} }));
    const getters = { working: undefined };

    beforeEach(() => {
      actions.stop({ dispatch, getters });
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

    it('dispatch entities/delete', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/delete',
        { name: 'activities', id: 1 },
        { root: true }
      );
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
    const dispatch = jest.fn(() => ({ data: {} }));

    beforeEach(() => {
      actions.update({ dispatch }, { id: 1 });
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

    it('dispatch entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {},
          schema: activity
        },
        { root: true }
      );
    });
  });
});
