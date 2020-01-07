import * as api from '../api';

function handleFormSubmit(e) {
  e.preventDefault();

  if (this.review) {
    const current = this.review;

    const review_title = !this.reviewTitle.length ? current.review_title : this.reviewTitle;
    const review_body = !this.reviewBody.length ? current.review_body : this.reviewBody;

    api
      .updateReviewByID(current.review_id, review_title, review_body)
      .then(review => {
        if (review) this.$router.replace('../../locations');
      })
      .catch(err => {
        if (err) this.errDB = 'Something went wrong, please try again.';
      });
  } else {
    const locationRequest = {
      city: this.reviewCity,
      country: this.reviewCountry,
      continent: this.reviewContinent,
      image_url: this.imageURL
    };

    api
      .postLocation(locationRequest)
      .then(location_id => {
        const postRequest = {
          review_title: this.reviewTitle,
          review_body: this.reviewBody,
          image_url: this.imageURL,
          author: this.author,
          location_id: location_id
        };

        api.postReview(postRequest).then(review => {
          if (review) this.$router.push(`../../locations/${review.location_id}`);
        });
      })
      .catch(err => {
        if (err) this.errDB = err;
      });
  }
}

function fetchReviewByID(review_id) {
  api
    .getReviewByID(review_id)
    .then(review => {
      this.review = review;
      this.reviewTitle = review.review_title;
      this.reviewBody = review.review_body;
      this.formStyle = 'review-form-page';
    })
    .catch(err => {
      if (err) this.errDB = 'Something went wrong.';
    });
}

export { handleFormSubmit, fetchReviewByID };
