import { ref, computed } from 'vue'

export function useQuiz(items) {
  const currentIndex = ref(null)
  const selected = ref(null)
  const answered = ref(false)
  const score = ref(0)
  const attempts = ref(0)

  const current = computed(() => (currentIndex.value === null ? null : items[currentIndex.value]))
  const isCorrect = computed(() => answered.value && selected.value === current.value?.answer)

  function nextQuestion() {
    let idx = Math.floor(Math.random() * items.length)
    if (items.length > 1) {
      while (idx === currentIndex.value) {
        idx = Math.floor(Math.random() * items.length)
      }
    }
    currentIndex.value = idx
    selected.value = null
    answered.value = false
    return items[idx]
  }

  function submitAnswer(value) {
    if (answered.value || current.value === null) return
    selected.value = value
    answered.value = true
    attempts.value++
    if (value === current.value.answer) score.value++
  }

  function resetScore() {
    score.value = 0
    attempts.value = 0
  }

  return { current, selected, answered, isCorrect, score, attempts, nextQuestion, submitAnswer, resetScore }
}
