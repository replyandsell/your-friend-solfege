<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let chordSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.3 },
  }).toDestination()
  chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playChordsOnly() {
  await initSynth()
  const chords = [['C4', 'E4', 'G4'], ['F4', 'A4', 'C5'], ['G4', 'B4', 'D5'], ['C4', 'E4', 'G4']]
  let now = Tone.now()
  for (const c of chords) {
    chordSynth.triggerAttackRelease(c, '0.7', now)
    now += 0.8
  }
}

async function playWithRootBass() {
  await initSynth()
  const steps = [
    { bass: 'C2', chord: ['C4', 'E4', 'G4'] },
    { bass: 'F2', chord: ['F4', 'A4', 'C5'] },
    { bass: 'G2', chord: ['G4', 'B4', 'D5'] },
    { bass: 'C2', chord: ['C4', 'E4', 'G4'] },
  ]
  let now = Tone.now()
  for (const s of steps) {
    bassSynth.triggerAttackRelease(s.bass, 0.7, now)
    chordSynth.triggerAttackRelease(s.chord, 0.7, now)
    now += 0.8
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 86: Корневая басовая линия</h2>
      <p class="text-textDim mb-6">Самый простой и надёжный способ построить бас — просто взять нижнюю ноту каждого аккорда, его корень.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">С басом и без</h3>
        <div class="space-y-3">
          <button @click="playChordsOnly" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Только аккорды — звучит тонко, без опоры
          </button>
          <button @click="playWithRootBass" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            С корневым басом — сразу появляется вес и опора
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Корневой бас — это на 90% того, что делает бас-гитарист или бас-синтезатор в любом жанре по умолчанию. Он однозначно называет текущий аккорд слуху
          и даёт низкочастотную энергию треку. Это не самый изобретательный вариант, зато самый надёжный — с него стоит начинать любую новую идею.
        </p>
      </div>
    </div>
  </div>
</template>
