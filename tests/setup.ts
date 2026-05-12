import { vi } from 'vitest'
import { ref, computed, readonly, watch, nextTick, onMounted, onUnmounted } from 'vue'

// Make Vue functions globally available
global.ref = ref
global.computed = computed
global.readonly = readonly
global.watch = watch
global.nextTick = nextTick
global.onMounted = onMounted
global.onUnmounted = onUnmounted

// Mock Nuxt auto-imports
global.defineNuxtConfig = vi.fn()
global.useRuntimeConfig = vi.fn(() => ({}))
global.navigateTo = vi.fn()
global.definePageMeta = vi.fn()

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
})

// Mock process.client
Object.defineProperty(global, 'process', {
  value: {
    client: true,
    server: false
  }
})

// Mock $fetch
global.$fetch = vi.fn()
