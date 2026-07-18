import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CourseView from '../views/CourseView.vue'
import LessonPulseView from '../views/LessonPulseView.vue'
import LessonBeatsView from '../views/LessonBeatsView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/course', name: 'course', component: CourseView },
  { path: '/course/pulse/lesson-1', name: 'lesson-pulse-1', component: LessonPulseView },
  { path: '/course/beats/lesson-2', name: 'lesson-beats-2', component: LessonBeatsView },
  { path: '/course/syncopation/lesson-3', name: 'lesson-syncopation-3', component: () => import('../views/LessonSyncopationView.vue') },
  { path: '/course/pitch-direction/lesson-4', name: 'lesson-pitch-4', component: () => import('../views/LessonPitchDirectionView.vue') },
  { path: '/course/octave/lesson-5', name: 'lesson-octave-5', component: () => import('../views/LessonOctaveView.vue') },
  { path: '/course/piano-roll/lesson-6', name: 'lesson-piano-roll-6', component: () => import('../views/LessonPianoRollView.vue') },
  { path: '/course/intervals-close/lesson-7', name: 'lesson-intervals-7', component: () => import('../views/LessonIntervalsCloseView.vue') },
  { path: '/course/intervals-far/lesson-8', name: 'lesson-intervals-8', component: () => import('../views/LessonIntervalsFarView.vue') },
  { path: '/course/tonic/lesson-9', name: 'lesson-tonic-9', component: () => import('../views/LessonTonicView.vue') },
  { path: '/course/scale-steps/lesson-10', name: 'lesson-scale-10', component: () => import('../views/LessonScaleStepsView.vue') },
  { path: '/course/triads/lesson-11', name: 'lesson-triads-11', component: () => import('../views/LessonTriadsView.vue') },
  { path: '/course/chords-application/lesson-12', name: 'lesson-chords-12', component: () => import('../views/LessonChordsApplicationView.vue') },
  { path: '/course/dominant-seven/lesson-13', name: 'lesson-dominant-13', component: () => import('../views/LessonDominantSevenView.vue') },
  { path: '/course/minor-seven/lesson-14', name: 'lesson-minor-14', component: () => import('../views/LessonMinor7View.vue') },
  { path: '/course/modes/lesson-15', name: 'lesson-modes-15', component: () => import('../views/LessonModesView.vue') },
  { path: '/course/triton/lesson-16', name: 'lesson-triton-16', component: () => import('../views/LessonTritonView.vue') },
  { path: '/course/minor-progression/lesson-17', name: 'lesson-minor-17', component: () => import('../views/LessonMinorProgressionView.vue') },
  { path: '/course/melody-phrasing/lesson-18', name: 'lesson-melody-18', component: () => import('../views/LessonMelodyPhrasingView.vue') },
  { path: '/course/breath-pause/lesson-19', name: 'lesson-breath-19', component: () => import('../views/LessonBreathPauseView.vue') },
  { path: '/course/voice-leading/lesson-20', name: 'lesson-voice-20', component: () => import('../views/LessonVoiceLeadingView.vue') },
  { path: '/course/pentatonic/lesson-21', name: 'lesson-pent-21', component: () => import('../views/LessonPentatonicView.vue') },
  { path: '/course/synth-modulation/lesson-22', name: 'lesson-synth-22', component: () => import('../views/LessonSynthModulationView.vue') },
  { path: '/course/groove-shuffle/lesson-23', name: 'lesson-groove-23', component: () => import('../views/LessonGrooveShuffleView.vue') },
  { path: '/course/loop-creation/lesson-24', name: 'lesson-loop-24', component: () => import('../views/LessonLoopCreationView.vue') },
  { path: '/course/practice-final/lesson-25', name: 'lesson-final-25', component: () => import('../views/LessonPracticeFinalView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
