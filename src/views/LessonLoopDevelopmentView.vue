<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)
let bassSynth = null
let leadSynth = null
let isInitialized = ref(false)

async function initSynth() {
  if (isInitialized.value) return
  await Tone.start()
  bassSynth = new Tone.Synth({
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.01, decay: 0.15, sustain: 0.4, release: 0.3 },
  }).toDestination()
  leadSynth = new Tone.Synth({
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.4 },
  }).toDestination()
  isInitialized.value = true
}

async function playLoopBare() {
  await initSynth()
  const notes = ['C2', 'C2', 'F2', 'G2']
  let now = Tone.now()
  for (let rep = 0; rep < 2; rep++) {
    for (const n of notes) {
      bassSynth.triggerAttackRelease(n, 0.35, now)
      now += 0.4
    }
  }
}

async function playLoopDeveloped() {
  await initSynth()
  const bassNotes = ['C2', 'C2', 'F2', 'G2']
  const leadNotes = ['C5', 'E5', 'G5', 'E5']
  let now = Tone.now()
  for (const n of bassNotes) {
    bassSynth.triggerAttackRelease(n, 0.35, now)
    now += 0.4
  }
  for (let i = 0; i < bassNotes.length; i++) {
    bassSynth.triggerAttackRelease(bassNotes[i], 0.35, now)
    leadSynth.triggerAttackRelease(leadNotes[i], 0.35, now)
    now += 0.4
  }
}
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true; initSynth()" />
    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 102: Развитие восьмитактового loop</h2>
      <p class="text-textDim mb-6">Один и тот же короткий луп можно проиграть много раз без изменений — а можно постепенно обрастать деталями, оставаясь узнаваемым.</p>
      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Голый луп и его развитие</h3>
        <div class="space-y-3">
          <button @click="playLoopBare" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Луп, повторённый дважды без изменений
          </button>
          <button @click="playLoopDeveloped" class="block w-full px-4 py-2 rounded-lg bg-accent text-bg font-medium hover:opacity-90 transition">
            Тот же луп: во втором проходе добавляется лид сверху
          </button>
        </div>
      </div>
      <div class="border-t border-surface2 pt-8">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim">
          Развитие лупа не обязано менять сам луп — часто достаточно добавлять или убирать элементы вокруг него. Простая стратегия: 8 тактов только бас,
          следующие 8 тактов бас + аккорды, следующие 8 — бас + аккорды + лид. Луп остаётся тем же самым, но трек ощутимо растёт в развитии.
        </p>
      </div>
    </div>
  </div>
</template>
