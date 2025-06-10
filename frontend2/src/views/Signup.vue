<template>
  <div class="signup-form">
    <h2>Signup</h2>
    <form @submit.prevent="handleSignup" novalidate>
      <!-- فیلد ایمیل -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required />
        <!-- پیام خطای فرمت اشتباه ایمیل -->
        <p v-if="emailError" class="error-message">
          The email format is incorrect.
        </p>
        <!-- پیام خطای تکراری بودن ایمیل -->
        <p v-if="duplicateError" class="error-message">
          This email is already in use.
        </p>
      </div>

      <!-- فیلد رمز عبور -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          :type="showPassword ? 'text' : 'password'" 
          id="password"
          v-model="password"
          required
        />
        <!-- پیام خطای نامعتبر بودن رمز -->
        <p v-if="passwordError" class="error-message">
          The password must meet all the listed requirements.
        </p>
        <!-- تیک نمایش رمز -->
        <div class="show-password">
          <label for="showPassword">Show the password</label>
          <input type="checkbox" id="showPassword" v-model="showPassword" />
        </div>
      </div>

      <!-- فیلد تکرار رمز عبور -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
        <!-- پیام خطای عدم تطابق رمز -->
        <p v-if="confirmError" class="error-message">
          Passwords do not match. Please make sure both passwords are identical.
        </p>
      </div>

      <!-- شرایط لازم برای رمز عبور -->
      <ul class="password-rules">
        <li :class="{ valid: passwordRules.minLength }">
          At least 8 characters
        </li>
        <li :class="{ valid: passwordRules.uppercase }">
          At least one uppercase letter
        </li>
        <li :class="{ valid: passwordRules.lowercase }">
          At least one lowercase letter
        </li>
        <li :class="{ valid: passwordRules.number }">At least one number</li>
        <li :class="{ valid: passwordRules.specialCharacter }">
          At least one special character
        </li>
      </ul>

      <!-- دکمه ثبت‌نام -->
      <button type="submit">Register</button>

      <!-- پیام موفقیت‌آمیز بودن ثبت‌نام -->
      <p v-if="successMessage" class="success-message">
        Registration was successful
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      email: "", // مقدار ایمیل وارد شده
      password: "", // مقدار رمز وارد شده
      confirmPassword: "", // مقدار تکرار رمز
      emailError: false, // آیا ایمیل اشتباه است؟
      passwordError: false, // آیا رمز ضعیف است؟
      confirmError: false, // آیا تکرار رمز با رمز اصلی متفاوت است؟
      duplicateError: false, // آیا ایمیل قبلاً استفاده شده؟
      showPassword: false, // نمایش/مخفی کردن رمز
      successMessage: false, // نمایش پیام موفقیت
      submitted: false, // آیا کاربر روی ثبت‌نام کلیک کرده؟
    };
  },
  computed: {
    // بررسی قوانین امنیتی رمز عبور
    passwordRules() {
      return {
        minLength: this.password.length >= 8,
        uppercase: /[A-Z]/.test(this.password),
        lowercase: /[a-z]/.test(this.password),
        number: /[0-9]/.test(this.password),
        specialCharacter: /[^a-zA-Z0-9]/.test(this.password),
      };
    },
    // بررسی اینکه همه قوانین رعایت شده باشند
    isPasswordValid() {
      const r = this.passwordRules;
      return (
        r.minLength &&
        r.uppercase &&
        r.lowercase &&
        r.number &&
        r.specialCharacter
      );
    },
  },
  watch: {
    // وقتی ایمیل تغییر کند و قبلاً ثبت‌نام کلیک شده باشد
    email(value) {
      if (this.submitted) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailError = !emailPattern.test(value);
      }
    },
    // بررسی معتبر بودن رمز هنگام تایپ
    password() {
      if (this.submitted && this.isPasswordValid) {
        this.passwordError = false;
      }
    },
    // بررسی تطابق رمز و تکرار رمز
    confirmPassword() {
      if (this.submitted && this.confirmPassword === this.password) {
        this.confirmError = false;
      }
    },
  },
  methods: {
    // تابع اصلی ثبت‌نام
    async handleSignup() {
      this.submitted = true; // علامت اینکه دکمه ثبت‌نام کلیک شده

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = !emailPattern.test(this.email);
      this.passwordError = !this.isPasswordValid;
      this.confirmError = this.password !== this.confirmPassword;
      this.duplicateError = false;

      console.log("emailError:", this.emailError);
      console.log("passwordError:", this.passwordError);
      console.log("confirmError:", this.confirmError);

      if (this.emailError || this.passwordError || this.confirmError) return;

      try {
        const res = await fetch("http://localhost:3000/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.email,
            password: this.password,
          }),
        });

        if (res.status === 409) {
          this.duplicateError = true;
          return;
        }

        const data = await res.json();

        if (res.ok) {
          this.successMessage = true;
          console.log("Registration success! Redirecting in 2 seconds...");
          setTimeout(() => {
            this.$router.push("/Login");
          }, 2000);
        } else {
          console.error("Signup failed:", data.error || "Unknown error");
        }
      } catch (err) {
        console.error("Network or server error:", err);
      }
    },
  },
};
</script>

<style scoped>
.signup-form {
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
  background-color: #087944;
}

.error-message {
  color: red;
  margin-top: 5px;
  font-size: 13px;
  text-align: left;
}

.password-rules {
  list-style: none;
  padding-left: 0;
  margin-top: -10px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: left;
}

.password-rules li {
  color: gray;
  margin: 4px 0;
}

.password-rules li.valid {
  color: #333;
  font-weight: bold;
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

.success-message {
  color: #087944;
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
}
.signup-form {
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

.password-rules {
  list-style: none;
  padding-left: 0;
  margin-top: -10px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: left;
}

.password-rules li {
  color: gray;
  margin: 4px 0;
}

.password-rules li.valid {
  color: #333;
  font-weight: bold;
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

.success-message {
  color: #087944;
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
}
</style>
