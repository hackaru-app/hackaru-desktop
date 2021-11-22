import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { config } from '~/config'

const prefix = createPrefixer('config')

handle(prefix('get'), (_event, key: string) => {
  return config.get(key)
})

handle(prefix('set'), (_event, key: string, value: string) => {
  config.set(key, value)
})
