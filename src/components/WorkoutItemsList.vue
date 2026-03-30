<script setup lang="ts">
const workoutSessionStore = useWorkoutSessionStore()

const showAddForm = ref(false)
const addForm = ref({ name: '', repeats: 10, weight: null })
const editingId = ref<number | null>(null)
const editForm = ref({ name: '', repeats: 10, weight: null as number | null })
const lastItemName = ref<string | null>(null)

const items = computed(() => workoutSessionStore.currentSession?.items ?? [])

async function addItem() {
  if (!addForm.value.name.trim()) return
  const name = addForm.value.name.trim()
  await workoutSessionStore.addWorkoutItem(name, addForm.value.repeats, addForm.value.weight)
  lastItemName.value = name
  addForm.value = { name: '', repeats: 10, weight: null }
  showAddForm.value = false
}

function startEdit(item: WorkoutItem) {
  editingId.value = item.id
  editForm.value = { name: item.name, repeats: item.repeats, weight: item.weight }
}

async function saveEdit() {
  if (editingId.value === null) return
  await workoutSessionStore.updateWorkoutItem(editingId.value, {
    name: editForm.value.name.trim(),
    repeats: editForm.value.repeats,
    weight: editForm.value.weight,
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
        <WorkoutItemForm
          v-model:name="editForm.name"
          v-model:weight="editForm.weight"
          v-model:repeats="editForm.repeats"
          submit-label="Save"
          @submit="saveEdit"
          @cancel="editingId = null" />
      </template>
      <template v-else>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-white font-semibold text-base">{{ item.name }}</p>
            <p class="text-zinc-400 text-sm mt-0.5">{{ item.weight ? `${item.weight}kg x ${item.repeats}` : `x ${item.repeats}` }}</p>
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

    <div v-if="showAddForm" class="bg-zinc-800 rounded-2xl p-4">
      <WorkoutItemForm
        v-model:name="addForm.name"
        v-model:weight="addForm.weight"
        v-model:repeats="addForm.repeats"
        :repeat-hint="lastItemName"
        submit-label="Add"
        @repeat-hint="addForm.name = lastItemName!"
        @submit="addItem"
        @cancel="showAddForm = false" />
    </div>

    <button
      v-else
      class="w-full py-4 px-2 flex justify-center rounded-2xl border border-dashed border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
      @click="showAddForm = true">
      <span class="flex items-center gap-2"><IconHeroiconsPlus /> Add Exercise</span>
    </button>
  </div>
</template>
