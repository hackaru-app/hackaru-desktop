import mixpanel from 'mixpanel-browser'

export default ({ app, $config }, inject) => {
  mixpanel.init($config.mixpanelProjectToken)
  mixpanel.set_config({
    debug: process.env.NODE_ENV !== 'production',
  })

  app.router.afterEach((to) =>
    mixpanel.track('View page', {
      path: to.path,
    })
  )

  mixpanel.register({
    repository: 'hackaru-desktop',
    standalone: false,
  })

  inject('mixpanel', mixpanel)
}
