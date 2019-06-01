import createPersistedState from 'vuex-persistedstate';
import Storage from 'electron-store';

export default (options = {}) => store => {
  if (process.type === 'renderer') return;

  const storage = new Storage({
    name: 'vuex'
  });

  createPersistedState({
    ...options,
    storage: {
      getItem: key => storage.get(key),
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key)
    }
  })(store);
};
