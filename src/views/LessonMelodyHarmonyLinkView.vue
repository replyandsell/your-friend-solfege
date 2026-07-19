<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let melodySynth = null
let chordSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  melodySynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.4 },
  }).toDestination()
  chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playOverC() {
  await initSynth()
  const now = Tone.now()
  chordSynth.triggerAttackRelease(['C4', 'E4', 'G4'], '1.0', now)
  melodySynth.triggerAttackRelease('G5', '0.9', now)
}

async function playOverF() {
  await initSynth()
  const now = Tone.now()
  chordSynth.triggerAttackRelease(['F4', 'A4', 'C5'], '1.0', now)
  melodySynth.triggerAttackRelease('G5', '0.9', now)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 81: Связь мелодии с аккордом</h2>
      <p class="text-textDim mb-6">Одна и та же нота мелодии звучит по-разному в зависимости от того, какой аккорд играет под ней в этот момент.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Одна нота соль — два аккорда</h3>
        <div class="space-y-3">
          <button @click="playOverC" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Соль над до-мажором — квинта, устойчиво
          </button>
          <button @click="playOverF" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Та же соль над фа-мажором — секста, мягкое напряжение
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Мелодия не существует отдельно от гармонии — её смысл всегда определяется тем, что звучит под ней. Именно поэтому при написании лида
          в DAW полезно держать аккорды видимыми (например, отдельным треком) и проверять на слух, как каждая нота мелодии соотносится с текущим аккордом: как опорная, проходящая или напряжённая.
        </p>
      </div>
    </div>
  </div>
</template>
