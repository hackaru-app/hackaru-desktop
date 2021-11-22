import * as Sentry from '@sentry/electron/dist/renderer'
import { initSentry } from '~/modules/sentry-initializer'
import { listen, bridge } from '~/core/preloads'
import { createPrefixer } from '~/core/prefixer'
import { googleAnalytics } from '~/preloads/common/google-analytics'
import { mixpanel } from '~/preloads/common/mixpanel'

initSentry(Sentry)

const namespace = 'miniTimer'
const prefix = createPrefixer(namespace)

bridge({
  googleAnalytics,
  mixpanel,
  [namespace]: {
    on: {
      start: listen(prefix('start')),
      stop: listen(prefix('stop')),
    },
  },
})
