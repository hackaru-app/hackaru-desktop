function buildCspContent(contents) {
  return Object.keys(contents)
    .reduce((result, key) => {
      return [...result, `${key} ${contents[key].join(' ')}`]
    }, [])
    .join('; ')
}

module.exports = {
  ssr: false,
  telemetry: false,
  target: 'static',
  server: {
    port: 7865,
  },
  head: {
    title: 'hackaru-desktop',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        'http-equiv': 'Content-Security-Policy',
        content: buildCspContent({
          'connect-src': [
            process.env.HACKARU_API_URL,
            'https://www.google-analytics.com',
            "'self'",
          ],
          'font-src': ['https://fonts.gstatic.com'],
          'style-src': [
            'https://fonts.googleapis.com',
            "'unsafe-inline'",
            "'self'",
          ],
          'script-src': [
            'https://www.google-analytics.com',
            "'unsafe-inline'",
            "'self'",
          ],
          'img-src': ['https://www.google-analytics.com', 'data:', "'self'"],
          'object-src': ["'none'"],
          'default-src': ["'self'"],
        }),
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400',
      },
    ],
  },
  css: ['ress', '~/assets/scss/main.scss'],
  plugins: [
    { src: '~/plugins/v-tooltip' },
    { src: '~/plugins/vue-timers' },
    { src: '~/plugins/vue-router' },
    { src: '~/plugins/vue-js-modal' },
    { src: '~/plugins/sentry' },
    { src: '~/plugins/api' },
  ],
  publicRuntimeConfig: {
    sentryDsn: process.env.SENTRY_DSN,
    sentryRelease: process.env.npm_package_version,
    hackaruApiTimeout: process.env.HACKARU_API_TIMEOUT,
    axios: {
      browserBaseURL: process.env.HACKARU_API_URL,
    },
  },
  components: true,
  styleResources: {
    scss: ['~/assets/scss/modules/*.scss'],
  },
  buildModules: ['@nuxtjs/style-resources'],
  modules: ['@nuxtjs/axios', 'nuxt-i18n'],
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'en',
    vueI18nLoader: true,
    detectBrowserLanguage: {
      useCookie: false,
    },
  },
  axios: {
    progress: false,
    debug: process.env.NODE_ENV !== 'production',
  },
  googleAnalytics: {
    debug: {
      enabled: process.env.NODE_ENV !== 'production',
      sendHitTask: process.env.NODE_ENV === 'production',
    },
    autoTracking: {
      transformQueryString: false,
      pageviewTemplate(route) {
        return {
          page: route.path,
          title: document.title,
          location: undefined,
        }
      },
    },
  },
  router: {
    mode: 'hash',
  },
  build: {
    hardSource: process.env.NODE_ENV !== 'production',
    extend(config, { isDev }) {
      config.externals = {
        electron: 'commonjs electron',
      }
      if (!isDev) {
        config.output.publicPath = './_nuxt/'
        config.devtool = 'hidden-source-map'
      } else {
        config.devtool = 'source-map'
      }
    },
  },
  generate: {
    dir: '../../dist/renderer',
  },
}
