<script setup lang="ts">
const props = defineProps<{
  workout: WorkoutSession
}>()

const workoutSessionStore = useWorkoutSessionStore()

const exercisePreview = computed(() => {
  const names = props.workout.items.map(i => i.name)
  if (names.length === 0) return null

  const counts = new Map<string, number>()
  for (const name of names) counts.set(name, (counts.get(name) ?? 0) + 1)

  const unique = [...counts.entries()]
  const shown = unique.slice(0, 2).map(([name, count]) => count > 1 ? `${name} ×${count}` : name)
  const remaining = unique.length - 2

  return remaining > 0 ? `${shown.join(', ')} +${remaining}` : shown.join(', ')
})
</script>

<template>
  <div class="bg-zinc-800 rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer active:opacity-70">
    <div class="flex justify-between items-center gap-10px w-full">
      <div>
        <p class="text-white font-semibold">{{ workout.name }}</p>
        <p class="text-zinc-400 text-sm mt-0.5">
          <template v-if="workout.items.length === 0">
            <template v-if="workout.endedAt">No exercises • {{ workoutSessionStore.getDuration(workout.startedAt, workout.endedAt) }}</template>
            <template v-else>In Progress</template>
          </template>
          <template v-else>
            {{ workout.items.length }} exercise{{ workout.items.length !== 1 ? 's' : '' }}
            <template v-if="workout.endedAt"> • {{ workoutSessionStore.getDuration(workout.startedAt, workout.endedAt) }}</template>
            <template v-else> • In Progress</template>
          </template>
        </p>
        <p v-if="exercisePreview" class="text-zinc-500 text-xs mt-0.5">{{ exercisePreview }}</p>
      </div>
      <div class="flex items-center">
        <button class="cursor-pointer" @click.stop="workoutSessionStore.deleteSession(workout.id)">
          <IconHeroiconsTrash class="w-5 h-5 text-red-500" />
        </button>
      </div>
    </div>
  </div>
</template>
