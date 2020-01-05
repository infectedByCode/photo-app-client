<template>
  <main id="auth">
    <form
      @submit="
        e => {
          loginUser(e, email, password);
        }
      "
    >
      <h1 class="logo">
        Share your trips
      </h1>

      <label>
        Email:
        <input
          type="email"
          :class="{ valid: !this.errEmail && email !== '', invalid: this.errEmail }"
          v-model="email"
          @input="
            e => {
              checkEmail(e, email);
            }
          "
          required
        />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>

      <button>Login</button>
      <p class="error">
        {{ errEmail }}
      </p>
    </form>
  </main>
</template>

<script>
import { checkEmail } from '../utils/utils';
import { loginUser } from '../auth';

export default {
  name: 'Auth',
  data() {
    return {
      // Errors
      errEmail: '',
      // Inputs
      email: '',
      password: ''
    };
  },
  methods: {
    checkEmail,
    loginUser
  }
};
</script>

<style scoped>
@import '../assets/styles/auth.css';
</style>
