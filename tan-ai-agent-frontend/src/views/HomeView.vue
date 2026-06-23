<template>
  <div class="home">
    <div class="hero">
      <h1>Tan AI Agent</h1>
      <p>选择一个 AI 应用开始体验</p>
    </div>

    <div class="app-grid">
      <router-link to="/love-app" class="app-card love">
        <div class="card-icon">💕</div>
        <h2>AI 恋爱大师</h2>
        <p>专业的恋爱心理顾问，帮你解决情感困惑</p>
        <span class="card-action">进入聊天 →</span>
      </router-link>

      <router-link to="/manus" class="app-card manus">
        <div class="card-icon">🤖</div>
        <h2>AI 超级智能体</h2>
        <p>全能 AI 助手，可调用多种工具完成复杂任务</p>
        <span class="card-action">进入聊天 →</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.hero {
  text-align: center;
  color: #fff;
  margin-bottom: 48px;
}

.hero h1 {
  font-size: 36px;
  margin: 0 0 12px;
  font-weight: 700;
}

.hero p {
  font-size: 16px;
  opacity: 0.85;
  margin: 0;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 720px;
  width: 100%;
}

.app-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px 28px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
}

.app-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
}

.card-icon {
  font-size: 40px;
  margin-bottom: 16px;
}

.app-card h2 {
  margin: 0 0 8px;
  font-size: 20px;
  color: #0f172a;
}

.app-card p {
  margin: 0 0 20px;
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
}

.card-action {
  font-size: 14px;
  font-weight: 600;
}

.app-card.love .card-action {
  color: #ec4899;
}

.app-card.manus .card-action {
  color: #6366f1;
}
</style>
