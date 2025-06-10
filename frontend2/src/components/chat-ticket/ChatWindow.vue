<template>
  <div class="chat-window">
    <div class="messages-container">
      <ChatMessages />
    </div>
    <div class="input-container">
      <ChatInput />
    </div>
  </div>
</template>
<script>
import ChatMessages from "./chatwindow/ChatMessages.vue";
import ChatInput from "./chatwindow/ChatInput.vue";

export default {
  name: "ChatWindow",
  components: {
    ChatMessages,
    ChatInput,
  },
};
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%; /* برای اینکه بتونه کل فضا رو بگیره */
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
}

.input-container {
  flex-shrink: 0;
}
</style>
