export default ({ app }) => {
  app.router.afterEach((_context, to) => {
    electron.sendGaPageView(to.path)
  })
}
