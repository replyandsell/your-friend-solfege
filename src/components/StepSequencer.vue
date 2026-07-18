<script setup>
import { ref, onUnmounted } from 'vue'
import { audioEngine } from '../audio/AudioEngine'

const bpm = ref(100)
const isPlaying = ref(false)
const currentStep = ref(-1)
const stepSize = 16

// Три дорожки: kick (удары на 1, 5, 9, 13), snare (на 5, 13), hi-hat (на каждый)
const kickSteps = ref([true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false])
const snareSteps = ref([false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false])
const hihatSteps = ref([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false])

function toggleStep(track, index) {
  if (track === 'kick') kickSteps.value[index] = !kickSteps.value[index]
  if (track === 'snare') snareSteps.value[index] = !snareSteps.value[index]
  if (track === 'hihat') hihatSteps.value[index] = !hihatSteps.value[index]
}

function togglePlay() {
  if (isPlaying.value) {
    audioEngine.stopMetronome()
    isPlaying.value = false
    currentStep.value = -1
  } else {
    isPlaying.value = true
    currentStep.value = 0
    audioEngine.startMetronome((beatIndex) => {
      currentStep.value = beatIndex % stepSize
    })
  }
}

function setBpm(value) {
  audioEngine.setBpm(value)
}

function resetSteps() {
  kickSteps.value = [true, false, false, false, true, false, false, false, true, false, false, false, true, false, false, false]
  snareSteps.value = [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false]
  hihatSteps.value = [true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
}

onUnmounted(() => {
  audioEngine.stopMetronome()
})
</script>

<template>
  <div class="border border-surface2 rounded-lg p-6 bg-surface">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-lg font-semibold">Step Sequencer</h3>
      <button
        @click="togglePlay"
        class="px-4 py-2 rounded-lg text-bg font-medium transition"
        :class="isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-accent hover:opacity-90'"
      >
        {{ isPlaying ? 'Стоп' : 'Играть' }}
      </button>
    </div>

    <div class="mb-4 flex items-center gap-4">
      <label class="text-sm text-textDim">Темп: {{ bpm }} BPM</label>
      <input
        type="range"
        min="60"
        max="160"
        v-model.number="bpm"
        @input="setBpm(bpm)"
        class="w-32"
      />
    </div>

    <div class="space-y-4">
      <div>
        <div class="text-xs font-medium text-textDim mb-2">Kick (низкий удар)</div>
        <div class="grid grid-cols-16 gap-1">
          <button
            v-for="i in stepSize"
            :key="`kick-${i}`"
            @click="toggleStep('kick', i - 1)"
            class="w-6 h-6 rounded transition"
            :class="kickSteps[i - 1] ? 'bg-accent border-2 border-accent' : 'bg-surface2 border-2 border-surface2'"
          />
        </div>
      </div>

      <div>
        <div class="text-xs font-medium text-textDim mb-2">Snare (удар в центр)</div>
        <div class="grid grid-cols-16 gap-1">
          <button
            v-for="i in stepSize"
            :key="`snare-${i}`"
            @click="toggleStep('snare', i - 1)"
            class="w-6 h-6 rounded transition"
            :class="snareSteps[i - 1] ? 'bg-accent2 border-2 border-accent2' : 'bg-surface2 border-2 border-surface2'"
          />
        </div>
      </div>

      <div>
        <div class="text-xs font-medium text-textDim mb-2">Hi-Hat (металлический звук)</div>
        <div class="grid grid-cols-16 gap-1">
          <button
            v-for="i in stepSize"
            :key="`hihat-${i}`"
            @click="toggleStep('hihat', i - 1)"
            class="w-6 h-6 rounded transition"
            :class="hihatSteps[i - 1] ? 'bg-yellow-400 border-2 border-yellow-400' : 'bg-surface2 border-2 border-surface2'"
          />
        </div>
      </div>
    </div>

    <button
      @click="resetSteps"
      class="mt-6 px-3 py-1 rounded-lg bg-surface2 hover:bg-surface transition text-sm"
    >
      Сбросить на дефолт
    </button>
  </div>
</template>

<style scoped>
.grid-cols-16 {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
}
</style>