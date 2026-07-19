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
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.3 },
  }).toDestination()
  isInitialized.value = true
}

async function playQuantized() {
  await initSynth()
  const now = Tone.now()
  const notes = ['C4', 'D4', 'E4', 'F4']
  notes.forEach((n, i) => synth.triggerAttackRelease(n, 0.2, now + i * 0.3))
}

async function playHuman() {
  await initSynth()
  const now = Tone.now()
  const notes = ['C4', 'D4', 'E4', 'F4']
  const offsets = [0, 0.32, 0.57, 0.94]
  notes.forEach((n, i) => synth.triggerAttackRelease(n, 0.2, now + offsets[i]))
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 129: Quantize и последствия жёсткого выравнивания</h2>
      <p class="text-textDim mb-6">Quantize подтягивает каждую ноту точно к сетке. Это убирает ошибки — но заодно может убрать и живость.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Идеально по сетке против живого тайминга</h3>
        <div class="space-y-3">
          <button @click="playQuantized" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            100% quantize — механически ровно
          </button>
          <button @click="playHuman" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Живой тайминг — с небольшими естественными отклонениями
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Для электронной музыки жёсткая сетка часто уместна и даже нужна — но большинство DAW позволяют настроить силу quantize не на 100%, а, например, на 50-70%:
          ноты подтягиваются к сетке частично, сохраняя часть исходного «человеческого» тайминга. Это удачный компромисс между точностью и живостью для партий, сыгранных на MIDI-клавиатуре.
        </p>
      </div>
    </div>
  </div>
</template>
