export default async function ({ app, store }) {
  await store.dispatch('auth/restoreAccessToken')

  if (store.getters['auth/loggedIn']) {
    await store.dispatch('user/fetch')
    electron.setUserId(store.getters['user/id'])
  } else {
    await app.router.replace(app.localePath('auth'))
    window.location.reload()
  }
}
