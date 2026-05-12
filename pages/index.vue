<script setup lang="ts">
const taskManager = useTasks()

// Load initial tasks on mount
onMounted(() => {
  taskManager.loadInitialTasks()
})
</script>

<template>
  <div class="dashboard-page">
    <h2 class="page-title">Dashboard</h2>
    
    <div class="summary-grid">
      <SummaryCard 
        title="Total Tasks" 
        :value="taskManager.totalCount.value" 
        color="#667eea"
      />
      <SummaryCard 
        title="Completed" 
        :value="taskManager.completedCount.value" 
        color="#10b981"
      />
      <SummaryCard 
        title="Pending" 
        :value="taskManager.pendingCount.value" 
        color="#f59e0b"
      />
    </div>

    <div class="progress-section">
      <ProgressBar :percentage="taskManager.completionPercentage.value" />
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
