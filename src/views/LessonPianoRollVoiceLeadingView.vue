<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

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

async function playProgression(chords) {
  await initSynth()
  let now = Tone.now()
  for (const c of chords) {
    synth.triggerAttackRelease(c, '0.6', now)
    now += 0.7
  }
}

async function playJumpy() {
  await playProgression([['C4', 'E4', 'G4'], ['F4', 'A4', 'C5'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']])
}
async function playSmooth() {
  await playProgression([['C4', 'E4', 'G4'], ['C4', 'F4', 'A4'], ['B3', 'D4', 'G4'], ['C4', 'E4', 'G4']])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 132: Voice leading в piano roll</h2>
      <p class="text-textDim mb-6">В piano roll голосоведение видно глазами: если блоки нот скачут по вертикали далеко друг от друга — переход, скорее всего, звучит резко.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Сравни визуально и на слух</h3>
        <div class="space-y-3">
          <button @click="playJumpy" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Аккорды в основном виде — большие скачки по высоте
          </button>
          <button @click="playSmooth" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С обращениями — минимальное движение нот
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Практический совет</h3>
        <p class="text-sm text-textDim">
          Работая в piano roll, старайся визуально держать ноты аккордов в узком диапазоне по высоте от такта к такту — если видишь, что вся группа нот
          «прыгает» на новую высоту, попробуй заменить аккорд на его обращение (урок 55), чтобы хотя бы одна нота осталась на месте или сдвинулась минимально.
        </p>
      </div>
    </div>
  </div>
</template>
