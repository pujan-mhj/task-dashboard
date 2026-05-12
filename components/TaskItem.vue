<script setup lang="ts">
import type { Task } from '~/composables/useTasks'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <label class="task-checkbox-label">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="emit('toggle', task.id)"
        class="task-checkbox"
        :aria-label="`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`"
      />
      <span class="task-title">{{ task.title }}</span>
    </label>
    <button
      @click="emit('delete', task.id)"
      class="delete-button"
      :aria-label="`Delete ${task.title}`"
    >
      Delete
    </button>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s;
}

.task-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.task-item.completed {
  opacity: 0.6;
  background: #f8fafc;
}

.task-checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  cursor: pointer;
}

.task-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: #667eea;
}

.task-title {
  font-size: 1rem;
  transition: all 0.2s;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #94a3b8;
}

.delete-button {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background: #dc2626;
}

@media (max-width: 768px) {
  .task-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .delete-button {
    width: 100%;
  }
}
</style>
