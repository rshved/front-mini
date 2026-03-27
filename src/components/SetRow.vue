<script setup lang="ts">
defineProps<{
  setNumber: number
  weight: number
  reps: number
  done?: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <div class="flex items-center gap-3 py-2">
    <span class="text-zinc-500 text-sm w-5 text-center shrink-0">{{ setNumber }}</span>
    <span class="flex-1 text-white text-sm"> {{ weight > 0 ? `${weight} kg` : 'BW' }} × {{ reps }} reps </span>
    <button
      class="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors text-sm font-bold"
      :class="done ? 'bg-blue-500 border-blue-500 text-white' : 'border-zinc-600 text-zinc-600'"
      @click="emit('toggle')">
      ✓
    </button>
  </div>
</template>
