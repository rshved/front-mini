<script setup lang="ts">
defineProps<{ page: number; totalPages: number }>()
defineEmits<{ change: [page: number] }>()
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-4 pt-2">
    <button
      class="px-4 py-2 rounded-lg bg-zinc-800 text-white text-sm disabled:opacity-40"
      :disabled="page <= 1"
      @click="$emit('change', page - 1)">
      Previous
    </button>

    <span class="text-zinc-400 text-sm">{{ page }} / {{ totalPages }}</span>

    <button
      class="px-4 py-2 rounded-lg bg-zinc-800 text-white text-sm disabled:opacity-40"
      :disabled="page >= totalPages"
      @click="$emit('change', page + 1)">
      Next
    </button>
  </div>
</template>
