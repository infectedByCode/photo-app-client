const axios = require('axios');

const baseURL = 'https://idol-photo-app.herokuapp.com/api';

exports.getAllUsers = async () => {
  const {
    data: { userData }
  } = await axios.get(`${baseURL}/users?limit=9999`);
  const { users } = userData;

  return users;
};
