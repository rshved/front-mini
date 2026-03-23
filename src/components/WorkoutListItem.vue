<script setup lang="ts">
defineProps<{
  name: string
  date: string
  summary: string
  volume?: string
}>()
</script>

<template>
  <div class="bg-zinc-800 rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer active:opacity-70">
    <div>
      <p class="text-white font-semibold">{{ name }}</p>
      <p class="text-zinc-400 text-sm mt-0.5">{{ date }} · {{ summary }}</p>
    </div>
    <span v-if="volume" class="text-zinc-300 text-sm font-medium ml-3 shrink-0">{{ volume }}</span>
  </div>
</template>
