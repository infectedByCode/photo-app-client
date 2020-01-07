<template>
  <main id="review-form-page">
    <form id="review-form">
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
        <input type="text" v-model="imageURL" />
      </label>
      <button
        class="btn-primary"
        @click="(e)=> {handleFormSubmit(e)}"
      >{{review ? 'Update' : 'Post'}}</button>
    </form>
  </main>
</template>

<script>
import { checkInputs, checkLocationName } from "../utils/utils";
import { auth } from "../firebaseConfig";
import * as api from "../api";

export default {
  name: "ReviewForm",
  data() {
    return {
      inputRegex: /[^a-z\d.,&'" ]/gi,
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
      errLocation: ""
    };
  },
  methods: {
    checkInputs,
    checkLocationName,
    handleFormSubmit: function(e) {
      e.preventDefault();

      if (this.review) {
        const current = this.review;

        const review_title = !this.reviewTitle.length
          ? current.review_title
          : this.reviewTitle;
        const review_body = !this.reviewBody.length
          ? current.review_body
          : this.reviewBody;

        api
          .updateReviewByID(current.review_id, review_title, review_body)
          .then(review => {
            if (review) this.$router.replace("../../locations");
          })
          .catch(err => {
            if (err) this.errDB = "Something went wrong, please try again.";
          });
      }
    }
  },
  created() {
    const review_id = this.$route.params.review_id;
    if (review_id) {
      api
        .getReviewByID(review_id)
        .then(review => {
          this.review = review;
          this.reviewTitle = review.review_title;
          this.reviewBody = review.review_body;
        })
        .catch(err => {
          if (err) this.errDB = "Something went wrong.";
        });
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