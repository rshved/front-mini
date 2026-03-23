<script setup lang="ts">
import { ref } from 'vue'
import ExerciseCard from '../components/ExerciseCard.vue'

const emit = defineEmits<{
  (e: 'finish'): void
}>()

interface Set {
  id: number
  weight: number
  reps: number
  done: boolean
}

interface Exercise {
  id: number
  name: string
  sets: Set[]
}

const exercises = ref<Exercise[]>([
  {
    id: 1,
    name: 'Bench Press',
    sets: [
      { id: 1, weight: 80, reps: 8, done: false },
      { id: 2, weight: 80, reps: 8, done: false },
      { id: 3, weight: 80, reps: 6, done: false },
    ],
  },
  {
    id: 2,
    name: 'Overhead Press',
    sets: [
      { id: 1, weight: 50, reps: 10, done: false },
      { id: 2, weight: 50, reps: 10, done: false },
    ],
  },
  {
    id: 3,
    name: 'Tricep Dips',
    sets: [
      { id: 1, weight: 0, reps: 12, done: false },
      { id: 2, weight: 0, reps: 12, done: false },
    ],
  },
])

function addSet(exerciseId: number) {
  const ex = exercises.value.find(e => e.id === exerciseId)
  if (!ex) return
  const last = ex.sets[ex.sets.length - 1]
  ex.sets.push({
    id: ex.sets.length + 1,
    weight: last?.weight ?? 0,
    reps: last?.reps ?? 10,
    done: false,
  })
}

function toggleSet(exerciseId: number, setId: number) {
  const ex = exercises.value.find(e => e.id === exerciseId)
  const set = ex?.sets.find(s => s.id === setId)
  if (set) set.done = !set.done
}

function addExercise() {
  const newId = exercises.value.length + 1
  exercises.value.push({
    id: newId,
    name: `Exercise ${newId}`,
    sets: [{ id: 1, weight: 0, reps: 10, done: false }],
  })
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-zinc-950">
    <!-- Header -->
    <div class="px-4 pt-6 pb-2 flex items-center gap-3">
      <button
        @click="emit('finish')"
        class="text-zinc-400 text-sm py-1 pr-2 hover:text-zinc-200 transition-colors"
      >
        ← Back
      </button>
      <h1 class="text-white text-xl font-bold">Push Day</h1>
    </div>

    <div class="flex-1 overflow-y-auto px-4 pt-4 pb-32 space-y-4">
      <ExerciseCard
        v-for="ex in exercises"
        :key="ex.id"
        :name="ex.name"
        :sets="ex.sets"
        @add-set="addSet(ex.id)"
        @toggle-set="toggleSet(ex.id, $event)"
      />

      <button
        @click="addExercise"
        class="w-full py-4 rounded-2xl border border-dashed border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
      >
        + Add Exercise
      </button>
    </div>

    <!-- Finish button pinned to bottom -->
    <div class="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-zinc-950">
      <button
        @click="emit('finish')"
        class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-4 rounded-2xl text-base transition-colors"
      >
        Finish Workout
      </button>
    </div>
  </div>
</template>
