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
    authorize: jest.fn(),
    showMenubar: jest.fn(),
    sendGaEvent: jest.fn(),
    sendMixpanelEvent: jest.fn(),
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
      expect(global.electron.authorize).toHaveBeenCalled()
    })

    it('sends ga event', () => {
      expect(global.electron.sendGaEvent).toHaveBeenCalledWith(
        'Accounts',
        'login'
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith('Login', {
        component: 'auth',
      })
    })

    it('redirects to index', () => {
      expect($router.replace).toHaveBeenCalledWith('/en/index')
    })

    it('shows menubar', () => {
      expect(global.electron.showMenubar).toHaveBeenCalled()
    })
  })
})
