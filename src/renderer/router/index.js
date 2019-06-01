import Vue from 'vue';
import Router from 'vue-router';
import store from '../../store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/pages/index').default
    },
    {
      path: '/auth',
      name: 'auth',
      component: require('@/pages/auth').default
    },
    {
      path: '/activity-editor',
      name: 'activity-editor',
      component: require('@/pages/activity-editor').default
    },
    {
      path: '/settings/power-monitor',
      name: 'power-monitor',
      component: require('@/pages/settings/power-monitor').default
    },
    {
      path: '/settings/trackers',
      name: 'trackers',
      component: require('@/pages/settings/trackers').default
    },
    {
      path: '/settings/tracker-editor',
      name: 'tracker-editor',
      component: require('@/pages/settings/tracker-editor').default
    },
    {
      path: '/settings/licenses',
      name: 'licenses',
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
  if (!accessToken && to.path !== '/auth') {
    next('/auth');
  } else {
    next();
  }
});

export default router;
