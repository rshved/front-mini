<script setup lang="ts">
const globalStore = useGlobalStore()
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white max-w-md mx-auto">
    <HomeScreen
      v-if="globalStore.currentScreen === 'home'"
    />
    <HistoryScreen
      v-else-if="globalStore.currentScreen === 'history'"
    />
    <WorkoutSessionScreen
      v-else-if="globalStore.currentScreen === 'session'"
    />

    <BottomNav
      v-if="globalStore.currentScreen !== 'session'"
    />
  </div>
</template>
