import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark' | 'system'
export type SortBy = 'date' | 'title' | 'status'
export type SortDirection = 'asc' | 'desc'
export type FilterStatus = 'all' | 'active' | 'completed'

export interface PreferencesState {
  theme: ThemeMode
  sortBy: SortBy
  sortDirection: SortDirection
  filterStatus: FilterStatus
  sidebarCollapsed: boolean
}

export const defaultPreferencesState: PreferencesState = {
  theme: 'system',
  sortBy: 'date',
  sortDirection: 'desc',
  filterStatus: 'all',
  sidebarCollapsed: false
}

export const usePreferencesStore = defineStore('preferences', () => {
  // State
  const theme = ref<ThemeMode>(defaultPreferencesState.theme)
  const sortBy = ref<SortBy>(defaultPreferencesState.sortBy)
  const sortDirection = ref<SortDirection>(defaultPreferencesState.sortDirection)
  const filterStatus = ref<FilterStatus>(defaultPreferencesState.filterStatus)
  const sidebarCollapsed = ref<boolean>(defaultPreferencesState.sidebarCollapsed)

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

  const toggleSidebar = (): void => {
    sidebarCollapsed.value = !sidebarCollapsed.value
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
    sidebarCollapsed.value = defaultPreferencesState.sidebarCollapsed

    applyThemeToHtml(theme.value)
  }

  // Initialize theme on client
  if (import.meta.client) {
    applyThemeToHtml(theme.value)
    
    // Watch for system theme changes
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
    sidebarCollapsed,
    
    // Getters
    isDarkMode,
    activeSortLabel,
    
    // Actions
    setTheme,
    toggleSidebar,
    setSortBy: setSortByFieldAndDirection,
    setFilter,
    resetDefaults
  }
})
