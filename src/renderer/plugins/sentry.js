import Vue from 'vue'
import * as Sentry from '@sentry/electron/dist/renderer'
import { Vue as VueIntegration } from '@sentry/integrations'

export default ({ $config }, inject) => {
  Sentry.init({
    dsn: $config.sentryDsn,
    release: $config.sentryRelease,
    debug: process.env.NODE_ENV !== 'production',
    integrations: [
      new VueIntegration({
        Vue,
        attachProps: true,
        tracingOptions: {
          trackComponents: true,
        },
      }),
    ],
  })

  inject('sentry', Sentry)
}
