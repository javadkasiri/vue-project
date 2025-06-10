<template>
  <button @click="logout">Logout</button>
</template>

<script>
import { auth } from "@/utils/auth";

export default {
  methods: {
    async logout() {
      try {
        const res = await fetch("http://localhost:3000/api/logout", {
          method: "POST",
          credentials: "include", // برای ارسال کوکی
        });
        localStorage.removeItem("token");
        auth.isLoggedIn = false;
        if (res.ok) {
          // هدایت به صفحه لاگین
          this.$router.push("/login");
        } else {
          console.error("Logout failed");
        }
      } catch (err) {
        console.error("Logout error:", err);
      }
    },
  },
};
</script>

