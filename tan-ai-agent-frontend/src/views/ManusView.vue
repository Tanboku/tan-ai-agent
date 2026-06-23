<template>
  <ChatRoom
    title="AI 超级智能体"
    empty-tip="你好！我是 TanManus，可以帮你完成各种复杂任务，请告诉我你的需求～"
    placeholder="描述你想完成的任务..."
    :send-message="sendMessage"
  />
</template>

<script setup>
import ChatRoom from '../components/ChatRoom.vue'
import { chatWithManusSSE } from '../api/ai'

function sendMessage(message, callbacks) {
  return chatWithManusSSE(message, callbacks)
}
</script>
