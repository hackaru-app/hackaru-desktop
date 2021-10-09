import { shallowMount } from '@vue/test-utils'
import testId from '../../../../__helpers__/test-id'
import PowerMonitor from '~/pages/settings/power-monitor'

describe('PowerMonitor', () => {
  let factory
  let wrapper

  global.electron = {
    settings: {
      getStopTimerOnSuspend: () => false,
      getStopTimerOnShutdown: () => false,
      getRemindTimerOnUnlocked: () => false,
      setStopTimerOnSuspend: jest.fn(),
      setStopTimerOnShutdown: jest.fn(),
      setRemindTimerOnUnlocked: jest.fn(),
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
      expect(
        global.electron.settings.setStopTimerOnSuspend
      ).toHaveBeenCalledWith(true)
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
      expect(
        global.electron.settings.setStopTimerOnShutdown
      ).toHaveBeenCalledWith(true)
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

    it('toggles remindTimerOnUnlocking', () => {
      expect(
        global.electron.settings.setRemindTimerOnUnlocked
      ).toHaveBeenCalledWith(true)
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
