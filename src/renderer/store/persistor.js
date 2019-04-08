import { ipcMain, ipcRenderer } from 'electron'
import createPersistedState from 'vuex-persistedstate'
import Storage from 'electron-store'

const RESTORE_STATE = 'persistor-restore-state'

export default (options = {}) => store => {
  function renderer () {
    const state = ipcRenderer.sendSync(RESTORE_STATE)
    store.replaceState(state)
  }

  function main () {
    ipcMain.on(RESTORE_STATE, event => {
      event.returnValue = store.state
    })

    const storage = new Storage({
      name: 'vuex'
    })
    return createPersistedState({
      ...options,
      storage: {
        getItem: key => storage.get(key),
        setItem: (key, value) => storage.set(key, value),
        removeItem: key => storage.delete(key)
      }
    })(store)
  }

  return process.type === 'renderer'
    ? renderer()
    : main()
}
