<template>
  <main id="home">
    <section id="jumbotron">
      <h1>{{ msg }}</h1>
      <h2>Travel. Enjoy. Share.</h2>
      <button>Login</button>
      <a href="#">Not a member? Sign up here.</a>
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
