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
  synth.triggerAttackRelease(notes, '1.1', Tone.now())
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 56: Септаккорды</h2>
      <p class="text-textDim mb-6">Добавь к трезвучию ещё одну терцию сверху — получишь септаккорд. Пять основных типов покрывают почти всю современную гармонию.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Пять типов от ноты до</h3>
        <div class="space-y-3">
          <button @click="playChord(['C4', 'E4', 'G4', 'B4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Большой мажорный (maj7) — мягкий, «джазовый»
          </button>
          <button @click="playChord(['C4', 'E4', 'G4', 'Bb4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Доминантсептаккорд (7) — напряжённый, тянет к разрешению
          </button>
          <button @click="playChord(['C4', 'Eb4', 'G4', 'Bb4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Минорный (m7) — тёплый, современный
          </button>
          <button @click="playChord(['C4', 'Eb4', 'Gb4', 'Bb4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Полууменьшённый (m7♭5) — неустойчивый минор
          </button>
          <button @click="playChord(['C4', 'Eb4', 'Gb4', 'A4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Уменьшённый (dim7) — полностью симметричный, самый острый
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Doм7 почти всегда стоит на V ступени и разрешается в тонику. Maj7 и m7 — самые «уютные» септаккорды, основа lo-fi и neo-soul гармонии.
          Полууменьшённый и уменьшённый септаккорды используются реже как опорные, зато отлично работают как проходящие или предшествующие напряжённым моментам аккорды.
        </p>
      </div>
    </div>
  </div>
</template>
