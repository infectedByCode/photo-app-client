import { auth } from './firebaseConfig';
import * as api from './api';

function createUser(e, email, password, first_name, last_name, username) {
  e.preventDefault();

  this.$store.state.isLoading = true;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      const uuid = response.user.uid;

      api.postUser(uuid, email, first_name, last_name, username).then(() => {
        this.$router.push('/account');
        this.$router.go();

        return uuid;
      });
    })
    .catch(err => {
      this.$store.state.isLoading = false;
      if (err === 'auth/email-already-in-use') this.errRegister = 'Email has already be registered.';
      if (err === 'auth/invalid-email') this.errRegister = 'Email is not valid.';
      if (err === 'auth/weak-password') this.errRegister = 'Your password is too weak.';
      else this.errRegister = 'Something went wrong. Please try again.';
    });
}

function loginUser(e, email, password) {
  e.preventDefault();

  this.$store.state.isLoading = true;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      if (response) {
        this.$router.push('/locations');
        this.$router.go();
      }
    })
    .catch(err => {
      this.$store.state.isLoading = false;
      if (err) this.errLogin = 'Something has gone wrong. Check your username and password';
    });
}

function logoutUser() {
  this.$store.state.isLoading = true;

  auth
    .signOut()
    .then(() => {
      this.$router.push('/');
    })
    .catch(err => err);
}

export { createUser, loginUser, logoutUser };
