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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.5 },
  }).toDestination()
  isInitialized.value = true
}

async function playMinor() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('A4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('C5', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('E5', '0.3', now)
}

async function playMinor7() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('A4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('C5', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('E5', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('G5', '0.3', now)
}

async function playMinor9() {
  await initSynth()
  let now = Tone.now()
  synth.triggerAttackRelease('A4', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('C5', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('E5', '0.3', now)
  now += 0.35
  synth.triggerAttackRelease('B5', '0.3', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 14: Минорные аккорды с добавками</h2>
      <p class="text-textDim mb-6">Минорные аккорды можно расширять: добавлять септы, ноны. Это добавляет глубину и сложность.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры</h3>
        <div class="space-y-3">
          <button @click="playMinor" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Am (ля-до-ми)
          </button>
          <button @click="playMinor7" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Am7 (ля-до-ми-соль)
          </button>
          <button @click="playMinor9" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Am9 (ля-до-ми-си)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Для продюсера</h3>
        <p class="text-sm text-textDim">Am7 и Am9 — любимые аккорды в электронной музыке. Они звучат более мягко и современно, чем простой Am.</p>
      </div>
    </div>
  </div>
</template>