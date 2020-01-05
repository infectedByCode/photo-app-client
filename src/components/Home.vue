<template>
  <main id="home">
    <section id="jumbotron">
      <h1>trippr</h1>
      <h2>Travel. Enjoy. Share.</h2>

      <router-link class="btn-primary" to="/login">Login</router-link>
      <router-link to="/signup">Not a member? Sign up here.</router-link>
    </section>
  </main>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
@import "../assets/styles/home.css";
</style>
