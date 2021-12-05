import { app } from 'electron'
import { config } from '~/config'

async function syncEnabled() {
  app.setLoginItemSettings({
    openAtLogin: config.get('openAtLogin'),
  })
}

app.on('ready', syncEnabled)

config.onDidChange('openAtLogin', syncEnabled)
