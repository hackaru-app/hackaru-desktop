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
    menubar: {
      startTrayTimer: jest.fn(),
      stopTrayTimer: jest.fn(),
      openSettings: jest.fn(),
      openWeb: jest.fn(),
      quit: jest.fn(),
      on: {
        suspend: () => {},
        shutdown: () => {},
        showMenubar: () => {},
        unlockScreen: () => {},
        clickDuplicate: () => {},
      },
    },
    googleAnalytics: { sendEvent: jest.fn(), removeUserId: jest.fn() },
    mixpanel: { sendEvent: jest.fn(), removeUserId: jest.fn() },
    sentry: { removeUserId: jest.fn() },
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
      expect(global.electron.menubar.openSettings).toHaveBeenCalled()
    })
  })

  describe('when click web-button', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('web-button')).vm.$emit('click')
    })

    it('opens web', () => {
      expect(global.electron.menubar.openWeb).toHaveBeenCalled()
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
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
      expect(global.electron.menubar.quit).toHaveBeenCalled()
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
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
      expect(electron.googleAnalytics.sendEvent).toHaveBeenCalledWith(
        'Accounts',
        'logout'
      )
    })

    it('removes ga user-id', () => {
      expect(electron.googleAnalytics.removeUserId).toHaveBeenCalled()
    })

    it('removes mixpanel user-id', () => {
      expect(electron.mixpanel.removeUserId).toHaveBeenCalled()
    })

    it('removes sentry user-id', () => {
      expect(electron.sentry.removeUserId).toHaveBeenCalled()
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
      expect(electron.googleAnalytics.sendEvent).toHaveBeenCalledWith(
        'Activities',
        'stop'
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
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
      expect(electron.googleAnalytics.sendEvent).not.toHaveBeenCalled()
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
      expect(global.electron.menubar.startTrayTimer).toHaveBeenCalledWith(
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
      expect(global.electron.menubar.stopTrayTimer).toHaveBeenCalled()
    })
  })
})
