<template>
  <main id="locations">
    <section>
      <h1>Trip Locations</h1>
      <label>
        Search location:
        <input
          type="text"
          v-model="filterText"
          @input="(e)=> {filterLocation(e, filterText)}"
        />
      </label>
      <LocationCard :locations="filteredLocations || locations"></LocationCard>
    </section>
    <p class="error">{{errDB}}</p>
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
  methods: {
    filterLocation: function(e, filterText) {
      this.filterText = filterText;
      this.filteredLocations = this.locations.filter(location => {
        return (
          location.city.toLowerCase().includes(this.filterText.toLowerCase()) ||
          location.country.toLowerCase().includes(this.filterText.toLowerCase())
        );
      });
    }
  },
  data() {
    return {
      locations: [],
      filteredLocations: this.locations,
      filterText: "",
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
    setTimeout(() => {
      this.$store.state.isLoading = false;
    }, 300);
  }
};
</script>

<style scoped>
@import "../assets/styles/locations.css";
</style>