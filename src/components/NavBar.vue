<template>
  <nav>
    <router-link class="logo" to="/">trippr</router-link>
    <button @click="url = !url" v-if="!url && !loggedIn">
      <router-link to="/login" key="login">Login</router-link>
    </button>
    <button @click="url = !url" v-if="url && !loggedIn">
      <router-link to="/signup" key="signup">Register</router-link>
    </button>
    <button class="btn-primary" @click="logoutUser" v-if="loggedIn">logout</button>
    <router-link class="menu-item" to="/account" v-if="loggedIn">My Account</router-link>
  </nav>
</template>

<script>
import { auth } from '../firebaseConfig';
import { logoutUser } from '../auth';

export default {
  name: 'NavBar',
  data() {
    return {
      loggedIn: Boolean(auth.currentUser),
      url: window.location.pathname === '/login'
    };
  },
  methods: {
    logoutUser
  }
};
</script>

<style scoped>
@import '../assets/styles/main.css';
</style>
