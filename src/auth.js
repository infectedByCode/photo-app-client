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
        this.firstName = '';
        this.lastName = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      });
    })
    .catch(err => err);
}

export { createUser };
