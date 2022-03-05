import { ElectronOptions } from '@sentry/electron/dist/common'

interface Sentry {
  init(options: ElectronOptions): void
}

export function initSentry(Sentry: Sentry): void {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.npm_package_version,
    environment: process.env.SENTRY_ENVIRONMENT,
    debug: process.env.NODE_ENV !== 'production',
    enableNative: !!process.env.SENTRY_DSN,
  })
}
