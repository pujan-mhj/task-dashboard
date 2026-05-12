<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useNotificationStore } from '~/stores/useNotificationStore'

const notificationStore = useNotificationStore()
const { notifications } = storeToRefs(notificationStore)

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return '✓'
    case 'error': return '✕'
    case 'warning': return '⚠'
    case 'info': return 'ℹ'
    default: return 'ℹ'
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['toast', `toast-${notification.type}`]"
        >
          <span class="toast-icon">{{ getIcon(notification.type) }}</span>
          <span class="toast-message">{{ notification.message }}</span>
          <button
            v-if="notification.dismissible"
            class="toast-dismiss"
            @click="notificationStore.dismiss(notification.id)"
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
  pointer-events: auto;
  backdrop-filter: blur(10px);
  font-size: 0.875rem;
  font-weight: 500;
}

.toast-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 700;
  flex-shrink: 0;
}

.toast-message {
  flex: 1;
  line-height: 1.4;
}

.toast-dismiss {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.6;
  transition: opacity 0.2s;
  font-size: 1rem;
  line-height: 1;
  flex-shrink: 0;
}

.toast-dismiss:hover {
  opacity: 1;
}

/* Toast types */
.toast-success {
  background: rgba(16, 185, 129, 0.95);
  color: white;
}

.toast-success .toast-icon {
  background: rgba(255, 255, 255, 0.2);
}

.toast-error {
  background: rgba(239, 68, 68, 0.95);
  color: white;
}

.toast-error .toast-icon {
  background: rgba(255, 255, 255, 0.2);
}

.toast-warning {
  background: rgba(245, 158, 11, 0.95);
  color: white;
}

.toast-warning .toast-icon {
  background: rgba(255, 255, 255, 0.2);
}

.toast-info {
  background: rgba(59, 130, 246, 0.95);
  color: white;
}

.toast-info .toast-icon {
  background: rgba(255, 255, 255, 0.2);
}

/* Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-move {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .toast-container {
    top: auto;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
  }

  .toast {
    min-width: auto;
    max-width: none;
  }

  .toast-enter-from {
    transform: translateY(100%);
  }

  .toast-leave-to {
    transform: translateY(100%) scale(0.8);
  }
}
</style>
