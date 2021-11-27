import * as debug from 'debug'
import { app } from 'electron'
import { createPrefixer } from '~/core/prefixer'
import { handle } from '~/core/handlers'
import { createVisitor } from '~/modules/universal-analytics'

const prefix = createPrefixer('googleAnalytics')
const visitor = createVisitor()

if (process.env.NODE_ENV !== 'production') {
  debug.enable('universal-analytics')
}

app.on('ready', (): void => {
  visitor.set('version', process.env.npm_package_version)
})

handle(prefix('sendPageView'), (_event, path: string) => {
  visitor.pageview(path).send()
})

handle(prefix('sendEvent'), (_event, category: string, action: string) => {
  visitor.event(category, action).send()
})

handle(prefix('setUserId'), (_event, userId: string) => {
  visitor.set('uid', userId)
})

handle(prefix('removeUserId'), () => {
  visitor.set('uid', undefined)
})
