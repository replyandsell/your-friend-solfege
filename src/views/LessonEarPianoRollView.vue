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
    notes: ['C4', 'D4', 'E4', 'C4', 'E4', 'D4', 'C4'],
    answer: 'a',
    options: [
      { label: 'до–ре–ми–до–ми–ре–до', value: 'a' },
      { label: 'до–ре–ми–до–фа–ре–до', value: 'b' },
      { label: 'до–ми–ре–до–ми–ре–до', value: 'c' },
    ],
  },
  {
    notes: ['G4', 'E4', 'C4', 'D4', 'G3'],
    answer: 'a',
    options: [
      { label: 'соль–ми–до–ре–соль (вниз)', value: 'a' },
      { label: 'соль–ми–до–ре–соль (вверх)', value: 'b' },
      { label: 'соль–фа–до–ре–соль (вниз)', value: 'c' },
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
      <h2 class="text-2xl font-semibold mb-2">Урок 123: Воспроизведение услышанного в piano roll</h2>
      <p class="text-textDim mb-6">Финальный квиз модуля ear training: соедини всё, что тренировал — направление, интервалы, ступени — в один финальный тест.</p>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Финальный квиз</h3>
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
        <h3 class="text-lg font-semibold mb-3">Путь от слуха к нотам</h3>
        <p class="text-sm text-textDim">
          1) Определи направление мелодии (урок 108). 2) Найди тонику и первую ступень (урок 110). 3) Считай интервалы между соседними нотами (урок 109), а не абсолютную высоту.
          4) Расставь ноты по вертикали в piano roll — расстояние между клавишами повторяет расстояние между интервалами. 5) Проверь ритм отдельно (урок 112) и подгони длительности по сетке.
          Освоив эти пять шагов, ты сможешь перенести практически любую услышанную идею — свою или чужую — прямо в проект DAW.
        </p>
      </div>
    </div>
  </div>
</template>
