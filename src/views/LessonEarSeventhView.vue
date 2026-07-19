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
  { notes: ['C4', 'E4', 'G4', 'B4'], answer: 'maj7' },
  { notes: ['C4', 'E4', 'G4', 'Bb4'], answer: 'dom7' },
  { notes: ['C4', 'Eb4', 'G4', 'Bb4'], answer: 'min7' },
  { notes: ['C4', 'Eb4', 'Gb4', 'Bb4'], answer: 'halfdim' },
  { notes: ['C4', 'Eb4', 'Gb4', 'A4'], answer: 'dim7' },
]
const options = [
  { label: 'maj7 — мягкий', value: 'maj7' },
  { label: '7 — доминантовый', value: 'dom7' },
  { label: 'm7 — тёплый', value: 'min7' },
  { label: 'm7♭5 — неустойчивый', value: 'halfdim' },
  { label: 'dim7 — самый острый', value: 'dim7' },
]

const quiz = useQuiz(items)

async function playCurrent() {
  await initSynth()
  synth.triggerAttackRelease(quiz.current.value.notes, '1.1', Tone.now())
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
      <h2 class="text-2xl font-semibold mb-2">Урок 117: Определение септаккордов</h2>
      <p class="text-textDim mb-6">Пять типов септаккордов из урока 56 — теперь послушай их вразнобой и тренируй быстрое узнавание.</p>

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
              v-for="opt in options"
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
            {{ quiz.isCorrect.value ? 'Верно!' : `Неверно. Правильный ответ: ${options.find(o => o.value === quiz.current.value.answer).label}` }}
          </p>
          <button v-if="quiz.answered.value" @click="startQuestion" class="block w-full mt-3 px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Следующий вопрос →
          </button>
        </template>
      </div>

      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Как тренироваться</h3>
        <p class="text-sm text-textDim">
          Ключевой признак — качество терции (мажор/минор) и качество септимы (большая/малая) на самом верху аккорда.
        </p>
      </div>
    </div>
  </div>
</template>
