<template>
  <div id="app">
    <router-view :msg="msg"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      msg: "trippr"
    };
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
