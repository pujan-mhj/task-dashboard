<script setup lang="ts">
const features = [
  {
    icon: '✅',
    title: 'Task Management',
    description: 'Create, edit, complete, and delete tasks with ease'
  },
  {
    icon: '📊',
    title: 'Real-time Dashboard',
    description: 'Track your progress with live statistics and visual progress bars'
  },
  {
    icon: '🔍',
    title: 'Smart Filtering',
    description: 'Filter tasks by All, Active, or Completed status'
  },
  {
    icon: '🌓',
    title: 'Dark Mode',
    description: 'Automatic theme detection with manual toggle support'
  },
  {
    icon: '💾',
    title: 'Auto-Save',
    description: 'All changes are automatically saved to localStorage'
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    description: 'Works seamlessly on desktop, tablet, and mobile devices'
  }
]

const techStack = [
  {
    category: 'Frontend Framework',
    items: [
      { name: 'Vue 3', version: '3.5.13', description: 'Progressive JavaScript framework with Composition API' },
      { name: 'Nuxt 3', version: '3.15.3', description: 'Vue.js meta-framework with file-based routing and auto-imports' }
    ]
  },
  {
    category: 'Language',
    items: [
      { name: 'TypeScript', version: '5.7.3', description: 'Typed superset of JavaScript for better developer experience' }
    ]
  },
  {
    category: 'Styling',
    items: [
      { name: 'CSS3', version: 'Latest', description: 'Modern CSS with variables, grid, flexbox, and animations' },
      { name: '@nuxtjs/color-mode', version: 'Latest', description: 'Dark mode support with system preference detection' }
    ]
  },
  {
    category: 'Testing',
    items: [
      { name: 'Vitest', version: '4.1.6', description: 'Fast unit test framework powered by Vite' },
      { name: '@vue/test-utils', version: 'Latest', description: 'Official testing utilities for Vue components' },
      { name: 'Happy-DOM', version: 'Latest', description: 'Lightweight DOM implementation for testing' }
    ]
  },
  {
    category: 'Development Tools',
    items: [
      { name: 'ESLint', version: 'Latest', description: 'Code linting and quality assurance' },
      { name: 'Vite', version: 'Latest', description: 'Next generation frontend tooling' }
    ]
  }
]

const stats = [
  { label: 'Components', value: '9' },
  { label: 'Pages', value: '3' },
  { label: 'Tests', value: '70' },
  { label: 'Test Coverage', value: '100%' }
]
</script>

<template>
  <div class="about-page">
    <h2 class="page-title">About Task Dashboard</h2>
    
    <!-- Hero Section -->
    <div class="hero-card">
      <div class="hero-icon">📋</div>
      <h3 class="hero-title">Personal Task Management Made Simple</h3>
      <p class="hero-description">
        Task Dashboard is a modern, minimalist task management application built with Vue 3 and Nuxt 3. 
        Designed for quick prototyping and demonstration, it showcases best practices in modern web development 
        while providing a fully functional task management experience.
      </p>
    </div>

    <!-- Features Grid -->
    <section class="section">
      <h3 class="section-title">Features</h3>
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h4 class="feature-title">{{ feature.title }}</h4>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="section">
      <h3 class="section-title">Technology Stack</h3>
      <div class="tech-stack">
        <div v-for="category in techStack" :key="category.category" class="tech-category">
          <h4 class="tech-category-title">{{ category.category }}</h4>
          <div class="tech-items">
            <div v-for="item in category.items" :key="item.name" class="tech-item">
              <div class="tech-header">
                <span class="tech-name">{{ item.name }}</span>
                <span class="tech-version">v{{ item.version }}</span>
              </div>
              <p class="tech-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture -->
    <section class="section">
      <h3 class="section-title">Architecture</h3>
      <div class="content-card">
        <h4>Component-Based Architecture</h4>
        <p>
          Built using Vue 3's Composition API with <code>&lt;script setup&gt;</code> syntax for cleaner, 
          more maintainable code. Components are small, focused, and reusable.
        </p>

        <h4>State Management</h4>
        <p>
          Uses Vue's reactive composables pattern with <code>useTasks</code> for centralized task management. 
          State is shared across components and persists to localStorage automatically.
        </p>

        <h4>File-Based Routing</h4>
        <p>
          Leverages Nuxt 3's automatic routing system. Pages in the <code>pages/</code> directory 
          automatically become routes with code splitting and lazy loading.
        </p>

        <h4>Styling Strategy</h4>
        <p>
          Scoped component styles with CSS variables for theming. Dark mode support through 
          <code>@nuxtjs/color-mode</code> with smooth transitions between themes.
        </p>
      </div>
    </section>

    <!-- Project Stats -->
    <section class="section">
      <h3 class="section-title">Project Statistics</h3>
      <div class="stats-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-card">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Key Highlights -->
    <section class="section">
      <h3 class="section-title">Key Highlights</h3>
      <div class="content-card">
        <div class="highlights">
          <div class="highlight-item">
            <span class="highlight-icon">⚡</span>
            <div>
              <strong>Fast & Performant</strong>
              <p>Built with Vite for lightning-fast HMR and optimized production builds</p>
            </div>
          </div>
          
          <div class="highlight-item">
            <span class="highlight-icon">♿</span>
            <div>
              <strong>Accessible</strong>
              <p>WCAG AA compliant with keyboard navigation and screen reader support</p>
            </div>
          </div>
          
          <div class="highlight-item">
            <span class="highlight-icon">🧪</span>
            <div>
              <strong>Well Tested</strong>
              <p>70 passing tests covering components, composables, and user flows</p>
            </div>
          </div>
          
          <div class="highlight-item">
            <span class="highlight-icon">📱</span>
            <div>
              <strong>Mobile First</strong>
              <p>Responsive design that works beautifully on all screen sizes</p>
            </div>
          </div>
          
          <div class="highlight-item">
            <span class="highlight-icon">🎨</span>
            <div>
              <strong>Modern UI</strong>
              <p>Clean, minimalist design with smooth animations and transitions</p>
            </div>
          </div>
          
          <div class="highlight-item">
            <span class="highlight-icon">🔒</span>
            <div>
              <strong>Type Safe</strong>
              <p>Full TypeScript support for better developer experience and fewer bugs</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <section class="section">
      <div class="footer-card">
        <p class="footer-text">
          Built with ❤️ as a demonstration project for Vue 3 + Nuxt 3 development
        </p>
        <p class="footer-meta">
          Version 1.0.0 • May 2026 • MIT License
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  animation: fadeIn 0.3s ease;
  max-width: 1000px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 2rem 0;
  text-align: center;
}

/* Hero Section */
.hero-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 16px;
  text-align: center;
  margin-bottom: 3rem;
  box-shadow: 0 4px 16px var(--shadow);
}

.hero-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  margin: 0;
  opacity: 0.95;
  max-width: 800px;
  margin: 0 auto;
}

/* Section */
.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #667eea;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow);
  transition: transform 0.2s, box-shadow 0.2s;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px var(--shadow-hover);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.feature-description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tech-category {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow);
}

.tech-category-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #667eea;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tech-item {
  padding: 1rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border-left: 3px solid #667eea;
}

.tech-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.tech-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.tech-version {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  background: var(--bg-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.tech-description {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* Content Card */
.content-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow);
  line-height: 1.7;
}

.content-card h4 {
  color: var(--text-primary);
  margin: 1.5rem 0 0.75rem 0;
  font-size: 1.125rem;
}

.content-card h4:first-child {
  margin-top: 0;
}

.content-card p {
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
}

.content-card code {
  background: var(--bg-tertiary);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #667eea;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow);
  text-align: center;
  border-top: 4px solid #667eea;
}

.stat-value {
  font-size: 3rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Highlights */
.highlights {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.highlight-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.highlight-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.highlight-item strong {
  display: block;
  color: var(--text-primary);
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}

.highlight-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

/* Footer */
.footer-card {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow);
  text-align: center;
}

.footer-text {
  font-size: 1.125rem;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.footer-meta {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin: 0;
}

/* Animations */
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

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .hero-card {
    padding: 2rem 1.5rem;
  }
  
  .hero-icon {
    font-size: 3rem;
  }
  
  .hero-title {
    font-size: 1.5rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-value {
    font-size: 2.5rem;
  }
  
  .content-card {
    padding: 1.5rem;
  }
}
</style>
