<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="p-8">
    <h2 class="text-2xl font-semibold mb-6">Модуль 1: Пульс, сетка и грув</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/pulse/lesson-1" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 1: Пульс</div>
      </RouterLink>
      <RouterLink to="/course/beats/lesson-2" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 2: Доли и деление доли</div>
      </RouterLink>
      <RouterLink to="/course/syncopation/lesson-3" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 3: Синкопа</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 2: Высота звука и piano roll</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/pitch-direction/lesson-4" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 4: Направление мелодии</div>
      </RouterLink>
      <RouterLink to="/course/octave/lesson-5" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 5: Октава и регистр</div>
      </RouterLink>
      <RouterLink to="/course/piano-roll/lesson-6" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 6: Ориентация на piano roll</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 3: Интервалы</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/intervals-close/lesson-7" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 7: Близкие интервалы (секунда, терция)</div>
      </RouterLink>
      <RouterLink to="/course/intervals-far/lesson-8" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 8: Дальние интервалы (кварта, квинта, октава)</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 4: Тональный центр и ступени</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/tonic/lesson-9" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 9: Тональный центр (тоника)</div>
      </RouterLink>
      <RouterLink to="/course/scale-steps/lesson-10" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 10: Ступени гаммы (I-VII)</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 5: Трезвучия</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/triads/lesson-11" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 11: Мажорное и минорное трезвучие</div>
      </RouterLink>
      <RouterLink to="/course/chords-application/lesson-12" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 12: Применение аккордов в музыке</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 6: Расширенные аккорды</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/dominant-seven/lesson-13" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 13: Доминанта-септ (V7)</div>
      </RouterLink>
      <RouterLink to="/course/minor-seven/lesson-14" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 14: Минорные аккорды с добавками</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 7: Лады и тритон</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/modes/lesson-15" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 15: Натуральные лады</div>
      </RouterLink>
      <RouterLink to="/course/triton/lesson-16" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 16: Тритон — диаболус в музыке</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 8: Прогрессии и мелодия</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/minor-progression/lesson-17" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 17: Прогрессия i-VII в миноре</div>
      </RouterLink>
      <RouterLink to="/course/melody-phrasing/lesson-18" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 18: Мелодическое движение и фразировка</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 9: Дыхание и живость</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/breath-pause/lesson-19" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 19: Дыхание и пауза</div>
      </RouterLink>
      <RouterLink to="/course/voice-leading/lesson-20" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 20: Правильный голосовой ход</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 10: Пентатоника</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/pentatonic/lesson-21" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 21: Пентатоника</div>
      </RouterLink>
    </div>

    <h2 class="text-2xl font-semibold mb-6">Модуль 11: Применение в электронной музыке</h2>
    <div class="space-y-2 mb-8">
      <RouterLink to="/course/synth-modulation/lesson-22" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 22: Синтезатор и модуляция</div>
      </RouterLink>
      <RouterLink to="/course/groove-shuffle/lesson-23" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 23: Groove и shuffle ритм</div>
      </RouterLink>
      <RouterLink to="/course/loop-creation/lesson-24" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 24: Создание лупа из аккордов</div>
      </RouterLink>
      <RouterLink to="/course/practice-final/lesson-25" class="block px-4 py-3 rounded-md bg-surface2 hover:bg-surface transition">
        <div class="font-medium">Урок 25: Практика — пишем свой трек</div>
      </RouterLink>
    </div>

    <div class="border-t border-surface2 pt-8">
      <p class="text-textDim text-sm">Полный курс сольфеджио: 25 интерактивных уроков для музыкантов и продюсеров.</p>
    </div>
  </div>
</template>
