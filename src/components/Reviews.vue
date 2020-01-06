<template>
  <section id="reviews-list">
    <h4 v-if="!reviews.length">There are currently no reviews for this location.</h4>
    <h4 v-if="reviews.length">Reviews</h4>
    <ul v-if="!errDB">
      <li class="review-card" v-for="review in reviews" v-bind:key="review.review_id">
        <img :src="review.image_url" alt />
        <div>
          <h1>{{review.review_title}}</h1>
          <p>{{review.review_body}}</p>
        </div>
      </li>
    </ul>
    <p v-if="errDB" font-size="40em">{{errDB}}</p>
  </section>
</template>

<script>
import * as api from "../api";

export default {
  name: "Reviews",
  data() {
    return {
      reviews: [],
      errDB: ""
    };
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
    this.$store.state.isLoading = false;
  }
};
</script>

<style scoped>
</style>