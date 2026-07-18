<script setup>
import { ref } from 'vue'
import AudioUnlock from '../components/AudioUnlock.vue'

const unlocked = ref(false)

const pianoRollNotes = [
  { x: 10, y: 60, width: 40, height: 20, note: 'C3' },
  { x: 60, y: 50, width: 40, height: 20, note: 'D3' },
  { x: 110, y: 40, width: 40, height: 20, note: 'E3' },
  { x: 160, y: 30, width: 40, height: 20, note: 'F3' },
  { x: 210, y: 20, width: 40, height: 20, note: 'G3' },
]
</script>

<template>
  <div class="p-8">
    <AudioUnlock v-if="!unlocked" @unlocked="unlocked = true" />

    <div v-else>
      <h2 class="text-2xl font-semibold mb-2">Урок 6: Ориентация на piano roll</h2>
      <p class="text-textDim mb-6">Piano roll — это способ визуализации музыки. По вертикали — высота, по горизонтали — время.</p>

      <div class="border border-surface2 rounded-lg p-6 bg-surface mb-6">
        <h3 class="text-lg font-semibold mb-4">Как читать piano roll</h3>
        <svg width="100%" height="200" viewBox="0 0 280 100" class="bg-surface2 rounded mb-4">
          <!-- Сетка по времени (горизонтальные линии) -->
          <line x1="0" y1="20" x2="280" y2="20" stroke="#3a3f4b" stroke-width="1" stroke-dasharray="5,5" />
          <line x1="0" y1="40" x2="280" y2="40" stroke="#3a3f4b" stroke-width="1" stroke-dasharray="5,5" />
          <line x1="0" y1="60" x2="280" y2="60" stroke="#3a3f4b" stroke-width="1" stroke-dasharray="5,5" />
          <line x1="0" y1="80" x2="280" y2="80" stroke="#3a3f4b" stroke-width="1" stroke-dasharray="5,5" />

          <!-- Сетка по нотам (вертикальные линии) -->
          <line x1="50" y1="0" x2="50" y2="100" stroke="#3a3f4b" stroke-width="1" stroke-dasharray="5,5" />
          <line x1="100" y1="0" x2="100" y2="100" stroke="#3a3f4b" stroke-width="1" stroke-dasharray="5,5" />
          <line x1="150" y1="0" x2="150" y2="100" stroke="#3a3f4b" stroke-width="1" stroke-dasharray="5,5" />
          <line x1="200" y1="0" x2="200" y2="100" stroke="#3a3f4b" stroke-width="1" stroke-dasharray="5,5" />
          <line x1="250" y1="0" x2="250" y2="100" stroke="#3a3f4b" stroke-width="1" stroke-dasharray="5,5" />

          <!-- Примеры нот (поднимающаяся мелодия) -->
          <rect v-for="(note, i) in pianoRollNotes" :key="i" :x="note.x" :y="note.y" :width="note.width" :height="note.height" fill="#6ee7b7" stroke="#4db8a8" stroke-width="1" rx="2" />

          <!-- Метки по времени -->
          <text x="25" y="95" font-size="8" fill="#8b909c">0</text>
          <text x="75" y="95" font-size="8" fill="#8b909c">1s</text>
          <text x="125" y="95" font-size="8" fill="#8b909c">2s</text>
          <text x="175" y="95" font-size="8" fill="#8b909c">3s</text>
          <text x="225" y="95" font-size="8" fill="#8b909c">4s</text>

          <!-- Метки по нотам (справа) -->
          <text x="260" y="25" font-size="7" fill="#8b909c">G</text>
          <text x="260" y="45" font-size="7" fill="#8b909c">F</text>
          <text x="260" y="65" font-size="7" fill="#8b909c">D</text>
          <text x="260" y="85" font-size="7" fill="#8b909c">C</text>
        </svg>

        <p class="text-sm text-textDim">
          <strong>Горизонталь (→):</strong> время. Ноты слева начинают раньше, справа — позже.<br>
          <strong>Вертикаль (↑):</strong> высота звука. Выше на экране = выше звук, ниже на экране = ниже звук.<br>
          <strong>Прямоугольники:</strong> это ноты. Длинный прямоугольник = длинная нота, короткий = короткая.
        </p>
      </div>

      <div class="border-t border-surface2 pt-8 max-w-2xl">
        <h3 class="text-lg font-semibold mb-3">Главная идея</h3>
        <p class="text-sm text-textDim mb-4">
          Piano roll — это универсальный язык для музыкантов и продюсеров. Когда ты видишь ноту в piano roll поднимающейся вверх (как на картинке выше), это значит мелодия тоже поднимается вверх.
        </p>
        <p class="text-sm text-textDim">
          Используется везде: в DAW (Ableton, FL Studio), в нотных редакторах, в музыкальных приложениях. Это стандарт.
        </p>
      </div>
    </div>
  </div>
</template>