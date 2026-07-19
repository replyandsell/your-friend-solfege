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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.5 },
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

async function playFinalTrack() {
  await initSynth()
  const now = Tone.now()

  // Intro: motif alone
  leadSynth.triggerAttackRelease('E5', '0.3', now)
  leadSynth.triggerAttackRelease('G5', '0.3', now + 0.35)
  leadSynth.triggerAttackRelease('E5', '0.5', now + 0.7)

  // Verse: bass + chords + motif
  const verseStart = now + 1.5
  ;[0, 0.8].forEach((off) => {
    bassSynth.triggerAttackRelease('A1', 0.7, verseStart + off)
    chordSynth.triggerAttackRelease(['A3', 'C4', 'E4'], '0.7', verseStart + off)
  })
  leadSynth.triggerAttackRelease('E5', '0.3', verseStart)
  leadSynth.triggerAttackRelease('G5', '0.3', verseStart + 0.35)

  // Drop: full layers + kick
  const dropStart = verseStart + 1.8
  ;[0, 0.8].forEach((off) => {
    kick.triggerAttackRelease('C1', '8n', dropStart + off)
    bassSynth.triggerAttackRelease('C2', 0.7, dropStart + off)
    chordSynth.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '0.7', dropStart + off)
  })
  leadSynth.triggerAttackRelease('G5', '0.3', dropStart)
  leadSynth.triggerAttackRelease('E5', '0.3', dropStart + 0.35)
  leadSynth.triggerAttackRelease('C5', '0.6', dropStart + 0.7)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 137: Итоговая композиция от мотива до полного трека</h2>
      <p class="text-textDim mb-6">Последний урок курса. Один короткий мотив проходит путь от одинокой мелодии до полного дропа со всеми слоями — ровно так, как строится настоящий трек.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Мини-трек целиком</h3>
        <button @click="playFinalTrack" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
          Intro → куплет → дроп
        </button>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Твой собственный финальный проект</h3>
        <p class="text-sm text-textDim">
          Возьми мотив из 3-5 нот (модуль 17), выбери лад под нужное настроение (уроки 47, 51), подбери аккорды по функциям T-S-D (урок 58) с басом,
          который их поддерживает (модуль 18). Собери форму по буквенной схеме (урок 97) и проведи материал через уровни плотности — от одного слоя до полного дропа (модуль 19).
          На этом теоретическая часть курса заканчивается: дальше — только практика в своей DAW. Поздравляем с прохождением всех 137 уроков.
        </p>
      </div>
    </div>
  </div>
</template>
