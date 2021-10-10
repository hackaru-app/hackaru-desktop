import * as Sentry from '@sentry/electron/dist/renderer'
import { initSentry } from '~/modules/sentry-initializer'
import { bridge } from '~/core/preloads'
import { googleAnalytics } from '~/preloads/common/google-analytics'
import { mixpanel } from '~/preloads/common/mixpanel'
import { config } from '~/preloads/common/config'

initSentry(Sentry)

bridge({
  googleAnalytics,
  mixpanel,
  config,
})
