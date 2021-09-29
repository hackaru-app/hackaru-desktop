import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { MixPanel } from '~/modules/mixpanel'

const namespace = 'mixpanel'
const prefix = createPrefixer(namespace)

const mixpanel = new MixPanel(process.env.MIXPANEL_PROJECT_TOKEN)

handle(
  prefix('sendEvent'),
  (_event, name: string, props: Record<string, unknown>) => {
    mixpanel.track(name, props)
  }
)

handle(prefix('setUserId'), (_event, userId: string) => {
  mixpanel.setUserId(userId)
})

handle(prefix('removeUserId'), () => {
  mixpanel.removeUserId()
})
