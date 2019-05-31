import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './assets/locales/store.json';
import { app } from 'electron';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
});

if (process.type === 'renderer') {
  i18n.locale = navigator.language;
} else {
  app.on('ready', () => {
    i18n.locale = app.getLocale();
  });
}

export default i18n;
