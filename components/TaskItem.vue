<script setup lang="ts">
import type { Task } from '~/composables/useTasks'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  toggle: [id: number]
  delete: [id: number]
  edit: [id: number, title: string]
}>()

const isEditing = ref(false)
const editedTitle = ref('')

const startEdit = () => {
  isEditing.value = true
  editedTitle.value = props.task.title
  // Focus the input after it's rendered
  nextTick(() => {
    const input = document.getElementById(`edit-input-${props.task.id}`)
    if (input) {
      (input as HTMLInputElement).focus()
    }
  })
}

const saveEdit = () => {
  const trimmed = editedTitle.value.trim()
  if (trimmed && trimmed !== props.task.title) {
    emit('edit', props.task.id, trimmed)
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editedTitle.value = ''
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    saveEdit()
  } else if (event.key === 'Escape') {
    cancelEdit()
  }
}
</script>

<template>
  <div class="task-item" :class="{ completed: task.completed }">
    <label v-if="!isEditing" class="task-checkbox-label">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="emit('toggle', task.id)"
        class="task-checkbox"
        :aria-label="`Mark ${task.title} as ${task.completed ? 'incomplete' : 'complete'}`"
      />
      <span class="task-title">{{ task.title }}</span>
    </label>
    
    <div v-else class="edit-container">
      <input
        :id="`edit-input-${task.id}`"
        v-model="editedTitle"
        type="text"
        class="edit-input"
        @keydown="handleKeydown"
        @blur="saveEdit"
        :aria-label="`Edit ${task.title}`"
      />
    </div>
    
    <div class="button-group">
      <button
        v-if="!isEditing"
        @click="startEdit"
        class="edit-button"
        :aria-label="`Edit ${task.title}`"
      >
        Edit
      </button>
      <button
        @click="emit('delete', task.id)"
        class="delete-button"
        :aria-label="`Delete ${task.title}`"
      >
        Delete
      </button>
    </div>
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
  gap: 0.75rem;
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
  min-width: 0;
}

.task-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: #667eea;
  flex-shrink: 0;
}

.task-title {
  font-size: 1rem;
  transition: all 0.2s;
  word-break: break-word;
}

.task-item.completed .task-title {
  text-decoration: line-through;
  color: #94a3b8;
}

.edit-container {
  flex: 1;
  min-width: 0;
}

.edit-input {
  width: 100%;
  padding: 0.5rem;
  border: 2px solid #667eea;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.edit-button {
  padding: 0.5rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-button:hover {
  background: #5568d3;
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
    align-items: stretch;
  }
  
  .task-checkbox-label {
    width: 100%;
  }
  
  .button-group {
    width: 100%;
  }
  
  .edit-button,
  .delete-button {
    flex: 1;
  }
}
</style>
