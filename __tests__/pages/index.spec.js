import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Index from '@/pages/index';

describe('Index', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'activities/getWorkingActivities': [
        {
          id: 1,
          description: 'Review',
          startedAt: '2019-01-01T01:23:45'
        }
      ],
      'auth/getWebUrl': 'http://app.hackaru.app'
    }
  });

  const $electron = {
    shell: {
      openExternal: jest.fn()
    }
  };

  const factory = () =>
    shallowMount(Index, {
      mocks: {
        $store,
        $electron,
        $t: () => {}
      }
    });

  it('dispatch activities/getWorkingActivities', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith(
      'activities/getWorkingActivities'
    );
  });

  it('dispatch activities/getProjects', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('projects/getProjects');
  });

  describe('when click web-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.web-button').vm.$emit('click');
    });

    it('show browser', () => {
      expect($electron.shell.openExternal).toHaveBeenCalledWith(
        'http://app.hackaru.app'
      );
    });
  });
});
