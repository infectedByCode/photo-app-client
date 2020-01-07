<template>
  <main :id="formStyle">
    <form id="review-form" @submit="(e)=> {handleFormSubmit(e)}">
      <h1>{{review ? 'Update Review' : 'Create Review'}}</h1>
      <p class="error" v-if="errDB || errInput || errLocation">{{errDB || errLocation || errInput}}</p>
      <label v-if="!review">
        City
        <input
          type="text"
          :class="{ valid: !/[^a-z\d ]/gi.test(reviewCity) && reviewCity !== '' , invalid: /[^a-z\d ]/gi.test(reviewCity) }"
          v-model="reviewCity"
          @input="(e)=>{checkLocationName(e, reviewCity)}"
        />
      </label>
      <label>
        Country
        <select class="valid" v-model="reviewCountry" v-if="!review">
          <option
            v-for="country in countries"
            v-bind:key="country"
            v-bind:value="country"
          >{{country}}</option>
        </select>
      </label>
      <label>
        Continent
        <select v-model="reviewContinent" v-if="!review">
          <option
            class="valid"
            v-for="continent in continents"
            v-bind:key="continent"
            v-bind:value="continent"
          >{{continent}}</option>
        </select>
      </label>
      <label>
        Title
        <input
          type="text"
          :class="{ valid: !/[^a-z\d.,&' ]/gi.test(reviewTitle) && reviewTitle !== '' , invalid: /[^a-z\d.,&' ]/gi.test(reviewTitle)}"
          v-model="reviewTitle"
          @input="(e)=>{checkInputs(e, reviewTitle)}"
        />
      </label>
      <label>
        Body
        <textarea
          :class="{ valid: !inputRegex.test(reviewBody) && reviewBody !== '' , invalid: inputRegex.test(reviewBody)}"
          v-model="reviewBody"
          @input="(e)=>{checkInputs(e, reviewBody)}"
        ></textarea>
      </label>
      <label v-if="!review">
        Image
        <input
          type="text"
          :class="{ valid:! errURL && imageURL !== '' , invalid: errURL}"
          v-model="imageURL"
          @input="(e)=>{checkURL(e, imageURL)}"
        />
      </label>
      <button class="btn-primary">{{review ? 'Update' : 'Post'}}</button>
    </form>
  </main>
</template>

<script>
import { checkInputs, checkLocationName, checkURL } from "../utils/utils";
import { handleFormSubmit, fetchReviewByID } from "../utils/db_methods";
import { auth } from "../firebaseConfig";
import * as api from "../api";

export default {
  name: "ReviewForm",
  data() {
    return {
      inputRegex: /[^a-z\d.,&'" ]/gi,
      formStyle: "review-form-page-post",
      // Country for dropdowns
      countries: [],
      continents: [
        "Africa",
        "Antarctica",
        "Asia",
        "Europe",
        "Oceania",
        "North America",
        "South America"
      ],
      // Inputs
      review: null,
      reviewCity: "",
      reviewCountry: "",
      reviewContinent: "",
      reviewTitle: "",
      reviewBody: "",
      imageURL: "",
      author: auth.currentUser.uid,
      locationID: window.location.pathname.split("locations/")[1],
      // Errors
      errDB: "",
      errInput: "",
      errLocation: "",
      errURL: ""
    };
  },
  methods: {
    checkInputs,
    checkLocationName,
    checkURL,
    handleFormSubmit,
    fetchReviewByID
  },
  created() {
    const review_id = this.$route.params.review_id;
    if (review_id) {
      this.fetchReviewByID(review_id);
    }

    api
      .getCountryData()
      .then(countriesArray => {
        countriesArray.forEach(country => {
          this.countries.push(country.name);
        });
      })
      .catch(err => {
        if (err) this.errDB = "Unable to fetch country data";
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
@import "../assets/styles/forms.css";
</style>