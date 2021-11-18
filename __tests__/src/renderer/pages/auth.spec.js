import { Store } from 'vuex-mock-store'
import { shallowMount } from '@vue/test-utils'
import testId from '../../../__helpers__/test-id'
import Auth from '~/pages/auth'

describe('Auth', () => {
  let factory
  let wrapper

  const $router = { replace: jest.fn() }
  const $store = new Store({})

  global.electron = {
    auth: { authorize: jest.fn() },
    main: { show: jest.fn() },
    googleAnalytics: { sendEvent: jest.fn() },
    mixpanel: { sendEvent: jest.fn() },
  }

  beforeEach(() => {
    $store.reset()
    factory = () =>
      shallowMount(Auth, {
        mocks: {
          $store,
          $router,
        },
      })
  })

  describe('when click auth-button', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('auth-button')).vm.$emit('click')
    })

    it('authorizes user', () => {
      expect(global.electron.auth.authorize).toHaveBeenCalled()
    })

    it('sends ga event', () => {
      expect(global.electron.googleAnalytics.sendEvent).toHaveBeenCalledWith(
        'Accounts',
        'login'
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith('Login', {
        component: 'auth',
      })
    })

    it('redirects to index', () => {
      expect($router.replace).toHaveBeenCalledWith('/en/index')
    })

    it('shows main', () => {
      expect(global.electron.main.show).toHaveBeenCalled()
    })
  })
})
