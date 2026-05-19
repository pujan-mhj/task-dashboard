import { defineStore, skipHydrate } from 'pinia'
import { watch } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'
export type SortBy = 'date' | 'title' | 'status'
export type SortDirection = 'asc' | 'desc'
export type FilterStatus = 'all' | 'active' | 'completed'

export interface PreferencesState {
  theme: ThemeMode
  sortBy: SortBy
  sortDirection: SortDirection
  filterStatus: FilterStatus
}

export const defaultPreferencesState: PreferencesState = {
  theme: 'system',
  sortBy: 'date',
  sortDirection: 'desc',
  filterStatus: 'all'
}

export const usePreferencesStore = defineStore('preferences', () => {
  // State
  // Omit from Nuxt payload so SSR defaults cannot overwrite before localStorage hydrate.
  const theme = skipHydrate(ref<ThemeMode>(defaultPreferencesState.theme))
  const sortBy = ref<SortBy>(defaultPreferencesState.sortBy)
  const sortDirection = ref<SortDirection>(defaultPreferencesState.sortDirection)
  const filterStatus = ref<FilterStatus>(defaultPreferencesState.filterStatus)

  // Getters
  const isDarkMode = computed(() => {
    if (theme.value === 'dark') return true
    if (theme.value === 'light') return false
    
    // System preference
    if (import.meta.client) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    return false
  })

  const activeSortLabel = computed(() => {
    const labels: Record<SortBy, string> = {
      date: 'Date',
      title: 'Title',
      status: 'Status'
    }
    
    const arrow = sortDirection.value === 'asc' ? '↑' : '↓'
    return `${labels[sortBy.value]} ${arrow}`
  })

  // Actions
  const applyThemeToHtml = (mode: ThemeMode) => {
    if (!import.meta.client) return
    const html = document.documentElement

    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      html.classList.toggle('dark', prefersDark)
      return
    }

    html.classList.toggle('dark', mode === 'dark')
  }

  const setTheme = (newTheme: ThemeMode): void => {
    theme.value = newTheme

    applyThemeToHtml(newTheme)
  }

  const setSortBy = (field: SortBy, direction?: SortDirection): void => {
    sortBy.value = field
    if (direction) {
      sortDirection.value = direction
    }
  }

  const setSortByFieldAndDirection = (field: SortBy, direction: SortDirection): void => {
    sortBy.value = field
    sortDirection.value = direction
  }

  const setFilter = (status: FilterStatus): void => {
    filterStatus.value = status
  }

  const resetDefaults = (): void => {
    theme.value = defaultPreferencesState.theme
    sortBy.value = defaultPreferencesState.sortBy
    sortDirection.value = defaultPreferencesState.sortDirection
    filterStatus.value = defaultPreferencesState.filterStatus

    applyThemeToHtml(theme.value)
  }

  // Keep <html class="dark"> in sync whenever theme changes (setTheme, localStorage hydrate, etc.)
  if (import.meta.client) {
    watch(
      theme,
      (mode) => {
        applyThemeToHtml(mode)
      },
      { immediate: true }
    )

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') {
        applyThemeToHtml('system')
      }
    })
  }

  return {
    // State
    theme,
    sortBy,
    sortDirection,
    filterStatus,
    
    // Getters
    isDarkMode,
    activeSortLabel,
    
    // Actions
    setTheme,
    setSortBy: setSortByFieldAndDirection,
    setFilter,
    resetDefaults
  }
})
