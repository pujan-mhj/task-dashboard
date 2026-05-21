import { defineStore } from 'pinia'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: number
  type: NotificationType
  message: string
  duration: number
  dismissible: boolean
}

export interface NotificationOptions {
  duration?: number
  dismissible?: boolean
}

export const useNotificationStore = defineStore('notifications', () => {
  // State
  const notifications = ref<Notification[]>([])
  const maxVisible = ref<number>(3)
  const nextId = ref(1)

  // Timers map to track auto-dismiss timeouts
  const timers = new Map<number, ReturnType<typeof setTimeout>>()

  // Actions
  const notify = (
    type: NotificationType, 
    message: string, 
    options: NotificationOptions = {}
  ) => {
    const notification: Notification = {
      id: nextId.value++,
      type,
      message,
      duration: options.duration ?? 3000,
      dismissible: options.dismissible ?? true
    }

    // Add notification
    notifications.value.push(notification)

    // Enforce max visible limit
    if (notifications.value.length > maxVisible.value) {
      const oldest = notifications.value[0]
      dismiss(oldest.id)
    }

    // Auto-dismiss after duration
    if (notification.duration > 0) {
      const timer = setTimeout(() => {
        dismiss(notification.id)
      }, notification.duration)
      
      timers.set(notification.id, timer)
    }

    return notification.id
  }

  const dismiss = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    
    if (index !== -1) {
      notifications.value.splice(index, 1)
      
      // Clear timer if exists
      const timer = timers.get(id)
      if (timer) {
        clearTimeout(timer)
        timers.delete(id)
      }
    }
  }

  const clearAll = () => {
    // Clear all timers
    timers.forEach(timer => clearTimeout(timer))
    timers.clear()
    
    // Clear notifications
    notifications.value = []
  }

  const setMaxVisible = (max: number) => {
    if (max > 0) {
      maxVisible.value = max
      
      // Trim excess notifications
      while (notifications.value.length > maxVisible.value) {
        const oldest = notifications.value[0]
        dismiss(oldest.id)
      }
    }
  }

  return {
    // State
    notifications,
    maxVisible,
    
    // Actions
    notify,
    dismiss,
    clearAll,
    setMaxVisible
  }
})
