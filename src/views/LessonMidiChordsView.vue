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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.5 },
  }).toDestination()
  isInitialized.value = true
}

async function playBlock() {
  await initSynth()
  synth.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '1.2', Tone.now())
}

async function playBroken() {
  await initSynth()
  const notes = ['C4', 'E4', 'G4', 'C5']
  let now = Tone.now()
  for (const n of notes) {
    synth.triggerAttackRelease(n, 0.9, now)
    now += 0.15
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 131: Создание аккордов в MIDI</h2>
      <p class="text-textDim mb-6">Ноты аккорда необязательно ставить строго одна над другой в piano roll — способ их расположения меняет ощущение от аккорда.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Блок-аккорд и разложенный (broken chord)</h3>
        <div class="space-y-3">
          <button @click="playBlock" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Блок-аккорд — все ноты начинаются вместе
          </button>
          <button @click="playBroken" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Broken chord — ноты входят по очереди, но звучат вместе
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Практический совет</h3>
        <p class="text-sm text-textDim">
          Быстрый способ строить аккорды в piano roll: поставь одну ноту, скопируй-вставь её на нужные интервалы вверх (терция, квинта и т.д.) — так проще
          контролировать точную структуру аккорда, чем рисовать каждую ноту заново. Для broken chord просто сдвинь копии по времени на 1/16 или 1/32 друг относительно друга.
        </p>
      </div>
    </div>
  </div>
</template>
