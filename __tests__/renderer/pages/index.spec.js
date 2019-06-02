import { Store } from 'vuex-mock-store';
import { shallowMount } from '@vue/test-utils';
import Index from '@/pages/index';

describe('Index', () => {
  let wrapper;

  const $store = new Store({
    getters: {
      'activities/workings': [
        {
          id: 1,
          project: { id: 2 },
          description: 'Review',
          startedAt: '2019-01-01T01:23:45'
        }
      ],
      'auth/getWebUrl': 'http://app.hackaru.app'
    }
  });

  const $electron = {
    ipcRenderer: {
      send: jest.fn()
    },
    remote: {
      app: {
        relaunch: jest.fn(),
        exit: jest.fn()
      }
    },
    shell: {
      openExternal: jest.fn()
    }
  };

  const factory = () =>
    shallowMount(Index, {
      mocks: {
        $store,
        $electron
      }
    });

  it('dispatch activities/fetchWorkings', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('activities/fetchWorkings');
  });

  it('dispatch activities/getProjects', () => {
    factory();
    expect($store.dispatch).toHaveBeenCalledWith('projects/getProjects');
  });

  describe('when click add-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.add-button').trigger('click');
    });

    it('show activity-editor', () => {
      expect($electron.ipcRenderer.send).toHaveBeenCalledWith(
        'showActivityEditor'
      );
    });
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

  describe('when click settings-button', () => {
    beforeEach(() => {
      wrapper = factory();
      wrapper.find('.settings-button').vm.$emit('click');
    });

    it('show settings', () => {
      expect($electron.ipcRenderer.send).toHaveBeenCalledWith('showSettings');
    });
  });

  describe('when click logout-button', () => {
    beforeEach(() => {
      global.confirm = () => true;
      wrapper = factory();
      wrapper.find('.logout-button').vm.$emit('click');
    });

    it('dispatch auth/logout', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/logout');
    });

    it('relaunch app', () => {
      expect($electron.remote.app.relaunch).toHaveBeenCalled();
      expect($electron.remote.app.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('when click logout-button but confirm is false', () => {
    beforeEach(() => {
      global.confirm = () => false;
      wrapper = factory();
      wrapper.find('.logout-button').vm.$emit('click');
    });

    it('does not dispatch', () => {
      expect($store.dispatch).not.toHaveBeenCalledWith('auth/logout');
    });

    it('does not relaunch app', () => {
      expect($electron.remote.app.relaunch).not.toHaveBeenCalled();
      expect($electron.remote.app.exit).not.toHaveBeenCalled();
    });
  });
});
