<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import LessonNav from './components/LessonNav.vue'

const route = useRoute()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-bg lg:flex-row">
    <aside class="w-full border-b border-surface2 bg-surface/95 p-4 shadow-soft lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-5">
      <div class="mb-4 rounded-2xl border border-surface2 bg-surface2/80 p-4 shadow-soft lg:mb-6">
        <p class="text-[11px] uppercase tracking-[0.3em] text-accent">Онлайн-курс</p>
        <h1 class="mt-2 text-lg font-semibold">Наш друг - СОЛЬФЕДЖИО</h1>
        <p class="mt-1 text-sm text-textDim">Практическое сольфеджио</p>
      </div>

      <div class="mb-3 text-[11px] uppercase tracking-[0.25em] text-textDim">Навигация</div>
      <div class="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        <RouterLink
          to="/"
          class="rounded-xl px-3 py-2 text-sm transition hover:bg-surface2 gradient-border-btn--ghost"
          active-class="bg-surface2 text-accent"
        >
          Главная
        </RouterLink>
        <RouterLink
          to="/course"
          class="rounded-xl px-3 py-2 text-sm transition hover:bg-surface2 gradient-border-btn--ghost"
          active-class="bg-surface2 text-accent"
        >
          Курс
        </RouterLink>
      </div>

      <div class="mt-4 rounded-2xl border border-surface2 bg-surface2/70 p-4 lg:mt-auto">
        <p class="text-sm font-medium">Путь по курсу</p>
        <p class="mt-1 text-xs leading-5 text-textDim">От ритма и высоты к гармонии, ладам и собственному треку.</p>
      </div>
    </aside>

    <main class="flex-1 overflow-auto bg-[radial-gradient(circle_at_top_left,_rgba(184,106,46,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(240,217,194,0.18),_transparent_28%)]">
      <RouterView />
      <LessonNav v-if="route.path.startsWith('/course/')" />
    </main>
  </div>
</template>