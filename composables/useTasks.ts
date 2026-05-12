// Deprecated composable retained for reference.
// The app uses `useTaskStore` (Pinia) as the source of truth.

const STORAGE_KEY = 'task-dashboard-tasks'
const NEXT_ID_KEY = 'task-dashboard-next-id'

// Use a factory function to create isolated state for testing
let tasks = ref<Task[]>([])
let nextId = 1

// Reset function for testing
export const resetTaskState = () => {
  tasks.value = []
  nextId = 1
  if (process.client) {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(NEXT_ID_KEY)
  }
}

// Helper function to save tasks to localStorage
const saveToLocalStorage = () => {
  if (process.client) {
    try {
      const tasksToSave = tasks.value.map(task => ({
        ...task,
        createdAt: task.createdAt.toISOString()
      }))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave))
      localStorage.setItem(NEXT_ID_KEY, nextId.toString())
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error)
    }
  }
}

// Helper function to load tasks from localStorage
const loadFromLocalStorage = () => {
  if (process.client) {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY)
      const savedNextId = localStorage.getItem(NEXT_ID_KEY)
      
      // Check if we have saved data (even if it's an empty array)
      if (savedTasks !== null) {
        const parsedTasks = JSON.parse(savedTasks)
        tasks.value = parsedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt)
        }))
        
        if (savedNextId) {
          nextId = parseInt(savedNextId, 10)
        }
        
        // Return true if localStorage key exists (even for empty array)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error)
      return false
    }
  }
  return false
}

export const useTasks = () => {
  const addTask = (title: string) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      return false
    }
    
    tasks.value.push({
      id: nextId++,
      title: trimmedTitle,
      completed: false,
      createdAt: new Date()
    })
    
    saveToLocalStorage()
    return true
  }

  const toggleTask = (id: number) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      saveToLocalStorage()
    }
  }

  const deleteTask = (id: number) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const editTask = (id: number, newTitle: string) => {
    const trimmedTitle = newTitle.trim()
    if (!trimmedTitle) {
      return false
    }
    
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.title = trimmedTitle
      saveToLocalStorage()
      return true
    }
    return false
  }

  const completedCount = computed(() => 
    tasks.value.filter(t => t.completed).length
  )

  const pendingCount = computed(() => 
    tasks.value.filter(t => !t.completed).length
  )

  const totalCount = computed(() => tasks.value.length)

  const completionPercentage = computed(() => {
    if (totalCount.value === 0) return 0
    return Math.round((completedCount.value / totalCount.value) * 100)
  })

  const loadInitialTasks = async () => {
    // First, try to load from localStorage
    const hasLocalData = loadFromLocalStorage()
    
    // Only use local data if it exists AND has tasks
    // This allows empty task list to persist (user deleted all tasks)
    if (hasLocalData) {
      return // Use local data if available (even if empty)
    }
    
    // If no local data at all (first visit), fetch from API
    try {
      const response = await $fetch<any[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      
      response.forEach((todo) => {
        tasks.value.push({
          id: nextId++,
          title: todo.title,
          completed: todo.completed,
          createdAt: new Date()
        })
      })
      
      saveToLocalStorage()
    } catch (error) {
      console.error('Failed to load initial tasks:', error)
      // Gracefully continue with empty list
    }
  }

  return {
    tasks: readonly(tasks),
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    completedCount,
    pendingCount,
    totalCount,
    completionPercentage,
    loadInitialTasks
  }
}
