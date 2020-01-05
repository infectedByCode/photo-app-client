import { auth } from './firebaseConfig';
import * as api from './api';

function createUser(e, email, password, first_name, last_name, username) {
  e.preventDefault();

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      const uuid = response.user.uid;

      this.$store.state.loggedIn = true;
      this.$store.state.user = uuid;

      return uuid;
    })
    .then(uuid => {
      api.postUser(uuid, email, first_name, last_name, username).then(() => {
        this.$router.push('/');
      });
    })
    .catch(err => err);
}

function loginUser(e, email, password) {
  e.preventDefault();

  auth
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      const uuid = response.user.uid;

      this.$store.state.loggedIn = true;
      this.$store.state.user = uuid;

      this.$router.push('/');
    })
    .catch(err => err);
}

function logoutUser() {
  auth
    .signOut()
    .then(() => {
      this.$router.push('/login');
    })
    .catch(err => err);
}

export { createUser, loginUser, logoutUser };
