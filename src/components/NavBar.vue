<template>
  <nav>
    <router-link class="logo" to="/">trippr</router-link>
    <a class="menu-icon" @click="toggleMenu">menu</a>
    <button class="menu-item" v-if=" !loggedIn">
      <router-link to="/signup" key="signup">Register</router-link>
    </button>
    <button class="menu-item" v-if=" !loggedIn">
      <router-link to="/login" key="login">Login</router-link>
    </button>
    <button class="btn-primary menu-item" @click="logoutUser" v-if="loggedIn">logout</button>
    <router-link class="menu-item" to="/account" v-if="loggedIn">account</router-link>
    <router-link class="menu-item" to="/reviews/post" v-if="loggedIn">add trip</router-link>
    <router-link class="menu-item" to="/locations" v-if="loggedIn">locations</router-link>
  </nav>
</template>

<script>
import { auth } from "../firebaseConfig";
import { logoutUser } from "../auth";
import { checkWindowResize } from "../utils/utils";

export default {
  name: "NavBar",
  data() {
    return {
      loggedIn: Boolean(auth.currentUser)
    };
  },
  methods: {
    logoutUser,
    checkWindowResize,
    toggleMenu: function() {
      const menuItems = document.querySelectorAll(".menu-item");

      menuItems.forEach(item => {
        item.style.display === "none"
          ? (item.style.display = "block")
          : (item.style.display = "none");
      });
    }
  },
  created() {
    window.addEventListener("resize", checkWindowResize);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.state.isLoading = true;
    next();
  },
  destroyed() {
    window.removeEventListener("resize", checkWindowResize);
  }
};
</script>

<style scoped>
@import "../assets/styles/main.css";
</style>
