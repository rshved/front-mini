<script setup lang="ts">
import { useWorkoutSessionStore } from '@/stores/workoutSession.store'
import { ref } from 'vue'
import StatsCard from '../components/StatsCard.vue'
import WorkoutCard from '../components/WorkoutCard.vue'
import WorkoutDetail from '../components/WorkoutDetail.vue'
import WorkoutListItem from '../components/WorkoutListItem.vue'
import type { Workout } from '../types'


const emit = defineEmits<{
  (e: 'start-workout'): void
}>()

const selectedWorkout = ref<Workout | null>(null)

const workoutSessionStore = useWorkoutSessionStore()

workoutSessionStore.getSessions()

const stats = [
  { label: 'Total', value: 42 },
  { label: 'Streak', value: '5d' },
  { label: 'Volume', value: '12t' },
  { label: 'This week', value: 3 },
]

const recentWorkouts: Workout[] = [
  {
    name: 'Push Day',
    date: 'Mar 22',
    summary: '5 exercises · 45 min',
    volume: '3,200 kg',
    exercises: [
      { name: 'Bench Press', sets: [{ weight: 80, reps: 8 }, { weight: 80, reps: 8 }, { weight: 75, reps: 6 }] },
      { name: 'Overhead Press', sets: [{ weight: 50, reps: 10 }, { weight: 50, reps: 9 }] },
      { name: 'Tricep Dips', sets: [{ weight: 0, reps: 12 }, { weight: 0, reps: 10 }] },
    ],
  },
  {
    name: 'Pull Day',
    date: 'Mar 20',
    summary: '4 exercises · 40 min',
    volume: '2,850 kg',
    exercises: [
      { name: 'Pull-ups', sets: [{ weight: 0, reps: 8 }, { weight: 0, reps: 7 }] },
      { name: 'Barbell Row', sets: [{ weight: 70, reps: 10 }, { weight: 70, reps: 10 }, { weight: 70, reps: 8 }] },
      { name: 'Face Pulls', sets: [{ weight: 25, reps: 15 }, { weight: 25, reps: 15 }] },
    ],
  },
  {
    name: 'Leg Day',
    date: 'Mar 18',
    summary: '6 exercises · 55 min',
    volume: '4,100 kg',
    exercises: [
      { name: 'Squat', sets: [{ weight: 100, reps: 5 }, { weight: 100, reps: 5 }, { weight: 100, reps: 4 }] },
      { name: 'Romanian Deadlift', sets: [{ weight: 80, reps: 10 }, { weight: 80, reps: 10 }] },
      { name: 'Leg Press', sets: [{ weight: 140, reps: 12 }, { weight: 140, reps: 12 }] },
    ],
  },
]
</script>

<template>
  <WorkoutDetail
    v-if="selectedWorkout"
    :workout="selectedWorkout"
    @back="selectedWorkout = null"
  />

  <template v-else>
    <div class="px-4 pt-8 pb-2">
      <p class="text-zinc-400 text-sm">Good morning 💪</p>
      <h1 class="text-white text-2xl font-bold mt-1">Dashboard</h1>
    </div>

    <div class="overflow-y-auto px-4 pt-4 pb-24 space-y-5">
      <div class="grid grid-cols-2 gap-3">
        <StatsCard v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value" />
      </div>

      <WorkoutCard
        name="Push Day"
        meta="5 exercises · Chest, Shoulders, Triceps"
        cta-label="Start Workout"
        @cta="emit('start-workout')"
      />

      <div>
        <h2 class="text-white font-semibold text-base mb-3">Recent Workouts</h2>
        <div class="space-y-2">
          <WorkoutListItem
            v-for="w in recentWorkouts"
            :key="w.name + w.date"
            :name="w.name"
            :date="w.date"
            :summary="w.summary"
            :volume="w.volume"
            @click="selectedWorkout = w"
          />
        </div>
      </div>
    </div>
  </template>
</template>
