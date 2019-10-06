import MockDate from 'mockdate';
import { actions } from '@/store/modules/trackers';
import { tracker } from '@/store/schemas';

jest.mock('uniqid', () => () => 'id');

describe('Actions', () => {
  MockDate.set('2019-01-31T01:23:45');

  describe('when dispatch update', () => {
    const commit = jest.fn();
    const dispatch = jest.fn();

    describe('when start tracking', () => {
      const state = {
        started: false
      };

      const getters = {
        tracking: {
          project: { id: 1 },
          description: 'Review'
        }
      };

      beforeEach(() => {
        actions.update({ state, commit, getters, dispatch });
      });

      it('dispatch start', () => {
        expect(dispatch).toHaveBeenCalledWith('start');
      });
    });

    describe('when start tracking but already started', () => {
      const state = {
        started: true
      };

      const getters = {
        tracking: {
          project: { id: 1 },
          description: 'Review'
        }
      };

      beforeEach(() => {
        actions.update({ state, commit, getters, dispatch });
      });

      it('does not dispatcth', () => {
        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('when start tracking but other timer already started', () => {
      const state = {
        started: false
      };

      const getters = {
        working: true,
        tracking: {
          project: { id: 1 },
          description: 'Review'
        }
      };

      beforeEach(() => {
        actions.update({ state, commit, getters, dispatch });
      });

      it('does not dispatcth', () => {
        expect(dispatch).not.toHaveBeenCalled();
      });
    });

    describe('when exit tracking app', () => {
      const state = {
        started: true
      };

      const getters = {
        active: undefined
      };

      beforeEach(() => {
        actions.update({ state, commit, getters, dispatch });
      });

      it('dispatch stop', () => {
        expect(dispatch).toHaveBeenCalledWith('stop');
      });
    });

    describe('when exit tracking app but already stopped', () => {
      const state = {
        started: false
      };

      const getters = {
        active: undefined
      };

      beforeEach(() => {
        actions.update({ state, commit, getters, dispatch });
      });

      it('does not dispatcth', () => {
        expect(dispatch).not.toHaveBeenCalled();
      });
    });
  });

  describe('when dispatch start', () => {
    const dispatch = jest.fn();
    const commit = jest.fn();
    const getters = {
      tracking: {
        project: { id: 1 },
        description: 'Review'
      }
    };

    beforeEach(() => {
      actions.start({ getters, dispatch, commit });
    });

    it('dispatch activities/add', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'activities/add',
        {
          projectId: 1,
          description: 'Review',
          startedAt: `${new Date()}`
        },
        { root: true }
      );
    });

    it('commit SET_STARTED', () => {
      expect(commit).toHaveBeenCalledWith('SET_STARTED', true);
    });
  });

  describe('when dispatch stop', () => {
    const dispatch = jest.fn();
    const commit = jest.fn();
    const getters = {
      tracking: {
        project: { id: 1 },
        description: 'Review'
      }
    };

    beforeEach(() => {
      actions.stop({ getters, dispatch, commit });
    });

    it('dispatch activities/stop', () => {
      expect(dispatch).toHaveBeenCalledWith('activities/stop', undefined, {
        root: true
      });
    });

    it('commit SET_STARTED', () => {
      expect(commit).toHaveBeenCalledWith('SET_STARTED', false);
    });
  });

  describe('when dispatch add', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      actions.add(
        { dispatch },
        {
          projectId: 2,
          process: { name: 'Firefox' },
          description: 'Review',
          schema: tracker
        }
      );
    });

    it('dispatch entities/merge', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/merge',
        {
          json: {
            id: 'id',
            project: 2,
            process: { name: 'Firefox' },
            description: 'Review'
          },
          schema: tracker
        },
        { root: true }
      );
    });
  });

  describe('when dispatch delete', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      actions.delete({ dispatch }, 'id');
    });

    it('dispatch entities/delete', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/delete',
        { name: 'trackers', id: 'id' },
        { root: true }
      );
    });
  });
});
