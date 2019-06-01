'use strict';

import { app, powerMonitor } from 'electron';
import psList from 'ps-list';
import store from '../store';

app.on('ready', () => {
  let processTimer;

  function startProcessTimer() {
    clearInterval(processTimer);
    processTimer = setInterval(async () => {
      if (!store.getters['auth/isLoggedIn']) return;
      await store.dispatch('processes/updateProccesses', await psList());
      await store.dispatch('trackers/updateTrackings');
    }, 1000);
  }

  powerMonitor.on('suspend', async () => {
    clearInterval(processTimer);
    if (!store.getters['auth/isLoggedIn']) return;
    if (store.getters['config/getConfig'].powerMonitor.suspend) {
      await store.dispatch('trackers/stopAllTrackings');
    }
  });

  powerMonitor.on('resume', async () => {
    startProcessTimer();
  });

  powerMonitor.on('shutdown', async e => {
    e.preventDefault();
    clearInterval(processTimer);
    if (!store.getters['auth/isLoggedIn']) return;
    if (store.getters['config/getConfig'].powerMonitor.shutdown) {
      await store.dispatch('trackers/stopAllTrackings');
    }
    app.quit();
  });

  startProcessTimer();
});
