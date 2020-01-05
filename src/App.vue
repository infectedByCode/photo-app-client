<template>
  <div id="app">
    <router-view></router-view>
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
