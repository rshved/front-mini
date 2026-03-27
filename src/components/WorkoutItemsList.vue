<script setup lang="ts">
const workoutSessionStore = useWorkoutSessionStore()

const showAddForm = ref(false)
const addForm = ref({ name: '', repeats: 10 })
const editingId = ref<number | null>(null)
const editForm = ref({ name: '', repeats: 10 })

const items = computed(() => workoutSessionStore.currentSession?.items ?? [])

async function addItem() {
  if (!addForm.value.name.trim()) return
  await workoutSessionStore.addWorkoutItem(addForm.value.name.trim(), addForm.value.repeats)
  addForm.value = { name: '', repeats: 10 }
  showAddForm.value = false
}

function startEdit(item: WorkoutItem) {
  editingId.value = item.id
  editForm.value = { name: item.name, repeats: item.repeats }
}

async function saveEdit() {
  if (editingId.value === null) return
  await workoutSessionStore.updateWorkoutItem(editingId.value, {
    name: editForm.value.name.trim(),
    repeats: editForm.value.repeats,
  })
  editingId.value = null
}

async function deleteItem(id: number) {
  await workoutSessionStore.deleteWorkoutItem(id)
}
</script>

<template>
  <div class="space-y-3">
    <div v-for="item in items" :key="item.id" class="bg-zinc-800 rounded-2xl p-4">
      <template v-if="editingId === item.id">
        <div class="flex gap-2 mb-2">
          <input
            v-model="editForm.name"
            class="flex-1 bg-zinc-700 text-white rounded-xl px-3 py-2 text-sm outline-none"
            placeholder="Exercise name" />
          <input
            v-model.number="editForm.repeats"
            type="number"
            min="1"
            class="w-20 bg-zinc-700 text-white rounded-xl px-3 py-2 text-sm outline-none text-center" />
        </div>
        <div class="flex gap-2">
          <button
            class="flex-1 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
            @click="saveEdit">
            Save
          </button>
          <button
            class="py-2 px-4 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:text-zinc-200 transition-colors"
            @click="editingId = null">
            Cancel
          </button>
        </div>
      </template>
      <template v-else>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white font-semibold text-base">{{ item.name }}</p>
            <p class="text-zinc-400 text-sm mt-0.5">{{ item.repeats }} reps</p>
          </div>
          <div class="flex gap-2">
            <button class="text-zinc-400 hover:text-zinc-200 text-sm px-2 py-1 transition-colors" @click="startEdit(item)">
              <IconHeroiconsPencil />
            </button>
            <button class="text-red-500 hover:text-red-400 text-sm px-2 py-1 transition-colors" @click="deleteItem(item.id)">
              <IconHeroiconsTrash />
            </button>
          </div>
        </div>
      </template>
    </div>

    <div v-if="showAddForm" class="bg-zinc-800 rounded-2xl p-4 space-y-2">
      <div class="flex gap-2">
        <input
          v-model="addForm.name"
          class="flex-1 bg-zinc-700 text-white rounded-xl px-3 py-2 text-sm outline-none"
          placeholder="Exercise name" />
        <input
          v-model.number="addForm.repeats"
          type="number"
          min="1"
          class="w-20 bg-zinc-700 text-white rounded-xl px-3 py-2 text-sm outline-none text-center" />
      </div>
      <div class="flex gap-2">
        <button
          class="flex-1 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
          @click="addItem">
          Add
        </button>
        <button
          class="py-2 px-4 rounded-xl border border-zinc-700 text-zinc-400 text-sm hover:text-zinc-200 transition-colors"
          @click="showAddForm = false">
          Cancel
        </button>
      </div>
    </div>

    <button
      v-else
      class="w-full py-4 px-2 flex justify-center rounded-2xl border border-dashed border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
      @click="showAddForm = true">
      <span class="flex items-center gap-2"><IconHeroiconsPlus /> Add Exercise</span>
    </button>
  </div>
</template>
