import { shallowMount } from '@vue/test-utils'
import testId from '../../../../__helpers__/test-id'
import PowerMonitor from '~/pages/settings/power-monitor'

describe('PowerMonitor', () => {
  let factory
  let wrapper

  global.electron = {
    getSuspend: () => false,
    getShutdown: () => false,
    setSuspend: jest.fn(),
    setShutdown: jest.fn(),
    sendMixpanelEvent: jest.fn(),
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
      expect(global.electron.setSuspend).toHaveBeenCalledWith(true)
    })

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
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
      expect(global.electron.setShutdown).toHaveBeenCalledWith(true)
    })

    it('sends mixpanel event', () => {
      expect(global.electron.sendMixpanelEvent).toHaveBeenCalledWith(
        'Toggle shutdown',
        {
          component: 'power-monitor',
          enabled: true,
        }
      )
    })
  })
})
