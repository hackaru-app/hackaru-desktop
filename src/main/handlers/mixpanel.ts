import * as Mixpanel from 'mixpanel'
import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { MixpanelClient } from '~/modules/mixpanel-client'
import { config } from '~/config'

const prefix = createPrefixer('mixpanel')
const mixpanelClient = new MixpanelClient()

handle(
  prefix('sendEvent'),
  (_event, name: string, props: Mixpanel.Callback) => {
    mixpanelClient.track(name, props)
  }
)

handle(prefix('setUserId'), (_event, userId: string) => {
  mixpanelClient.setUserId(userId)
})

handle(prefix('removeUserId'), () => {
  mixpanelClient.removeUserId()
})

handle(prefix('syncConfig'), () => {
  mixpanelClient.syncConfig()
})
