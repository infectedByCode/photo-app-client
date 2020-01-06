const axios = require('axios');

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
