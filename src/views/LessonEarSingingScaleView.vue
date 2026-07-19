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

const items = [
  { label: 'I', note: 'C4', answer: '1' },
  { label: 'II', note: 'D4', answer: '2' },
  { label: 'III', note: 'E4', answer: '3' },
  { label: 'IV', note: 'F4', answer: '4' },
  { label: 'V', note: 'G4', answer: '5' },
  { label: 'VI', note: 'A4', answer: '6' },
  { label: 'VII', note: 'B4', answer: '7' },
]

const quiz = useQuiz(items)

async function playCurrent() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('C4', '0.5', now)
  synth.triggerAttackRelease(quiz.current.value.note, '0.7', now + 0.6)
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
      <h2 class="text-2xl font-semibold mb-2">Урок 110: Пение ступеней относительно тоники</h2>
      <p class="text-textDim mb-6">Услышь тонику, затем ступень — спой её про себя и укажи номер ступени.</p>

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
          <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
            <button
              v-for="opt in items"
              :key="opt.answer"
              @click="quiz.submitAnswer(opt.answer)"
              :disabled="quiz.answered.value"
              class="px-2 py-2 rounded-lg font-medium transition"
              :class="[
                !quiz.answered.value ? 'bg-accent text-bg hover:opacity-90' : '',
                quiz.answered.value && opt.answer === quiz.current.value.answer ? 'bg-green-600 text-white' : '',
                quiz.answered.value && opt.answer === quiz.selected.value && opt.answer !== quiz.current.value.answer ? 'bg-red-600 text-white' : '',
                quiz.answered.value && opt.answer !== quiz.current.value.answer && opt.answer !== quiz.selected.value ? 'bg-surface2 text-textDim' : '',
              ]"
            >
              {{ opt.label }}
            </button>
          </div>
          <p v-if="quiz.answered.value" class="mt-3 text-sm" :class="quiz.isCorrect.value ? 'text-green-600' : 'text-red-600'">
            {{ quiz.isCorrect.value ? 'Верно!' : `Неверно. Правильный ответ: ${items.find(i => i.answer === quiz.current.value.answer).label}` }}
          </p>
          <button v-if="quiz.answered.value" @click="startQuestion" class="block w-full mt-3 px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Следующий вопрос →
          </button>
        </template>
      </div>

      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Как тренироваться</h3>
        <p class="text-sm text-textDim">
          Это ядро относительного слуха: умение находить любую ступень от заданной тоники без опоры на инструмент. Не спеши нажимать ответ —
          сначала пропой ступень голосом сам, потом сверься.
        </p>
      </div>
    </div>
  </div>
</template>
