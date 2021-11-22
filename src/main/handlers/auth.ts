import { createPrefixer } from '../core/prefixer'
import { handle } from '~/core/handlers'
import { authorize } from '~/modules/oauth'
import {
  storeAccessToken,
  restoreAccessToken,
  removeAccessToken,
} from '~/modules/access-token'

const prefix = createPrefixer('auth')

handle(prefix('restoreAccessToken'), () => {
  return restoreAccessToken()
})

handle(prefix('removeAccessToken'), () => {
  removeAccessToken()
})

handle(prefix('authorize'), async () => {
  const accessToken = await authorize()
  storeAccessToken(accessToken)
})
