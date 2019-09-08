import { shallowMount } from '@vue/test-utils';
import { Store } from 'vuex-mock-store';
import Toast from '@/components/molecules/toast';

describe('Toast', () => {
  let wrapper;

  jest.useFakeTimers();

  const $store = new Store({
    getters: {
      'toast/message': {
        text: 'message',
        type: 'success',
        rand: 12345,
        duration: 500
      }
    }
  });

  const $electron = {
    remote: {
      getCurrentWindow: () => ({
        isVisible: () => true
      })
    }
  };

  const factory = () =>
    shallowMount(Toast, {
      mocks: {
        $store,
        $electron
      }
    });

  describe('when change message', () => {
    beforeEach(() => {
      wrapper = factory();
      $store.getters['toast/message'] = {
        text: 'new message',
        type: 'success',
        rand: 456789,
        duration: 500
      };
    });

    it('show new message', async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.content').text()).toBe('new message');
      expect(wrapper.find('.content').exists()).toBe(true);
    });

    it('hide toast delayed', () => {
      jest.runOnlyPendingTimers();
      expect(wrapper.find('.content').exists()).toBe(false);
    });
  });

  describe('when window is not visible', () => {
    beforeEach(() => {
      wrapper = factory();
      $electron.remote = {
        getCurrentWindow: () => ({
          isVisible: () => false
        })
      };
      $store.getters['toast/message'] = {
        text: 'new message',
        type: 'success',
        rand: 456789,
        duration: 500
      };
    });

    it('does not show new message', async () => {
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.toast').isVisible()).toBe(false);
    });
  });
});
