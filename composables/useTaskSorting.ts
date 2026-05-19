import { storeToRefs } from 'pinia'
import { useTaskStore } from '~/stores/useTaskStore'
import { usePreferencesStore } from '~/stores/usePreferencesStore'

export const useTaskSorting = () => {
  const taskStore = useTaskStore()
  const preferencesStore = usePreferencesStore()
  
  const { tasks } = storeToRefs(taskStore)
  const { sortBy, sortDirection, filterStatus } = storeToRefs(preferencesStore)

  // Filtered tasks based on status
  const filteredTasks = computed(() => {
    switch (filterStatus.value) {
      case 'active':
        return tasks.value.filter(task => !task.completed)
      case 'completed':
        return tasks.value.filter(task => task.completed)
      default:
        return tasks.value
    }
  })

  // Sorted and filtered tasks
  const sortedTasks = computed(() => {
    const tasksCopy = [...filteredTasks.value]
    
    tasksCopy.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy.value) {
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'status':
          comparison = (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
          break
      }
      
      return sortDirection.value === 'asc' ? comparison : -comparison
    })
    
    return tasksCopy
  })

  return {
    sortedTasks,
    filteredTasks
  }
}
