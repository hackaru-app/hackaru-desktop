import { invoke } from '~/core/preloads'
import { createPrefixer } from '~/core/prefixer'

const namespace = 'mixpanel'
const prefix = createPrefixer(namespace)

export const mixpanel = {
  sendEvent(event: string, props: Record<string, unknown>): void {
    invoke(prefix('sendEvent'), event, props)
  },
  setUserId(userId: string): void {
    invoke(prefix('setUserId'), userId)
  },
  removeUserId(): void {
    invoke(prefix('removeUserId'))
  },
}
