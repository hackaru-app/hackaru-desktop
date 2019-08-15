import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import TrackerEditor from '@/pages/settings/tracker-editor';

describe('TrackerEditor', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'processes/all': []
    }
  });

  const closeWindow = jest.fn();
  const $electron = {
    remote: {
      getCurrentWindow: () => ({
        close: closeWindow
      })
    }
  };

  const factory = () =>
    shallowMount(TrackerEditor, {
      mocks: {
        $store,
        $electron
      }
    });

  describe('when click submit-button', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.find('.project-select').vm.$emit('input', 1);
      wrapper.find('.process-select').vm.$emit('input', { name: 'Firefox' });
      wrapper.find('.description').setValue('Review my task.');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch trackers/add', () => {
      expect($store.dispatch).toHaveBeenCalledWith('trackers/add', {
        projectId: 1,
        process: 'Firefox',
        description: 'Review my task.'
      });
    });

    it('close current window', () => {
      expect(closeWindow).toHaveBeenCalled();
    });
  });
});
