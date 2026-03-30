<script setup lang="ts">
defineProps<{
  name: string
  weight: number | null
  repeats: number
  submitLabel: string
}>()

defineEmits<{
  'update:name': [value: string]
  'update:weight': [value: number | null]
  'update:repeats': [value: number]
  submit: []
  cancel: []
}>()
</script>

<template>
  <div>
    <div class="flex gap-2 mb-2">
      <input
        :value="name"
        class="flex-1 bg-zinc-700 text-white rounded-xl px-3 py-2 text-sm outline-none"
        placeholder="Exercise name"
        @input="$emit('update:name', ($event.target as HTMLInputElement).value)" />
      <input
        :value="weight ?? ''"
        type="number"
        min="0"
        class="w-24 bg-zinc-700 text-white rounded-xl px-3 py-2 text-sm outline-none text-center"
        placeholder="Weight (kg)"
        @input="$emit('update:weight', ($event.target as HTMLInputElement).value === '' ? null : Number(($event.target as HTMLInputElement).value))" />
      <input
        :value="repeats"
        type="number"
        min="1"
        class="w-20 bg-zinc-700 text-white rounded-xl px-3 py-2 text-sm outline-none text-center"
        @input="$emit('update:repeats', Number(($event.target as HTMLInputElement).value))" />
    </div>
    <div class="flex gap-2">
      <button
        class="flex-1 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
        @click="$emit('submit')">
        {{ submitLabel }}
      </button>
      <button
        class="py-2 px-4 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:text-zinc-200 transition-colors"
        @click="$emit('cancel')">
        Cancel
      </button>
    </div>
  </div>
</template>
