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

  describe('when click stop-timer-on-suspend', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('stop-timer-on-suspend')).trigger('click')
    })

    it('toggles stopTimerOnSuspend', () => {
      expect(global.electron.config.set).toHaveBeenCalledWith(
        'stopTimerOnSuspend',
        true
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
        'Toggle stopTimerOnSuspend',
        {
          component: 'power-monitor',
          enabled: true,
        }
      )
    })
  })

  describe('when click stop-timer-on-shutdown', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('stop-timer-on-shutdown')).trigger('click')
    })

    it('toggles stopTimerOnShutdown', () => {
      expect(global.electron.config.set).toHaveBeenCalledWith(
        'stopTimerOnShutdown',
        true
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
        'Toggle stopTimerOnShutdown',
        {
          component: 'power-monitor',
          enabled: true,
        }
      )
    })
  })

  describe('when click remind-timer-on-unlocked', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('remind-timer-on-unlocked')).trigger('click')
    })

    it('toggles remindTimerOnUnlocked', () => {
      expect(global.electron.config.set).toHaveBeenCalledWith(
        'remindTimerOnUnlocked',
        true
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
        'Toggle remindTimerOnUnlocked',
        {
          component: 'power-monitor',
          enabled: true,
        }
      )
    })
  })
})
