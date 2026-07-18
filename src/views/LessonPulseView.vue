<script setup>
import { ref, onUnmounted } from 'vue'
import { audioEngine } from '../audio/AudioEngine'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
const isPlaying = ref(false)
const activeBeat = ref(-1)
const bpm = ref(100)

function toggleMetronome() {
  if (isPlaying.value) {
    audioEngine.stopMetronome()
    isPlaying.value = false
    activeBeat.value = -1
  } else {
    audioEngine.startMetronome((beatIndex) => {
      activeBeat.value = beatIndex % 4
    })
    isPlaying.value = true
  }
}

function updateBpm() {
  audioEngine.setBpm(bpm.value)
}

onUnmounted(() => {
  audioEngine.stopMetronome()
})
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />
    <div v-else class="max-w-md">
      <h2 class="text-2xl font-semibold mb-6">Пульс: внутренняя опора музыки</h2>
      <div class="flex gap-3 mb-6">
        <div v-for="i in 4" :key="i" class="w-10 h-10 rounded-full border-2 border-surface2 transition-colors" :class="activeBeat === i - 1 ? 'bg-accent border-accent' : 'bg-surface'" />
      </div>
      <button @click="toggleMetronome" class="px-5 py-2.5 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition mb-4">{{ isPlaying ? 'Остановить' : 'Запустить' }} метроном</button>
      <div class="text-sm text-textDim mb-2">Темп: {{ bpm }} BPM</div>
      <input type="range" min="60" max="160" v-model.number="bpm" @input="updateBpm" class="w-full" />
    </div>
  </div>
</template>