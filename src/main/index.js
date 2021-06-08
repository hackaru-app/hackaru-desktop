const { app, ipcMain, shell, powerMonitor, session } = require('electron')
const { autoUpdater } = require('electron-updater')
const debug = require('debug')
const {
  storeAccessToken,
  restoreAccessToken,
  removeAccessToken,
} = require('~/modules/access-token')
const { createStore } = require('~/modules/store')
const { initDevtools } = require('~/modules/devtools')
const { authorize } = require('~/modules/oauth')
const { startTrayTimer } = require('~/modules/tray-timer')
const { createMenubar } = require('~/windows/menubar')
const { createSettingsWindow } = require('~/windows/settings')
const { isWindowHostname } = require('~/modules/window-url')
const { initMainSentry } = require('~/modules/sentry')
const { createVisitor } = require('~/modules/universal-analytics')
const Mixpanel = require('~/modules/mixpanel')

if (process.env.NODE_ENV !== 'production') {
  debug.enable('universal-analytics')
}

let trayTimer
let settingsWindow

const Sentry = initMainSentry()
const store = createStore()
const menubar = createMenubar()
const visitor = createVisitor()
const mixpanel = new Mixpanel(process.env.MIXPANEL_PROJECT_TOKEN)

app.requestSingleInstanceLock()

menubar.on('after-create-window', async () => {
  menubar.showWindow()

  if (process.env.NODE_ENV !== 'production') {
    await initDevtools()
    menubar.window.webContents.openDevTools({ mode: 'detach' })
  }
})

menubar.on('show', () => {
  menubar.window.webContents.send('showMenubar')
})

menubar.on('after-create-window', () => {
  if (process.platform === 'darwin') {
    app.dock.hide()
  }
})

app.on('ready', () => {
  visitor.set('version', process.env.npm_package_version)
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

ipcMain.handle('showMenubar', () => {
  menubar.window.setAlwaysOnTop(true)
  menubar.showWindow()
  menubar.window.setAlwaysOnTop(false)
})

powerMonitor.on('suspend', () => {
  if (store.get('powerMonitor.suspend')) {
    menubar.window.webContents.send('suspend')
  }
})

powerMonitor.on('shutdown', () => {
  if (store.get('powerMonitor.shutdown')) {
    menubar.window.webContents.send('shutdown')
  }
})
