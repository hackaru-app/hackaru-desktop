import * as Sentry from '@sentry/electron/dist/renderer'
import { initSentry } from '~/modules/sentry-initializer'
import { invoke, listen, bridge } from '~/core/preloads'
import { createPrefixer } from '~/core/prefixer'
import { googleAnalytics } from '~/preloads/common/google-analytics'
import { mixpanel } from '~/preloads/common/mixpanel'
import { auth } from '~/preloads/common/auth'
import { sentry } from '~/preloads/common/sentry'

initSentry(Sentry)

const namespace = 'main'
const prefix = createPrefixer(namespace)

bridge({
  auth,
  sentry,
  googleAnalytics,
  mixpanel,
  [namespace]: {
    logout(): void {
      invoke(prefix('logout'))
    },
    openWeb(): void {
      invoke(prefix('openWeb'))
    },
    quit(): void {
      invoke(prefix('quit'))
    },
    show(): void {
      invoke(prefix('show'))
    },
    startTrayTimer(startedAt: string): void {
      invoke(prefix('startTrayTimer'), startedAt)
    },
    stopTrayTimer(): void {
      invoke(prefix('stopTrayTimer'))
    },
    startMiniTimer(startedAt: string): void {
      invoke(prefix('startMiniTimer'), startedAt)
    },
    stopMiniTimer(): void {
      invoke(prefix('stopMiniTimer'))
    },
    openSettings(): void {
      invoke(prefix('openSettings'))
    },
    showReminder(prevDescription: string): void {
      invoke(prefix('showReminder'), prevDescription)
    },
    on: {
      suspend: listen(prefix('suspend')),
      shutdown: listen(prefix('shutdown')),
      unlockScreen: listen(prefix('unlockScreen')),
      clickDuplicate: listen(prefix('clickDuplicate')),
      show: listen(prefix('show')),
      focus: listen(prefix('focus')),
    },
  },
})
