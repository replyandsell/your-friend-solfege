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

async function playChord(notes) {
  await initSynth()
  synth.triggerAttackRelease(notes, '1.0', Tone.now())
}

async function playAllFour() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4'],
    ['C4', 'Eb4', 'G4'],
    ['C4', 'Eb4', 'Gb4'],
    ['C4', 'E4', 'G#4'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, '0.7', now)
    now += 0.9
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 52: Трезвучия всех видов</h2>
      <p class="text-textDim mb-6">Всего четыре вида трезвучий. Расстояние между нотами внутри аккорда — это всё, что отличает светлое от мрачного и устойчивое от неустойчивого.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Четыре вида от ноты до</h3>
        <div class="space-y-3">
          <button @click="playChord(['C4', 'E4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Мажорное — большая терция + малая (до-ми-соль)
          </button>
          <button @click="playChord(['C4', 'Eb4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Минорное — малая терция + большая (до-ми♭-соль)
          </button>
          <button @click="playChord(['C4', 'Eb4', 'Gb4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Уменьшённое — две малых терции, звучит тревожно (до-ми♭-соль♭)
          </button>
          <button @click="playChord(['C4', 'E4', 'G#4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Увеличенное — две больших терции, звучит зависшим (до-ми-соль#)
          </button>
          <button @click="playAllFour" class="block w-full px-4 py-2 rounded-lg border border-surface2 bg-surface2 text-text font-medium hover:opacity-90 transition">
            Все четыре подряд — сравни разницу
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Мажор и минор — самые устойчивые и используются 90% времени. Уменьшённое трезвучие почти всегда требует разрешения — его редко оставляют «висеть».
          Увеличенное трезвучие звучит настолько неопределённо, что чаще используется как проходящий эффект или в саунд-дизайне, чем как опорный аккорд.
        </p>
      </div>
    </div>
  </div>
</template>
