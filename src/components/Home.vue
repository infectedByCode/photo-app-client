<template>
  <main id="home">
    <section id="jumbotron">
      <h1>trippr</h1>
      <h2>Travel. Enjoy. Share.</h2>

      <router-link class="btn-primary" @click.native="setLoading" v-if="!loggedIn" to="/login">Login</router-link>
      <router-link
        @click.native="setLoading"
        v-if="!loggedIn"
        to="/signup"
      >Not a member? Sign up here.</router-link>
    </section>
  </main>
</template>

<script>
import { auth } from "../firebaseConfig";

export default {
  name: "Home",
  data() {
    return {
      loggedIn: Boolean(auth.currentUser)
    };
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.isLoading = false;
    }, 100);
  },
  methods: {
    setLoading: function() {
      this.$store.state.isLoading = true;
    }
  }
};
</script>

<style scoped>
@import "../assets/styles/home.css";
</style>
