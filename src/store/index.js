import Vue from 'vue';
import Vuex from 'vuex';
import { createSharedMutations } from 'vuex-electron';
import createPersistor from './plugins/persistor';
import createSharedState from './plugins/shared-state';
import createPromiseAction from './plugins/promise-action';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistor(),
    createSharedState(),
    createSharedMutations(),
    createPromiseAction()
  ],
  strict: process.env.NODE_ENV !== 'production'
});
