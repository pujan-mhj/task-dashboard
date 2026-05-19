<script setup lang="ts">
import { useTaskStore } from '~/stores/useTaskStore'
import { useTaskSorting } from '~/composables/useTaskSorting'

const taskStore = useTaskStore()

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
    
    <!-- Sort/filter state is hydrated from localStorage; SSR HTML will not match and causes hydration warnings. -->
    <ClientOnly>
      <FilterBar />
      
      <TaskList 
        :tasks="sortedTasks" 
        @toggle="taskStore.toggleTask"
        @delete="taskStore.deleteTask"
        @edit="handleEditTask"
      />
      <template #fallback>
        <div class="tasks-fallback" aria-hidden="true">
          <div class="tasks-fallback__bar" />
          <div class="tasks-fallback__list">
            <div class="tasks-fallback__item" />
            <div class="tasks-fallback__item" />
            <div class="tasks-fallback__item" />
          </div>
        </div>
      </template>
    </ClientOnly>
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

.tasks-fallback__bar {
  height: 5.5rem;
  border-radius: 0.75rem;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin: 1.5rem 0;
}

.tasks-fallback__list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tasks-fallback__item {
  height: 4.25rem;
  border-radius: 8px;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
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
