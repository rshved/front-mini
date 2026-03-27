<script setup lang="ts">
const workoutSessionStore = useWorkoutSessionStore()
</script>

<template>
  <div class="flex flex-col min-h-screen bg-zinc-950">
    <div class="px-4 pt-8 pb-2 flex items-center gap-3">
      <button class="text-zinc-400 text-sm hover:text-zinc-200 transition-colors" @click="workoutSessionStore.currentSession = null">
        ← Back
      </button>
      <h1 class="text-white text-xl font-bold">{{ workoutSessionStore.currentSession?.name }}</h1>
    </div>

    <div class="px-4 pt-2 pb-10 space-y-4 overflow-y-auto">
      <p class="text-zinc-400 text-sm">
        Duration:
        {{
          workoutSessionStore.currentSession?.endedAt
            ? workoutSessionStore.getDuration(workoutSessionStore.currentSession.startedAt, workoutSessionStore.currentSession.endedAt)
            : 'In Progress'
        }}
      </p>

      <div v-for="exercise in workoutSessionStore.currentSession?.items" :key="exercise.name" class="bg-zinc-800 rounded-2xl p-4">
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

    <div class="sticky bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-zinc-950">
      <button
        v-if="!workoutSessionStore.currentSession?.endedAt"
        class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-4 rounded-2xl text-base transition-colors"
        @click="workoutSessionStore.finishSession">
        Finish Workout
      </button>
    </div>
  </div>
</template>
