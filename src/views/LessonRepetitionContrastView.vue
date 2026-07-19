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

function playSeq(notes, step = 0.25) {
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, step * 0.85, now)
    now += step
  }
}

async function playOnlyRepetition() {
  await initSynth()
  playSeq(['C4', 'E4', 'G4', 'C4', 'E4', 'G4', 'C4', 'E4', 'G4'])
}

async function playOnlyContrast() {
  await initSynth()
  playSeq(['C4', 'E4', 'G4', 'F#4', 'Bb3', 'D4', 'A4', 'C5', 'Eb5'])
}

async function playBalanced() {
  await initSynth()
  playSeq(['C4', 'E4', 'G4', 'C4', 'E4', 'G4', 'D4', 'F4', 'A4'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 101: Повторение и контраст</h2>
      <p class="text-textDim mb-6">Слишком много повтора — скучно. Слишком много контраста — бессвязно. Хороший трек балансирует между узнаваемостью и новизной.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Крайности и баланс</h3>
        <div class="space-y-3">
          <button @click="playOnlyRepetition" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Только повтор — монотонно, скоро надоедает
          </button>
          <button @click="playOnlyContrast" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Только контраст — хаотично, ничего не запоминается
          </button>
          <button @click="playBalanced" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Баланс — знакомое начало, новый поворот в конце
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Рабочее эмпирическое правило: 70-80% материала — повтор или лёгкая вариация, 20-30% — что-то новое. Это даёт слушателю достаточно опоры,
          чтобы запомнить трек, и достаточно новизны, чтобы не заскучать. Слишком радикальные пропорции в любую сторону обычно ощущаются как проблема на слух, даже если не сразу понятно, в чём именно она заключается.
        </p>
      </div>
    </div>
  </div>
</template>
