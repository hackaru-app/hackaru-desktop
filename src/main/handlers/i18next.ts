import { app } from 'electron'
import { initI18next } from '~/modules/i18next'

app.on('ready', () => {
  initI18next()
})
