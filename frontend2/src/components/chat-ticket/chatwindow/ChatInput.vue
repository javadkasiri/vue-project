<template>
  <div class="chat-input">
    <span class="material-symbols-outlined icon">mood</span>
    <input type="text" placeholder="Type a message" v-model="message" />
    <span class="material-symbols-outlined icon">attach_file</span>
    <button class="send-btn" @click="sendMessage">
      <span class="material-symbols-outlined">send</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.message.trim()) {
        console.log("Message sent:", this.message);
        this.message = "";
      }
    },
  },
};
</script>

<style scoped>
.chat-input {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #fff;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #ddd;

  /* چسباندن به اطراف */
  margin: 0;
  border-radius: 0;
}

.chat-input input {
  flex: 1;
  padding: 10px 12px;
  border: none;
  border-radius: 20px;
  background-color: #f1f1f1;
  outline: none;
  font-size: 14px;
  
}

.icon {
  font-size: 20px;
  color: #555;
  cursor: pointer;
}

.send-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  width: 40px;
  height: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.send-btn:hover {
  background-color: #006ae1;
}
.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
  user-select: none;
}
</style>
