<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let chordSynth = null
let leadSynth = null
let kick = null
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
  leadSynth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.4 },
  }).toDestination()
  kick = new Tone.MembraneSynth({
    pitchDecay: 0.008,
    octaves: 2,
    envelope: { attack: 0.001, decay: 0.15, sustain: 0 },
  }).toDestination()
  isInitialized.value = true
}

async function playMiniTrack() {
  await initSynth()
  const now = Tone.now()

  // Intro: bass only
  bassSynth.triggerAttackRelease('C2', 0.6, now)
  bassSynth.triggerAttackRelease('C2', 0.6, now + 0.7)

  // Verse: bass + chords
  const verseStart = now + 1.6
  ;[0, 0.7].forEach((off) => {
    bassSynth.triggerAttackRelease('C2', 0.6, verseStart + off)
    chordSynth.triggerAttackRelease(['C4', 'Eb4', 'G4'], '0.6', verseStart + off)
  })

  // Drop: bass + chords + lead + kick
  const dropStart = verseStart + 1.6
  ;[0, 0.7].forEach((off) => {
    kick.triggerAttackRelease('C1', '8n', dropStart + off)
    bassSynth.triggerAttackRelease('C2', 0.6, dropStart + off)
    chordSynth.triggerAttackRelease(['C4', 'Eb4', 'G4', 'C5'], '0.6', dropStart + off)
  })
  leadSynth.triggerAttackRelease('G5', '0.3', dropStart)
  leadSynth.triggerAttackRelease('Eb5', '0.3', dropStart + 0.35)
  leadSynth.triggerAttackRelease('C5', '0.6', dropStart + 0.7)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 107: Создание полного трека из короткой идеи</h2>
      <p class="text-textDim mb-6">Весь модуль про форму сводится к одному навыку: взять простую идею и провести её через intro, куплет и дроп, управляя только плотностью слоёв.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Мини-трек из трёх секций</h3>
        <button @click="playMiniTrack" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          Intro → куплет → дроп, один и тот же материал
        </button>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Как собрать свой трек</h3>
        <p class="text-sm text-textDim">
          1) Начни с одной идеи — баса или короткого аккордового лупа (модули 15–16, 18). 2) Спланируй форму по буквенной схеме (урок 97): например AABA или Intro–Verse–Drop–Breakdown–Drop–Outro.
          3) На каждую секцию меняй не материал, а плотность и регистр (уроки 103–104). 4) Проверь, что есть хотя бы одна точка кульминации и динамическая дуга (урок 105).
          5) Добавь переходы между разделами — райзер или резкий стык (урок 106). Этого достаточно, чтобы четырёхтактовая идея превратилась в законченный трек.
        </p>
      </div>
    </div>
  </div>
</template>
