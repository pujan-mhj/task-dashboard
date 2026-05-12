<script setup lang="ts">
</script>

<template>
  <div class="about-page">
    <h2 class="page-title">About</h2>
    
    <div class="content-card">
      <h3>Task Dashboard</h3>
      <p>
        A minimalist personal task management application built for quick prototyping and demonstration purposes.
      </p>
      
      <h4>Features</h4>
      <ul>
        <li>Add, complete, and delete tasks</li>
        <li>Real-time dashboard with task statistics</li>
        <li>Responsive design for desktop and mobile</li>
        <li>Smooth animations and transitions</li>
        <li>API integration with JSONPlaceholder</li>
      </ul>
      
      <h4>Tech Stack</h4>
      <ul class="tech-stack">
        <li><strong>Vue 3</strong> - Progressive JavaScript framework</li>
        <li><strong>Nuxt 3</strong> - Vue.js meta-framework</li>
        <li><strong>Composition API</strong> - Modern Vue reactivity system</li>
        <li><strong>TypeScript</strong> - Type-safe JavaScript</li>
        <li><strong>File-based Routing</strong> - Automatic route generation</li>
      </ul>
      
      <h4>Project Structure</h4>
      <ul>
        <li><code>pages/</code> - File-based routing pages</li>
        <li><code>components/</code> - Reusable Vue components</li>
        <li><code>composables/</code> - Shared reactive state and logic</li>
        <li><code>layouts/</code> - Application layouts</li>
        <li><code>assets/</code> - Global styles and assets</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  animation: fadeIn 0.3s ease;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 2rem 0;
}

.content-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  line-height: 1.7;
}

.content-card h3 {
  color: #667eea;
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.content-card h4 {
  color: #1e293b;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
}

.content-card p {
  color: #475569;
  margin-bottom: 1rem;
}

.content-card ul {
  color: #475569;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.content-card li {
  margin-bottom: 0.5rem;
}

.tech-stack li {
  margin-bottom: 0.75rem;
}

.content-card code {
  background: #f1f5f9;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #667eea;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }
  
  .content-card {
    padding: 1.5rem;
  }
}
</style>
