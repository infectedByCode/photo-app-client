<template>
  <main id="auth">
    <form @submit="
        e => {
          loginUser(e, email, password);
        }
      ">
      <h1 class="logo">Share your trips</h1>

      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>

      <button>Login</button>
      <p class="error">{{ errLogin }}</p>
      <router-link v-if="errLogin.length" to="/signup">Not already registered? Click here</router-link>
    </form>
  </main>
</template>

<script>
import { loginUser } from "../auth";

export default {
  name: "Auth",
  data() {
    return {
      // Errors
      errLogin: "",
      // Inputs
      email: "",
      password: ""
    };
  },
  methods: {
    loginUser
  }
};
</script>

<style scoped>
@import "../assets/styles/auth.css";
</style>
