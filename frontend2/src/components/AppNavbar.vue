<template>
  <nav class="navbar">
    <div class="left">
      <a @click.prevent="goToDashboard" class="logo" style="cursor: pointer">
        <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
      </a>
    </div>

    <div class="right">
      <!-- وقتی لاگین نیست -->
      <template v-if="!isLoggedIn">
        <router-link to="/signup">Signup</router-link>
        <router-link to="/login">Login</router-link>
      </template>

      <!-- وقتی لاگین هست -->
      <template v-else>
        <router-link to="/dashboard/profile">Profile</router-link>
        <router-link to="/dashboard/setting">Settings</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { auth } from "../utils/auth";

export default {
  name: "AppNavbar",
  computed: {
    isLoggedIn() {
      return auth.isLoggedIn;
    },
  },
  methods: {
    logout() {
      fetch("http://localhost:3000/api/logout", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      localStorage.removeItem("token");
      auth.isLoggedIn = false;
      this.$router.push("/login");
    },
    goToDashboard() {
      if (localStorage.getItem("token")) {
        this.$router.push("/dashboard");
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 15px 30px;
  position: sticky;
  top: 0;
  z-index: 1000;
}


.left a,
.right a {
  margin: 0 10px;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 32px;
  width: auto;
  display: block;
  margin-right: 10px;
}
</style>
