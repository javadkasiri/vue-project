<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin" novalidate>
      <!-- فیلد ایمیل -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="text"
          id="email"
          v-model="email"
          autocomplete="email"
          required
        />
      </div>

      <!-- فیلد رمز عبور -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="password"
          autocomplete="current-password"
          required
        />
        <div class="show-password">
          <label for="showPassword">Show the password</label>
          <input type="checkbox" id="showPassword" v-model="showPassword" />
        </div>
      </div>

      <p v-if="loginError" class="error-message">
        The email or password is incorrect.
      </p>

      <!-- دکمه لاگین -->
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { auth } from '../utils/auth';

export default {
  name: "LoginPage",
  data() {
    return {
      email: "", // ایمیل وارد شده توسط کاربر
      password: "", // رمز عبور وارد شده
      showPassword: false, // نمایش یا پنهان‌کردن رمز عبور
      loginError: false, // وضعیت خطای ورود
    };
  },
  watch: {
    // اگر کاربر ایمیل را اصلاح کرد، پیام خطا پاک شود
    email() {
      if (this.loginError) this.loginError = false;
    },
    // اگر کاربر رمز را اصلاح کرد، پیام خطا پاک شود
    password() {
      if (this.loginError) this.loginError = false;
    },
  },
  methods: {
    async handleLogin() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailPattern.test(this.email);

      // اگر ایمیل معتبر نیست، فقط پیام خطا رو فعال کن (بدون alert)
      if (!isEmailValid) {
        this.loginError = true;
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // مهم برای ارسال/دریافت کوکی
          body: JSON.stringify({
            username: this.email,
            password: this.password,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("token", data.token);
          auth.isLoggedIn = true;
          this.$router.push("/dashboard");
        } else {
          this.loginError = true;
        }
      } catch (err) {
        console.error("Server error:", err);
        this.loginError = true;
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 10px;
  background-color: #fafafa;
}

h2 {
  text-align: center;
  color: #087944;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #2c3e50;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #087944;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #0a7141;
}

.error-message {
  color: red;
  margin-top: 5px;
  font-size: 13px;
  text-align: left;
}

.show-password {
  margin-top: 8px;
  font-size: 13px;
  display: inline-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  color: #333;
  white-space: nowrap;
}

.show-password input[type="checkbox"] {
  vertical-align: middle;
  transform: translateX(-4px) translateY(-3px);
}
</style>
