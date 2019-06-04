'use strict';

import { app, powerMonitor } from 'electron';
import psList from 'ps-list';
import store from '../renderer/store';

app.on('ready', () => {
  let processTimer;

  function startProcessTimer() {
    clearInterval(processTimer);
    processTimer = setInterval(async () => {
      const processes = await psList();
      store.dispatch('processes/update', processes);
      store.dispatch('trackers/update');
    }, 1000);
  }

  powerMonitor.on('resume', () => {
    startProcessTimer();
  });

  powerMonitor.on('suspend', () => {
    clearInterval(processTimer);
    if (store.getters['trackers/stopTrackingOnSuspend']) {
      store.dispatch('trackers/stopAll');
    }
  });

  powerMonitor.on('shutdown', e => {
    clearInterval(processTimer);
    e.preventDefault();
    if (store.getters['trackers/stopTrackingOnShutdown']) {
      store.dispatch('trackers/stopAll');
    }
    app.quit();
  });

  startProcessTimer();
});
