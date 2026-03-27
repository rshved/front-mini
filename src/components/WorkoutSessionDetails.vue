<script setup lang="ts">
const workoutSessionStore = useWorkoutSessionStore()
</script>

<template>
  <div class="flex flex-col min-h-screen bg-zinc-950">
    <div class="px-4 pt-8 pb-2 flex items-center gap-3">
      <button class="text-zinc-400 text-sm hover:text-zinc-200 transition-colors" @click="workoutSessionStore.currentSession = null">
        <span class="flex items-center gap-2"> <IconHeroiconsArrowLeft /> Back </span>
      </button>
      <h1 class="text-white font-bold">{{ workoutSessionStore.currentSession?.name }}</h1>
    </div>

    <div class="px-4 pt-2 pb-10 space-y-4 overflow-y-auto">
      <p class="text-zinc-400 text-sm">
        <span class="font-[700] text-white">Duration:</span>
        {{
          workoutSessionStore.currentSession?.endedAt
            ? workoutSessionStore.getDuration(workoutSessionStore.currentSession.startedAt, workoutSessionStore.currentSession.endedAt)
            : 'In Progress'
        }}
      </p>

      <div v-for="exercise in workoutSessionStore.currentSession?.items" :key="exercise.name" class="bg-zinc-800 rounded-2xl p-4 flex justify-between items-center gap-2">
        <h4 class="text-white font-bold mb-2">{{ exercise.name }}</h4>
        <div>{{ exercise.repeats }}</div>
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
