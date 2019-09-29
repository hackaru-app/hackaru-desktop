import Vue from 'vue';
import App from './app';
import './plugins';
import VueI18n from 'vue-i18n';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

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
