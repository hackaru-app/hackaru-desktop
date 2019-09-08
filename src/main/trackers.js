import { app, powerMonitor } from 'electron';
import psList from 'ps-list';
import store from '../renderer/store';

app.on('ready', () => {
  let processTimer;

  function startProcessTimer() {
    clearInterval(processTimer);
    processTimer = setInterval(async () => {
      const processes = await psList();
      if (!store.getters['activities/initialized']) return;
      store.dispatch('processes/update', processes);
      store.dispatch('trackers/update');
    }, 1000);
  }

  powerMonitor.on('resume', () => {
    startProcessTimer();
  });

  powerMonitor.on('suspend', () => {
    clearInterval(processTimer);
  });

  powerMonitor.on('shutdown', e => {
    clearInterval(processTimer);
  });

  startProcessTimer();
});
