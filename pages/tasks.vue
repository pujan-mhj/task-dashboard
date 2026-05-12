<script setup lang="ts">
const { tasks, addTask, toggleTask, deleteTask, loadInitialTasks } = useTasks()

// Load initial tasks on mount
onMounted(() => {
  loadInitialTasks()
})

const handleAddTask = (title: string) => {
  addTask(title)
}
</script>

<template>
  <div class="tasks-page">
    <h2 class="page-title">Tasks</h2>
    
    <TaskInput @add="handleAddTask" />
    
    <TaskList 
      :tasks="tasks" 
      @toggle="toggleTask"
      @delete="deleteTask"
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
  color: #1e293b;
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
