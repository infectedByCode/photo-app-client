<template>
  <main id="location">
    <section v-if="!errDB" id="location-info">
      <div class="location-details">
        <h1>{{location.city}}</h1>
        <img :src="this.location.image_url" alt />
        <h2>{{location.country}}, {{location.continent}}</h2>
      </div>
      <div class="weather-info">
        <h3 v-if="!errWeather">Today's weather in {{location.city}}</h3>
        <img v-if="!errWeather" :src="weatherIcon" alt />
        <p v-if="!errWeather">
          {{weather.description}}
          <br />
          Maximum
          temperature
          of
          {{Math.round(temp.temp_max
          -
          273.15)}}
          Degrees
          Celsius
        </p>
        <p class="link">
          <a target="_blank" href="https://icons8.com/icons/set/rainy-weather">Rainy Weather</a>,
          <a target="_blank" href="https://icons8.com/icons/set/snow-storm">Snow Storm</a> and other icons by
          <a target="_blank" href="https://icons8.com">Icons8</a>
        </p>
        <p v-if="errWeather">{{errWeather}}</p>
      </div>
    </section>
    <Reviews></Reviews>
    <!-- Error display if location not found -->
    <div class="not-found" v-if="errDB">
      <img src="../assets/images/lostpage.jpg" alt="location not found image" />
      <p>{{errDB}}</p>
    </div>
  </main>
</template>

<script>
import * as api from "../api";
import Reviews from "@/components/Reviews.vue";

export default {
  name: "Location",
  components: {
    Reviews
  },
  data() {
    return {
      location: {},
      weather: {},
      temp: {},
      weatherIcon: "",
      errDB: "",
      errWeather: ""
    };
  },
  created() {
    const location_id = window.location.pathname.split("/locations/")[1];

    api
      .getLocationByID(location_id)
      .then(location => {
        this.location = location;

        api
          .getWeatherByLocation(location.city)
          .then(weather => {
            this.weather = weather.weather[0];
            this.temp = weather.main;
            this.weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
          })
          .catch(err => {
            if (err) {
              this.errWeather = "Unable to get weather information.";
            }
          });
      })
      .catch(err => {
        if (err) {
          this.errDB =
            "We're having trouble finding this trip. Please check the URL.";
        }
      });
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.isLoading = false;
    }, 100);
  }
};
</script>

<style scoped>
@import "../assets/styles/location.css";
</style>
