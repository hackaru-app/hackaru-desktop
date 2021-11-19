import { app, shell, powerMonitor, BrowserWindow, Tray, Menu } from 'electron'
import { parseISO } from 'date-fns'
import i18next from 'i18next'
import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { initDevtools } from '~/modules/devtools'
import * as TrayTimer from '~/modules/tray-timer'
import { createMainWindow } from '~/windows/main'
import { createSettingsWindow } from '~/windows/settings'
import { createReminder } from '~/modules/reminder'
import { config } from '~/config'
import { getTrayIcon } from '~/modules/tray-icon'

const namespace = 'main'
const prefix = createPrefixer(namespace)

const appExiting = false
let mainWindow: BrowserWindow | undefined
let tray: Tray | undefined

app.on('ready', () => {
  mainWindow = createMainWindow()

  mainWindow.on('close', (e) => {
    if (appExiting) return
    e.preventDefault()
    mainWindow?.hide()
  })

  mainWindow.on('show', () => {
    mainWindow?.webContents.send(prefix('show'))
    mainWindow?.setAlwaysOnTop(config.get('alwaysOnTop'))
  })

  mainWindow.on('close', () => {
    if (process.platform === 'darwin') {
      app.dock.hide()
    }
  })

  mainWindow.on('show', () => {
    if (process.platform === 'darwin') {
      app.dock.show()
    }
  })

  mainWindow.on('focus', () => {
    mainWindow?.webContents.send(prefix('focus'))
  })
})

app.on('ready', () => {
  if (process.env.NODE_ENV !== 'production') {
    initDevtools()
  }
})

app.on('ready', () => {
  tray = new Tray(getTrayIcon())
  tray.on('click', () => mainWindow?.show())
})

powerMonitor.on('suspend', () => {
  if (config.get('stopTimerOnSuspend')) {
    mainWindow?.webContents.send(prefix('suspend'))
  }
})

powerMonitor.on('shutdown', () => {
  if (config.get('stopTimerOnShutdown')) {
    mainWindow?.webContents.send(prefix('shutdown'))
  }
})

powerMonitor.on('unlock-screen', () => {
  if (config.get('remindTimerOnUnlocked')) {
    mainWindow?.webContents.send(prefix('unlockScreen'))
  }
})

handle(prefix('openSettings'), () => {
  createSettingsWindow().show()
})

handle(prefix('openWeb'), () => {
  shell.openExternal(process.env.HACKARU_WEB_URL)
})

handle(prefix('startTrayTimer'), (_event, startedAt: string) => {
  if (tray) TrayTimer.start(tray, parseISO(startedAt))
})

handle(prefix('stopTrayTimer'), () => {
  if (tray) TrayTimer.stop(tray)
})

handle(prefix('show'), () => {
  mainWindow?.show()
})

handle(prefix('showReminder'), (_event, prevDescription: string) => {
  setTimeout(() => {
    const reminder = createReminder(prevDescription)
    reminder.show()
    reminder.on('click', () => mainWindow?.show())
    reminder.on('action', () => {
      mainWindow?.show()
      mainWindow?.webContents.send(prefix('clickDuplicate'))
    })
  }, 5000)
})
