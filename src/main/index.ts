import {
  app,
  ipcMain,
  shell,
  powerMonitor,
  session,
  BrowserWindow,
} from 'electron'
import { autoUpdater } from 'electron-updater'
import * as debug from 'debug'
import * as Sentry from '@sentry/electron/dist/main'
import {
  storeAccessToken,
  restoreAccessToken,
  removeAccessToken,
} from '~/modules/access-token'
import { createStore } from '~/modules/store'
import { initDevtools } from '~/modules/devtools'
import { authorize } from '~/modules/oauth'
import { startTrayTimer } from '~/modules/tray-timer'
import { createMenubar } from '~/windows/menubar'
import { createSettingsWindow } from '~/windows/settings'
import { isWindowHostname } from '~/modules/window-url'
import { createVisitor } from '~/modules/universal-analytics'
import { createReminderNotification } from '~/modules/reminder-notification'
import { initI18next } from '~/modules/i18next'
import { initSentry } from '~/modules/init-sentry'
import { MixPanel } from '~/modules/mixpanel'

if (process.env.NODE_ENV !== 'production') {
  debug.enable('universal-analytics')
}

let trayTimer: NodeJS.Timeout
let settingsWindow: BrowserWindow | undefined

initSentry(Sentry)

const store = createStore()
const menubar = createMenubar()
const visitor = createVisitor()
const mixpanel = new MixPanel(process.env.MIXPANEL_PROJECT_TOKEN)

app.requestSingleInstanceLock()

menubar.on('after-create-window', async () => {
  menubar.showWindow()

  if (process.env.NODE_ENV !== 'production') {
    await initDevtools()
    menubar.window?.webContents.openDevTools({ mode: 'detach' })
  }
})

menubar.on('show', () => {
  menubar.window?.webContents.send('showMenubar')
})

menubar.on('after-create-window', () => {
  if (process.platform === 'darwin') {
    app.dock.hide()
  }
})

app.on('ready', () => {
  visitor.set('version', process.env.npm_package_version)
  initI18next()
  autoUpdater.checkForUpdatesAndNotify()
})

app.on('ready', () => {
  session.defaultSession.setPermissionRequestHandler(
    (_webContents, _permission, send) => {
      send(false)
    }
  )
})

app.on('web-contents-created', (_event, contents) => {
  contents.on('will-navigate', (event, url) => {
    if (!isWindowHostname(url)) {
      event.preventDefault()
    }
  })
  contents.on('new-window', (event, url) => {
    if (!isWindowHostname(url)) {
      event.preventDefault()
    }
  })
})

ipcMain.handle('startTrayTimer', (_event, startedAt) => {
  clearInterval(trayTimer)
  trayTimer = startTrayTimer(menubar.tray, startedAt)
})

ipcMain.handle('stopTrayTimer', () => {
  clearInterval(trayTimer)
  menubar.tray.setTitle('')
})

ipcMain.handle('quit', () => {
  app.quit()
})

ipcMain.handle('authorize', async () => {
  const accessToken = await authorize()
  storeAccessToken(accessToken)
})

ipcMain.handle('restoreAccessToken', () => {
  return restoreAccessToken()
})

ipcMain.handle('logout', () => {
  removeAccessToken()
  settingsWindow?.close()
})

ipcMain.handle('openWeb', () => {
  shell.openExternal(process.env.HACKARU_WEB_URL)
})

ipcMain.handle('getConfig', (_event, key) => {
  return store.get(key)
})

ipcMain.handle('setConfig', (_event, key, value) => {
  store.set(key, value)
})

ipcMain.handle('setUserId', (_event, id) => {
  visitor.set('uid', id)
  Sentry.setUser({ id })
  mixpanel.setUserId(id)
})

ipcMain.handle('removeUserId', () => {
  visitor.set('uid', undefined)
  Sentry.setUser(null)
  mixpanel.removeUserId()
})

ipcMain.handle('sendMixpanelEvent', (_event, name, props) => {
  mixpanel.track(name, props)
})

ipcMain.handle('sendGaPageView', (_event, path) => {
  visitor.pageview(path).send()
})

ipcMain.handle('sendGaEvent', (_event, category, action) => {
  visitor.event(category, action).send()
})

ipcMain.handle('openSettings', () => {
  if (!settingsWindow) {
    settingsWindow = createSettingsWindow()
    settingsWindow.on('closed', () => (settingsWindow = undefined))
  } else {
    settingsWindow.show()
  }
})

ipcMain.handle('showReminderNotification', (_event, prevDescription) => {
  setTimeout(() => {
    const notification = createReminderNotification(prevDescription)
    notification.show()
    notification.on('click', () => menubar.showWindow())
    notification.on('action', () => {
      menubar.showWindow()
      menubar.window?.webContents.send('startPrevActivity')
    })
  }, 5000)
})

ipcMain.handle('showMenubar', () => {
  menubar.window?.setAlwaysOnTop(true)
  menubar?.showWindow()
  menubar.window?.setAlwaysOnTop(false)
})

powerMonitor.on('suspend', () => {
  if (store.get('powerMonitor.suspend')) {
    menubar.window?.webContents.send('suspend')
  }
})

powerMonitor.on('shutdown', () => {
  if (store.get('powerMonitor.shutdown')) {
    menubar.window?.webContents.send('shutdown')
  }
})

powerMonitor.on('unlock-screen', () => {
  if (store.get('powerMonitor.remindTimerOnUnlocking')) {
    menubar.window?.webContents.send('resume')
  }
})
