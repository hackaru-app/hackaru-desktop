import * as Sentry from '@sentry/electron/dist/main'
import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { initSentry } from '~/modules/sentry-initializer'

const prefix = createPrefixer('sentry')

initSentry(Sentry)

handle(prefix('setUserId'), (_event, userId: string) => {
  Sentry.setUser({ id: userId })
})

handle(prefix('removeUserId'), () => {
  Sentry.setUser(null)
})
