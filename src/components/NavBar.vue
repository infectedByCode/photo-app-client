<template>
  <nav>
    <router-link class="logo" to="/">trippr</router-link>
    <button v-if=" !loggedIn">
      <router-link to="/signup" key="signup">Register</router-link>
    </button>
    <button v-if=" !loggedIn">
      <router-link to="/login" key="login">Login</router-link>
    </button>
    <button class="btn-primary menu-item" @click="logoutUser" v-if="loggedIn">logout</button>
    <router-link class="menu-item" to="/account" v-if="loggedIn">account</router-link>
    <router-link class="menu-item" to="/reviews/post" v-if="loggedIn">add trip</router-link>
    <router-link class="menu-item" to="/locations" v-if="loggedIn">locations</router-link>
  </nav>
</template>

<script>
import { auth } from "../firebaseConfig";
import { logoutUser } from "../auth";

export default {
  name: "NavBar",
  data() {
    return {
      loggedIn: Boolean(auth.currentUser)
    };
  },
  methods: {
    logoutUser
  }
};
</script>

<style scoped>
@import "../assets/styles/main.css";
</style>
