'use strict';

import { session, ipcMain, BrowserWindow } from 'electron';
import { persist } from './persistor';
import store from '../store';

function clearLocalStorage() {
  return new Promise(resolve => {
    session.defaultSession.clearStorageData(
      { storages: ['localstorage'] },
      () => resolve()
    );
  });
}

function findAccessTokenByUrl(url) {
  const regexp = `^${store.getters['auth/getWebUrl']}/.*?access_token=([^&]*)`;
  const matched = url.match(new RegExp(regexp));
  return matched && matched[1];
}

function toBase64(value) {
  return Buffer.from(value).toString('base64');
}

export async function showAuthentication(event) {
  await clearLocalStorage();

  const browser = new BrowserWindow({ width: 400, height: 550 });
  browser.loadURL(store.getters['auth/getAuthorizeUrl']);

  browser.webContents.on('did-navigate-in-page', (_, url) => {
    const accessToken = findAccessTokenByUrl(url);
    if (accessToken) {
      persist(toBase64(store.getters['auth/getApiUrl']));
      store.dispatch('auth/storeAccessToken', accessToken);
      event.sender.send('authenticated');
      browser.close();
    }
  });
}

ipcMain.on('showAuthentication', event => showAuthentication(event));
