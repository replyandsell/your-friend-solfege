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

function playSeq(notes, step = 0.2) {
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, step * 0.85, now)
    now += step
  }
}

async function playMotif() {
  await initSynth()
  playSeq(['C4', 'D4', 'E4'])
}

async function playAscendingSequence() {
  await initSynth()
  playSeq(['C4', 'D4', 'E4', 'D4', 'E4', 'F4', 'E4', 'F4', 'G4'])
}

async function playDescendingSequence() {
  await initSynth()
  playSeq(['G4', 'A4', 'B4', 'F4', 'G4', 'A4', 'E4', 'F4', 'G4'])
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 74: Секвенция</h2>
      <p class="text-textDim mb-6">Секвенция — это когда мотив повторяется несколько раз подряд, каждый раз сдвигаясь на один и тот же интервал вверх или вниз.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Мотив, растянутый в секвенцию</h3>
        <div class="space-y-3">
          <button @click="playMotif" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Исходный мотив (до-ре-ми)
          </button>
          <button @click="playAscendingSequence" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Восходящая секвенция — мотив от до, потом от ре, потом от ми
          </button>
          <button @click="playDescendingSequence" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Нисходящая секвенция — та же идея, вниз
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Секвенция — один из самых надёжных способов «растянуть» короткую идею в полноценную фразу, не изобретая новый материал.
          Слух узнаёт повторяющийся контур и одновременно чувствует движение — вверх обычно создаёт нарастание энергии, вниз — расслабление или спад напряжения.
        </p>
      </div>
    </div>
  </div>
</template>
