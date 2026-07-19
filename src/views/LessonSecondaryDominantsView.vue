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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playPair(a, b) {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease(a, '0.7', now)
  synth.triggerAttackRelease(b, '0.9', now + 0.8)
}

async function playPlain() {
  await playPair(['G4', 'B4', 'D5'], ['C4', 'E4', 'G4'])
}

async function playSecondaryOfV() {
  await playPair(['D4', 'F#4', 'A4', 'C5'], ['G4', 'B4', 'D5'])
}

async function playSecondaryOfIi() {
  await playPair(['A3', 'C#4', 'E4', 'G4'], ['D4', 'F4', 'A4'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 66: Вторичные доминанты</h2>
      <p class="text-textDim mb-6">Можно взять «свою» доминанту не только для тоники, но и для любой другой ступени — это временно делает её звучание сильнее, ярче и обманчиво «в другой тональности».</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Одолженная доминанта</h3>
        <div class="space-y-3">
          <button @click="playPlain" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Обычная доминанта: G → C (V → I)
          </button>
          <button @click="playSecondaryOfV" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            V/V: D7 → G — «доминанта доминанты»
          </button>
          <button @click="playSecondaryOfIi" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            V/ii: A7 → Dm — доминанта к ii ступени
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Вторичная доминанта — это доминантсептаккорд, построенный не от I, а от любой другой ступени, который разрешается именно в неё, как будто она на секунду стала тоникой.
          Приём V/V (D7 → G) особенно часто встречается перед куда-то ведущим аккордом G в конце фразы — он делает переход более ярким и «взрослым», чем простое диатоническое движение.
        </p>
      </div>
    </div>
  </div>
</template>
