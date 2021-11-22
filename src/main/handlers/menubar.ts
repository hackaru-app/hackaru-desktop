import { app, shell, powerMonitor } from 'electron'
import { parseISO } from 'date-fns'
import i18next from 'i18next'
import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { initDevtools } from '~/modules/devtools'
import * as TrayTimer from '~/modules/tray-timer'
import { createMenubar } from '~/windows/menubar'
import { createSettingsWindow } from '~/windows/settings'
import { createReminder } from '~/modules/reminder'
import { config } from '~/config'

const namespace = 'menubar'
const prefix = createPrefixer(namespace)
const menubar = createMenubar()

let trayTimer: NodeJS.Timeout | undefined

menubar.on('ready', () => {
  menubar.tray.setToolTip(i18next.t('menubar:tooltip'))
})

menubar.on('after-create-window', () => {
  menubar.showWindow()
})

menubar.on('after-create-window', () => {
  if (process.env.NODE_ENV !== 'production') {
    initDevtools()
  }
})

menubar.on('after-create-window', () => {
  if (process.platform === 'darwin') {
    app.dock.hide()
  }
})

menubar.on('show', () => {
  menubar.window?.webContents.send(prefix('showMenubar'))
})

powerMonitor.on('suspend', () => {
  if (config.get('stopTimerOnSuspend')) {
    menubar.window?.webContents.send(prefix('suspend'))
  }
})

powerMonitor.on('shutdown', () => {
  if (config.get('stopTimerOnShutdown')) {
    menubar.window?.webContents.send(prefix('shutdown'))
  }
})

powerMonitor.on('unlock-screen', () => {
  if (config.get('remindTimerOnUnlocked')) {
    menubar.window?.webContents.send(prefix('unlockScreen'))
  }
})

handle(prefix('openSettings'), () => {
  createSettingsWindow().show()
})

handle(prefix('openWeb'), () => {
  shell.openExternal(process.env.HACKARU_WEB_URL)
})

handle(prefix('quit'), () => {
  app.quit()
})

handle(prefix('startTrayTimer'), (_event, startedAt: string) => {
  if (trayTimer) TrayTimer.stop(menubar.tray, trayTimer)
  trayTimer = TrayTimer.start(menubar.tray, parseISO(startedAt))
})

handle(prefix('stopTrayTimer'), () => {
  if (trayTimer) TrayTimer.stop(menubar.tray, trayTimer)
})

handle(prefix('show'), () => {
  menubar.window?.setAlwaysOnTop(true)
  menubar.showWindow()
  menubar.window?.setAlwaysOnTop(false)
})

handle(prefix('showReminder'), (_event, prevDescription: string) => {
  setTimeout(() => {
    const reminder = createReminder(prevDescription)
    reminder.show()
    reminder.on('click', () => menubar.showWindow())
    reminder.on('action', () => {
      menubar.showWindow()
      menubar.window?.webContents.send(prefix('clickDuplicate'))
    })
  }, 5000)
})