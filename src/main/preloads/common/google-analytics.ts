import { invoke } from '~/core/preloads'
import { createPrefixer } from '~/core/prefixer'

const namespace = 'googleAnalytics'
const prefix = createPrefixer(namespace)

export const googleAnalytics = {
  sendPageView(path: string): void {
    invoke(prefix('sendPageView'), path)
  },
  sendEvent(category: string, action: string): void {
    invoke(prefix('sendEvent'), category, action)
  },
  setUserId(userId: string): void {
    invoke(prefix('setUserId'), userId)
  },
  removeUserId(): void {
    invoke(prefix('removeUserId'))
  },
}
