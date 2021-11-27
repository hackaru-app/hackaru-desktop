import { app, screen, shell, powerMonitor, BrowserWindow, Tray } from 'electron'
import { parseISO } from 'date-fns'
import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { initDevtools } from '~/modules/devtools'
import * as TrayTimer from '~/modules/tray-timer'
import { createMainWindow } from '~/windows/main'
import { createSettingsWindow } from '~/windows/settings'
import { createReminder } from '~/modules/reminder'
import { config } from '~/config'
import { getTrayIcon } from '~/modules/tray-icon'
import {
  createMiniTimerWindow,
  updateMiniTimerWindowPosition,
} from '~/windows/mini-timer'

const prefix = createPrefixer('main')
const miniTimerPrefix = createPrefixer('miniTimer')

let appExiting = false
let tray: Tray | undefined
let mainWindow: BrowserWindow | undefined
let miniTimerWindow: BrowserWindow | undefined

app.on('ready', () => {
  mainWindow = createMainWindow()

  mainWindow.on('close', (e) => {
    if (appExiting) return
    e.preventDefault()
    mainWindow?.hide()
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

  mainWindow.on('show', () => {
    mainWindow?.setAlwaysOnTop(config.get('alwaysOnTop'))
  })

  mainWindow.on('focus', () => {
    mainWindow?.webContents.send(prefix('focus'))
  })
})

app.on('ready', () => {
  miniTimerWindow = createMiniTimerWindow()

  if (config.get('showMiniTimer')) {
    miniTimerWindow.show()
  }

  miniTimerWindow.on('close', (e) => {
    if (appExiting) return
    e.preventDefault()
  })

  screen.on('display-metrics-changed', () => {
    updateMiniTimerWindowPosition()
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

config.onDidChange('alwaysOnTop', () => {
  mainWindow?.setAlwaysOnTop(config.get('alwaysOnTop'))
})

config.onDidChange('showMiniTimer', () => {
  config.get('showMiniTimer')
    ? miniTimerWindow?.show()
    : miniTimerWindow?.hide()
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
    setTimeout(() => mainWindow?.webContents.send(prefix('unlockScreen')), 5000)
  }
})

handle(prefix('openSettings'), () => {
  createSettingsWindow().show()
})

handle(prefix('openWeb'), () => {
  shell.openExternal(process.env.HACKARU_WEB_URL)
})

handle(prefix('quit'), () => {
  appExiting = true
  app.quit()
})

handle(prefix('startTrayTimer'), (_event, startedAt: string) => {
  if (tray) TrayTimer.start(tray, parseISO(startedAt))
})

handle(prefix('stopTrayTimer'), () => {
  if (tray) TrayTimer.stop(tray)
})

handle(prefix('startMiniTimer'), (_event, startedAt: string) => {
  miniTimerWindow?.webContents.send(miniTimerPrefix('start'), startedAt)
})

handle(prefix('stopMiniTimer'), () => {
  miniTimerWindow?.webContents.send(miniTimerPrefix('stop'))
})

handle(prefix('show'), () => {
  mainWindow?.setAlwaysOnTop(true)
  mainWindow?.show()
  mainWindow?.setAlwaysOnTop(config.get('alwaysOnTop'))
})

handle(prefix('showReminder'), (_event, prevDescription: string) => {
  const reminder = createReminder(prevDescription)
  reminder.show()
  reminder.on('click', () => mainWindow?.show())
  reminder.on('action', () => {
    mainWindow?.show()
    mainWindow?.webContents.send(prefix('clickDuplicate'))
  })
})
