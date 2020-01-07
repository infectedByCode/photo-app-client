<template>
  <form id="review-form">
    <p class="error" v-if="errDB || errInput">{{errDB || errInput}}</p>
    <label>
      Title:
      <input
        type="text"
        :class="{ valid: !/[^a-z\d]/gi.test(reviewCity) && reviewCity !== '' , invalid: /[^a-z\d ]/gi.test(reviewCity) }"
        v-model="reviewCity"
        @input="(e)=>{checkLocationName(e, reviewCity)}"
      />
    </label>
    <label>
      Title:
      <input
        type="text"
        :class="{ valid: !/[^a-z\d]/gi.test(reviewCountry) && reviewCountry !== '' , invalid: /[^a-z\d ]/gi.test(reviewCountry) }"
        v-model="reviewCountry"
        @input="(e)=>{checkLocationName(e, reviewCountry)}"
      />
    </label>
    <label>
      Title:
      <input
        type="text"
        :class="{ valid: !/[^a-z\d]/gi.test(reviewContinent) && reviewContinent !== '' , invalid: /[^a-z\d ]/gi.test(reviewContinent) }"
        v-model="reviewContinent"
        :placeholder="review.review_title"
        @input="(e)=>{checkLocationName(e, reviewContinent)}"
      />
    </label>
    <label>
      Title:
      <input
        type="text"
        :class="{ valid: !/[^a-z\d]/gi.test(reviewTitle) && reviewTitle !== '' , invalid: /[^a-z\d ]/gi.test(reviewTitle) }"
        v-model="reviewTitle"
        :placeholder="review.review_title"
        @input="(e)=>{checkInputs(e, reviewTitle)}"
      />
    </label>
    <label>
      Body:
      <textarea
        :class="{ valid: !/[^a-z\d]/gi.test(reviewBody) && reviewBody !== '' , invalid: /[^a-z\d ]/gi.test(reviewBody) }"
        v-model="reviewBody"
        :placeholder="review.review_body"
        @input="(e)=>{checkInputs(e, reviewBody)}"
      ></textarea>
    </label>
    <label v-if="!review">
      Image:
      <input type="text" v-model="reviewTitle" v-if="!review" />
    </label>
    <button class="btn-primary" @click="(e)=> {handleFormSubmit(e)}">{{review ? 'Update' : 'Post'}}</button>
  </form>
</template>

<script>
import { checkInputs, checkLocationName } from "../utils/utils";
import { auth } from "../firebaseConfig";
import * as api from "../api";

export default {
  name: "ReviewForm",
  props: ["review"],
  data() {
    return {
      reviewCity: "",
      reviewCountry: "",
      reviewContinent: "",
      reviewTitle: "",
      reviewBody: "",
      imageURL: "",
      author: auth.currentUser.uid,
      locationID: window.location.pathname.split("locations/")[1],
      errDB: "",
      errInput: ""
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
            if (review) this.$router.go();
          })
          .catch(err => {
            if (err) this.errDB = "Something went wrong, please try again.";
          });
      }
    }
  }
};
</script>

<style scoped>
</style>