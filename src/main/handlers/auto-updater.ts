import { app } from 'electron'
import { autoUpdater } from 'electron-updater'

app.on('ready', () => {
  if (process.env.AUTO_UPDATE === 'true') {
    autoUpdater.checkForUpdatesAndNotify()
  }
})
