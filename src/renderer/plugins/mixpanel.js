export default ({ app }) => {
  app.router.afterEach((to) =>
    electron.sendMixpanelEvent('View page', {
      path: to.path,
    })
  )
}
