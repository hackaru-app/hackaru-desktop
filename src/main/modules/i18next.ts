import { app } from 'electron'
import i18next from 'i18next'

export function initI18next(): void {
  i18next.init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    lng: app.getLocale(),
    resources: {
      en: {
        translation: {
          reminderNotification: {
            title: 'Welcome back! What will you do?',
            description: 'Last time, you were doing "{{prevDescription}}".',
            descriptionWithoutPrev: 'Let me know if you want to start a timer.',
          },
        },
      },
      ja: {
        translation: {
          reminderNotification: {
            title: 'おかえりなさい！何を始めますか？',
            description: '前回は「{{prevDescription}}」を計測していました。',
            descriptionWithoutPrev: '計測を始める際はいつでもお呼びください。',
          },
        },
      },
    },
  })
}
