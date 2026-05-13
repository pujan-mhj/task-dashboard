<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '~/stores/useTaskStore'
import { useNotificationStore } from '~/stores/useNotificationStore'

const taskStore = useTaskStore()

const { totalCount, completedCount, pendingCount, completionPercentage } = storeToRefs(taskStore)

// Watch for 100% completion and trigger celebration
watch(completionPercentage, (newValue, oldValue) => {
  if (newValue === 100 && oldValue !== 100 && totalCount.value > 0) {
    const notificationStore = useNotificationStore()
    notificationStore.notify('success', '🎉 All done! You completed all tasks!', {
      duration: 5000
    })
  }
})
</script>

<template>
  <div class="dashboard-page">
    <h2 class="page-title">Dashboard</h2>
    
    <div class="summary-grid">
      <SummaryCard 
        title="Total Tasks" 
        :value="totalCount" 
        color="#667eea"
      />
      <SummaryCard 
        title="Completed" 
        :value="completedCount" 
        color="#10b981"
      />
      <SummaryCard 
        title="Pending" 
        :value="pendingCount" 
        color="#f59e0b"
      />
    </div>

    <div class="progress-section">
      <!-- Client-only: persisted task % differs from SSR (0%), hydration mismatch breaks scoped styles -->
      <ClientOnly>
        <ProgressBar :percentage="completionPercentage" />
        <template #fallback>
          <div class="td-progress td-progress--fallback" aria-hidden="true">
            <div class="td-progress__header">
              <span class="td-progress__label">Completion Progress</span>
              <span class="td-progress__value">—</span>
            </div>
            <div class="td-progress__track">
              <div class="td-progress__fill" style="width: 0%"></div>
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  animation: fadeIn 0.3s ease;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 2rem 0;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.progress-section {
  margin-top: 2rem;
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
  
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
