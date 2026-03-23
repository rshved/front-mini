<script setup lang="ts">
import { ref } from 'vue'
import StatsCard from '../components/StatsCard.vue'
import WorkoutListItem from '../components/WorkoutListItem.vue'
import WorkoutDetail from '../components/WorkoutDetail.vue'
import type { Workout } from '../types'

const selectedWorkout = ref<Workout | null>(null)

const stats = [
  { label: 'Total workouts', value: 42 },
  { label: 'Best streak', value: '12d' },
]

const workouts: Workout[] = [
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
  {
    name: 'Push Day',
    date: 'Mar 15',
    summary: '5 exercises · 42 min',
    volume: '3,050 kg',
    exercises: [
      { name: 'Bench Press', sets: [{ weight: 77.5, reps: 8 }, { weight: 77.5, reps: 8 }, { weight: 75, reps: 6 }] },
      { name: 'Overhead Press', sets: [{ weight: 47.5, reps: 10 }, { weight: 47.5, reps: 10 }] },
    ],
  },
  {
    name: 'Pull Day',
    date: 'Mar 13',
    summary: '4 exercises · 38 min',
    volume: '2,700 kg',
    exercises: [
      { name: 'Pull-ups', sets: [{ weight: 0, reps: 7 }, { weight: 0, reps: 6 }] },
      { name: 'Barbell Row', sets: [{ weight: 67.5, reps: 10 }, { weight: 67.5, reps: 10 }] },
    ],
  },
  {
    name: 'Full Body',
    date: 'Mar 11',
    summary: '7 exercises · 60 min',
    volume: '5,200 kg',
    exercises: [
      { name: 'Squat', sets: [{ weight: 95, reps: 5 }, { weight: 95, reps: 5 }] },
      { name: 'Bench Press', sets: [{ weight: 75, reps: 8 }, { weight: 75, reps: 8 }] },
      { name: 'Barbell Row', sets: [{ weight: 65, reps: 10 }, { weight: 65, reps: 10 }] },
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
      <h1 class="text-white text-2xl font-bold">History</h1>
    </div>

    <div class="overflow-y-auto px-4 pt-4 pb-24 space-y-5">
      <div class="grid grid-cols-2 gap-3">
        <StatsCard v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value" />
      </div>

      <div>
        <h2 class="text-white font-semibold text-base mb-3">All Workouts</h2>
        <div class="space-y-2">
          <WorkoutListItem
            v-for="w in workouts"
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
