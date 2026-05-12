<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTaskStore } from '~/stores/useTaskStore'
import { usePreferencesStore } from '~/stores/usePreferencesStore'
import { useTaskSorting } from '~/composables/useTaskSorting'

const taskStore = useTaskStore()
const preferencesStore = usePreferencesStore()

const { totalCount, pendingCount, completedCount } = storeToRefs(taskStore)
const { filterStatus } = storeToRefs(preferencesStore)

// Use the sorting composable for filtered and sorted tasks
const { sortedTasks } = useTaskSorting()

// Load initial tasks on mount
onMounted(async () => {
  await taskStore.fetchTasks()
})

const handleAddTask = (title: string) => {
  taskStore.addTask(title)
}

const handleEditTask = (id: number, title: string) => {
  taskStore.editTask(id, title)
}
</script>

<template>
  <div class="tasks-page">
    <h2 class="page-title">Tasks</h2>
    
    <TaskInput @add="handleAddTask" />
    
    <FilterBar />
    
    <TaskList 
      :tasks="sortedTasks" 
      @toggle="taskStore.toggleTask"
      @delete="taskStore.deleteTask"
      @edit="handleEditTask"
    />
  </div>
</template>

<style scoped>
.tasks-page {
  animation: fadeIn 0.3s ease;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 2rem 0;
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
}
</style>
