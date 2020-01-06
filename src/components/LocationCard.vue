<template>
  <ul id="display">
    <router-link
      v-for="location in locations"
      v-bind:key="location.location_id"
      :to="{ name: 'Location', params: { location_id: location.location_id }}"
    >
      <h1>{{location.city}}</h1>
      <img :src="location.image_url" alt />
      <h2>{{location.country}}</h2>
      <h3>{{ location.continent}}</h3>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "LocationCard",
  props: ["locations"]
};
</script>

<style scoped>
</style>