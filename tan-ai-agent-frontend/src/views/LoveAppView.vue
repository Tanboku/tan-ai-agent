<template>
  <ChatRoom
    title="AI 恋爱大师"
    :chat-id="chatId"
    empty-tip="你好！我是恋爱心理专家，有什么情感问题可以跟我聊聊～"
    placeholder="说说你的恋爱困惑..."
    :send-message="sendMessage"
  />
</template>

<script setup>
import { ref } from 'vue'
import ChatRoom from '../components/ChatRoom.vue'
import { chatWithLoveAppSSE } from '../api/ai'

const chatId = ref(generateChatId())

function generateChatId() {
  return crypto.randomUUID().replace(/-/g, '')
}

function sendMessage(message, callbacks) {
  return chatWithLoveAppSSE(message, chatId.value, callbacks)
}
</script>
