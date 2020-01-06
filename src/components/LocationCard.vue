<template>
  <ul id="display">
    <li v-for="location in locations" v-bind:key="location.location_id">
      <h1>{{location.city}}</h1>
      <img :src="location.image_url" alt />
      <h2>{{location.country}}</h2>
      <h3>{{ location.continent}}</h3>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["locations"]
};
</script>

<style lang="scss" scoped>
</style>