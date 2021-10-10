import { shallowMount } from '@vue/test-utils'
import testId from '../../../../__helpers__/test-id'
import PowerMonitor from '~/pages/settings/power-monitor'

describe('PowerMonitor', () => {
  let factory
  let wrapper

  global.electron = {
    config: {
      get: () => false,
      set: jest.fn(),
    },
    mixpanel: { sendEvent: jest.fn() },
  }

  beforeEach(() => {
    factory = () => shallowMount(PowerMonitor)
  })

  describe('when click suspend', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('suspend')).trigger('click')
    })

    it('toggles suspend', () => {
      expect(global.electron.config.set).toHaveBeenCalledWith(
        'stopTimerOnSuspend',
        true
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
        'Toggle suspend',
        {
          component: 'power-monitor',
          enabled: true,
        }
      )
    })
  })

  describe('when click shutdown', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('shutdown')).trigger('click')
    })

    it('toggles shutdown', () => {
      expect(global.electron.config.set).toHaveBeenCalledWith(
        'stopTimerOnShutdown',
        true
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
        'Toggle shutdown',
        {
          component: 'power-monitor',
          enabled: true,
        }
      )
    })
  })

  describe('when click remindTimerOnUnlocking', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('remind-timer-on-unlocking')).trigger('click')
    })

    it('toggles remindTimerOnUnlocked', () => {
      expect(global.electron.config.set).toHaveBeenCalledWith(
        'remindTimerOnUnlocked',
        true
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
        'Toggle remindTimerOnUnlocking',
        {
          component: 'power-monitor',
          enabled: true,
        }
      )
    })
  })
})
