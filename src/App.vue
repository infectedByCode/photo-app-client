<template>
  <div id="app">
    <NavBar></NavBar>
    <Loading v-if="this.$store.state.isLoading"></Loading>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "app",
  components: {
    NavBar,
    Loading
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
