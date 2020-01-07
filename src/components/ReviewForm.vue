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
      <label v-if="!review">
        Country
        <input
          type="text"
          :class="{ valid: !/[^a-z\d ]/gi.test(reviewCity) && reviewCountry !== '' , invalid: /[^a-z\d ]/gi.test(reviewCountry) }"
          v-model="reviewCountry"
          @input="(e)=>{checkLocationName(e, reviewCountry)}"
        />
      </label>
      <label v-if="!review">
        Continent
        <input
          type="text"
          :class="{ valid: !/[^a-z\d ]/gi.test(reviewContinent) && reviewContinent !== '' , invalid: /[^a-z\d ]/gi.test(reviewContinent) }"
          v-model="reviewContinent"
          @input="(e)=>{checkLocationName(e, reviewContinent)}"
        />
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

export default {
  name: "ReviewForm",
  data() {
    return {
      inputRegex: /[^a-z\d.,&'" ]/gi,
      formStyle: "review-form-page-post",
      review: null,
      reviewCity: "",
      reviewCountry: "",
      reviewContinent: "",
      reviewTitle: "",
      reviewBody: "",
      imageURL: "",
      author: auth.currentUser.uid,
      locationID: window.location.pathname.split("locations/")[1],
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