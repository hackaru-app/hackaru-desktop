import * as Sentry from '@sentry/electron/dist/renderer'
import { contextBridge, ipcRenderer } from 'electron'
import { initSentry } from '~/modules/init-sentry'

initSentry(Sentry)

contextBridge.exposeInMainWorld('electron', {
  authorize() {
    return ipcRenderer.invoke('authorize')
  },
  restoreAccessToken() {
    return ipcRenderer.invoke('restoreAccessToken')
  },
  logout() {
    ipcRenderer.invoke('logout')
  },
  openWeb() {
    ipcRenderer.invoke('openWeb')
  },
  quit() {
    ipcRenderer.invoke('quit')
  },
  startTrayTimer(startedAt: string) {
    ipcRenderer.invoke('startTrayTimer', startedAt)
  },
  stopTrayTimer() {
    ipcRenderer.invoke('stopTrayTimer')
  },
  openSettings() {
    ipcRenderer.invoke('openSettings')
  },
  getSuspend() {
    return ipcRenderer.invoke('getConfig', 'powerMonitor.suspend')
  },
  setSuspend(enabled: boolean) {
    ipcRenderer.invoke('setConfig', 'powerMonitor.suspend', !!enabled)
  },
  getShutdown() {
    return ipcRenderer.invoke('getConfig', 'powerMonitor.shutdown')
  },
  setShutdown(enabled: boolean) {
    ipcRenderer.invoke('setConfig', 'powerMonitor.shutdown', !!enabled)
  },
  getRemindTimerOnUnlocking() {
    return ipcRenderer.invoke(
      'getConfig',
      'powerMonitor.remindTimerOnUnlocking'
    )
  },
  setRemindTimerOnUnlocking(enabled: boolean) {
    ipcRenderer.invoke(
      'setConfig',
      'powerMonitor.remindTimerOnUnlocking',
      !!enabled
    )
  },
  showMenubar() {
    ipcRenderer.invoke('showMenubar')
  },
  setUserId(id: number) {
    ipcRenderer.invoke('setUserId', id)
  },
  removeUserId() {
    ipcRenderer.invoke('removeUserId')
  },
  sendGaPageView(path: string) {
    ipcRenderer.invoke('sendGaPageView', path)
  },
  sendGaEvent(category: string, action: string) {
    ipcRenderer.invoke('sendGaEvent', category, action)
  },
  sendMixpanelEvent(event: string, props: {}) {
    ipcRenderer.invoke('sendMixpanelEvent', event, props)
  },
  showReminderNotification(prevDescription: string) {
    ipcRenderer.invoke('showReminderNotification', prevDescription)
  },
  onSuspend(callback: () => void) {
    ipcRenderer.on('suspend', callback)
  },
  onShutdown(callback: () => void) {
    ipcRenderer.on('shutdown', callback)
  },
  onUnlockScreen(callback: () => void) {
    ipcRenderer.on('resume', callback)
  },
  onStartPrevActivity(callback: () => void) {
    ipcRenderer.on('startPrevActivity', callback)
  },
  onShowMenubar(callback: () => void) {
    ipcRenderer.on('showMenubar', callback)
  },
})
