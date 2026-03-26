<script setup lang="ts">
const workoutSessionStore = useWorkoutSessionStore()
const globalStore = useGlobalStore()

const name = ref('')
// const description = ref('')

async function startWorkout() {
  await workoutSessionStore.startSession(name.value)
  globalStore.currentScreen = 'session'
}
</script>

<template>
  <div class="bg-zinc-800 rounded-2xl p-5">
    <p class="text-zinc-400 text-xs uppercase tracking-wide mb-3">
      New Workout
    </p>

    <input
      v-model="name"
      placeholder="Workout name"
      class="w-full mb-3 px-3 py-2 rounded-lg bg-zinc-700 text-white outline-none"
    />

    <!-- <textarea
      v-model="description"
      placeholder="Description (optional)"
      class="w-full mb-4 px-3 py-2 rounded-lg bg-zinc-700 text-white outline-none"
    /> -->

    <button
      class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 rounded-xl"
      @click="startWorkout"
    >
      Start Workout
    </button>
  </div>
</template>