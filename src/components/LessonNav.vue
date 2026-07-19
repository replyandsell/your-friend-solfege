<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { lessonList } from '../router'
import { useProgress } from '../composables/useProgress'

const route = useRoute()
const { isCompleted, toggleCompleted, markCompleted } = useProgress()

const index = computed(() => lessonList.findIndex((l) => l.path === route.path))
const prev = computed(() => (index.value > 0 ? lessonList[index.value - 1] : null))
const next = computed(() =>
  index.value >= 0 && index.value < lessonList.length - 1 ? lessonList[index.value + 1] : null
)
const completed = computed(() => isCompleted(route.path))

function handleNextClick() {
  markCompleted(route.path)
}
</script>

<template>
  <nav v-if="index !== -1" class="mx-auto mt-10 flex max-w-3xl flex-col gap-4 border-t border-surface2 px-4 pt-6 pb-4 sm:px-0">
    <button
      type="button"
      @click="toggleCompleted(route.path)"
      class="mx-auto flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition"
      :class="completed ? 'border-accent bg-accent/10 text-accent' : 'border-surface2 text-textDim hover:text-text'"
    >
      <span>{{ completed ? '✓' : '○' }}</span>
      <span>{{ completed ? 'Урок пройден' : 'Отметить как пройденный' }}</span>
    </button>

    <div class="flex flex-wrap items-center justify-between gap-3">
      <RouterLink v-if="prev" :to="prev.path" class="gradient-border-btn gradient-border-btn--ghost">
        ← {{ prev.title }}
      </RouterLink>
      <span v-else class="hidden sm:block"></span>

      <RouterLink to="/course" class="text-sm text-textDim transition hover:text-accent">
        К списку уроков
      </RouterLink>

      <RouterLink v-if="next" :to="next.path" class="gradient-border-btn" @click="handleNextClick">
        {{ next.title }} →
      </RouterLink>
      <span v-else class="hidden sm:block"></span>
    </div>
  </nav>
</template>
