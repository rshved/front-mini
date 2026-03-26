<script setup lang="ts">
const globalStore = useGlobalStore() 
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex z-10">
    <button
      class="flex-1 flex flex-col items-center py-3 gap-1 text-xs transition-colors"
      :class="globalStore.currentScreen === 'home' ? 'text-blue-400' : 'text-zinc-500'"
      @click="globalStore.currentScreen = 'home'"
    >
      <span class="text-xl leading-none">🏠</span>
      <span>Home</span>
    </button>
    <button
      class="flex-1 flex flex-col items-center py-3 gap-1 text-xs transition-colors"
      :class="globalStore.currentScreen === 'history' ? 'text-blue-400' : 'text-zinc-500'"
      @click="globalStore.currentScreen = 'history'"
    >
      <span class="text-xl leading-none">📋</span>
      <span>History</span>
    </button>
  </nav>
</template>
