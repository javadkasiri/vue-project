<template>
  <div class="management">
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: currentTab === tab }"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="tab-content">
      <ManagementWall v-if="currentTab === 'Wall'" />
      <ManagementEvent v-if="currentTab === 'Event'" />
      <ManagementProblems v-if="currentTab === 'Problems'" />
      <ManagementProject v-if="currentTab === 'Project'" />
      <ManagementStaff v-if="currentTab === 'Staff'" />
    </div>
  </div>
</template>



<script>
import ManagementWall from "@/components/management/ManagementWall.vue"
import ManagementEvent from "@/components/management/ManagementEvent.vue"
import ManagementProblems from "@/components/management/ManagementProblems.vue"
import ManagementProject from "@/components/management/ManagementProject.vue"
import ManagementStaff from "@/components/management/ManagementStaff.vue"

export default {
  components: {
    ManagementWall,
    ManagementEvent,
    ManagementProblems,
    ManagementProject,
    ManagementStaff
  },
  data() {
    return {
      tabs: ['Wall', 'Event', 'Problems', 'Project', 'Staff'],
      currentTab: 'Wall'
    };
  }
}
</script>

<style scoped>
.management {
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tabs button {
  background: none;
  border: none;
  padding: 10px 30px;
  font-weight: bold;
  cursor: pointer;
  color: #555;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
    font-size: 15px;
}

.tabs button.active {
  color: black;
  border-color: #087944;
}

.tab-content {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>
