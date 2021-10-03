import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { store } from '~/modules/store'

const namespace = 'settings'
const prefix = createPrefixer(namespace)

handle(prefix('getConfig'), (_event, key: string) => {
  return store.get(key)
})

handle(prefix('setConfig'), (_event, key: string, value: string) => {
  store.set(key, value)
})
