<template>
  <main id="account-page">
    <section id="user-profile">
      <h1>My Account</h1>
      <h2>Welcome back, {{ user.first_name }}</h2>
      <form>
        <h3>Update details</h3>
        <label>
          First Name:
          <input
            type="text"
            :class="{ valid: !errInvalidFirstName && firstName !== '', invalid: errInvalidFirstName }"
            v-model="firstName"
            :placeholder="user.first_name"
            @input="
              e => {
                checkName(e, firstName);
              }
            "
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            :class="{ valid: !errInvalidLastName && lastName !== '', invalid: errInvalidLastName }"
            v-model="lastName"
            :placeholder="user.last_name"
            @input="
              e => {
                checkName(e, lastName);
              }
            "
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            :class="{ valid: !this.errEmail && email !== '', invalid: this.errEmail }"
            v-model="email"
            :placeholder="user.email"
            @input="
              e => {
                checkEmail(e, email);
              }
            "
          />
        </label>
        <button
          class="btn-primary"
          @click="
            e => {
              updateUser(e, this.user.user_id);
            }
          "
        >Update</button>
      </form>
      <p class="error">{{ err || errInvalidFirstName || errInvalidLastName || errEmail }}</p>
    </section>
  </main>
</template>

<script>
import * as api from "../api";
import { checkName, checkEmail } from "../utils/utils";
import { auth } from "../firebaseConfig";

export default {
  name: "Dashboard",
  data() {
    return {
      user: {},
      firstName: "",
      lastName: "",
      email: "",
      // Errors
      err: "",
      errInvalidFirstName: "",
      errInvalidLastName: "",
      errEmail: ""
    };
  },
  methods: {
    checkName,
    checkEmail,
    setLoading: function() {
      this.$store.state.isLoading = true;
    },
    updateUser: function(e, user_id) {
      e.preventDefault();

      const userData = {
        first_name: !this.firstName.length
          ? this.user.first_name
          : this.firstName,
        last_name: !this.lastName.length ? this.user.last_name : this.lastName,
        email: !this.email.length ? this.user.email : this.email
      };

      api
        .updateUserByID(user_id, userData)
        .then(user => {
          this.user = user;
          this.firstName = "";
          this.lastName = "";
          this.email = "";
        })
        .catch(err => {
          if (err) this.err = "Something went wrong, please try again later.";
        });
    }
  },
  created() {
    this.$store.state.isLoading = true;

    const userID = auth.currentUser.uid;

    api
      .getUserByID(userID)
      .then(user => {
        this.user = user;
      })
      .catch(err => {
        if (err) this.err = "Something went wrong, please try again later.";
      });
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.isLoading = false;
    }, 250);
  },

  beforeRouteLeave(to, from, next) {
    this.$store.state.isLoading = true;
    next();
  }
};
</script>

<style scoped>
@import "../assets/styles/dashboard.css";
</style>
