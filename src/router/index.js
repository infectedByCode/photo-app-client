// import Vue from 'vue';
// import Router from 'vue-router';
// import Home from '@/components/Home.vue';
// import Signup from '@/components/Signup.vue';

// Vue.use(Router);

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: '/signup',
//       name: 'Signup',
//       component: Signup
//     }
//     // {
//     // path: '/login',
//     // name: 'Auth',
//     // component: Auth
//     // }
//   ]
// });

import Vue from 'vue';
import Router from 'vue-router';
// import firebase from 'firebase';

import Signup from '@/components/Signup';
import Home from '@/components/Home';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
