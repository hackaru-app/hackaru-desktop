import MockDate from 'mockdate';
import { actions } from '@/store/modules/trackers';
import { tracker } from '@/store/schemas';

jest.mock('uniqid', () => () => 'id');

describe('Actions', () => {
  MockDate.set('2019-01-31T01:23:45');

  describe('when dispatch update', () => {
    const state = {
      prevWorkings: [
        { process: 'Firefox' },
        { process: 'Chrome' },
        { process: 'Opera' }
      ]
    };

    const getters = {
      workingProjects: [
        { process: 'Firefox' },
        { process: 'Safari' },
        { process: 'Edge' }
      ]
    };

    const commit = jest.fn();
    const dispatch = jest.fn();

    beforeEach(() => {
      actions.update({ state, commit, getters, dispatch });
    });

    it('dispatch start', () => {
      expect(dispatch).toHaveBeenCalledWith('start', { process: 'Safari' });
      expect(dispatch).toHaveBeenCalledWith('start', { process: 'Edge' });
    });

    it('dispatch stop', () => {
      expect(dispatch).toHaveBeenCalledWith('stop', { process: 'Chrome' });
      expect(dispatch).toHaveBeenCalledWith('stop', { process: 'Opera' });
    });

    it('commit SET_PREV_WORKINGS', () => {
      expect(commit).toHaveBeenCalledWith('SET_PREV_WORKINGS', [
        { process: 'Firefox' },
        { process: 'Safari' },
        { process: 'Edge' }
      ]);
    });
  });

  describe('when dispatch start', () => {
    const dispatch = jest.fn();
    const rootGetters = {
      'activities/findByProject': () => undefined
    };

    beforeEach(() => {
      actions.start({ rootGetters, dispatch }, 2);
    });

    it('dispatch activities/add', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'activities/add',
        {
          projectId: 2,
          startedAt: `${new Date()}`
        },
        { root: true }
      );
    });
  });

  describe('when dispatch stop', () => {
    const dispatch = jest.fn();
    const rootGetters = {
      'activities/findByProject': () => ({ id: 1 })
    };

    beforeEach(() => {
      actions.start({ rootGetters, dispatch }, 2);
    });

    it('does not dispatch', () => {
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when dispatch stop', () => {
    const dispatch = jest.fn();
    const rootGetters = {
      'activities/findByProject': () => ({ id: 1 })
    };

    beforeEach(() => {
      actions.stop({ rootGetters, dispatch }, 2);
    });

    it('dispatch activities/update', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'activities/update',
        {
          id: 1,
          stoppedAt: `${new Date()}`
        },
        { root: true }
      );
    });
  });

  describe('when dispatch stop but project is already stopped', () => {
    const dispatch = jest.fn();
    const rootGetters = {
      'activities/findByProject': () => undefined
    };

    beforeEach(() => {
      actions.stop({ rootGetters, dispatch }, 2);
    });

    it('does not dispatch', () => {
      expect(dispatch).not.toHaveBeenCalled();
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
          schema: tracker
        }
      );
    });

    it('dispatch entities/normalize', () => {
      expect(dispatch).toHaveBeenCalledWith(
        'entities/normalize',
        {
          json: {
            id: 'id',
            project: 2,
            process: { name: 'Firefox' }
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

  describe('when dispatch stopAll', () => {
    const dispatch = jest.fn();
    const commit = jest.fn();
    const getters = {
      workingProjects: [1, 2]
    };

    beforeEach(() => {
      actions.stopAll({ commit, getters, dispatch }, 'id');
    });

    it('dispatch stop all', () => {
      expect(dispatch).toHaveBeenCalledWith('stop', 1);
      expect(dispatch).toHaveBeenCalledWith('stop', 2);
    });

    it('commit CLEAR_PREV_WORKINGS', () => {
      expect(commit).toHaveBeenCalledWith('CLEAR_PREV_WORKINGS');
    });
  });
});
