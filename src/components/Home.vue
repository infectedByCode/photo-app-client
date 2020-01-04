<template>
  <main id="home">
    <section id="jumbotron">
      <h1>{{ msg }}</h1>
      <h2>Travel. Enjoy. Share.</h2>
      <button>Login</button>
      <router-link to="/signup">Not a member? Sign up here.</router-link>
    </section>
  </main>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  }
};
</script>

<style scoped>
@import "../assets/styles/home.css";
</style>
