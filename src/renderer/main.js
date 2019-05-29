import Vue from 'vue';
import VueTimers from 'vue-timers';
import axios from 'axios';
import App from './App';
import router from './router';
import i18n from './i18n';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

// If you add an import, you also need to update whiteListedModules.
// https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
Vue.use(VueTimers);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<app/>',
  i18n
}).$mount('#app');
