<template>
  <div class="setting">
    <h3>Update Account Settings</h3>
    <form @submit.prevent="saveSettings">
      <div class="form-group">
        <label for="username">New Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter new username"
        />
      </div>

      <div class="form-group">
        <label for="password">New Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter new password"
        />
      </div>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "DashboardSetting",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    saveSettings() {
      if (!this.username || !this.password) {
        alert("Please fill out both fields.");
        return;
      }

      // در مرحله بعد می‌تونی اینو به سرور بفرستی
      alert(`Saved:\nUsername: ${this.username}\nPassword: ${this.password}`);
    },
  },
};
</script>

<style scoped>
.setting {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: 50px auto 20px auto;
}

h3 {
  color: #087944;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}

button {
  background-color: #087944;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

button:hover {
  background-color: #0a7141;
}
</style>
