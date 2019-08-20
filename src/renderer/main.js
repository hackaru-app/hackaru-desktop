import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueTimers from 'vue-timers';
import VueElectron from 'vue-electron';
import VTooltip from 'v-tooltip';
import App from './app';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// If you add an import, you also need to update whiteListedModules.
// https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
Vue.use(VueElectron);
Vue.use(VueTimers);
Vue.use(VueI18n);
Vue.use(VTooltip);

new Vue({
  components: { App },
  router,
  store,
  template: '<app/>',
  i18n: new VueI18n({
    locale: navigator.language,
    fallbackLocale: 'en'
  })
}).$mount('#app');
