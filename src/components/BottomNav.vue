<script setup lang="ts">
defineProps<{ active: string }>()
const emit = defineEmits<{ (e: 'navigate', screen: string): void }>()
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex z-10">
    <button
      @click="emit('navigate', 'home')"
      class="flex-1 flex flex-col items-center py-3 gap-1 text-xs transition-colors"
      :class="active === 'home' ? 'text-blue-400' : 'text-zinc-500'"
    >
      <span class="text-xl leading-none">🏠</span>
      <span>Home</span>
    </button>
    <button
      @click="emit('navigate', 'history')"
      class="flex-1 flex flex-col items-center py-3 gap-1 text-xs transition-colors"
      :class="active === 'history' ? 'text-blue-400' : 'text-zinc-500'"
    >
      <span class="text-xl leading-none">📋</span>
      <span>History</span>
    </button>
  </nav>
</template>
