<script setup>
import { ref, onUnmounted } from 'vue'
import { audioEngine } from '../audio/AudioEngine'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
const isPlaying = ref(false)
const activeBeat = ref(-1)
const bpm = ref(100)

const rhythmActive = ref(false)
const rhythmTaps = ref([])
const rhythmMessage = ref('')

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

function startRhythm() {
  rhythmActive.value = true
  rhythmTaps.value = []
  rhythmMessage.value = ''
  audioEngine.startMetronome()
}

function tapRhythm() {
  if (!rhythmActive.value) return
  rhythmTaps.value.push(1)
  
  if (rhythmTaps.value.length >= 8) {
    rhythmActive.value = false
    audioEngine.stopMetronome()
    rhythmMessage.value = '✓ Хорошо! Все 8 ударов попали.'
  }
}

function resetRhythm() {
  rhythmActive.value = false
  rhythmTaps.value = []
  rhythmMessage.value = ''
  audioEngine.stopMetronome()
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
        <div
          v-for="i in 4"
          :key="i"
          class="w-10 h-10 rounded-full border-2 border-surface2 transition-colors"
          :class="activeBeat === i - 1 ? 'bg-accent border-accent' : 'bg-surface'"
        />
      </div>

      <button
        @click="toggleMetronome"
        class="px-5 py-2.5 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition mb-4"
      >
        {{ isPlaying ? 'Остановить' : 'Запустить' }} метроном
      </button>

      <div class="text-sm text-textDim mb-2">
        Темп: {{ bpm }} BPM
      </div>
      <input
        type="range"
        min="60"
        max="160"
        v-model.number="bpm"
        @input="updateBpm"
        class="w-full"
      />

      <div class="mt-8 border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-4">Упражнение: Повтори пульс</h3>
        
        <div v-if="!rhythmActive" class="space-y-3">
          <p class="text-sm text-textDim">Метроном запустится. Нажимай кнопку или пробел в ритм 8 раз.</p>
          <button @click="startRhythm" class="px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Начать
          </button>
        </div>

        <div v-else class="space-y-3">
          <div class="flex gap-2">
            <div v-for="i in 8" :key="i" class="w-7 h-7 rounded-full border-2 transition-colors" :class="rhythmTaps.length > i - 1 ? 'bg-accent border-accent' : 'bg-surface2 border-surface2'" />
          </div>
          <button @click="tapRhythm" class="px-4 py-2 rounded-lg bg-accent2 text-bg font-medium hover:opacity-90 transition">
            Тап ({{ rhythmTaps.length }}/8)
          </button>
          <button @click="resetRhythm" class="px-4 py-2 rounded-lg bg-surface2 hover:bg-surface transition text-sm">
            Отмена
          </button>
        </div>

        <p v-if="rhythmMessage" class="mt-3 text-accent font-medium">{{ rhythmMessage }}</p>
      </div>
    </div>
  </div>
</template>
