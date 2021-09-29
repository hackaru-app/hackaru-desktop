import { invoke } from '~/core/preloads'
import { createPrefixer } from '~/core/prefixer'

const namespace = 'auth'
const prefix = createPrefixer(namespace)

export const auth = {
  restoreAccessToken(): Promise<string | null> {
    return invoke(prefix('restoreAccessToken'))
  },
  authorize(): Promise<void> {
    return invoke(prefix('authorize'))
  },
  removeAccessToken(): void {
    invoke(prefix('removeAccessToken'))
  },
}
