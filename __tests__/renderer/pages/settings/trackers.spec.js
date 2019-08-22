import { Store } from 'vuex-mock-store';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Trackers from '@/pages/settings/trackers';

describe('Trackers', () => {
  let wrapper;

  const localVue = createLocalVue();
  localVue.directive('tooltip', () => {});

  const $store = new Store({
    getters: {
      'trackers/all': [
        {
          id: 1,
          process: 'Firefox',
          project: {
            name: 'Developments',
            color: '#ccc'
          }
        }
      ]
    }
  });
  const $electron = {
    ipcRenderer: {
      send: jest.fn()
    }
  };

  const factory = () =>
    shallowMount(Trackers, {
      localVue,
      mocks: {
        $store,
        $electron
      }
    });

  describe('when click delete-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find('.tracker .delete-button').vm.$emit('click');
    });

    it('dispatch trackers/delete', () => {
      expect($store.dispatch).toHaveBeenCalledWith('trackers/delete', 1);
    });
  });

  describe('when click delete-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.find('.tracker .delete-button').vm.$emit('click');
    });

    it('dispatch trackers/delete', () => {
      expect($store.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('when click add-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.add-button').vm.$emit('click');
    });

    it('show tracker-editor', () => {
      expect($electron.ipcRenderer.send).toHaveBeenCalledWith(
        'showTrackerEditor'
      );
    });
  });
});
