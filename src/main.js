import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import { auth } from './firebaseConfig';

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(user => {
  if (!app || !user) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
