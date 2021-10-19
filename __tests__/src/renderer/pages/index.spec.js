import MockDate from 'mockdate'
import { Store } from 'vuex-mock-store'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import { formatISO } from 'date-fns'
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
    index: {
      startTrayTimer: jest.fn(),
      stopTrayTimer: jest.fn(),
      on: {
        suspend: () => {},
        shutdown: () => {},
        unlockScreen: () => {},
        clickDuplicate: () => {},
        logout: () => {},
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
      expect(global.electron.index.startTrayTimer).toHaveBeenCalledWith(
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
      expect(global.electron.index.stopTrayTimer).toHaveBeenCalled()
    })
  })
})
