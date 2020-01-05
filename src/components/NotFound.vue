<template>
  <main id="page404"></main>
</template>

<script>
export default {
  name: "NotFound",
  beforeCreate() {
    this.$store.state.isLoading = true;
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.isLoading = false;
    }, 100);
  }
};
</script>

<style scoped>
@import "../assets/styles/404.css";
</style>
