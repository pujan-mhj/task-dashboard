<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
  color?: string
}>()
</script>

<template>
  <div class="summary-card" :style="{ borderTopColor: color }">
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-value">{{ value }}</p>
  </div>
</template>

<style scoped>
.summary-card {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  border-top: 4px solid #667eea;
  box-shadow: 0 2px 8px var(--shadow);
  transition: transform 0.2s, box-shadow 0.2s;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px var(--shadow-hover);
}

.card-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
}

.card-value {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .card-value {
    font-size: 2rem;
  }
}
</style>
