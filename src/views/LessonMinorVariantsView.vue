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

function playScale(notes) {
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}

async function playNatural() {
  await initSynth()
  playScale(['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4'])
}

async function playHarmonic() {
  await initSynth()
  playScale(['A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G#4', 'A4'])
}

async function playMelodic() {
  await initSynth()
  playScale(['A3', 'B3', 'C4', 'D4', 'E4', 'F#4', 'G#4', 'A4'])
}

async function playHarmonicLeap() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('F4', '0.4', now)
  synth.triggerAttackRelease('G#4', '0.4', now + 0.5)
  synth.triggerAttackRelease('A4', '0.4', now + 1.0)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 42: Натуральный, гармонический и мелодический минор</h2>
      <p class="text-textDim mb-6">У минора три версии. Они отличаются всего на одну-две ноты, но дают разный характер — от мягкого до напряжённого.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Три вида ля минора</h3>
        <div class="space-y-3">
          <button @click="playNatural" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Натуральный минор — все ступени без изменений
          </button>
          <button @click="playHarmonic" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Гармонический минор — VII ступень повышена (G→G#)
          </button>
          <button @click="playMelodic" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Мелодический минор (вверх) — VI и VII повышены
          </button>
          <button @click="playHarmonicLeap" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Характерный скачок гармонического минора (F → G#)
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Натуральный минор звучит ровно и спокойно. Гармонический — с повышенной VII ступенью — даёт острое тяготение к тонике, за счёт этого V-й аккорд в миноре звучит по-настоящему «доминантово».
          Мелодический минор (вверх) убирает неудобный увеличенный скачок, сглаживая мелодическую линию. В DAW удобно держать все три варианта под рукой и выбирать по ситуации: гармонический — для сильных каденций, мелодический — для плавных мелодических ходов.
        </p>
      </div>
    </div>
  </div>
</template>
