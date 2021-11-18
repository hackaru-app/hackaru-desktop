import i18next from 'i18next'

const namespace = 'main'

i18next.addResourceBundle('en', namespace, {
  open: 'Open the app',
  quit: 'Quit',
})

i18next.addResourceBundle('ja', namespace, {
  open: 'アプリを開く',
  quit: '終了',
})
