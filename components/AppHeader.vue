<script setup lang="ts">
</script>

<template>
  <header class="header">
    <div class="header-content">
      <h1 class="app-title">Task Dashboard</h1>
      <div class="header-right">
        <nav class="nav">
          <NuxtLink to="/" class="nav-link">Dashboard</NuxtLink>
          <NuxtLink to="/tasks" class="nav-link">Tasks</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        </nav>
        <ClientOnly>
          <ThemeToggle />
          <template #fallback>
            <span class="td-theme-toggle td-theme-toggle--fallback" aria-hidden="true" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.app-title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s;
  font-weight: 500;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .app-title {
    font-size: 1.5rem;
  }
  
  .header-right {
    width: 100%;
    justify-content: space-between;
  }
  
  .nav {
    flex: 1;
    justify-content: space-between;
  }
  
  .nav-link {
    padding: 0.5rem;
    flex: 1;
    text-align: center;
  }
}
</style>
