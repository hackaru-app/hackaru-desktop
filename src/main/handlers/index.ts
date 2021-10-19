import { app, shell, powerMonitor, Menu, Tray, BrowserWindow } from 'electron'
import { parseISO } from 'date-fns'
import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { initDevtools } from '~/modules/devtools'
import * as TrayTimer from '~/modules/tray-timer'
import { getTrayIcon } from '~/modules/tray-icon'
import { createIndexWindow } from '~/windows/index'
import { createSettingsWindow } from '~/windows/settings'
import { createReminder } from '~/modules/reminder'
import { config } from '~/config'

const namespace = 'index'
const prefix = createPrefixer(namespace)

let tray: Tray | undefined
let trayTimer: NodeJS.Timeout | undefined
let isAppQuitting = false

let indexWindow: BrowserWindow | undefined
let settingWindow: BrowserWindow | undefined

const contextMenu = Menu.buildFromTemplate([
  { label: 'アプリを開く', click: showIndexWindow },
  { type: 'separator' },
  { label: 'Web版を開く', click: openWeb },
  { label: '設定', click: openSettingsWindow },
  { type: 'separator' },
  { label: 'ログアウト', click: logout },
  { label: '終了', click: app.quit },
])

function showIndexWindow() {
  indexWindow?.show()
}

function openWeb() {
  shell.openExternal(process.env.HACKARU_WEB_URL)
}

function openSettingsWindow() {
  if (!settingWindow) settingWindow = createSettingsWindow()
  settingWindow.show()
}

function logout() {
  indexWindow?.show()
  indexWindow?.webContents.send(prefix('logout'))
}

app.on('before-quit', () => {
  isAppQuitting = true
})

app.on('ready', () => {
  tray = new Tray(getTrayIcon())
  tray.setContextMenu(contextMenu)
})

app.on('ready', () => {
  if (process.platform === 'darwin') {
    app.dock.hide()
  }
})

app.on('ready', () => {
  indexWindow = createIndexWindow()

  indexWindow.on('ready-to-show', () => {
    if (process.env.NODE_ENV !== 'production') {
      initDevtools()
    }
  })

  indexWindow.on('close', (e) => {
    if (!isAppQuitting) {
      e.preventDefault()
      indexWindow?.hide()
    }
  })
})

powerMonitor.on('suspend', () => {
  if (config.get('stopTimerOnSuspend')) {
    indexWindow?.webContents.send(prefix('suspend'))
  }
})

powerMonitor.on('shutdown', () => {
  if (config.get('stopTimerOnShutdown')) {
    indexWindow?.webContents.send(prefix('shutdown'))
  }
})

powerMonitor.on('unlock-screen', () => {
  if (config.get('remindTimerOnUnlocked')) {
    indexWindow?.webContents.send(prefix('unlockScreen'))
  }
})

handle(prefix('startTrayTimer'), (_event, startedAt: string) => {
  if (!tray) return
  if (trayTimer) TrayTimer.stop(tray, trayTimer)
  trayTimer = TrayTimer.start(tray, parseISO(startedAt))
})

handle(prefix('stopTrayTimer'), () => {
  if (tray && trayTimer) TrayTimer.stop(tray, trayTimer)
})

handle(prefix('showReminder'), (_event, prevDescription: string) => {
  setTimeout(() => {
    const reminder = createReminder(prevDescription)
    reminder.show()
    reminder.on('click', () => indexWindow?.show())
    reminder.on('action', () => {
      indexWindow?.show()
      indexWindow?.webContents.send(prefix('clickDuplicate'))
    })
  }, 5000)
})
