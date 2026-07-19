<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'
import { useQuiz } from '../composables/useQuiz'

const unlocked = ref(false)
let synth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.5 },
  }).toDestination()
  isInitialized.value = true
}

const items = [
  {
    chords: [['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4']],
    answer: 'a',
    options: [
      { label: 'Am – F – C – G', value: 'a' },
      { label: 'Am – Dm – C – G', value: 'b' },
      { label: 'Dm – F – C – G', value: 'c' },
    ],
  },
  {
    chords: [['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4']],
    answer: 'a',
    options: [
      { label: 'C – G – Am – F', value: 'a' },
      { label: 'C – G – F – Am', value: 'b' },
      { label: 'C – Em – Am – F', value: 'c' },
    ],
  },
  {
    chords: [['D4', 'F4', 'A4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']],
    answer: 'a',
    options: [
      { label: 'Dm – G – C', value: 'a' },
      { label: 'Dm – G – Am', value: 'b' },
      { label: 'Em – G – C', value: 'c' },
    ],
  },
]

const quiz = useQuiz(items)

async function playCurrent() {
  await initSynth()
  let now = Tone.now()
  for (const c of quiz.current.value.chords) {
    synth.triggerAttackRelease(c, '0.7', now)
    now += 0.8
  }
}

async function startQuestion() {
  quiz.nextQuestion()
  await playCurrent()
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 122: Снятие аккордов реального трека</h2>
      <p class="text-textDim mb-6">Прослушай прогрессию и выбери её точное буквенное обозначение среди похожих вариантов.</p>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Квиз</h3>
          <span class="text-sm text-textDim">Счёт: {{ quiz.score.value }} / {{ quiz.attempts.value }}</span>
        </div>

        <button v-if="!quiz.current.value" @click="startQuestion" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          Начать
        </button>

        <template v-else>
          <button @click="playCurrent" class="block w-full mb-4 px-4 py-2 rounded-lg border border-surface2 bg-surface2 text-text font-medium hover:opacity-90 transition">
            🔊 Слушать ещё раз
          </button>
          <div class="space-y-2">
            <button
              v-for="opt in quiz.current.value.options"
              :key="opt.value"
              @click="quiz.submitAnswer(opt.value)"
              :disabled="quiz.answered.value"
              class="block w-full px-4 py-2 rounded-lg font-medium transition"
              :class="[
                !quiz.answered.value ? 'bg-accent text-bg hover:opacity-90' : '',
                quiz.answered.value && opt.value === quiz.current.value.answer ? 'bg-green-600 text-white' : '',
                quiz.answered.value && opt.value === quiz.selected.value && opt.value !== quiz.current.value.answer ? 'bg-red-600 text-white' : '',
                quiz.answered.value && opt.value !== quiz.current.value.answer && opt.value !== quiz.selected.value ? 'bg-surface2 text-textDim' : '',
              ]"
            >
              {{ opt.label }}
            </button>
          </div>
          <p v-if="quiz.answered.value" class="mt-3 text-sm" :class="quiz.isCorrect.value ? 'text-green-600' : 'text-red-600'">
            {{ quiz.isCorrect.value ? 'Верно!' : 'Неверно, послушай ещё раз и сравни с правильным вариантом.' }}
          </p>
          <button v-if="quiz.answered.value" @click="startQuestion" class="block w-full mt-3 px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Следующий вопрос →
          </button>
        </template>
      </div>

      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Как тренироваться</h3>
        <p class="text-sm text-textDim">
          Сначала определи, мажор или минор каждый аккорд (урок 114), затем найди басовую ноту каждого (урок 120) — это уже почти полный ответ.
        </p>
      </div>
    </div>
  </div>
</template>
