import { shallowMount } from '@vue/test-utils'
import testId from '../../../../__helpers__/test-id'
import General from '~/pages/settings/general'

describe('General', () => {
  let factory
  let wrapper

  global.electron = {
    config: {
      get: () => false,
      set: jest.fn(),
    },
    mixpanel: { sendEvent: jest.fn(), syncConfig: jest.fn() },
  }

  beforeEach(() => {
    factory = () => shallowMount(General)
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
          component: 'general',
          enabled: true,
        }
      )
    })

    it('syncs mixpanel config', () => {
      expect(global.electron.mixpanel.syncConfig).toHaveBeenCalled()
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
          component: 'general',
          enabled: true,
        }
      )
    })

    it('syncs mixpanel config', () => {
      expect(global.electron.mixpanel.syncConfig).toHaveBeenCalled()
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
          component: 'general',
          enabled: true,
        }
      )
    })

    it('syncs mixpanel config', () => {
      expect(global.electron.mixpanel.syncConfig).toHaveBeenCalled()
    })
  })

  describe('when click always-on-top', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('always-on-top')).trigger('click')
    })

    it('toggles alwaysOnTop', () => {
      expect(global.electron.config.set).toHaveBeenCalledWith(
        'alwaysOnTop',
        true
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
        'Toggle alwaysOnTop',
        {
          component: 'general',
          enabled: true,
        }
      )
    })

    it('syncs mixpanel config', () => {
      expect(global.electron.mixpanel.syncConfig).toHaveBeenCalled()
    })
  })

  describe('when click show-mini-timer', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('show-mini-timer')).trigger('click')
    })

    it('toggles showMiniTimer', () => {
      expect(global.electron.config.set).toHaveBeenCalledWith(
        'showMiniTimer',
        true
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
        'Toggle showMiniTimer',
        {
          component: 'general',
          enabled: true,
        }
      )
    })

    it('syncs mixpanel config', () => {
      expect(global.electron.mixpanel.syncConfig).toHaveBeenCalled()
    })
  })

  describe('when click enable-auto-launch', () => {
    beforeEach(() => {
      wrapper = factory()
      wrapper.find(testId('enable-auto-launch')).trigger('click')
    })

    it('toggles enableAutoLaunch', () => {
      expect(global.electron.config.set).toHaveBeenCalledWith(
        'enableAutoLaunch',
        true
      )
    })

    it('sends mixpanel event', () => {
      expect(global.electron.mixpanel.sendEvent).toHaveBeenCalledWith(
        'Toggle enableAutoLaunch',
        {
          component: 'general',
          enabled: true,
        }
      )
    })

    it('syncs mixpanel config', () => {
      expect(global.electron.mixpanel.syncConfig).toHaveBeenCalled()
    })
  })
})
