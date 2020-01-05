<template>
  <nav>
    <router-link class="logo" to="/">trippr</router-link>
    <button @click="url = !url" v-if="!url">
      <router-link to="/login" key="login">Login</router-link>
    </button>
    <button @click="url = !url" v-if="url">
      <router-link to="/signup" key="signup">Register</router-link>
    </button>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      url: window.location.pathname === "/login"
    };
  },
  methods: {
    // handleLink:funct
  }
};
</script>

<style scoped>
@import "../assets/styles/main.css";
</style>