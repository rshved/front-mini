<script setup lang="ts">
defineProps<{ workout: WorkoutSession }>()
const emit = defineEmits<{ (e: 'back'): void }>()

const workoutSessionStore = useWorkoutSessionStore()
</script>

<template>
  <div class="flex flex-col min-h-screen bg-zinc-950">
    <div class="px-4 pt-8 pb-2 flex items-center gap-3">
      <button class="text-zinc-400 text-sm hover:text-zinc-200 transition-colors" @click="emit('back')">
        ← Back
      </button>
      <h1 class="text-white text-xl font-bold">{{ workout.name }}</h1>
    </div>

    <div class="px-4 pt-2 pb-10 space-y-4 overflow-y-auto">
      <p class="text-zinc-400 text-sm">Duration: {{ workout.endedAt ? workoutSessionStore.getDuration(workout.startedAt, workout.endedAt) : 'In Progress' }}</p>

      <div
        v-for="exercise in workout.items"
        :key="exercise.name"
        class="bg-zinc-800 rounded-2xl p-4"
      >
        <h4 class="text-white font-bold mb-2">{{ exercise.name }}</h4>
        <div class="divide-y divide-zinc-700">
          <!-- <div
            v-for="(set, i) in exercise.sets"
            :key="i"
            class="flex items-center gap-3 py-2"
          >
            <span class="text-zinc-500 text-sm w-5 text-center shrink-0">{{ i + 1 }}</span>
            <span class="text-white text-sm">
              {{ set.weight > 0 ? `${set.weight} kg` : 'BW' }} × {{ set.reps }} reps
            </span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
