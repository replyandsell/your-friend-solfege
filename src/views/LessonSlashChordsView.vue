<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let synth = null
let bassSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.3 },
  }).toDestination()
  isInitialized.value = true
}

async function playSlash(bass, chord) {
  await initSynth()
  const now = Tone.now()
  bassSynth.triggerAttackRelease(bass, 0.9, now)
  synth.triggerAttackRelease(chord, 0.9, now)
}

async function playWalkingBass() {
  await initSynth()
  const steps = [
    { bass: 'C3', chord: ['C4', 'E4', 'G4'] },
    { bass: 'D3', chord: ['C4', 'E4', 'G4'] },
    { bass: 'E3', chord: ['C4', 'E4', 'G4'] },
    { bass: 'F3', chord: ['F4', 'A4', 'C5'] },
  ]
  let now = Tone.now()
  for (const s of steps) {
    bassSynth.triggerAttackRelease(s.bass, 0.5, now)
    synth.triggerAttackRelease(s.chord, 0.5, now)
    now += 0.6
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 65: Slash chords и басовая нота</h2>
      <p class="text-textDim mb-6">Запись «аккорд/бас» значит: сыграй этот аккорд, но поставь в самый низ конкретную ноту — даже если её нет в самом аккорде.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">До мажор с разным басом</h3>
        <div class="space-y-3">
          <button @click="playSlash('C3', ['C4', 'E4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            C — обычное трезвучие, бас = до
          </button>
          <button @click="playSlash('E3', ['C4', 'E4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            C/E — тот же аккорд, бас = ми (нота из аккорда)
          </button>
          <button @click="playSlash('D3', ['C4', 'E4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            C/D — бас = ре, ноты которой нет в самом трезвучии
          </button>
          <button @click="playWalkingBass" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Восходящий бас под почти неизменную гармонию
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Slash chords — способ отделить басовую линию от гармонии наверху. В DAW это особенно удобно: можно оставить аккорды на месте и просто провести
          отдельную плавную басовую дорожку под ними — бас будет двигаться по своей логике, а гармония сверху останется узнаваемой.
        </p>
      </div>
    </div>
  </div>
</template>
