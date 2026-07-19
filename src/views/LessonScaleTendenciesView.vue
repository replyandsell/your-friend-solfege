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

async function playFullScale() {
  await initSynth()
  const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
  let now = Tone.now()
  for (const note of notes) {
    synth.triggerAttackRelease(note, '0.2', now)
    now += 0.25
  }
}

async function playLeadingTone() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('B4', '0.4', now)
  synth.triggerAttackRelease('C5', '0.6', now + 0.5)
}

async function playSubdominantPull() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('F4', '0.4', now)
  synth.triggerAttackRelease('E4', '0.6', now + 0.5)
}

async function playSupertonic() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('D4', '0.4', now)
  synth.triggerAttackRelease('C4', '0.6', now + 0.5)
}

async function playAllResolutions() {
  await initSynth()
  const now = Tone.now()
  synth.triggerAttackRelease('D4', '0.35', now)
  synth.triggerAttackRelease('C4', '0.35', now + 0.4)
  synth.triggerAttackRelease('F4', '0.35', now + 1.0)
  synth.triggerAttackRelease('E4', '0.35', now + 1.4)
  synth.triggerAttackRelease('B4', '0.35', now + 2.0)
  synth.triggerAttackRelease('C5', '0.6', now + 2.4)
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 43: Ступени лада и их тяготения</h2>
      <p class="text-textDim mb-6">Не все ступени гаммы равны. Одни звучат устойчиво, другие тянут к соседней ноте. Это тяготение — двигатель мелодии.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Примеры тяготений (до мажор)</h3>
        <div class="space-y-3">
          <button @click="playFullScale" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Гамма целиком, для ориентира
          </button>
          <button @click="playLeadingTone" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            VII → I: вводный тон тянется в тонику (си → до)
          </button>
          <button @click="playSubdominantPull" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            IV → III: субдоминанта оседает вниз (фа → ми)
          </button>
          <button @click="playSupertonic" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            II → I: верхний вводный тон тянется вниз (ре → до)
          </button>
          <button @click="playAllResolutions" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Все три тяготения подряд
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          I и V ступени — устойчивые, на них можно закончить фразу. II, IV, VI, VII — неустойчивые, они создают ощущение «нужно двигаться дальше».
          Когда пишешь мелодию в piano roll, проверяй: если она застряла на неустойчивой ступени слишком долго, слух ждёт разрешения — и не получает его.
        </p>
      </div>
    </div>
  </div>
</template>
