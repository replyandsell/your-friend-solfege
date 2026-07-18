<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { audioEngine } from '../audio/AudioEngine'

const isStarted = ref(false)
const isFinished = ref(false)
const beatCount = ref(0)
const bpm = ref(100)
const feedbackText = ref('')
const feedbackType = ref('')
const taps = ref([])

let tapTimes = []
let expectedBeatTimes = []
let startTime = null

function getExpectedBeatTimes(beatCountTarget, tempoMs) {
  const times = []
  for (let i = 0; i < beatCountTarget; i++) {
    times.push(i * tempoMs)
  }
  return times
}

function startExercise() {
  isStarted.value = true
  isFinished.value = false
  feedbackText.value = ''
  tapTimes = []
  taps.value = []
  const tempoMs = (60000 / bpm.value)
  expectedBeatTimes = getExpectedBeatTimes(8, tempoMs)
  startTime = Date.now()

  audioEngine.startMetronome((beatIndex) => {
    beatCount.value = beatIndex
  })
}

function handleTap() {
  if (!isStarted.value || isFinished.value) return

  const tapTime = Date.now() - startTime
  tapTimes.push(tapTime)
  taps.value.push({ tapTime, beatIndex: beatCount.value })

  if (tapTimes.length >= expectedBeatTimes.length) {
    finishExercise()
  }
}

function finishExercise() {
  isFinished.value = true
  audioEngine.stopMetronome()

  const toleranceMs = 100
  let onTimeCount = 0

  tapTimes.forEach((tapTime, i) => {
    if (i >= expectedBeatTimes.length) return
    const expectedTime = expectedBeatTimes[i]
    const diff = tapTime - expectedTime

    if (Math.abs(diff) <= toleranceMs) {
      onTimeCount++
    }
  })

  const accuracy = Math.round((onTimeCount / expectedBeatTimes.length) * 100)

  if (accuracy === 100) {
    feedbackText.value = `🎯 Идеально! Все ${expectedBeatTimes.length} ударов точны.`
    feedbackType.value = 'good'
  } else if (accuracy >= 75) {
    feedbackText.value = `✓ Хорошо! ${onTimeCount} из ${expectedBeatTimes.length} ударов попали точно.`
    feedbackType.value = 'good'
  } else if (accuracy >= 50) {
    feedbackText.value = `△ Неплохо, но есть где развиваться. ${onTimeCount} из ${expectedBeatTimes.length} точных.`
    feedbackType.value = 'warning'
  } else {
    feedbackText.value = `Попробуй ещё. Сосредоточься на равномерности пульса.`
    feedbackType.value = 'error'
  }
}

function reset() {
  isStarted.value = false
  isFinished.value = false
  beatCount.value = 0
  feedbackText.value = ''
  taps.value = []
  tapTimes = []
  expectedBeatTimes = []
  startTime = null
  audioEngine.stopMetronome()
}

onUnmounted(() => {
  audioEngine.stopMetronome()
})
</script>

<template>
  <div class="border border-surface2 rounded-lg p-6 bg-surface">
    <h3 class="text-lg font-semibold mb-4">Упражнение: Повтори ритм</h3>

    <div v-if="!isStarted" class="space-y-4">
      <p class="text-sm text-textDim">
        Слушай метроном и тапай в ритм. Нажимай пробел или кнопку 8 раз в такт с метрономом.
      </p>
      <div class="flex items-center gap-4">
        <label class="text-sm">Темп: {{ bpm }} BPM</label>
        <input
          type="range"
          min="60"
          max="160"
          v-model.number="bpm"
          class="w-32"
        />
      </div>
      <button
        @click="startExercise"
        class="px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition"
      >
        Начать
      </button>
    </div>

    <div v-else-if="!isFinished" class="space-y-4">
      <p class="text-sm text-textDim">
        Тапай сейчас! (пробел или кнопка)
      </p>
      <div class="flex gap-3 mb-4">
        <div
          v-for="i in 8"
          :key="i"
          class="w-8 h-8 rounded-full border-2 border-surface2 transition-colors"
          :class="{
            'bg-accent border-accent': taps.length > i - 1,
            'bg-surface': taps.length <= i - 1,
          }"
        />
      </div>
      <button
        @click="handleTap"
        class="px-4 py-2 rounded-lg bg-accent2 text-bg font-medium hover:opacity-90 transition"
      >
        Тап
      </button>
    </div>

    <div v-else class="space-y-4">
      <p
        :class="[
          'font-medium',
          feedbackType === 'good' ? 'text-accent' : feedbackType === 'warning' ? 'text-yellow-400' : 'text-red-400',
        ]"
      >
        {{ feedbackText }}
      </p>
      <button
        @click="reset"
        class="px-4 py-2 rounded-lg bg-surface2 hover:bg-surface transition"
      >
        Попробовать снова
      </button>
    </div>
  </div>
</template>