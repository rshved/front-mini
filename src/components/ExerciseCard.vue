<script setup lang="ts">
import SetRow from './SetRow.vue'

interface Set {
  id: number
  weight: number
  reps: number
  done: boolean
}

defineProps<{
  name: string
  sets: Set[]
}>()

const emit = defineEmits<{
  (e: 'add-set'): void
  (e: 'toggle-set', setId: number): void
}>()
</script>

<template>
  <div class="bg-zinc-800 rounded-2xl p-4">
    <h4 class="text-white font-bold text-base mb-2">{{ name }}</h4>
    <div class="divide-y divide-zinc-700">
      <SetRow
        v-for="set in sets"
        :key="set.id"
        :setNumber="set.id"
        :weight="set.weight"
        :reps="set.reps"
        :done="set.done"
        @toggle="emit('toggle-set', set.id)"
      />
    </div>
    <button
      @click="emit('add-set')"
      class="mt-3 w-full py-2 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:border-zinc-500 hover:text-zinc-200 transition-colors"
    >
      + Add Set
    </button>
  </div>
</template>
