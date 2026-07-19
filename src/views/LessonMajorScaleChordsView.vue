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

const degrees = [
  { label: 'I — до мажор', notes: ['C4', 'E4', 'G4'] },
  { label: 'ii — ре минор', notes: ['D4', 'F4', 'A4'] },
  { label: 'iii — ми минор', notes: ['E4', 'G4', 'B4'] },
  { label: 'IV — фа мажор', notes: ['F4', 'A4', 'C5'] },
  { label: 'V — соль мажор', notes: ['G4', 'B4', 'D5'] },
  { label: 'vi — ля минор', notes: ['A4', 'C5', 'E5'] },
  { label: 'vii° — си уменьш.', notes: ['B4', 'D5', 'F5'] },
]

async function playChord(notes) {
  await initSynth()
  synth.triggerAttackRelease(notes, '0.9', Tone.now())
}

async function playAll() {
  await initSynth()
  let now = Tone.now()
  for (const d of degrees) {
    synth.triggerAttackRelease(d.notes, '0.5', now)
    now += 0.6
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 53: Аккорды на каждой ступени мажора</h2>
      <p class="text-textDim mb-6">Если построить трезвучие на каждой ноте гаммы, используя только её собственные ноты, получится ровно семь аккордов — и три из них мажорные, три минорные, один уменьшённый.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Семь аккордов до мажора</h3>
        <div class="space-y-3">
          <button
            v-for="d in degrees"
            :key="d.label"
            @click="playChord(d.notes)"
            class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition"
          >
            {{ d.label }}
          </button>
          <button @click="playAll" class="block w-full px-4 py-2 rounded-lg border border-surface2 bg-surface2 text-text font-medium hover:opacity-90 transition">
            Все семь по очереди
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Формула качества аккордов одна для любой мажорной тональности: I, IV, V — мажорные; ii, iii, vi — минорные; vii° — уменьшённое.
          Запомнив эту формулу один раз, можно на лету подбирать аккорды к мелодии в любой тональности, не считая интервалы заново каждый раз.
        </p>
      </div>
    </div>
  </div>
</template>
