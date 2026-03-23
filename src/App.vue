<script setup lang="ts">
import { ref } from 'vue'
import HomeScreen from './screens/HomeScreen.vue'
import HistoryScreen from './screens/HistoryScreen.vue'
import WorkoutSessionScreen from './screens/WorkoutSessionScreen.vue'
import BottomNav from './components/BottomNav.vue'

type Screen = 'home' | 'history' | 'session'

const currentScreen = ref<Screen>('home')
</script>

<template>
  <div class="min-h-screen bg-zinc-950 text-white max-w-md mx-auto">
    <HomeScreen
      v-if="currentScreen === 'home'"
      @start-workout="currentScreen = 'session'"
    />
    <HistoryScreen
      v-else-if="currentScreen === 'history'"
    />
    <WorkoutSessionScreen
      v-else-if="currentScreen === 'session'"
      @finish="currentScreen = 'home'"
    />

    <BottomNav
      v-if="currentScreen !== 'session'"
      :active="currentScreen"
      @navigate="currentScreen = $event as Screen"
    />
  </div>
</template>
