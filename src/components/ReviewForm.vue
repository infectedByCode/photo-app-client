<template>
  <form id="review-form">
    <p class="error" v-if="errDB || errInput">{{errDB || errInput}}</p>
    <label>
      Title:
      <input
        type="text"
        v-model="reviewTitle"
        :placeholder="review.review_title"
        @input="(e)=>{checkInputs(e, reviewTitle)}"
      />
    </label>
    <label>
      Body:
      <textarea
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
import { checkInputs } from "../utils/utils";
import { auth } from "../firebaseConfig";
import * as api from "../api";

export default {
  name: "ReviewForm",
  props: ["review"],
  data() {
    return {
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
            this.review = review;
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