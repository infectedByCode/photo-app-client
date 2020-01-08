const axios = require('axios');

// DB
const baseURL = 'https://idol-photo-app.herokuapp.com/api';

exports.getAllUsers = async () => {
  const {
    data: { userData }
  } = await axios.get(`${baseURL}/users?limit=9999`);
  const { users } = userData;

  return users;
};

exports.postUser = async (user_id, email, first_name, last_name, username) => {
  const { data } = await axios.post(`${baseURL}/auth/signup`, { user_id, email, first_name, last_name, username });
  return data;
};

exports.getUserByID = async user_id => {
  const {
    data: { user }
  } = await axios.get(`${baseURL}/users/${user_id}`);
  return user;
};

exports.updateUserByID = async (user_id, userData) => {
  const {
    data: { user }
  } = await axios.patch(`${baseURL}/users/${user_id}`, userData);

  return user;
};

exports.getAllLocations = async () => {
  const {
    data: { locations }
  } = await axios.get(`${baseURL}/locations`);
  return locations;
};

exports.postLocation = async locationData => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { data } = await axios.post(`${baseURL}/locations`, locationData, axiosConfig);

  return data.location.location_id;
};

exports.getLocationByID = async location_id => {
  const {
    data: { location }
  } = await axios.get(`${baseURL}/locations/${location_id}`);

  return location;
};

exports.getReviewsByLocationID = async location_id => {
  const {
    data: { reviews }
  } = await axios.get(`${baseURL}/locations/${location_id}/reviews`);

  return reviews;
};

exports.delteReviewByID = async review_id => {
  return axios.delete(`${baseURL}/reviews/${review_id}`);
};

exports.postReview = async postRequest => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const {
    data: { review }
  } = await axios.post('https://idol-photo-app.herokuapp.com/api/reviews/', postRequest, axiosConfig);

  return review;
};

exports.getReviewByID = async review_id => {
  const {
    data: { review }
  } = await axios.get(`${baseURL}/reviews/${review_id}`);
  return review;
};

exports.updateReviewByID = async (review_id, review_title, review_body) => {
  const {
    data: { review }
  } = await axios.patch(`${baseURL}/reviews/${review_id}`, { review_title, review_body });

  return review;
};

// OpenWeather API
exports.getWeatherByLocation = async city => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NODE_ENV.WEATHER}`;

  const { data } = await axios.get(URL);

  return data;
};

// restcountries api
exports.getCountryData = async () => {
  const { data } = await axios.get('https://restcountries.eu/rest/v2/all');

  return data;
};
