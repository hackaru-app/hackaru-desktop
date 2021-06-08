const { contextBridge, ipcRenderer } = require('electron')
const { initRendererSentry } = require('~/modules/sentry')

initRendererSentry()

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
  startTrayTimer(startedAt) {
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
  setSuspend(enabled) {
    ipcRenderer.invoke('setConfig', 'powerMonitor.suspend', !!enabled)
  },
  getShutdown() {
    return ipcRenderer.invoke('getConfig', 'powerMonitor.shutdown')
  },
  setShutdown(enabled) {
    ipcRenderer.invoke('setConfig', 'powerMonitor.shutdown', !!enabled)
  },
  showMenubar() {
    ipcRenderer.invoke('showMenubar')
  },
  setUserId(id) {
    ipcRenderer.invoke('setUserId', id)
  },
  removeUserId() {
    ipcRenderer.invoke('removeUserId')
  },
  sendGaPageView(path) {
    ipcRenderer.invoke('sendGaPageView', path)
  },
  sendGaEvent(category, action) {
    ipcRenderer.invoke('sendGaEvent', category, action)
  },
  sendMixpanelEvent(event, props) {
    ipcRenderer.invoke('sendMixpanelEvent', event, props)
  },
  onSuspend(callback) {
    ipcRenderer.on('suspend', callback)
  },
  onShutdown(callback) {
    ipcRenderer.on('shutdown', callback)
  },
  onShowMenubar(callback) {
    ipcRenderer.on('showMenubar', callback)
  },
})
