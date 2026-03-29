<script setup lang="ts">
defineProps<{ label: string; value: string | number }>()
</script>

<template>
  <div class="bg-zinc-800 rounded-2xl p-4 flex flex-col gap-1">
    <span class="text-zinc-400 text-xs uppercase tracking-wide">{{ label }}</span>
    <span class="text-white text-2xl font-bold">{{ value }}</span>
  </div>
</template>
