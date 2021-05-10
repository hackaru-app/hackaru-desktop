import applyCaseMiddleware from 'axios-case-converter'

export function createPlugin({ app, store, $config, $axios }) {
  const api = $axios.create({
    timeout: $config.hackaruApiTimeout,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  applyCaseMiddleware(api, {
    ignoreHeaders: true,
  })

  api.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = store.$i18n.locale
    config.headers.Authorization = `Bearer ${store.getters['auth/accessToken']}`
    return config
  })

  api.interceptors.response.use(undefined, async (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch('auth/logout')
      await app.router.replace(app.localePath('auth'))
      window.location.reload()
    } else {
      store.dispatch('toast/error', error)
      throw error
    }
  })

  return api
}

export default function (context, inject) {
  inject('api', createPlugin(context))
}
