<script setup lang="ts">
defineProps<{
  percentage: number
}>()
</script>

<template>
  <div class="progress-container">
    <div class="progress-header">
      <span class="progress-label">Completion Progress</span>
      <span class="progress-percentage">{{ percentage }}%</span>
    </div>
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: `${percentage}%` }"
        role="progressbar"
        :aria-valuenow="percentage"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.progress-container {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
}

.progress-percentage {
  font-size: 1.25rem;
  font-weight: 700;
  color: #667eea;
}

.progress-bar {
  height: 1rem;
  background: #e2e8f0;
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 9999px;
  transition: width 0.5s ease;
}
</style>
