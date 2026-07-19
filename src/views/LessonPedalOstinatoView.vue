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

async function playPedal() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['F4', 'A4', 'C5'],
    ['G4', 'B4', 'D5'],
    ['C4', 'E4', 'G4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    bassSynth.triggerAttackRelease('C3', 0.75, now)
    synth.triggerAttackRelease(chord, 0.65, now)
    now += 0.8
  }
}

async function playOstinato() {
  await initSynth()
  const pattern = ['C3', 'G3', 'C3', 'Eb3']
  let now = Tone.now()
  for (let i = 0; i < 2; i++) {
    for (const note of pattern) {
      bassSynth.triggerAttackRelease(note, 0.2, now)
      now += 0.25
    }
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 62: Педальный тон и остинато</h2>
      <p class="text-textDim mb-6">Два способа держать бас на месте, пока гармония наверху меняется — или наоборот, повторять узнаваемый рисунок.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Педаль против остинато</h3>
        <div class="space-y-3">
          <button @click="playPedal" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Педальный тон — бас держит одну ноту, аккорды меняются
          </button>
          <button @click="playOstinato" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Остинато — короткий басовый рисунок повторяется без изменений
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Педальный тон создаёт ощущение якоря — гармония наверху может быть сколь угодно сложной, но бас держит слушателя в одной точке.
          Остинато, наоборот, само становится узнаваемым элементом — характерный приём техно и минимал-хауса, где именно повторяющийся басовый рифф держит трек, пока остальные слои меняются вокруг него.
        </p>
      </div>
    </div>
  </div>
</template>
