<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'
import { useQuiz } from '../composables/useQuiz'

const unlocked = ref(false)
let click = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  click = new Tone.MembraneSynth({
    pitchDecay: 0.008,
    octaves: 2,
    envelope: { attack: 0.001, decay: 0.1, sustain: 0 },
  }).toDestination()
  isInitialized.value = true
}

function playHits(times) {
  const now = Tone.now()
  for (const t of times) {
    click.triggerAttackRelease('C2', '32n', now + t)
  }
}

const items = [
  { label: 'Простой — ровные доли', times: [0, 0.4, 0.8, 1.2], answer: 'simple' },
  { label: 'Синкопированный', times: [0, 0.3, 0.6, 1.0, 1.2], answer: 'syncopated' },
  { label: 'Сложный', times: [0, 0.2, 0.5, 0.6, 0.9, 1.3], answer: 'complex' },
]

const quiz = useQuiz(items)

async function playCurrent() {
  await initSynth()
  playHits(quiz.current.value.times)
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
      <h2 class="text-2xl font-semibold mb-2">Урок 112: Ритмический диктант</h2>
      <p class="text-textDim mb-6">Слушай рисунок ударов, прохлопай его в ладоши, а затем определи, к какому из трёх типов он относится.</p>

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
              v-for="opt in items"
              :key="opt.answer"
              @click="quiz.submitAnswer(opt.answer)"
              :disabled="quiz.answered.value"
              class="block w-full px-4 py-2 rounded-lg font-medium transition"
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
          Когда освоишься с квизом — пробуй сразу записывать услышанный ритм в piano roll своей DAW на пустой дорожке, ориентируясь на сетку тактов.
        </p>
      </div>
    </div>
  </div>
</template>
