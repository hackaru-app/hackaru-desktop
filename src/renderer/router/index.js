import Vue from 'vue';
import Router from 'vue-router';
import visitor from '../ua';
import store from '../store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: require('@/pages/index').default
    },
    {
      path: '/auth',
      name: 'Auth',
      component: require('@/pages/auth').default
    },
    {
      path: '/settings/power-monitor',
      name: 'PowerMonitor',
      component: require('@/pages/settings/power-monitor').default
    },
    {
      path: '/settings/trackers',
      name: 'Trackers',
      component: require('@/pages/settings/trackers').default
    },
    {
      path: '/settings/tracker-editor',
      name: 'TrackerEditor',
      component: require('@/pages/settings/tracker-editor').default
    },
    {
      path: '/settings/licenses',
      name: 'Licenses',
      component: require('@/pages/settings/licenses').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const accessToken = await store.dispatch('auth/restoreAccessToken');
  return !accessToken && to.path !== '/auth' ? next('/auth') : next();
});

router.afterEach((to, from) => {
  visitor.pageview(to.path, 'http://localhost', to.name).send();
});

export default router;
