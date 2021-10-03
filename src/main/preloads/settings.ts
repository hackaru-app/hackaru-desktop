import { invoke, bridge } from '~/core/preloads'
import { createPrefixer } from '~/core/prefixer'
import { googleAnalytics } from '~/preloads/common/google-analytics'
import { mixpanel } from '~/preloads/common/mixpanel'

const namespace = 'settings'
const prefix = createPrefixer(namespace)

bridge({
  googleAnalytics,
  mixpanel,
  [namespace]: {
    setSuspend(enabled: boolean): void {
      invoke(prefix('setConfig'), 'powerMonitor.suspend', enabled)
    },
    setShutdown(enabled: boolean): void {
      invoke(prefix('setConfig'), 'powerMonitor.shutdown', enabled)
    },
    setRemindTimerOnUnlocking(enabled: boolean): void {
      invoke(
        prefix('setConfig'),
        'powerMonitor.remindTimerOnUnlocking',
        enabled
      )
    },
    getSuspend(): Promise<boolean> {
      return invoke(prefix('getConfig'), 'powerMonitor.suspend')
    },
    getShutdown(): Promise<boolean> {
      return invoke(prefix('getConfig'), 'powerMonitor.shutdown')
    },
    getRemindTimerOnUnlocking(): Promise<boolean> {
      return invoke(prefix('getConfig'), 'powerMonitor.remindTimerOnUnlocking')
    },
  },
})
