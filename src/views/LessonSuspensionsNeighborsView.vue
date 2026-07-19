<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let melodySynth = null
let chordSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  melodySynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.2, release: 0.4 },
  }).toDestination()
  chordSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.6 },
  }).toDestination()
  isInitialized.value = true
}

async function playNeighbor() {
  await initSynth()
  const now = Tone.now()
  chordSynth.triggerAttackRelease(['C4', 'E4', 'G4'], '1.5', now)
  melodySynth.triggerAttackRelease('E5', '0.3', now)
  melodySynth.triggerAttackRelease('F5', '0.3', now + 0.35)
  melodySynth.triggerAttackRelease('E5', '0.6', now + 0.7)
}

async function playSuspension() {
  await initSynth()
  const now = Tone.now()
  chordSynth.triggerAttackRelease(['C4', 'E4', 'G4'], '0.9', now)
  chordSynth.triggerAttackRelease(['D4', 'F4', 'A4'], '1.2', now + 1.0)
  melodySynth.triggerAttackRelease('A4', '0.9', now)
  melodySynth.triggerAttackRelease('A4', '0.5', now + 1.0)
  melodySynth.triggerAttackRelease('G4', '0.6', now + 1.55)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 79: Задержания и соседние звуки</h2>
      <p class="text-textDim mb-6">Два приёма украшения мелодии: соседний звук ненадолго «отходит» от опорной ноты и возвращается; задержание — держится дольше, чем ожидает гармония, создавая трение.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Два способа украсить ноту</h3>
        <div class="space-y-3">
          <button @click="playNeighbor" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Соседний звук — ми уходит на фа и сразу возвращается
          </button>
          <button @click="playSuspension" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Задержание — ля держится поверх нового аккорда, потом сходит на соль
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Соседний звук — короткий и «безобидный», просто добавляет живости мелодической линии. Задержание значительно сильнее: нота, которая была
          опорной в предыдущем аккорде, «не успевает» отпустить и звучит диссонансом на фоне нового аккорда, прежде чем сойти на устойчивую ступень. Это создаёт микро-момент напряжения, знакомый по вокальным подводкам в поп-музыке.
        </p>
      </div>
    </div>
  </div>
</template>
