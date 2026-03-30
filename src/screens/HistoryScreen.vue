<script setup lang="ts">
const workoutSessionStore = useWorkoutSessionStore()

workoutSessionStore.getSessions(1, 10)

const stats = [
  { label: 'Total workouts', value: 42 },
  { label: 'Best streak', value: '12d' },
]
</script>

<template>
  <WorkoutSessionDetails v-if="workoutSessionStore.currentSession" />

  <template v-else>
    <div class="px-4 pt-8 pb-2">
      <h1 class="text-white text-2xl font-bold">History</h1>
    </div>

    <div class="overflow-y-auto px-4 pt-4 pb-24 space-y-5">
      <div class="grid grid-cols-2 gap-3">
        <StatsCard v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value" />
      </div>

      <div>
        <h2 class="text-white font-semibold text-base mb-3">All Workouts</h2>
        <div class="space-y-2">
          <WorkoutSessionItem
            v-for="ws in workoutSessionStore.sessions"
            :key="ws.id"
            :workout="ws"
            @click="workoutSessionStore.getCurrentSession(ws.id)" />
        </div>
        <PaginationControls
          :page="workoutSessionStore.page"
          :total-pages="workoutSessionStore.totalPages"
          @change="workoutSessionStore.getSessions($event, 10)" />
      </div>
    </div>
  </template>
</template>
