<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const modules = [
  {
    title: 'Модуль 1: Пульс, сетка и грув',
    lessons: [
      { path: '/course/pulse/lesson-1', title: 'Урок 1: Пульс', description: 'Чувство внутреннего метра и устойчивого темпа.' },
      { path: '/course/beats/lesson-2', title: 'Урок 2: Доли и деление доли', description: 'Как делить ритм на части и строить точный грув.' },
      { path: '/course/syncopation/lesson-3', title: 'Урок 3: Синкопа', description: 'Смещение акцента и ощущение движения между долями.' },
    ],
  },
  {
    title: 'Модуль 2: Высота звука и piano roll',
    lessons: [
      { path: '/course/pitch-direction/lesson-4', title: 'Урок 4: Направление мелодии', description: 'Как распознавать движение вверх и вниз.' },
      { path: '/course/octave/lesson-5', title: 'Урок 5: Октава и регистр', description: 'Одинаковые ноты в разных регистрах.' },
      { path: '/course/piano-roll/lesson-6', title: 'Урок 6: Ориентация на piano roll', description: 'Чтение музыки по времени и высоте.' },
    ],
  },
  {
    title: 'Модуль 3: Интервалы',
    lessons: [
      { path: '/course/intervals-close/lesson-7', title: 'Урок 7: Близкие интервалы', description: 'Секунда и терция как основа мелодического цвета.' },
      { path: '/course/intervals-far/lesson-8', title: 'Урок 8: Дальние интервалы', description: 'Кварта, квинта и октава как широкие звуковые слои.' },
    ],
  },
  {
    title: 'Модуль 4: Тональный центр и ступени',
    lessons: [
      { path: '/course/tonic/lesson-9', title: 'Урок 9: Тональный центр', description: 'Куда возвращается мелодия и как чувствуется тоника.' },
      { path: '/course/scale-steps/lesson-10', title: 'Урок 10: Ступени гаммы', description: 'I-VII как функция и направление в музыке.' },
    ],
  },
  {
    title: 'Модуль 5: Трезвучия и аккорды',
    lessons: [
      { path: '/course/triads/lesson-11', title: 'Урок 11: Трезвучия', description: 'Мажорное и минорное трезвучие в действии.' },
      { path: '/course/chords-application/lesson-12', title: 'Урок 12: Применение аккордов', description: 'Как аккорды образуют простую музыкальную прогрессию.' },
    ],
  },
  {
    title: 'Модуль 6: Расширенные аккорды',
    lessons: [
      { path: '/course/dominant-seven/lesson-13', title: 'Урок 13: Доминанта-септ', description: 'Напряжение V7 и его разрешение в тонику.' },
      { path: '/course/minor-seven/lesson-14', title: 'Урок 14: Минорные аккорды с добавками', description: 'Am7 и Am9 как более мягкий и современный цвет.' },
    ],
  },
  {
    title: 'Модуль 7: Лады и тритон',
    lessons: [
      { path: '/course/modes/lesson-15', title: 'Урок 15: Натуральные лады', description: 'Разнообразие ладов и их характер.' },
      { path: '/course/triton/lesson-16', title: 'Урок 16: Тритон — диаболус в музыке', description: 'Напряжение и разрешение тритона.' },
    ],
  },
  {
    title: 'Модуль 8: Прогрессии и мелодия',
    lessons: [
      { path: '/course/minor-progression/lesson-17', title: 'Урок 17: Прогрессия i-VII в миноре', description: 'Переходы в минорной гармонии.' },
      { path: '/course/melody-phrasing/lesson-18', title: 'Урок 18: Мелодическое движение и фразировка', description: 'Как строить выразительную мелодию.' },
    ],
  },
  {
    title: 'Модуль 9: Дыхание и живость',
    lessons: [
      { path: '/course/breath-pause/lesson-19', title: 'Урок 19: Дыхание и пауза', description: 'Как пауза делает музыку живой.' },
      { path: '/course/voice-leading/lesson-20', title: 'Урок 20: Правильный голосовой ход', description: 'Как плавно вести голоса между аккордами.' },
    ],
  },
  {
    title: 'Модуль 10: Пентатоника',
    lessons: [
      { path: '/course/pentatonic/lesson-21', title: 'Урок 21: Пентатоника', description: 'Пять ступеней, которые легко звучат.' },
    ],
  },
  {
    title: 'Модуль 11: Сольфеджио и слух',
    lessons: [
      { path: '/course/solfege-syllables/lesson-26', title: 'Урок 26: Сольфеджио слоги', description: 'До, ре, ми и другие ступени в слуховом образе.' },
      { path: '/course/keys/lesson-27', title: 'Урок 27: Ключи и тональный центр', description: 'Тоника, доминанта и субдоминанта в тональности.' },
      { path: '/course/chord-functions/lesson-28', title: 'Урок 28: Функции аккордов', description: 'Роли I, IV, V и как они двигают музыку.' },
      { path: '/course/melody-harmony/lesson-29', title: 'Урок 29: Мелодия над гармонией', description: 'Строим мелодию, опираясь на аккорды и ступени.' },
    ],
  },
  {
    title: 'Модуль 12: Слушаем и записываем',
    lessons: [
      { path: '/course/interval-dictation/lesson-30', title: 'Урок 30: Интервальная диктовка', description: 'Тренируем слух, слыша большие, малые и чистые интервалы.' },
      { path: '/course/melodic-dictation/lesson-31', title: 'Урок 31: Мелодическая диктовка', description: 'Учимся повторять мелодию по слуху и записывать её.' },
    ],
  },
  {
    title: 'Модуль 13: Применение в электронной музыке',
    lessons: [
      { path: '/course/synth-modulation/lesson-22', title: 'Урок 22: Синтезатор и модуляция', description: 'Как меняется характер звука.' },
      { path: '/course/groove-shuffle/lesson-23', title: 'Урок 23: Groove и shuffle ритм', description: 'Как сделать ритм более живым.' },
      { path: '/course/loop-creation/lesson-24', title: 'Урок 24: Создание лупа из аккордов', description: 'Собираем маленькую музыкальную форму.' },
      { path: '/course/practice-final/lesson-25', title: 'Урок 25: Практика — пишем свой трек', description: 'Финальное упражнение по созданию трека.' },
    ],
  },
]

const totalLessons = computed(() => modules.reduce((sum, module) => sum + module.lessons.length, 0))
const totalModules = computed(() => modules.length)
</script>

<template>
  <div class="mx-auto max-w-5xl p-8">
    <div class="rounded-3xl border border-surface2 bg-surface p-6 shadow-soft textured-surface">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 class="text-2xl card-heading">Путь по курсу</h2>
          <p class="mt-2 max-w-2xl text-sm text-textDim">
            Учебник собран как последовательность небольших шагов: от ритма к гармонии.
            Переходи от урока к уроку и слушай, как меняется музыка.
          </p>
        </div>
        <div class="rounded-2xl border border-surface2 bg-surface2/70 px-4 py-3 text-sm text-textDim">
          <div class="font-medium text-text">{{ totalLessons }} уроков</div>
          <div class="mt-1">{{ totalModules }} модулей</div>
        </div>
      </div>
    </div>

    <div class="mt-8 space-y-6">
      <section
        v-for="module in modules"
        :key="module.title"
        class="rounded-2xl border border-surface2 bg-surface p-6 shadow-soft"
      >
        <div class="mb-4 flex items-center justify-between gap-3">
          <h3 class="text-xl font-semibold">{{ module.title }}</h3>
          <span class="rounded-full border border-surface2 bg-surface2/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-textDim">
            {{ module.lessons.length }} уроков
          </span>
        </div>
        <div class="space-y-2">
          <RouterLink
            v-for="lesson in module.lessons"
            :key="lesson.path"
            :to="lesson.path"
            class="flex items-start gap-3 rounded-xl border border-surface2 bg-surface2/70 px-4 py-3 transition hover:bg-surface"
          >
            <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">→</span>
            <div>
              <div class="font-medium">{{ lesson.title }}</div>
              <div class="mt-1 text-sm text-textDim">{{ lesson.description }}</div>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>