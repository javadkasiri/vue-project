<template>
  <div class="chat-room">
    <div class="chat-sidebar">
      <ChatSidebar />
    </div>
    <div class="chat-window">
      <ChatWindow />
    </div>
    <div class="chat-details">
      <ChatDetails />
    </div>
  </div>
</template>

<script>
import ChatSidebar from "./ChatSidebar.vue";
import ChatWindow from "./ChatWindow.vue";
import ChatDetails from "./ChatDetails.vue";

export default {
  name: "ChatRoom",
  components: {
    ChatSidebar,
    ChatWindow,
    ChatDetails,
  },
};
</script>

<style scoped>
.chat-room {
  display: flex;
  height: calc(90%); /* حذف چسبندگی پایین */
  margin: 5px;
  background-color: #f0f2f5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
  border-radius: 12px;
  overflow: hidden;
}
/* Sidebar */
.chat-sidebar {
  width: 20%;
  background: #ffffff;
  padding: 20px;
  border-right: 1px solid #ddd;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.03);
  overflow-y: auto;
}

/* Chat content */
.chat-window {
  flex: 1;
  height: 100%;
  padding: 0;
  margin: 0;
}

/* Details panel */
.chat-details {
  width: 20%;
  background: #ffffff;
  padding: 20px;
  border-left: 1px solid #ddd;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.03);
  overflow-y: auto;
}
</style>
