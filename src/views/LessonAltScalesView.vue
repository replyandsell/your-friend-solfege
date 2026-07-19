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

function playScale(notes, step = 0.22) {
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, step * 0.9, now)
    now += step
  }
}

async function playWholeTone() {
  await initSynth()
  playScale(['C4', 'D4', 'E4', 'F#4', 'G#4', 'A#4', 'C5'])
}

async function playDiminished() {
  await initSynth()
  playScale(['C4', 'D4', 'Eb4', 'F4', 'Gb4', 'Ab4', 'A4', 'B4', 'C5'])
}

async function playWholeToneChord() {
  await initSynth()
  synth.triggerAttackRelease(['C4', 'E4', 'G#4'], '1.2', Tone.now())
}

async function playDiminishedChord() {
  await initSynth()
  synth.triggerAttackRelease(['C4', 'Eb4', 'Gb4', 'A4'], '1.2', Tone.now())
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 50: Целотонный и уменьшённый звукоряд</h2>
      <p class="text-textDim mb-6">Эти два звукоряда симметричны — построены из равных шагов. Из-за этого у них нет ощущения «дома», тоники — только зависшее напряжение.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Симметричные звукоряды</h3>
        <div class="space-y-3">
          <button @click="playWholeTone" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Целотонный (whole-tone) — только целые тоны, «сновидческий» эффект
          </button>
          <button @click="playDiminished" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Уменьшённый (whole-half diminished) — чередование тон/полутон
          </button>
          <button @click="playWholeToneChord" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Увеличенное трезвучие из целотонного звукоряда
          </button>
          <button @click="playDiminishedChord" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Уменьшённый септаккорд из diminished-звукоряда
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Симметричные звукоряды не имеют явной тоники — слух не может «зацепиться» за устойчивую ноту, отсюда их эффект зависания и тревоги.
          В электронной музыке whole-tone часто используют в переходах и билдапах перед дропом, а diminished — в saw-лидах и напряжённых аккордовых проходах, где нужно нагнетание без ясного гармонического направления.
        </p>
      </div>
    </div>
  </div>
</template>
