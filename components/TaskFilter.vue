<script setup lang="ts">
export type FilterType = 'all' | 'active' | 'completed'

const props = defineProps<{
  modelValue: FilterType
  totalCount: number
  activeCount: number
  completedCount: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: FilterType]
}>()

const filters = computed(() => [
  { value: 'all' as FilterType, label: 'All', count: props.totalCount },
  { value: 'active' as FilterType, label: 'Active', count: props.activeCount },
  { value: 'completed' as FilterType, label: 'Completed', count: props.completedCount }
])

const selectFilter = (filter: FilterType) => {
  emit('update:modelValue', filter)
}
</script>

<template>
  <div class="task-filter">
    <button
      v-for="filter in filters"
      :key="filter.value"
      @click="selectFilter(filter.value)"
      class="filter-button"
      :class="{ active: modelValue === filter.value }"
      :aria-label="`Show ${filter.label} tasks`"
      :aria-pressed="modelValue === filter.value"
    >
      <span class="filter-label">{{ filter.label }}</span>
      <span class="filter-count">{{ filter.count }}</span>
    </button>
  </div>
</template>

<style scoped>
.task-filter {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background: var(--bg-secondary);
  border-radius: 12px;
  box-shadow: 0 2px 8px var(--shadow);
}

.filter-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.875rem 1rem;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.filter-button:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-color);
}

.filter-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

.filter-button.active:hover {
  background: linear-gradient(135deg, #5568d3 0%, #6a4291 100%);
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-button:not(.active) .filter-label {
  color: var(--text-tertiary);
}

.filter-count {
  font-size: 1.5rem;
  font-weight: 700;
}

.filter-button:not(.active) .filter-count {
  color: var(--text-primary);
}

.filter-button.active .filter-count {
  color: white;
}

@media (max-width: 768px) {
  .task-filter {
    flex-direction: column;
  }
  
  .filter-button {
    flex-direction: row;
    justify-content: space-between;
  }
  
  .filter-count {
    font-size: 1.25rem;
  }
}
</style>
