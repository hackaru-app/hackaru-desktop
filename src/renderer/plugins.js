import Vue from 'vue';
import VModal from 'vue-js-modal';
import VueI18n from 'vue-i18n';
import VueTimers from 'vue-timers';
import VueElectron from 'vue-electron';
import VTooltip from 'v-tooltip';

// If you add an import, you also need to update whiteListedModules.
// https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
Vue.use(VueElectron);
Vue.use(VueTimers);
Vue.use(VueI18n);
Vue.use(VTooltip);
Vue.use(VModal, { dialog: true });
