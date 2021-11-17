import { Store } from 'vuex-mock-store'
import { shallowMount } from '@vue/test-utils'
import testId from '../../../../__helpers__/test-id'
import MenuPopover from '~/components/organisms/menu-popover'

describe('MenuPopover', () => {
  let factory
  let wrapper

  delete window.location
  window.location = { reload: jest.fn() }

  const $router = { replace: jest.fn() }
  const $store = new Store()

  global.electron = {
    menubar: {
      openSettings: jest.fn(),
      openWeb: jest.fn(),
      quit: jest.fn(),
    },
    googleAnalytics: { sendEvent: jest.fn(), removeUserId: jest.fn() },
    mixpanel: { sendEvent: jest.fn(), removeUserId: jest.fn() },
    sentry: { removeUserId: jest.fn() },
  }

  beforeEach(() => {
    factory = () =>
      shallowMount(MenuPopover, {
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
      wrapper.find(testId('settings-button')).trigger('click')
    })

    it('opens settings', () => {
      expect(global.electron.menubar.openSettings).toHaveBeenCalled()
    })
  })

  describe('when click web-button', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('web-button')).trigger('click')
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
      wrapper.find(testId('quit-button')).trigger('click')
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
})
