import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import PowerMonitor from '@/pages/settings/power-monitor';

describe('PowerMonitor', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'activities/stopOnShutdown': false,
      'activities/stopOnSuspend': false
    }
  });

  const factory = () =>
    shallowMount(PowerMonitor, {
      mocks: {
        $store
      }
    });

  describe('when click suspend-checkbox', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.suspend').setChecked();
    });

    it('dispatch activities/setStopOnSuspend', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/setStopOnSuspend',
        true
      );
    });
  });

  describe('when click shutdown-checkbox', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.shutdown').setChecked();
    });

    it('dispatch activities/setStopOnShutdown', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'activities/setStopOnShutdown',
        true
      );
    });
  });
});
