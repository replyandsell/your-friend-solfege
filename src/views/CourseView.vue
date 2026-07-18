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
    title: 'Модуль 12: Лад и тональность (дополнительно)',
    lessons: [
      { path: '/course/minor-variants/lesson-42', title: 'Урок 42: Натуральный, гармонический и мелодический минор', description: 'Разница между вариантами минора.' },
      { path: '/course/scale-steps/lesson-43', title: 'Урок 43: Ступени лада и их тяготения', description: 'Функции ступеней.' },
      { path: '/course/parallel-keys/lesson-44', title: 'Урок 44: Параллельные и одноимённые тональности', description: 'Практика использования.' },
      { path: '/course/circle-fifths/lesson-45', title: 'Урок 45: Квинтовый круг на практике', description: 'Транспонирование и связь аккордов.' },
      { path: '/course/transposition/lesson-46', title: 'Урок 46: Транспонирование мелодии и аккордов', description: 'Методы транспозиции.' },
      { path: '/course/modes/lesson-47', title: 'Урок 47: Семь диатонических ладов', description: 'Краткие характеристики ладов.' },
      { path: '/course/pentatonic/lesson-48', title: 'Урок 48: Пентатоника', description: 'Применение в мелодии.' },
      { path: '/course/blues-scale/lesson-49', title: 'Урок 49: Блюзовый звукоряд', description: 'Blue notes и влияние.' },
      { path: '/course/alt-scales/lesson-50', title: 'Урок 50: Целотонный и уменьшённый звукоряд', description: 'Whole-tone и diminished.' },
      { path: '/course/mode-choice/lesson-51', title: 'Урок 51: Выбор лада для трека', description: 'Рекомендации по выбору лада.' },
    ],
  },
  {
    title: 'Модуль 13: Аккорды и гармония (дополнительно)',
    lessons: [
      { path: '/course/triads/lesson-52', title: 'Урок 52: Трезвучия всех видов', description: '' },
      { path: '/course/scale-chords/lesson-53', title: 'Урок 53: Аккорды на каждой ступени мажора', description: '' },
      { path: '/course/minor-chords/lesson-54', title: 'Урок 54: Аккорды в минорной тональности', description: '' },
      { path: '/course/triad-inversions/lesson-55', title: 'Урок 55: Обращения трезвучий', description: '' },
      { path: '/course/seventh-chords/lesson-56', title: 'Урок 56: Септаккорды', description: '' },
      { path: '/course/seventh-inversions/lesson-57', title: 'Урок 57: Обращения септаккордов', description: '' },
      { path: '/course/functions/lesson-58', title: 'Урок 58: Функции I, IV, V', description: '' },
      { path: '/course/harmonic-rhythm/lesson-59', title: 'Урок 59: Гармонический ритм', description: '' },
      { path: '/course/cadences/lesson-60', title: 'Урок 60: Каденции', description: '' },
      { path: '/course/voice-leading/lesson-61', title: 'Урок 61: Голосоведение', description: '' },
      { path: '/course/pedals/lesson-62', title: 'Урок 62: Педальный тон и остинато', description: '' },
      { path: '/course/contructions/lesson-63', title: 'Урок 63: Аккордовые расширения', description: '' },
      { path: '/course/sus-add/lesson-64', title: 'Урок 64: Sus и add-аккорды', description: '' },
      { path: '/course/slash-chords/lesson-65', title: 'Урок 65: Slash chords', description: '' },
      { path: '/course/secondary-dominants/lesson-66', title: 'Урок 66: Вторичные доминанты', description: '' },
      { path: '/course/modal-interchange/lesson-67', title: 'Урок 67: Заимствованные аккорды', description: '' },
      { path: '/course/deceptive/lesson-68', title: 'Урок 68: Обманные разрешения', description: '' },
      { path: '/course/diminished/lesson-69', title: 'Урок 69: Уменьшённые проходящие аккорды', description: '' },
      { path: '/course/reharmonization/lesson-70', title: 'Урок 70: Ре-гармонизация', description: '' },
      { path: '/course/create-progression/lesson-71', title: 'Урок 71: Создание прогрессии', description: '' },
    ],
  },
  {
    title: 'Модуль 14: Мелодия как система',
    lessons: [
      { path: '/course/motif/lesson-72', title: 'Урок 72: Мотив', description: '' },
      { path: '/course/repetition/lesson-73', title: 'Урок 73: Повтор и изменение', description: '' },
      { path: '/course/sequence/lesson-74', title: 'Урок 74: Секвенция', description: '' },
      { path: '/course/inversion/lesson-75', title: 'Урок 75: Инверсия и увелич./уменьшение', description: '' },
      { path: '/course/phrase/lesson-76', title: 'Урок 76: Фраза', description: '' },
      { path: '/course/open-closed/lesson-77', title: 'Урок 77: Открытые и закрытые фразы', description: '' },
      { path: '/course/notes/lesson-78', title: 'Урок 78: Опорные и проходящие ноты', description: '' },
      { path: '/course/neighbor/lesson-79', title: 'Урок 79: Задержания и соседние звуки', description: '' },
      { path: '/course/tension/lesson-80', title: 'Урок 80: Напряжение и разрешение', description: '' },
      { path: '/course/melody-harmony-link/lesson-81', title: 'Урок 81: Связь мелодии с аккордом', description: '' },
      { path: '/course/melodic-rhythm/lesson-82', title: 'Урок 82: Мелодический ритм', description: '' },
      { path: '/course/hook/lesson-83', title: 'Урок 83: Создание хука', description: '' },
      { path: '/course/variation/lesson-84', title: 'Урок 84: Вариации мелодии', description: '' },
      { path: '/course/countermelody/lesson-85', title: 'Урок 85: Контрмелодия', description: '' },
    ],
  },
  {
    title: 'Модуль 15: Басовая партия',
    lessons: [
      { path: '/course/bass/root/lesson-86', title: 'Урок 86: Корневая басовая линия', description: '' },
      { path: '/course/bass/chordtones/lesson-87', title: 'Урок 87: Бас по звукам аккорда', description: '' },
      { path: '/course/bass/passing/lesson-88', title: 'Урок 88: Проходящие и хроматические ноты', description: '' },
      { path: '/course/bass/ostinato/lesson-89', title: 'Урок 89: Остинатный бас', description: '' },
      { path: '/course/bass/counterpoint/lesson-90', title: 'Урок 90: Контрапункт баса и мелодии', description: '' },
      { path: '/course/bass/kick/lesson-91', title: 'Урок 91: Связь баса с бочкой', description: '' },
      { path: '/course/bass/rhythm-contrast/lesson-92', title: 'Урок 92: Ритмический контраст', description: '' },
      { path: '/course/bass/variations/lesson-93', title: 'Урок 93: Вариации басовой линии', description: '' },
      { path: '/course/bass/pedal/lesson-94', title: 'Урок 94: Pedal bass и drone', description: '' },
      { path: '/course/bass/function/lesson-95', title: 'Урок 95: Бас как источник гармонического движения', description: '' },
    ],
  },
  {
    title: 'Модуль 16: Музыкальная форма и аранжировка',
    lessons: [
      { path: '/course/form/lesson-96', title: 'Урок 96: Мотив, фраза, период и секция', description: '' },
      { path: '/course/form/ab-lesson/lesson-97', title: 'Урок 97: Формы AB, ABA и AABA', description: '' },
      { path: '/course/form/structure/lesson-98', title: 'Урок 98: Куплет/припев/бридж', description: '' },
      { path: '/course/form/intro-outro/lesson-99', title: 'Урок 99: Intro и outro', description: '' },
      { path: '/course/form/build-drop/lesson-100', title: 'Урок 100: Build-up, drop и breakdown', description: '' },
      { path: '/course/form/repeat-contrast/lesson-101', title: 'Урок 101: Повторение и контраст', description: '' },
      { path: '/course/form/loop-development/lesson-102', title: 'Урок 102: Развитие loop', description: '' },
      { path: '/course/form/layering/lesson-103', title: 'Урок 103: Добавление/удаление слоёв', description: '' },
      { path: '/course/form/texture/lesson-104', title: 'Урок 104: Плотность, регистр и фактура', description: '' },
      { path: '/course/form/dynamics/lesson-105', title: 'Урок 105: Динамическая дуга', description: '' },
      { path: '/course/form/transitions/lesson-106', title: 'Урок 106: Переходы между разделами', description: '' },
      { path: '/course/form/finish/lesson-107', title: 'Урок 107: Создание полного трека', description: '' },
    ],
  },
  {
    title: 'Модуль 17: Развитие слуха (ear training)',
    lessons: [
      { path: '/course/ear/direction/lesson-108', title: 'Урок 108: Определение направления мелодии', description: '' },
      { path: '/course/ear/intervals/lesson-109', title: 'Урок 109: Определение интервалов', description: '' },
      { path: '/course/ear/singing-scale/lesson-110', title: 'Урок 110: Пение ступеней относительно тоники', description: '' },
      { path: '/course/ear/sing-melody/lesson-111', title: 'Урок 111: Пение мелодических оборотов', description: '' },
      { path: '/course/ear/rhythm-dictation/lesson-112', title: 'Урок 112: Ритмический диктант', description: '' },
      { path: '/course/ear/melodic-dictation/lesson-113', title: 'Урок 113: Мелодический диктант', description: '' },
      { path: '/course/ear/major-minor/lesson-114', title: 'Урок 114: Определение мажора/минора', description: '' },
      { path: '/course/ear/triad-quality/lesson-115', title: 'Урок 115: Вид трезвучия', description: '' },
      { path: '/course/ear/inversion/lesson-116', title: 'Урок 116: Определение обращения аккорда', description: '' },
      { path: '/course/ear/seventh/lesson-117', title: 'Урок 117: Определение септаккордов', description: '' },
      { path: '/course/ear/functions/lesson-118', title: 'Урок 118: Функции I, IV, V', description: '' },
      { path: '/course/ear/progressions/lesson-119', title: 'Урок 119: Определение последовательностей', description: '' },
      { path: '/course/ear/bass/lesson-120', title: 'Урок 120: Определение басовой линии', description: '' },
      { path: '/course/ear/transcribe-melody/lesson-121', title: 'Урок 121: Снятие мелодии на слух', description: '' },
      { path: '/course/ear/transcribe-chords/lesson-122', title: 'Урок 122: Снятие аккордов', description: '' },
      { path: '/course/ear/pianoroll/lesson-123', title: 'Урок 123: Воспроизведение в piano roll', description: '' },
    ],
  },
  {
    title: 'Модуль 18: Применение в DAW',
    lessons: [
      { path: '/course/daw/pitch-lesson/lesson-124', title: 'Урок 124: Ноты и октавы в piano roll', description: '' },
      { path: '/course/daw/tonality/lesson-125', title: 'Урок 125: Тональность проекта', description: '' },
      { path: '/course/daw/transposing/lesson-126', title: 'Урок 126: Транспонирование MIDI', description: '' },
      { path: '/course/daw/velocity/lesson-127', title: 'Урок 127: Velocity', description: '' },
      { path: '/course/daw/duration/lesson-128', title: 'Урок 128: Длительность и артикуляция', description: '' },
      { path: '/course/daw/quantize/lesson-129', title: 'Урок 129: Quantize', description: '' },
      { path: '/course/daw/swing/lesson-130', title: 'Урок 130: Swing и templates', description: '' },
      { path: '/course/daw/chords-midi/lesson-131', title: 'Урок 131: Создание аккордов в MIDI', description: '' },
      { path: '/course/daw/voice-leading-midi/lesson-132', title: 'Урок 132: Voice leading в piano roll', description: '' },
      { path: '/course/daw/loop-variations/lesson-133', title: 'Урок 133: Вариации loop', description: '' },
      { path: '/course/daw/automation/lesson-134', title: 'Урок 134: Automation', description: '' },
      { path: '/course/daw/reference/lesson-135', title: 'Урок 135: Анализ референса', description: '' },
      { path: '/course/daw/transcribe-midi/lesson-136', title: 'Урок 136: Перенос в MIDI', description: '' },
      { path: '/course/daw/final-project/lesson-137', title: 'Урок 137: Итоговый проект', description: '' },
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
  {
    title: 'Модуль 14: Продвинутый ритм и groove',
    lessons: [
      { path: '/course/rhythm/division/lesson-32', title: 'Урок 32: Деление доли — восьмые и шестнадцатые', description: 'Ровное деление и упражнения.' },
      { path: '/course/rhythm/dots-ties/lesson-33', title: 'Урок 33: Точки и лиги', description: 'Длительности через границу доли.' },
      { path: '/course/rhythm/syncopation-advanced/lesson-34', title: 'Урок 34: Синкопа — продвинутый', description: 'Сложные формы синкопы.' },
      { path: '/course/rhythm/triplets/lesson-35', title: 'Урок 35: Триоли и деления', description: 'Триоли и комбинированные деления.' },
      { path: '/course/rhythm/swing/lesson-36', title: 'Урок 36: Свинг и shuffle', description: 'Swing vs shuffle и шаблоны.' },
      { path: '/course/rhythm/compound-meters/lesson-37', title: 'Урок 37: Составные размеры', description: '6/8, 9/8, 12/8 — практика.' },
      { path: '/course/rhythm/odd-meters/lesson-38', title: 'Урок 38: Нечётные размеры', description: '5/4, 7/8 и упражнения.' },
      { path: '/course/rhythm/polyrhythm/lesson-39', title: 'Урок 39: Полиритмия', description: '3:2, 4:3 и взаимодействие.' },
      { path: '/course/rhythm/groove/lesson-40', title: 'Урок 40: Грув и микротайминг', description: 'Humanize и нюансы тайминга.' },
      { path: '/course/rhythm/piano-roll/lesson-41', title: 'Урок 41: Ритм в piano roll', description: 'Velocity, quantize, swing в DAW.' },
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