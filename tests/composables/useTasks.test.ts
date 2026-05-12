import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTasks, resetTaskState } from '~/composables/useTasks'

describe('useTasks Composable', () => {
  beforeEach(() => {
    resetTaskState()
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should initialize with empty tasks', () => {
    const { tasks, totalCount } = useTasks()
    expect(tasks.value).toEqual([])
    expect(totalCount.value).toBe(0)
  })

  it('should add a task', () => {
    const { addTask, tasks, totalCount } = useTasks()
    
    const result = addTask('Test Task')
    
    expect(result).toBe(true)
    expect(tasks.value).toHaveLength(1)
    expect(tasks.value[0].title).toBe('Test Task')
    expect(tasks.value[0].completed).toBe(false)
    expect(totalCount.value).toBe(1)
  })

  it('should not add empty task', () => {
    const { addTask, tasks } = useTasks()
    
    const result = addTask('   ')
    
    expect(result).toBe(false)
    expect(tasks.value).toHaveLength(0)
  })

  it('should toggle task completion', () => {
    const { addTask, toggleTask, tasks, completedCount } = useTasks()
    
    addTask('Test Task')
    const taskId = tasks.value[0].id
    
    toggleTask(taskId)
    expect(tasks.value[0].completed).toBe(true)
    expect(completedCount.value).toBe(1)
    
    toggleTask(taskId)
    expect(tasks.value[0].completed).toBe(false)
    expect(completedCount.value).toBe(0)
  })

  it('should delete a task', () => {
    const { addTask, deleteTask, tasks } = useTasks()
    
    addTask('Test Task')
    const taskId = tasks.value[0].id
    
    deleteTask(taskId)
    expect(tasks.value).toHaveLength(0)
  })

  it('should edit a task', () => {
    const { addTask, editTask, tasks } = useTasks()
    
    addTask('Original Title')
    const taskId = tasks.value[0].id
    
    const result = editTask(taskId, 'Updated Title')
    
    expect(result).toBe(true)
    expect(tasks.value[0].title).toBe('Updated Title')
  })

  it('should not edit task with empty title', () => {
    const { addTask, editTask, tasks } = useTasks()
    
    addTask('Original Title')
    const taskId = tasks.value[0].id
    
    const result = editTask(taskId, '   ')
    
    expect(result).toBe(false)
    expect(tasks.value[0].title).toBe('Original Title')
  })

  it('should calculate completion percentage', () => {
    const { addTask, toggleTask, tasks, completionPercentage } = useTasks()
    
    addTask('Task 1')
    addTask('Task 2')
    addTask('Task 3')
    addTask('Task 4')
    
    expect(completionPercentage.value).toBe(0)
    
    toggleTask(tasks.value[0].id)
    toggleTask(tasks.value[1].id)
    
    expect(completionPercentage.value).toBe(50)
  })

  it('should count pending tasks', () => {
    const { addTask, toggleTask, tasks, pendingCount } = useTasks()
    
    addTask('Task 1')
    addTask('Task 2')
    addTask('Task 3')
    
    expect(pendingCount.value).toBe(3)
    
    toggleTask(tasks.value[0].id)
    expect(pendingCount.value).toBe(2)
  })

  it('should save to localStorage on add', () => {
    const { addTask } = useTasks()
    
    addTask('Test Task')
    
    const saved = localStorage.getItem('task-dashboard-tasks')
    expect(saved).toBeTruthy()
    const parsed = JSON.parse(saved!)
    expect(parsed).toHaveLength(1)
    expect(parsed[0].title).toBe('Test Task')
  })

  it('should save to localStorage on delete', () => {
    const { addTask, deleteTask, tasks } = useTasks()
    
    addTask('Test Task')
    const taskId = tasks.value[0].id
    deleteTask(taskId)
    
    const saved = localStorage.getItem('task-dashboard-tasks')
    expect(saved).toBeTruthy()
    const parsed = JSON.parse(saved!)
    expect(parsed).toHaveLength(0)
  })

  it('should load from localStorage', async () => {
    // First session: add tasks
    const session1 = useTasks()
    session1.addTask('Task 1')
    session1.addTask('Task 2')
    
    // Second session: load tasks
    const session2 = useTasks()
    await session2.loadInitialTasks()
    
    expect(session2.tasks.value).toHaveLength(2)
    expect(session2.tasks.value[0].title).toBe('Task 1')
    expect(session2.tasks.value[1].title).toBe('Task 2')
  })

  it('should load from API when no localStorage data', async () => {
    const mockTodos = [
      { id: 1, title: 'API Task 1', completed: false },
      { id: 2, title: 'API Task 2', completed: true }
    ]
    
    global.$fetch = vi.fn().mockResolvedValue(mockTodos)
    
    const { loadInitialTasks, tasks } = useTasks()
    await loadInitialTasks()
    
    expect(tasks.value).toHaveLength(2)
    expect(tasks.value[0].title).toBe('API Task 1')
    expect(tasks.value[1].title).toBe('API Task 2')
  })
})
