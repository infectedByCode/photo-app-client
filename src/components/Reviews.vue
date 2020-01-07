<template>
  <section id="reviews-list">
    <h4 v-if="!reviews.length">There are currently no reviews for this location.</h4>
    <h4 v-if="reviews.length">Reviews</h4>
    <ul v-if="!errDB">
      <li class="review-card" v-for="review in reviews" v-bind:key="review.review_id">
        <img :src="review.image_url" alt />
        <div>
          <h5>{{review.review_title}}</h5>
          <p>{{review.review_body}}</p>
          <p>Posted by {{review.username}}</p>
          <button
            class="btn-danger"
            v-if="review.author === currentUser"
            @click="(e)=>{deleteReview(e, review.review_id)}"
          >DELETE</button>
          <button
            class="btn-info"
            v-if="review.author === currentUser"
            @click="(e)=> {
              reviewID =review.review_id;
              editReview(e, reviewID)
              }"
          >EDIT</button>
          <p class="error" v-if="errDB">{{errDB}}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import * as api from "../api";
// import { auth } from "../firebaseConfig";

export default {
  name: "Reviews",
  data() {
    return {
      currentUser: "3c9f50cb-da22-4a7d-b105-246b6f14abf4", //auth.currentUser,
      reviews: [],
      reviewID: "",
      errDB: ""
    };
  },
  methods: {
    deleteReview: function(e, review_id) {
      api
        .delteReviewByID(review_id)
        .then(() => {
          const index = this.reviews.findIndex(
            review => review.review_id === review_id
          );
          this.reviews.splice(index, 1);
        })
        .catch(err => {
          if (err) this.errDB = "Something went wrong, please try again";
        });
    },
    editReview(e, review_id) {
      this.$router.push({
        name: "ReviewForm",
        params: { review_id }
      });
    }
  },
  created() {
    const location_id = window.location.pathname.split("/locations/")[1];

    api
      .getReviewsByLocationID(location_id)
      .then(reviews => {
        this.reviews = reviews;
      })
      .catch(err => {
        if (err) this.errDB = "Unable to fetch data";
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
</style>