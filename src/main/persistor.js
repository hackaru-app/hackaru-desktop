import createPersistedState from 'vuex-persistedstate';
import { ipcMain } from 'electron';
import Storage from 'electron-store';
import store from '../renderer/store';

const storage = new Storage({
  name: 'vuex-v1'
});

export function persist(key) {
  createPersistedState({
    key,
    paths: [
      'auth.uid',
      'auth.secret',
      'auth.webUrl',
      'auth.apiUrl',
      'entities.data.trackers',
      'activites.stopOnSuspend',
      'activites.stopOnShutdown'
    ],
    storage: {
      getItem: key => storage.get(key),
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key)
    }
  })(store);
  storage.set('current', key);
}

export function logout() {
  storage.delete('current');
}

function restoreState() {
  const key = storage.get('current');
  if (!key) return;
  persist(key);
}

restoreState();

ipcMain.on('logout', () => logout());
