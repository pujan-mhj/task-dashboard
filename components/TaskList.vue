<script setup lang="ts">
import type { Task } from '~/composables/useTasks'

defineProps<{
  tasks: readonly Task[]
}>()

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
  edit: [id: number, title: string]
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
        @edit="(id, title) => emit('edit', id, title)"
      />
    </TransitionGroup>
    <div v-if="tasks.length === 0" class="empty-state">
      <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p>No tasks found</p>
      <p class="empty-hint">Try adding a new task or changing the filter</p>
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
}

.empty-icon {
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  color: #cbd5e1;
}

.empty-state p {
  font-size: 1.125rem;
  margin: 0.5rem 0;
}

.empty-hint {
  font-size: 0.875rem;
  color: #cbd5e1;
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
