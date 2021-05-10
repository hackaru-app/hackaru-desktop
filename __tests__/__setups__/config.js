import { config } from '@vue/test-utils'

config.mocks.$t = () => {}
config.mocks.localePath = (path) => `/en/${path}`
