function setUserId(userId) {
  electron.sentry.setUserId(userId)
  electron.mixpanel.setUserId(userId)
  electron.googleAnalytics.setUserId(userId)
}

export default async function ({ app, store }) {
  await store.dispatch('auth/restoreAccessToken')

  if (store.getters['auth/loggedIn']) {
    await store.dispatch('user/fetch')
    setUserId(store.getters['user/id'])
  } else {
    await app.router.replace(app.localePath('auth'))
    window.location.reload()
  }
}
