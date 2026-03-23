<script setup lang="ts">
defineProps<{
  name: string
  meta: string
  ctaLabel: string
}>()

const emit = defineEmits<{
  (e: 'cta'): void
}>()
</script>

<template>
  <div class="bg-zinc-800 rounded-2xl p-5">
    <p class="text-zinc-400 text-xs uppercase tracking-wide mb-1">Today's Workout</p>
    <h3 class="text-white text-xl font-bold">{{ name }}</h3>
    <p class="text-zinc-400 text-sm mt-1 mb-4">{{ meta }}</p>
    <button
      @click="emit('cta')"
      class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 rounded-xl text-base transition-colors"
    >
      {{ ctaLabel }}
    </button>
  </div>
</template>
