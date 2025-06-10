<template>
  <aside class="sidebar">
    <nav class="menu">
      <router-link to="/dashboard/management">Management</router-link>
      <router-link to="/dashboard/chat-ticket">Chat / Ticket</router-link>
      <router-link to="/dashboard/call-center">Call Center</router-link>
      <router-link to="/dashboard/marketing">Marketing</router-link>
      <router-link to="/dashboard/data-grabber">Data Grabber</router-link>
    </nav>

    <div class="logout-section">
      <LogoutButton />
    </div>
  </aside>
</template>

<script>
import LogoutButton from "@/components/LogoutButton.vue";

export default {
  name: "SidebarMenu",
  components: {
    LogoutButton,
  },
};
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: auto;
  background-color: #087944;
  padding: 50px 15px;
  display: flex;
  flex-direction: column;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: transparent;
}

.menu a {
  color: white;
  font-weight: bold;
  padding: 10px 4px;
  border-radius: 4px;
  background-color: transparent;
  display: block;
  cursor: pointer;
  text-decoration: none !important;
  outline: none;
  border: none;
}
.menu a.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

.logout-section button {
  background-color: yellow;
  color: #087944;
  font-weight: bold;
  border: 2px solid yellow;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  transform: translateY(23px);
}

.logout-section button:hover {
  color: black;
}
</style>
