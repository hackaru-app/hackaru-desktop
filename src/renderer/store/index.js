import Vue from 'vue'
import Vuex from 'vuex'

import { createSharedMutations } from 'vuex-electron'
import createPersitor from './persistor'
import createPromiseAction from './promise-action'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersitor({
      paths: [
        'auth.appTokens',
        'auth.apiUrl',
        'config',
        'entities.data.trackers',
        'trackers'
      ]
    }),
    createSharedMutations(),
    createPromiseAction()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
