<template>
  <div class="chat-room">
    <header class="chat-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <div class="header-info">
        <h1>{{ title }}</h1>
        <p v-if="chatId" class="chat-id">会话 ID：{{ chatId }}</p>
      </div>
    </header>

    <main ref="messageListRef" class="message-list">
      <div v-if="messages.length === 0" class="empty-tip">
        {{ emptyTip }}
      </div>
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="message-row"
        :class="msg.role"
      >
        <div class="avatar">{{ msg.role === 'user' ? '我' : 'AI' }}</div>
        <div class="bubble">
          <p class="content">{{ msg.content }}</p>
          <span v-if="msg.streaming" class="typing-cursor">|</span>
        </div>
      </div>
    </main>

    <footer class="input-area">
      <textarea
        v-model="inputText"
        class="input-box"
        :placeholder="placeholder"
        :disabled="loading"
        rows="2"
        @keydown.enter.exact.prevent="handleSend"
      />
      <button class="send-btn" :disabled="loading || !inputText.trim()" @click="handleSend">
        {{ loading ? '发送中...' : '发送' }}
      </button>
    </footer>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    default: '',
  },
  emptyTip: {
    type: String,
    default: '开始对话吧～',
  },
  placeholder: {
    type: String,
    default: '输入消息，Enter 发送',
  },
  sendMessage: {
    type: Function,
    required: true,
  },
})

const router = useRouter()
const messages = ref([])
const inputText = ref('')
const loading = ref(false)
const messageListRef = ref(null)
let abortController = null
let messageId = 0

function goBack() {
  router.push('/')
}

function scrollToBottom() {
  nextTick(() => {
    const el = messageListRef.value
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  })
}

async function handleSend() {
  const text = inputText.value.trim()
  if (!text || loading.value) return

  inputText.value = ''
  loading.value = true

  messages.value.push({
    id: ++messageId,
    role: 'user',
    content: text,
  })

  const aiMsg = {
    id: ++messageId,
    role: 'assistant',
    content: '',
    streaming: true,
  }
  messages.value.push(aiMsg)
  scrollToBottom()

  abortController?.abort()
  abortController = new AbortController()

  await props.sendMessage(text, {
    onMessage: (chunk) => {
      aiMsg.content += chunk
      scrollToBottom()
    },
    onDone: () => {
      aiMsg.streaming = false
      loading.value = false
      scrollToBottom()
    },
    onError: (err) => {
      aiMsg.streaming = false
      aiMsg.content = aiMsg.content || `出错了：${err.message}`
      loading.value = false
      scrollToBottom()
    },
    signal: abortController.signal,
  })
}

onBeforeUnmount(() => {
  abortController?.abort()
})
</script>

<style scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f7fb;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e8ecf3;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
}

.back-btn {
  border: none;
  background: #f1f5f9;
  color: #475569;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}

.back-btn:hover {
  background: #e2e8f0;
}

.header-info h1 {
  margin: 0;
  font-size: 18px;
  color: #0f172a;
}

.chat-id {
  margin: 4px 0 0;
  font-size: 12px;
  color: #94a3b8;
  font-family: monospace;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-tip {
  text-align: center;
  color: #94a3b8;
  margin-top: 80px;
  font-size: 15px;
}

.message-row {
  display: flex;
  gap: 10px;
  max-width: 75%;
}

.message-row.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-row.assistant {
  align-self: flex-start;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}

.message-row.user .avatar {
  background: #6366f1;
  color: #fff;
}

.message-row.assistant .avatar {
  background: #10b981;
  color: #fff;
}

.bubble {
  position: relative;
  padding: 12px 16px;
  border-radius: 16px;
  line-height: 1.6;
  font-size: 14px;
  word-break: break-word;
  white-space: pre-wrap;
}

.message-row.user .bubble {
  background: #6366f1;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.message-row.assistant .bubble {
  background: #fff;
  color: #1e293b;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06);
}

.content {
  margin: 0;
}

.typing-cursor {
  animation: blink 1s step-end infinite;
  color: #6366f1;
  font-weight: bold;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.input-area {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  background: #fff;
  border-top: 1px solid #e8ecf3;
}

.input-box {
  flex: 1;
  resize: none;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.input-box:focus {
  border-color: #6366f1;
}

.input-box:disabled {
  background: #f8fafc;
}

.send-btn {
  align-self: flex-end;
  border: none;
  background: #6366f1;
  color: #fff;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.send-btn:hover:not(:disabled) {
  background: #4f46e5;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
