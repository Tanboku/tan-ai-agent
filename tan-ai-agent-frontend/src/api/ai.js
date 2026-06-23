import request from './request'

/**
 * 通过 SSE 流式调用 AI 恋爱大师
 * @param {string} message 用户消息
 * @param {string} chatId 会话 ID
 * @param {object} callbacks 回调函数
 * @param {function(string): void} callbacks.onMessage 收到消息片段
 * @param {function(): void} [callbacks.onDone] 流结束
 * @param {function(Error): void} [callbacks.onError] 错误处理
 * @param {AbortSignal} [callbacks.signal] 取消信号
 */
export function chatWithLoveAppSSE(message, chatId, { onMessage, onDone, onError, signal }) {
  const url = buildSSEUrl('/ai/love_app/chat/sse', { message, chatId })
  return fetchSSE(url, { onMessage, onDone, onError, signal })
}

/**
 * 通过 SSE 流式调用 AI 超级智能体
 */
export function chatWithManusSSE(message, { onMessage, onDone, onError, signal }) {
  const url = buildSSEUrl('/ai/manus/chat', { message })
  return fetchSSE(url, { onMessage, onDone, onError, signal })
}

function buildSSEUrl(path, params) {
  const baseURL = request.defaults.baseURL || '/api'
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '') {
      searchParams.append(key, value)
    }
  })
  const query = searchParams.toString()
  const prefix = baseURL.startsWith('http') ? baseURL : `${window.location.origin}${baseURL}`
  return `${prefix}${path}${query ? `?${query}` : ''}`
}

async function fetchSSE(url, { onMessage, onDone, onError, signal }) {
  try {
    const response = await fetch(url, { signal })
    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      buffer = parseSSEBuffer(buffer, onMessage)
    }

    if (buffer.trim()) {
      parseSSEBuffer(buffer + '\n', onMessage)
    }

    onDone?.()
  } catch (err) {
    if (err.name !== 'AbortError') {
      onError?.(err)
    }
  }
}

function parseSSEBuffer(buffer, onMessage) {
  const parts = buffer.split('\n')
  const remaining = parts.pop() ?? ''

  for (const line of parts) {
    if (line.startsWith('data:')) {
      onMessage(line.slice(5).trimStart())
    } else if (line.trim() && !line.startsWith('event:') && !line.startsWith('id:') && !line.startsWith(':')) {
      onMessage(line)
    }
  }

  return remaining
}
