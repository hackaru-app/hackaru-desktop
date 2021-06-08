import MockDate from 'mockdate'
import { Store } from 'vuex-mock-store'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { formatISO } from 'date-fns'
import testId from '../../../__helpers__/test-id'
import Index from '~/pages/index'

describe('Index', () => {
  let factory
  let wrapper

  MockDate.set('2019-01-31T01:23:45')

  delete window.location
  window.location = { reload: jest.fn() }

  const $router = { replace: jest.fn() }
  const $store = new Store({
    getters: {
      'activities/working': null,
    },
  })

  const localVue = createLocalVue()
  localVue.directive('tooltip', () => {})

  global.electron = {
    onSuspend: () => {},
    onShutdown: () => {},
    onShowMenubar: () => {},
    startTrayTimer: jest.fn(),
    stopTrayTimer: jest.fn(),
    openSettings: jest.fn(),
    openWeb: jest.fn(),
    quit: jest.fn(),
    sendGaEvent: jest.fn(),
    sendMixpanelEvent: jest.fn(),
    removeUserId: jest.fn(),
  }

  beforeEach(() => {
    $store.reset()
    factory = () =>
      shallowMount(Index, {
        localVue,
        mocks: {
          $store,
          $router,
          $modal: {
            hide: () => {},
          },
        },
      })
  })

  describe('when click settings-button', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('settings-button')).vm.$emit('click')
    })

    it('opens settings', () => {
      expect(global.electron.openSettings).toHaveBeenCalled()
    })
  })

  describe('when click web-button', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('web-button')).vm.$emit('click')
    })

    it('opens web', () => {
      expect(global.electron.openWeb).toHaveBeenCalled()
    })

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Open web',
        {
          component: 'index',
        }
      )
    })
  })

  describe('when click quit-button', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('quit-button')).vm.$emit('click')
    })

    it('quits app', () => {
      expect(global.electron.quit).toHaveBeenCalled()
    })

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Quit app',
        {
          component: 'index',
        }
      )
    })
  })

  describe('when click logout-button', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.vm.logout()
    })

    it('sends ga event', () => {
      expect(electron.sendGaEvent).toHaveBeenCalledWith('Accounts', 'logout')
    })

    it('removes user-id', () => {
      expect(electron.removeUserId).toHaveBeenCalled()
    })

    it('dispatches auth/logout', () => {
      expect($store.dispatch).toHaveBeenCalledWith('auth/logout')
    })

    it('redirects to index', () => {
      expect($router.replace).toHaveBeenCalledWith('/en/auth')
    })

    it('reloads window', () => {
      expect(window.location.reload).toHaveBeenCalled()
    })
  })

  describe('when call stopWorking and timer is working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Create a database',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: null,
      }
      wrapper = factory()
      wrapper.vm.stopWorking()
    })

    it('sends ga event', () => {
      expect(electron.sendGaEvent).toHaveBeenCalledWith('Activities', 'stop')
    })

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Stop activity',
        {
          component: 'index',
          startedAt: '2019-01-01T00:12:34',
          stoppedAt: formatISO(new Date()),
          projectId: undefined,
          duration: 2596271,
          descriptionLength: 17,
        }
      )
    })

    it('dispatches activities/update', () => {
      expect($store.dispatch).toHaveBeenCalledWith('activities/update', {
        id: 1,
        stoppedAt: new Date(),
      })
    })
  })

  describe('when call stopWorking and timer is not working', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = null
      wrapper = factory()
      wrapper.vm.stopWorking()
    })

    it('does not send ga event', () => {
      expect(electron.sendGaEvent).not.toHaveBeenCalled()
    })

    it('does not dispatch activities/update', () => {
      expect($store.dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when start timer', () => {
    beforeEach(() => {
      wrapper = factory()
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Create a database',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34',
      }
    })

    it('starts tray timer', () => {
      expect(global.electron.startTrayTimer).toHaveBeenCalledWith(
        '2019-01-01T00:12:34'
      )
    })
  })

  describe('when start timer', () => {
    beforeEach(() => {
      $store.getters['activities/working'] = {
        id: 1,
        project: null,
        description: 'Create a database',
        startedAt: '2019-01-01T00:12:34',
        stoppedAt: '2019-01-02T00:12:34',
      }
      wrapper = factory()
      $store.getters['activities/working'] = null
    })

    it('stops tray timer', () => {
      expect(global.electron.stopTrayTimer).toHaveBeenCalled()
    })
  })
})
