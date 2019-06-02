import createPersistedState from 'vuex-persistedstate';
import Storage from 'electron-store';
import store from '../renderer/store';

const storage = new Storage({
  name: 'vuex'
});

export function persist(key) {
  createPersistedState({
    key,
    paths: [
      'auth.appTokens',
      'auth.apiUrl',
      'config',
      'entities.data.trackers',
      'trackers'
    ],
    storage: {
      getItem: key => storage.get(key),
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key)
    }
  })(store);
  storage.set('current', key);
}

function restoreState() {
  const key = storage.get('current');
  if (!key) return;
  persist(key);
  store.dispatch('auth/restoreAccessToken');
}

restoreState();
