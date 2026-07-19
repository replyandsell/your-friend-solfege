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

async function playResolution() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease(['C4', 'F4', 'G4'], '0.6', now)
  synth.triggerAttackRelease(['C4', 'E4', 'G4'], '0.8', now + 0.7)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 64: Sus2, sus4 и add-аккорды</h2>
      <p class="text-textDim mb-6">Эти аккорды убирают или добавляют одну ноту к обычному трезвучию — и получается открытый, «неопределённый по настроению» звук, без явного мажора или минора.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Замена терции и добавление красок</h3>
        <div class="space-y-3">
          <button @click="playChord(['C4', 'D4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Csus2 — терция заменена на секунду, открытый звук
          </button>
          <button @click="playChord(['C4', 'F4', 'G4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Csus4 — терция заменена на кварту, «подвешенный» звук
          </button>
          <button @click="playChord(['C4', 'E4', 'G4', 'D5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Cadd9 — обычное трезвучие плюс нона, терция остаётся
          </button>
          <button @click="playResolution" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Csus4 → C — классическое разрешение кварты в терцию
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Sus-аккорды не содержат терции — а значит, не являются ни мажорными, ни минорными. Это делает их отличным инструментом для интро и переходов, где
          рано ещё раскрывать настроение трека. Add-аккорды, наоборот, сохраняют терцию и просто добавляют объём — их часто используют в поп- и EDM-хуках вместо обычных трезвучий.
        </p>
      </div>
    </div>
  </div>
</template>
