<template>
  <div class="dashboard-layout">
    <SidebarMenu />
    <main class="main-content">
      <h2 v-if="$route.path === '/dashboard'">Welcome to your Dashboard</h2>
      <router-view />
    </main>
  </div>
</template>

<script>
import SidebarMenu from "../components/SidebarMenu.vue";

export default {
  name: "DashboardLayout",
  components: { SidebarMenu },
};
</script>

<style scoped>
.dashboard-layout {
  padding: 0;
  margin: 0;
  display: flex;
  height: 100vh;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0px;
}
.main-content {
  flex: 1;
  padding: 30px;
  background-color: #f5f5f5;
}
h2 {
  flex-grow: 1;
  text-align: center;
  margin: 0;
  color: #2c3e50;
}
</style>
