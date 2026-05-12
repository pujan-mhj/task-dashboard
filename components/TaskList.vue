<script setup lang="ts">
import type { Task } from '~/composables/useTasks'

defineProps<{
  tasks: readonly Task[]
}>()

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div class="task-list">
    <TransitionGroup name="task" tag="div" class="task-list-container">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="emit('toggle', $event)"
        @delete="emit('delete', $event)"
      />
    </TransitionGroup>
    <div v-if="tasks.length === 0" class="empty-state">
      <p>No tasks yet — add one above!</p>
    </div>
  </div>
</template>

<style scoped>
.task-list {
  margin-top: 1.5rem;
}

.task-list-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #94a3b8;
  font-size: 1.125rem;
}

.task-enter-active,
.task-leave-active {
  transition: all 0.3s ease;
}

.task-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.task-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.task-move {
  transition: transform 0.3s ease;
}
</style>
