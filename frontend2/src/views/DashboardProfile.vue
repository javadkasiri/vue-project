<template>
  <div class="profile">
    <h3>User Profile</h3>
    <p><strong>Username:</strong> johndoe</p>
  </div>
</template>

<script>
export default {
  name: 'DashboardProfile'
}
</script>

<style scoped>
.profile {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin: 50px auto 20px auto; /* بالا 50px فاصله دادیم */
  text-align: center;
}

h3 {
  color: #087944;
  margin-bottom: 20px;
}

strong {
  color: #2c3e50;
}
</style>
