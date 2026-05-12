<script setup lang="ts">
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
</script>

<template>
  <div class="tasks-page">
    <h2 class="page-title">Tasks</h2>
    
    <TaskInput @add="handleAddTask" />
    
    <TaskList 
      :tasks="taskManager.tasks.value" 
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
