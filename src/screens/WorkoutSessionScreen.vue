<script setup lang="ts">
import WorkoutItemsList from '../components/WorkoutItemsList.vue'

const globalStore = useGlobalStore()
const workoutSessionStore = useWorkoutSessionStore()

async function finish() {
  await workoutSessionStore.finishSession()
  globalStore.currentScreen = 'home'
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-zinc-950">
    <div class="px-4 pt-6 pb-2 flex items-center gap-3">
      <button class="text-zinc-400 text-sm py-1 pr-2 hover:text-zinc-200 transition-colors" @click="finish">
        <span class="flex items-center gap-2"><IconHeroiconsArrowLeft /> Back</span>
      </button>
      <h1 class="text-white text-xl font-bold">Push Day</h1>
    </div>

    <div class="flex-1 overflow-y-auto px-4 pt-4 pb-32">
      <WorkoutItemsList />
    </div>

    <div class="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-3 bg-zinc-950">
      <button
        class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-4 rounded-2xl text-base transition-colors"
        @click="finish">
        Finish Workout
      </button>
    </div>
  </div>
</template>
