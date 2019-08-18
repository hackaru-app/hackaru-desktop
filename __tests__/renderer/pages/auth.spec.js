import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Auth from '@/pages/auth';

describe('Auth', () => {
  let wrapper;

  const $store = new Store({});
  const $electron = {
    ipcRenderer: {
      send: jest.fn(),
      on: () => {}
    }
  };

  const factory = () =>
    shallowMount(Auth, {
      mocks: {
        $store,
        $electron
      }
    });

  describe('when click submit-button', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(true);
      wrapper = factory();
      wrapper.find('.api-url').vm.$emit('input', 'https://www.example.com');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('dispatch auth/fetchAppToken', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'auth/fetchAppToken',
        'https://www.example.com'
      );
    });

    it('send showAuthentication', () => {
      expect($electron.ipcRenderer.send).toHaveBeenCalledWith(
        'showAuthentication'
      );
    });
  });

  describe('when click submit-button but fetch app token failed', () => {
    beforeEach(() => {
      $store.dispatch.mockReturnValue(false);
      wrapper = factory();
      wrapper.find('.api-url').vm.$emit('input', 'https://www.example.com');
      wrapper.find('form').trigger('submit.prevent');
    });

    it('does not send showAuthentication', () => {
      expect($electron.ipcRenderer.send).not.toHaveBeenCalled();
    });
  });
});
