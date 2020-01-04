<template>
  <main id="auth">
    <form>
      <h1 class="logo">
        Register with
        trippr
      </h1>
      <label>
        First Name:
        <input
          type="text"
          :class="{'valid': !errInvalidFirstName && firstName !== '', 'invalid' : errInvalidFirstName}"
          v-model="firstName"
          @input="(e)=> {checkName(e, firstName)}"
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          :class="{'valid': !errInvalidLastName && lastName !== '', 'invalid' : errInvalidLastName}"
          v-model="lastName"
          @input="(e)=> {checkName(e, lastName)}"
          required
        />
      </label>
      <label>
        Username:
        <input
          type="text"
          :class="{'valid': !errInvalidUsername && !errTakenUsername && username !== '', 'invalid' : errInvalidUsername || errTakenUsername}"
          v-model="username"
          @input="(e)=> {checkUsername(e, username)}"
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          :class="{'valid': !this.errEmail && email !== '', 'invalid' : this.errEmail}"
          v-model="email"
          @input="(e)=>{checkEmail(e, email)}"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          :class="{'valid': !this.errPassword && password !== '', 'invalid' : this.errPassword}"
          v-model="password"
          @input="(e)=>{checkPasswords(e, password, confirmPassword)}"
          required
        />
      </label>
      <label>
        Confirm password:
        <input
          type="password"
          :class="{'valid': !this.errPassword && password !== '', 'invalid' : this.errPassword}"
          v-model="confirmPassword"
          @input="(e)=>{checkPasswords(e, password, confirmPassword)}"
          required
        />
      </label>
      <button>Register!</button>
      <p
        class="error"
      >{{errInvalidFirstName || errInvalidLastName || errInvalidUsername|| errTakenUsername || errEmail || errPassword}}</p>
    </form>
  </main>
</template>

<script>
import * as api from "../api";
import {
  checkName,
  checkUsername,
  checkEmail,
  checkPasswords
} from "../utils/utils";

export default {
  name: "Auth",
  data() {
    return {
      users: [],
      // Errors
      errInvalidUsername: "",
      errTakenUsername: "",
      errInvalidFirstName: "",
      errInvalidLastName: "",
      errEmail: "",
      errPassword: "",
      // Inputs
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    checkName,
    checkUsername,
    checkEmail,
    checkPasswords
  },
  created() {
    api.getAllUsers().then(users => {
      this.users = users;
    });
  },
  updated() {}
};
</script>

<style scoped>
@import "../assets/styles/auth.css";
</style>

