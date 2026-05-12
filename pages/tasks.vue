<script setup lang="ts">
import type { FilterType } from '~/components/TaskFilter.vue'

const taskManager = useTasks()

// Load initial tasks on mount
onMounted(() => {
  taskManager.loadInitialTasks()
})

const handleAddTask = (title: string) => {
  taskManager.addTask(title)
}

const handleEditTask = (id: number, title: string) => {
  taskManager.editTask(id, title)
}

// Filter state
const currentFilter = ref<FilterType>('all')

// Filtered tasks based on current filter
const filteredTasks = computed(() => {
  const allTasks = taskManager.tasks.value
  
  switch (currentFilter.value) {
    case 'active':
      return allTasks.filter(task => !task.completed)
    case 'completed':
      return allTasks.filter(task => task.completed)
    default:
      return allTasks
  }
})
</script>

<template>
  <div class="tasks-page">
    <h2 class="page-title">Tasks</h2>
    
    <TaskInput @add="handleAddTask" />
    
    <TaskFilter
      v-model="currentFilter"
      :total-count="taskManager.totalCount.value"
      :active-count="taskManager.pendingCount.value"
      :completed-count="taskManager.completedCount.value"
    />
    
    <TaskList 
      :tasks="filteredTasks" 
      @toggle="taskManager.toggleTask"
      @delete="taskManager.deleteTask"
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
