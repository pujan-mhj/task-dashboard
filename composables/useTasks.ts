export interface Task {
  id: number
  title: string
  completed: boolean
  createdAt: Date
}

const tasks = ref<Task[]>([])
let nextId = 1

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
    return true
  }

  const toggleTask = (id: number) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  const deleteTask = (id: number) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
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
    if (tasks.value.length > 0) return // Already loaded
    
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
    completedCount,
    pendingCount,
    totalCount,
    completionPercentage,
    loadInitialTasks
  }
}
