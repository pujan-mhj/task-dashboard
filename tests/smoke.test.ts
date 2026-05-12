import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useTasks, resetTaskState } from '~/composables/useTasks'

/**
 * Smoke Tests - High-level integration tests
 * These tests verify that all major features work together correctly
 */

describe('Smoke Tests - Complete User Flows', () => {
  beforeEach(() => {
    resetTaskState()
    localStorage.clear()
    vi.clearAllMocks()
  })

  describe('Task Management Flow', () => {
    it('should complete full task lifecycle: add, edit, toggle, delete', () => {
      const { addTask, editTask, toggleTask, deleteTask, tasks } = useTasks()
      
      // Add task
      addTask('Buy groceries')
      expect(tasks.value).toHaveLength(1)
      expect(tasks.value[0].title).toBe('Buy groceries')
      expect(tasks.value[0].completed).toBe(false)
      
      const taskId = tasks.value[0].id
      
      // Edit task
      editTask(taskId, 'Buy groceries and cook dinner')
      expect(tasks.value[0].title).toBe('Buy groceries and cook dinner')
      
      // Toggle completion
      toggleTask(taskId)
      expect(tasks.value[0].completed).toBe(true)
      
      // Delete task
      deleteTask(taskId)
      expect(tasks.value).toHaveLength(0)
    })

    it('should handle multiple tasks correctly', () => {
      const { addTask, toggleTask, deleteTask, tasks, completedCount, pendingCount } = useTasks()
      
      // Add multiple tasks
      addTask('Task 1')
      addTask('Task 2')
      addTask('Task 3')
      
      expect(tasks.value).toHaveLength(3)
      expect(pendingCount.value).toBe(3)
      expect(completedCount.value).toBe(0)
      
      // Complete some tasks
      toggleTask(tasks.value[0].id)
      toggleTask(tasks.value[1].id)
      
      expect(completedCount.value).toBe(2)
      expect(pendingCount.value).toBe(1)
      
      // Delete a task
      deleteTask(tasks.value[2].id)
      
      expect(tasks.value).toHaveLength(2)
      expect(completedCount.value).toBe(2)
      expect(pendingCount.value).toBe(0)
    })
  })

  describe('Dashboard Statistics Flow', () => {
    it('should update dashboard stats in real-time', () => {
      const { 
        addTask, 
        toggleTask, 
        deleteTask, 
        tasks,
        totalCount, 
        completedCount, 
        pendingCount, 
        completionPercentage 
      } = useTasks()
      
      // Initial state
      expect(totalCount.value).toBe(0)
      expect(completionPercentage.value).toBe(0)
      
      // Add tasks
      addTask('Task 1')
      addTask('Task 2')
      addTask('Task 3')
      addTask('Task 4')
      
      expect(totalCount.value).toBe(4)
      expect(pendingCount.value).toBe(4)
      expect(completedCount.value).toBe(0)
      expect(completionPercentage.value).toBe(0)
      
      // Complete half
      toggleTask(tasks.value[0].id)
      toggleTask(tasks.value[1].id)
      
      expect(completedCount.value).toBe(2)
      expect(pendingCount.value).toBe(2)
      expect(completionPercentage.value).toBe(50)
      
      // Complete all
      toggleTask(tasks.value[2].id)
      toggleTask(tasks.value[3].id)
      
      expect(completedCount.value).toBe(4)
      expect(pendingCount.value).toBe(0)
      expect(completionPercentage.value).toBe(100)
      
      // Delete one
      deleteTask(tasks.value[0].id)
      
      expect(totalCount.value).toBe(3)
      expect(completedCount.value).toBe(3)
      expect(completionPercentage.value).toBe(100)
    })
  })

  describe('LocalStorage Persistence Flow', () => {
    it('should persist tasks across sessions', async () => {
      // Session 1: Create tasks
      const session1 = useTasks()
      session1.addTask('Persistent Task 1')
      session1.addTask('Persistent Task 2')
      session1.toggleTask(session1.tasks.value[0].id)
      
      expect(session1.tasks.value).toHaveLength(2)
      expect(session1.completedCount.value).toBe(1)
      
      // Verify localStorage
      const saved = localStorage.getItem('task-dashboard-tasks')
      expect(saved).toBeTruthy()
      
      // Session 2: Load tasks
      const session2 = useTasks()
      await session2.loadInitialTasks()
      
      expect(session2.tasks.value).toHaveLength(2)
      expect(session2.tasks.value[0].title).toBe('Persistent Task 1')
      expect(session2.tasks.value[0].completed).toBe(true)
      expect(session2.tasks.value[1].title).toBe('Persistent Task 2')
      expect(session2.tasks.value[1].completed).toBe(false)
    })

    it('should persist empty task list', async () => {
      // Session 1: Add and delete all tasks
      const session1 = useTasks()
      session1.addTask('Temporary Task')
      session1.deleteTask(session1.tasks.value[0].id)
      
      expect(session1.tasks.value).toHaveLength(0)
      
      // Session 2: Should load empty list (not fetch from API)
      const session2 = useTasks()
      await session2.loadInitialTasks()
      
      expect(session2.tasks.value).toHaveLength(0)
    })
  })

  describe('API Integration Flow', () => {
    it('should load initial tasks from API on first visit', async () => {
      const mockTodos = [
        { id: 1, title: 'API Task 1', completed: false },
        { id: 2, title: 'API Task 2', completed: true },
        { id: 3, title: 'API Task 3', completed: false }
      ]
      
      global.$fetch = vi.fn().mockResolvedValue(mockTodos)
      
      const { loadInitialTasks, tasks, completedCount, pendingCount } = useTasks()
      await loadInitialTasks()
      
      expect(tasks.value).toHaveLength(3)
      expect(tasks.value[0].title).toBe('API Task 1')
      expect(completedCount.value).toBe(1)
      expect(pendingCount.value).toBe(2)
      
      // Verify saved to localStorage
      const saved = localStorage.getItem('task-dashboard-tasks')
      expect(saved).toBeTruthy()
    })

    it('should handle API failure gracefully', async () => {
      global.$fetch = vi.fn().mockRejectedValue(new Error('API Error'))
      
      const { loadInitialTasks, tasks } = useTasks()
      
      // Should not throw
      await expect(loadInitialTasks()).resolves.not.toThrow()
      
      // Should have empty task list
      expect(tasks.value).toHaveLength(0)
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid task additions', () => {
      const { addTask, tasks } = useTasks()
      
      for (let i = 1; i <= 100; i++) {
        addTask(`Task ${i}`)
      }
      
      expect(tasks.value).toHaveLength(100)
      expect(tasks.value[0].title).toBe('Task 1')
      expect(tasks.value[99].title).toBe('Task 100')
    })

    it('should handle task with special characters', () => {
      const { addTask, editTask, tasks } = useTasks()
      
      const specialTitle = 'Task with "quotes" & <tags> and émojis 🎉'
      addTask(specialTitle)
      
      expect(tasks.value[0].title).toBe(specialTitle)
      
      // Edit with more special chars
      const newTitle = "Updated: it's a test! @#$%^&*()"
      editTask(tasks.value[0].id, newTitle)
      
      expect(tasks.value[0].title).toBe(newTitle)
    })

    it('should handle very long task titles', () => {
      const { addTask, tasks } = useTasks()
      
      const longTitle = 'A'.repeat(500)
      addTask(longTitle)
      
      expect(tasks.value[0].title).toBe(longTitle)
      expect(tasks.value[0].title.length).toBe(500)
    })

    it('should maintain task order', () => {
      const { addTask, tasks } = useTasks()
      
      addTask('First')
      addTask('Second')
      addTask('Third')
      
      expect(tasks.value[0].title).toBe('First')
      expect(tasks.value[1].title).toBe('Second')
      expect(tasks.value[2].title).toBe('Third')
    })

    it('should handle toggling same task multiple times', () => {
      const { addTask, toggleTask, tasks } = useTasks()
      
      addTask('Toggle Test')
      const taskId = tasks.value[0].id
      
      // Toggle 10 times
      for (let i = 0; i < 10; i++) {
        toggleTask(taskId)
      }
      
      // Should be completed (even number of toggles)
      expect(tasks.value[0].completed).toBe(false)
    })
  })

  describe('Data Validation', () => {
    it('should reject invalid task operations', () => {
      const { addTask, editTask, toggleTask, deleteTask, tasks } = useTasks()
      
      // Empty title
      expect(addTask('')).toBe(false)
      expect(addTask('   ')).toBe(false)
      
      // Add valid task
      addTask('Valid Task')
      const taskId = tasks.value[0].id
      
      // Edit with empty title
      expect(editTask(taskId, '')).toBe(false)
      expect(editTask(taskId, '   ')).toBe(false)
      expect(tasks.value[0].title).toBe('Valid Task')
      
      // Operations on non-existent task
      toggleTask(99999) // Should not throw
      deleteTask(99999) // Should not throw
      expect(editTask(99999, 'New Title')).toBe(false)
      
      expect(tasks.value).toHaveLength(1)
    })
  })
})
