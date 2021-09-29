import { invoke } from '~/core/preloads'
import { createPrefixer } from '~/core/prefixer'

const namespace = 'sentry'
const prefix = createPrefixer(namespace)

export const sentry = {
  setUserId(userId: string): void {
    invoke(prefix('setUserId'), userId)
  },
  removeUserId(userId: string): void {
    invoke(prefix('removeUserId'), userId)
  },
}
