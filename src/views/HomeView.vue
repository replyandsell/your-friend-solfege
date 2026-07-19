<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { lessonList } from '../router'
import { useProgress } from '../composables/useProgress'

const { state: progressState, isCompleted } = useProgress()

const continueLesson = computed(() => lessonList.find((l) => !isCompleted(l.path)) || lessonList[0])
const hasProgress = computed(() => progressState.completed.size > 0)
</script>

<template>
  <div class="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
    <div class="rounded-3xl border border-surface2 bg-surface p-5 shadow-soft sm:p-8">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="mb-3 text-sm uppercase tracking-[0.2em] text-accent">Онлайн-курс</p>
          <h2 class="mb-3 text-2xl font-semibold sm:text-3xl">Наш друг - СОЛЬФЕДЖИО</h2>
          <p class="max-w-2xl text-sm text-textDim sm:text-base">
            Этот курс ведёт от чувства ритма и высоты звука к полному пониманию сольфеджио и гармонии.
            Каждое упражнение можно слушать, пробовать и повторять в своём темпе.
          </p>
        </div>
        <div class="rounded-2xl border border-surface2 bg-surface2/70 px-4 py-3 text-sm text-textDim">
          <div class="font-medium text-text">137 уроков</div>
          <div class="mt-1">21 модуль • аудио-упражнения</div>
        </div>
      </div>

      <div class="mt-6 flex flex-wrap gap-3">
        <RouterLink
          v-if="hasProgress"
          :to="continueLesson.path"
          class="rounded-lg gradient-border-btn shadow-soft"
        >
          Продолжить обучение
        </RouterLink>
        <RouterLink
          to="/course"
          class="rounded-lg gradient-border-btn"
          :class="hasProgress ? 'gradient-border-btn--ghost' : 'shadow-soft'"
        >
          Начать курс
        </RouterLink>
        <RouterLink
          v-if="!hasProgress"
          to="/course/pulse/lesson-1"
          class="rounded-lg gradient-border-btn gradient-border-btn--ghost"
        >
          К первому уроку
        </RouterLink>
      </div>
    </div>

    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl border border-surface2 bg-surface p-5 shadow-soft textured-surface">
        <h3 class="mb-2 card-heading text-lg">Ритм</h3>
        <p class="text-sm text-textDim">Учимся ощущать пульс, доли, синкопу и строить ритмический грув.</p>
      </div>
      <div class="rounded-2xl border border-surface2 bg-surface p-5 textured-surface">
        <h3 class="mb-2 card-heading text-lg">Высота</h3>
        <p class="text-sm text-textDim">Разбираем направление мелодии, октавы, piano roll и интервалы.</p>
      </div>
      <div class="rounded-2xl border border-surface2 bg-surface p-5 textured-surface">
        <h3 class="mb-2 card-heading text-lg">Гармония</h3>
        <p class="text-sm text-textDim">Переходим к тонике, ступеням, трезвучиям и расширенным аккордам.</p>
      </div>
    </div>

    <div class="mt-8 rounded-2xl border border-surface2 bg-surface p-5 shadow-soft sm:p-6">
      <h3 class="mb-3 text-lg font-semibold">Как проходит обучение</h3>
      <ol class="list-decimal space-y-2 pl-5 text-sm text-textDim">
        <li>Сначала слушаешь и знакомишься с идеей урока.</li>
        <li>Потом пробуешь упражнение и сравниваешь звучание.</li>
        <li>В конце закрепляешь навык на простом музыкальном примере.</li>
      </ol>
    </div>
  </div>
</template>