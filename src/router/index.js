import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Home from '@/components/Home';
import Signup from '@/components/Signup';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import Locations from '@/components/Locations';
import Location from '@/components/Location';
import NotFound from '@/components/NotFound';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/account',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/locations',
      name: 'Locations',
      component: Locations,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/locations/:location_id',
      name: 'Location',
      component: Location,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (currentUser) {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
