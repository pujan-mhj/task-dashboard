<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePreferencesStore } from '~/stores/usePreferencesStore'
import { useTaskStore } from '~/stores/useTaskStore'
import type { SortBy, FilterStatus } from '~/stores/usePreferencesStore'

const preferencesStore = usePreferencesStore()
const taskStore = useTaskStore()

const { sortBy, sortDirection, filterStatus, activeSortLabel } = storeToRefs(preferencesStore)
const { totalCount, pendingCount, completedCount } = storeToRefs(taskStore)

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'date', label: 'Date' },
  { value: 'title', label: 'Title' },
  { value: 'status', label: 'Status' }
]

const filterOptions: { value: FilterStatus; label: string; count: ComputedRef<number> }[] = [
  { value: 'all', label: 'All', count: totalCount },
  { value: 'active', label: 'Active', count: pendingCount },
  { value: 'completed', label: 'Completed', count: completedCount }
]

const handleSortChange = (field: SortBy) => {
  if (sortBy.value === field) {
    const nextDirection = sortDirection.value === 'asc' ? 'desc' : 'asc'
    preferencesStore.setSortBy(field, nextDirection)
  } else {
    preferencesStore.setSortBy(field, sortDirection.value)
  }
}

const handleFilterChange = (status: FilterStatus) => {
  preferencesStore.setFilter(status)
}
</script>

<template>
  <div class="filter-bar">
    <div class="filter-section">
      <label class="filter-label">Filter:</label>
      <div class="filter-buttons">
        <button
          v-for="option in filterOptions"
          :key="option.value"
          :class="['filter-btn', { active: filterStatus === option.value }]"
          @click="handleFilterChange(option.value)"
        >
          {{ option.label }}
          <span class="filter-count">{{ option.count }}</span>
        </button>
      </div>
    </div>

    <div class="sort-section">
      <label class="sort-label">Sort by:</label>
      <div class="sort-buttons">
        <button
          v-for="option in sortOptions"
          :key="option.value"
          :class="['sort-btn', { active: sortBy === option.value }]"
          @click="handleSortChange(option.value)"
        >
          {{ option.label }}
          <span v-if="sortBy === option.value" class="sort-arrow">
            {{ sortDirection === 'asc' ? '↑' : '↓' }}
          </span>
        </button>
      </div>
    </div>

    <div class="actions-section">
      <button
        v-if="completedCount > 0"
        class="clear-completed-btn"
        @click="taskStore.clearCompleted()"
        :aria-label="`Clear ${completedCount} completed task${completedCount > 1 ? 's' : ''}`"
      >
        Clear Completed ({{ completedCount }})
      </button>
    </div>
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.filter-section,
.sort-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label,
.sort-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.filter-buttons,
.sort-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn,
.sort-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 2px solid var(--border-color);
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover,
.sort-btn:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.filter-btn.active,
.sort-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.375rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.filter-btn:not(.active) .filter-count {
  background: var(--border-color);
  color: var(--text-secondary);
}

.sort-arrow {
  font-size: 1rem;
  font-weight: 700;
}

.actions-section {
  margin-left: auto;
}

.clear-completed-btn {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.clear-completed-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}

@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    gap: 1.5rem;
  }

  .filter-section,
  .sort-section,
  .actions-section {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .filter-buttons,
  .sort-buttons {
    width: 100%;
  }

  .filter-btn,
  .sort-btn {
    flex: 1;
    justify-content: center;
  }

  .clear-completed-btn {
    width: 100%;
  }
}
</style>
