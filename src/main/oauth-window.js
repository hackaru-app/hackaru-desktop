import { session, ipcMain, BrowserWindow } from 'electron';
import { persist } from './persistor';
import menubar from './menubar';
import store from '../renderer/store';

function clearLocalStorage() {
  return new Promise(resolve => {
    session.defaultSession.clearStorageData(
      { storages: ['localstorage'] },
      () => resolve()
    );
  });
}

function findAccessTokenByUrl(url) {
  const regexp = `^${store.getters['auth/webUrl']}/.*?access_token=([^&]*)`;
  const matched = url.match(new RegExp(regexp));
  return matched && matched[1];
}

export async function showAuthentication(event) {
  await clearLocalStorage();

  const browser = new BrowserWindow({ width: 400, height: 650 });
  browser.loadURL(store.getters['auth/authorizeUrl']);

  browser.webContents.on('did-navigate-in-page', (_, url) => {
    const accessToken = findAccessTokenByUrl(url);
    if (accessToken) {
      persist(store.getters['auth/persistKey']);
      store.dispatch('auth/storeAccessToken', accessToken);
      event.sender.send('authenticated');
      menubar.showWindow();
      browser.close();
    }
  });
}

ipcMain.on('showAuthentication', event => showAuthentication(event));
