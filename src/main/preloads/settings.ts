import { bridge } from '~/core/preloads'
import { googleAnalytics } from '~/preloads/common/google-analytics'
import { mixpanel } from '~/preloads/common/mixpanel'
import { config } from '~/preloads/common/config'

bridge({
  googleAnalytics,
  mixpanel,
  config,
})
