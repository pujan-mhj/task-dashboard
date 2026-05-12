import type { PiniaPluginContext } from 'pinia'
import type { Task } from '~/stores/useTaskStore'
import { defaultPreferencesState, type PreferencesState } from '~/stores/usePreferencesStore'

type PersistedSchema = {
  version: 1
  savedAt: string
  data: unknown
}

const STORAGE_PREFIX = 'task-dashboard:pinia:'
const WRITE_DEBOUNCE_MS = 1000

function debounce<T extends (...args: any[]) => void>(fn: T, waitMs: number) {
  let t: ReturnType<typeof setTimeout> | undefined
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => fn(...args), waitMs)
  }
}

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function deepMergeDefaults<T extends Record<string, any>>(defaults: T, incoming: Partial<T>): T {
  const out: any = Array.isArray(defaults) ? [...defaults] : { ...defaults }
  for (const key of Object.keys(incoming) as (keyof T)[]) {
    const vIncoming = incoming[key]
    const vDefault = defaults[key]
    if (vIncoming === undefined) continue
    if (
      vIncoming &&
      vDefault &&
      typeof vIncoming === 'object' &&
      typeof vDefault === 'object' &&
      !Array.isArray(vIncoming) &&
      !Array.isArray(vDefault)
    ) {
      out[key] = deepMergeDefaults(vDefault, vIncoming as any)
    } else {
      out[key] = vIncoming
    }
  }
  return out
}

function reviveTasks(payload: unknown): { tasks: Task[] } | null {
  if (!payload || typeof payload !== 'object') return null
  const tasks = (payload as any).tasks
  if (!Array.isArray(tasks)) return null
  return {
    tasks: tasks
      .filter((t) => t && typeof t === 'object')
      .map((t: any) => ({
        id: Number(t.id),
        title: String(t.title ?? ''),
        completed: Boolean(t.completed),
        createdAt: new Date(t.createdAt ?? Date.now())
      }))
  }
}

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const pinia = usePinia()
  const writeFns = new Map<string, () => void>()

  pinia.use(({ store }: PiniaPluginContext) => {
    // Only persist specific stores (FR-6)
    if (store.$id !== 'preferences' && store.$id !== 'tasks') return

    const key = `${STORAGE_PREFIX}${store.$id}`

    // Hydrate (SSR-safe) and merge with defaults (new fields keep defaults)
    const raw = localStorage.getItem(key)
    const parsed = safeParse<PersistedSchema>(raw)
    if (parsed?.version === 1) {
      if (store.$id === 'preferences') {
        // Never structuredClone Pinia proxies (can throw "Proxy object could not be cloned")
        const merged = deepMergeDefaults(defaultPreferencesState, parsed.data as Partial<PreferencesState>)
        store.$patch(merged)
      }

      if (store.$id === 'tasks') {
        const revived = reviveTasks(parsed.data)
        if (revived) {
          store.$patch({ tasks: revived.tasks })
        }
      }
    }

    // Debounced persistence (NFR-4)
    const write = debounce(() => {
      let data: unknown

      if (store.$id === 'preferences') {
        data = store.$state
      } else {
        const tasks = (store.$state as any).tasks as Task[]
        data = {
          tasks: tasks.map((t) => ({
            id: t.id,
            title: t.title,
            completed: t.completed,
            createdAt: t.createdAt instanceof Date ? t.createdAt.toISOString() : new Date(t.createdAt).toISOString()
          }))
        }
      }

      const payload: PersistedSchema = {
        version: 1,
        savedAt: new Date().toISOString(),
        data
      }

      localStorage.setItem(key, JSON.stringify(payload))
    }, WRITE_DEBOUNCE_MS)

    writeFns.set(store.$id, write)

    store.$subscribe(() => {
      write()
    })
  })
})
