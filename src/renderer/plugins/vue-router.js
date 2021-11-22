export default ({ app }) => {
  app.router.afterEach((_context, to) => {
    electron.googleAnalytics.sendPageView(to.path)
    electron.mixpanel.sendEvent('View page', {
      path: to.path,
    })
  })
}
