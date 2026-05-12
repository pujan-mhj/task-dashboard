import { storeToRefs } from 'pinia'
import { useTaskStore } from '~/stores/useTaskStore'

export const useTaskStats = () => {
  const taskStore = useTaskStore()
  
  const { 
    completedCount, 
    pendingCount, 
    totalCount, 
    completionPercentage,
    isEmpty 
  } = storeToRefs(taskStore)

  // Derived stats
  const hasCompletedTasks = computed(() => completedCount.value > 0)
  const hasPendingTasks = computed(() => pendingCount.value > 0)
  const isFullyCompleted = computed(() => 
    totalCount.value > 0 && completionPercentage.value === 100
  )

  const statsMessage = computed(() => {
    if (isEmpty.value) {
      return 'No tasks yet. Add one to get started!'
    }
    
    if (isFullyCompleted.value) {
      return '🎉 All tasks completed!'
    }
    
    if (pendingCount.value === 1) {
      return '1 task remaining'
    }
    
    return `${pendingCount.value} tasks remaining`
  })

  return {
    completedCount,
    pendingCount,
    totalCount,
    completionPercentage,
    isEmpty,
    hasCompletedTasks,
    hasPendingTasks,
    isFullyCompleted,
    statsMessage
  }
}
