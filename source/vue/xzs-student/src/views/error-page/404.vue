<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-message">{{ message }}</p>
      <p class="not-found-info">请检查您输入的网址是否正确，或点击下方按钮返回首页。</p>
      <router-link to="/" class="return-home-btn">返回首页</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '页面未找到...'
    }
  }
}
</script>

<style lang="scss" scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f7fa;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.not-found-content {
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.not-found-image {
  width: 100%;
  max-width: 450px;
  margin-bottom: 2rem;
}

.not-found-title {
  font-size: 5rem;
  font-weight: bold;
  color: #303133;
  margin: 0;
}

.not-found-message {
  font-size: 1.5rem;
  color: #606266;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.not-found-info {
  font-size: 1rem;
  color: #909399;
  margin-bottom: 2.5rem;
}

.return-home-btn {
  display: inline-block;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #409EFF;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
}

.return-home-btn:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
