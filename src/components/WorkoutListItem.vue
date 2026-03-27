<script setup lang="ts">
defineProps<{
  workout: WorkoutSession
}>()

const workoutSessionStore = useWorkoutSessionStore()
</script>

<template>
  <div class="bg-zinc-800 rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer active:opacity-70">
    <div class="flex justify-between items-center gap-10px w-full">
      <div>
        <div>
          <p class="text-white font-semibold">{{ workout.name }}</p>
          <p class="text-zinc-400 text-sm mt-0.5">
            Duration:
            {{ workout.endedAt ? workoutSessionStore.getDuration(workout.startedAt, workout.endedAt) : 'In Progress' }}
          </p>
        </div>
        <span v-if="workout.volume" class="text-zinc-300 text-sm font-medium ml-3 shrink-0">{{ workout.volume }}</span>
      </div>
      <div class="flex items-center">
        <button class="cursor-pointer" @click.stop="workoutSessionStore.deleteSession(workout.id)">
          <IconHeroiconsTrash class="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  </div>
</template>
