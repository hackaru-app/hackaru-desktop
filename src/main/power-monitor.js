import { app, powerMonitor } from 'electron';
import store from '../renderer/store';

app.on('ready', () => {
  powerMonitor.on('suspend', () => {
    if (store.getters['activities/stopOnSuspend']) {
      store.dispatch('activities/stop');
    }
  });

  powerMonitor.on('shutdown', e => {
    e.preventDefault();
    if (store.getters['activities/stopOnShutdown']) {
      store.dispatch('activities/stop');
    }
    app.quit();
  });
});
