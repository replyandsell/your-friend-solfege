import { reactive } from 'vue'

const STORAGE_KEY = 'solfege-progress-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

const state = reactive({
  completed: new Set(load()),
})

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.completed]))
  } catch {
    // localStorage недоступен (приватный режим, квота) - прогресс просто не сохранится
  }
}

export function useProgress() {
  function isCompleted(path) {
    return state.completed.has(path)
  }

  function markCompleted(path) {
    if (!path || state.completed.has(path)) return
    state.completed.add(path)
    persist()
  }

  function toggleCompleted(path) {
    if (!path) return
    if (state.completed.has(path)) {
      state.completed.delete(path)
    } else {
      state.completed.add(path)
    }
    persist()
  }

  function resetProgress() {
    state.completed.clear()
    persist()
  }

  return { state, isCompleted, markCompleted, toggleCompleted, resetProgress }
}
