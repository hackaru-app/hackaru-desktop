function initSentry(Sentry) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.npm_package_version,
    debug: process.env.NODE_ENV !== 'production',
    enableNative: !!process.env.SENTRY_DSN,
  })
  return Sentry
}

module.exports.initMainSentry = function () {
  return initSentry(require('@sentry/electron/dist/main'))
}

module.exports.initRendererSentry = function () {
  return initSentry(require('@sentry/electron/dist/renderer'))
}
