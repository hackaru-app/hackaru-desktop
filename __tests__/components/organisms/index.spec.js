import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Activity from '@/components/organisms/activity';

describe('Activity', () => {
  let wrapper;

  const $store = new Store({});
  const $electron = {
    ipcRenderer: {
      send: jest.fn()
    }
  };

  const factory = () =>
    shallowMount(Activity, {
      propsData: {
        id: 1,
        description: 'Review',
        startedAt: '2019-01-31T01:23:45',
        stoppedAt: '2019-02-01T01:23:45',
        project: {
          id: 2
        }
      },
      mocks: {
        $store,
        $electron,
        $t: () => {}
      }
    });

  describe('when click content', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.content').trigger('click');
    });

    it('show activity-editor', () => {
      expect($electron.ipcRenderer.send).toHaveBeenCalledWith(
        'showActivityEditor',
        {
          id: 1,
          projectId: 2,
          description: 'Review',
          startedAt: '2019-01-31T01:23:45'
        }
      );
    });
  });

  describe('when click stop-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.stop-button').vm.$emit('click');
    });

    it('dispatch activities/stopActivity', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/stopActivity', {
        id: 1
      });
    });
  });
});
