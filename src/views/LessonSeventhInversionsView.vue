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
  synth.triggerAttackRelease(notes, '0.9', Tone.now())
}

async function playAllFour() {
  await initSynth()
  const chords = [
    ['C4', 'E4', 'G4', 'Bb4'],
    ['E4', 'G4', 'Bb4', 'C5'],
    ['G4', 'Bb4', 'C5', 'E5'],
    ['Bb4', 'C5', 'E5', 'G5'],
  ]
  let now = Tone.now()
  for (const chord of chords) {
    synth.triggerAttackRelease(chord, '0.6', now)
    now += 0.75
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 57: Обращения септаккордов</h2>
      <p class="text-textDim mb-6">У септаккорда четыре ноты — значит, и обращений у него на одно больше, чем у трезвучия: целых три.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">C7 в четырёх положениях</h3>
        <div class="space-y-3">
          <button @click="playChord(['C4', 'E4', 'G4', 'Bb4'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Основной вид — до в басу
          </button>
          <button @click="playChord(['E4', 'G4', 'Bb4', 'C5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Первое обращение — терция в басу
          </button>
          <button @click="playChord(['G4', 'Bb4', 'C5', 'E5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Второе обращение — квинта в басу
          </button>
          <button @click="playChord(['Bb4', 'C5', 'E5', 'G5'])" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Третье обращение — септима в басу
          </button>
          <button @click="playAllFour" class="block w-full px-4 py-2 rounded-lg border border-surface2 bg-surface2 text-text font-medium hover:opacity-90 transition">
            Все четыре подряд
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Третье обращение (септима в басу) звучит наиболее «подвешенно» и почти всегда требует немедленного разрешения — часто используется как проходящий аккорд на слабую долю.
          В piano roll обращения септаккордов особенно полезны для плавных бас-линий под длинную последовательность одного и того же аккорда с медленно меняющимся басом.
        </p>
      </div>
    </div>
  </div>
</template>
