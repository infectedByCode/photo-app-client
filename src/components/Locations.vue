<template>
  <main id="locations">
    <section>
      <h1>Trip Locations</h1>
      <LocationCard :locations="locations"></LocationCard>
    </section>
    <p class="err">{{errDB}}</p>
  </main>
</template>

<script>
import * as api from "../api";
import LocationCard from "@/components/LocationCard.vue";

export default {
  name: "Locations",
  components: {
    LocationCard
  },
  data() {
    return {
      locations: [],
      errDB: ""
    };
  },
  created() {
    api
      .getAllLocations()
      .then(locations => {
        this.locations = locations;
      })
      .catch(err => {
        if (err) this.errDB = "Something went wrong, please try again.";
      });
  },
  mounted() {
    this.$store.state.isLoading = false;
  }
};
</script>

<style scoped>
@import "../assets/styles/locations.css";
</style>