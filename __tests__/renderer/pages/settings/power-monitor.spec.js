import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import PowerMonitor from '@/pages/settings/power-monitor';

describe('PowerMonitor', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'trackers/stopAllOnShutdown': false,
      'trackers/stopAllOnSuspend': false
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

    it('dispatch trackers/setStopAllOnSuspend', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'trackers/setStopAllOnSuspend',
        true
      );
    });
  });

  describe('when click shutdown-checkbox', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.shutdown').setChecked();
    });

    it('dispatch trackers/setStopAllOnShutdown', () => {
      expect($store.dispatch).toHaveBeenCalledWith(
        'trackers/setStopAllOnShutdown',
        true
      );
    });
  });
});
