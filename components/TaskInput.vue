<script setup lang="ts">
const emit = defineEmits<{
  add: [title: string]
}>()

const newTaskTitle = ref('')
const error = ref('')

const handleSubmit = () => {
  const title = newTaskTitle.value.trim()
  
  if (!title) {
    error.value = 'Task title cannot be empty'
    return
  }
  
  emit('add', title)
  newTaskTitle.value = ''
  error.value = ''
}

watch(newTaskTitle, () => {
  if (error.value) {
    error.value = ''
  }
})
</script>

<template>
  <div class="task-input-container">
    <div class="input-wrapper">
      <input
        v-model="newTaskTitle"
        type="text"
        placeholder="Enter a new task..."
        class="task-input"
        :class="{ 'input-error': error }"
        @keyup.enter="handleSubmit"
        aria-label="New task title"
      />
      <button 
        @click="handleSubmit" 
        class="add-button"
        aria-label="Add task"
      >
        Add
      </button>
    </div>
    <Transition name="error">
      <p v-if="error" class="error-message">{{ error }}</p>
    </Transition>
  </div>
</template>

<style scoped>
.task-input-container {
  margin-bottom: 2rem;
}

.input-wrapper {
  display: flex;
  gap: 0.75rem;
}

.task-input {
  flex: 1;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.task-input:focus {
  outline: none;
  border-color: #667eea;
}

.task-input.input-error {
  border-color: #ef4444;
}

.add-button {
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.add-button:active {
  transform: translateY(0);
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.error-enter-active,
.error-leave-active {
  transition: all 0.2s ease;
}

.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 768px) {
  .input-wrapper {
    flex-direction: column;
  }
  
  .add-button {
    width: 100%;
  }
}
</style>
