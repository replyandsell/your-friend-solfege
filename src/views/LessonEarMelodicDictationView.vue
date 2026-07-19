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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.4 },
  }).toDestination()
  isInitialized.value = true
}

function playSeq(notes, step = 0.28) {
  let now = Tone.now()
  for (const n of notes) {
    synth.triggerAttackRelease(n, step * 0.85, now)
    now += step
  }
}

const items = [
  {
    notes: ['C4', 'E4', 'D4', 'G4', 'E4', 'C4'],
    answer: 'a',
    options: [
      { label: 'до–ми–ре–соль–ми–до', value: 'a' },
      { label: 'до–ми–ре–фа–ми–до', value: 'b' },
      { label: 'до–ре–ми–соль–ми–до', value: 'c' },
    ],
  },
  {
    notes: ['E4', 'G4', 'F4', 'D4', 'C4'],
    answer: 'a',
    options: [
      { label: 'ми–соль–фа–ре–до', value: 'a' },
      { label: 'ми–соль–ля–ре–до', value: 'b' },
      { label: 'ми–фа–соль–ре–до', value: 'c' },
    ],
  },
  {
    notes: ['G4', 'E4', 'C4', 'D4', 'G4'],
    answer: 'a',
    options: [
      { label: 'соль–ми–до–ре–соль', value: 'a' },
      { label: 'соль–фа–до–ре–соль', value: 'b' },
      { label: 'соль–ми–до–си–соль', value: 'c' },
    ],
  },
]

const quiz = useQuiz(items)

async function playCurrent() {
  await initSynth()
  playSeq(quiz.current.value.notes)
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
      <h2 class="text-2xl font-semibold mb-2">Урок 113: Мелодический диктант</h2>
      <p class="text-textDim mb-6">Прослушай мелодию и выбери вариант нот, который её точно описывает — два других отличаются на одну ноту или на порядок.</p>

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
            {{ quiz.isCorrect.value ? 'Верно!' : 'Неверно, послушай ещё раз внимательнее и сравни с правильным вариантом (выделен зелёным).' }}
          </p>
          <button v-if="quiz.answered.value" @click="startQuestion" class="block w-full mt-3 px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Следующий вопрос →
          </button>
        </template>
      </div>

      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Как тренироваться</h3>
        <p class="text-sm text-textDim">
          Определи сначала направление движения мелодии, а потом уже точный интервал каждого шага — так проще отличить похожие варианты ответа друг от друга.
        </p>
      </div>
    </div>
  </div>
</template>
