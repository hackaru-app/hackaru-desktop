import { app, shell, powerMonitor } from 'electron'
import { parseISO } from 'date-fns'
import i18next from 'i18next'
import { handle } from '~/core/handlers'
import { createPrefixer } from '~/core/prefixer'
import { initDevtools } from '~/modules/devtools'
import { TrayTimer } from '~/modules/tray-timer'
import { createMenubar } from '~/windows/menubar'
import { createSettingsWindow } from '~/windows/settings'
import { createReminder } from '~/modules/reminder'
import { store } from '~/modules/store'

const namespace = 'menubar'
const prefix = createPrefixer(namespace)

const trayTimer = new TrayTimer()
const menubar = createMenubar()

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
  if (store.get('powerMonitor.suspend')) {
    menubar.window?.webContents.send(prefix('suspend'))
  }
})

powerMonitor.on('shutdown', () => {
  if (store.get('powerMonitor.shutdown')) {
    menubar.window?.webContents.send(prefix('shutdown'))
  }
})

powerMonitor.on('unlock-screen', () => {
  if (store.get('powerMonitor.remindTimerOnUnlocking')) {
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
  trayTimer.start(menubar.tray, parseISO(startedAt))
})

handle(prefix('stopTrayTimer'), () => {
  trayTimer.stop(menubar.tray)
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
