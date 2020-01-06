<template>
  <main id="home">
    <section id="jumbotron">
      <h1>trippr</h1>
      <h2>Travel. Enjoy. Yay.</h2>
    </section>
  </main>
</template>

<script>
export default {
  name: "Location",

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
