import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import ActivityEditor from '@/pages/activity-editor';

describe('ActivityEditor', () => {
  let wrapper;

  const $store = new Store({});
  const closeWindow = jest.fn();
  const $electron = {
    remote: {
      getCurrentWindow: () => ({
        close: closeWindow
      })
    }
  };

  const $route = { query: {} };
  const factory = () =>
    shallowMount(ActivityEditor, {
      mocks: {
        $store,
        $electron,
        $route
      }
    });

  describe('when query has project-id', () => {
    beforeEach(() => {
      $route.query = { projectId: '1' };
      wrapper = factory();
    });

    it('convert project-id to number', () => {
      expect(wrapper.vm.projectId).toBe(1);
    });
  });

  describe('when query does not have project-id', () => {
    beforeEach(() => {
      $route.query = {};
      wrapper = factory();
    });

    it('set project to undefined', () => {
      expect(wrapper.vm.projectId).toBeUndefined();
    });
  });

  describe('when click submit-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find('.project-select').vm.$emit('input', 2);
      wrapper.find('.description').setValue('Create a database.');
      wrapper.find('.started-at').vm.$emit('input', '2019-01-01T00:12:34');
      wrapper.find('.stopped-at').vm.$emit('input', '2019-01-02T00:12:34');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        projectId: 2,
        description: 'Create a database.',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34'
      });
    });
  });

  describe('when click submit-button and id is undefined', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.setData({ id: undefined });
      wrapper.find('.project-select').vm.$emit('input', 2);
      wrapper.find('.description').setValue('Create a database.');
      wrapper.find('.started-at').vm.$emit('input', '2019-01-01T00:12:34');
      wrapper.find('.stopped-at').vm.$emit('input', '2019-01-02T00:12:34');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch activities/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/add', {
        projectId: 2,
        description: 'Create a database.',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34'
      });
    });

    it('close current window', () => {
      expect(closeWindow).toHaveBeenCalled();
    });
  });

  describe('when click delete-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('dispatch activities/delete', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/delete', 1);
    });
  });

  describe('when click delete-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.setData({ id: 1 });
      wrapper.find('.delete-button').vm.$emit('click');
    });

    it('does not dispatch activities/deleteActivity', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });
});
