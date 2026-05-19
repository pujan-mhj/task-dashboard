import { defineStore, skipHydrate } from 'pinia'
import { useNotificationStore } from './useNotificationStore'

export interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

export interface TaskState {
  tasks: Task[]
  loading: boolean
  error: string | null
  lastFetchedAt: Date | null
}

export const useTaskStore = defineStore('tasks', () => {
  // State
  // Omit from Nuxt Pinia payload so SSR empty state cannot overwrite client localStorage hydrate.
  const tasks = skipHydrate(ref<Task[]>([]))
  const loading = ref(false)
  const error = ref<string | null>(null)
  const lastFetchedAt = ref<Date | null>(null)
  const nextId = ref<number>(1)

  // Getters
  const completedTasks = computed(() => 
    tasks.value.filter(t => t.completed)
  )

  const pendingTasks = computed(() => 
    tasks.value.filter(t => !t.completed)
  )

  const completedCount = computed(() => completedTasks.value.length)

  const pendingCount = computed(() => pendingTasks.value.length)

  const totalCount = computed(() => tasks.value.length)

  const completionPercentage = computed(() => {
    if (totalCount.value === 0) return 0
    return Math.round((completedCount.value / totalCount.value) * 100)
  })

  const tasksByDate = computed(() => 
    [...tasks.value].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  )

  const isEmpty = computed(() => tasks.value.length === 0)

  const syncNextId = (): void => {
    const maxId = tasks.value.reduce((acc, t) => Math.max(acc, t.id), 0)
    nextId.value = Math.max(1, maxId + 1)
  }

  // Actions
  const fetchTasks = async (): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<any[]>(
        'https://jsonplaceholder.typicode.com/todos?_limit=5'
      )

      // If user already has persisted tasks, don't overwrite them.
      if (tasks.value.length === 0) {
        tasks.value = response.map((todo) => ({
          id: Number(todo.id),
          title: String(todo.title ?? ''),
          completed: Boolean(todo.completed),
          createdAt: new Date()
        }))
        syncNextId()
      }

      lastFetchedAt.value = new Date()
    } catch (err) {
      const errorMessage = 'Failed to load initial tasks'
      error.value = errorMessage

      const notificationStore = useNotificationStore()
      notificationStore.notify('error', errorMessage)
    } finally {
      loading.value = false
    }
  }

  const addTask = (title: string): void => {
    const trimmedTitle = title.trim()
    
    if (!trimmedTitle) {
      const notificationStore = useNotificationStore()
      notificationStore.notify('error', 'Task title cannot be empty')
      return
    }

    tasks.value.push({
      id: nextId.value++,
      title: trimmedTitle,
      completed: false,
      createdAt: new Date()
    })

    const notificationStore = useNotificationStore()
    notificationStore.notify('success', 'Task added')
  }

  const toggleTask = (id: number): void => {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return

    task.completed = !task.completed
    const notificationStore = useNotificationStore()
    notificationStore.notify('success', task.completed ? 'Task completed' : 'Task reopened')
  }

  const deleteTask = (id: number): void => {
    const index = tasks.value.findIndex(t => t.id === id)
    
    if (index !== -1) {
      tasks.value.splice(index, 1)
      syncNextId()
      
      const notificationStore = useNotificationStore()
      notificationStore.notify('info', 'Task removed')
    }
  }

  const editTask = (id: number, newTitle: string): void => {
    const trimmedTitle = newTitle.trim()
    
    if (!trimmedTitle) {
      const notificationStore = useNotificationStore()
      notificationStore.notify('error', 'Task title cannot be empty')
      return
    }

    const task = tasks.value.find(t => t.id === id)
    
    if (task) {
      task.title = trimmedTitle

      const notificationStore = useNotificationStore()
      notificationStore.notify('success', 'Task updated')
    }
  }

  const clearCompleted = (): void => {
    const completedTaskCount = completedCount.value
    tasks.value = tasks.value.filter(t => !t.completed)
    syncNextId()
    
    if (completedTaskCount > 0) {
      const notificationStore = useNotificationStore()
      notificationStore.notify('success', `${completedTaskCount} completed task${completedTaskCount > 1 ? 's' : ''} cleared`)
    }
  }


  const clearError = (): void => {
    error.value = null
  }

  // Reset function for testing
  const $reset = () => {
    tasks.value = []
    loading.value = false
    error.value = null
    lastFetchedAt.value = null
    nextId.value = 1
  }

  return {
    // State
    tasks,
    loading,
    error,
    lastFetchedAt,
    
    // Getters
    completedTasks,
    pendingTasks,
    completedCount,
    pendingCount,
    totalCount,
    completionPercentage,
    tasksByDate,
    isEmpty,
    
    // Actions
    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    clearCompleted,
    // Needed by persistence plugin after hydrating tasks.
    syncNextId,
    clearError,
    $reset
  }
})
