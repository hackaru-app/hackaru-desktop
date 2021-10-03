import { app } from 'electron'
import i18next from 'i18next'

function importAllLocales(): void {
  const context = require.context('~/locales', true, /\.ts$/)
  context.keys().forEach(context)
}

export function initI18next(): void {
  i18next.init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    lng: app.getLocale(),
    resources: {},
  })
  importAllLocales()
}
