<script setup lang="ts">
const workoutSessionStore = useWorkoutSessionStore()

workoutSessionStore.getSessions(1, 8)

const stats = [
  { label: 'Total', value: 42 },
  { label: 'Streak', value: '5d' },
  { label: 'Volume', value: '12t' },
  { label: 'This week', value: 3 },
]

</script>

<template>
  <WorkoutSessionDetails v-if="workoutSessionStore.currentSession" />

  <template v-else>
    <div class="px-4 pt-8 pb-2">
      <p class="text-zinc-400 text-sm">Good morning 💪</p>
      <h1 class="text-white text-2xl font-bold mt-1">Dashboard</h1>
    </div>

    <div class="overflow-y-auto px-4 pt-4 pb-24 space-y-5">
      <div class="grid grid-cols-2 gap-3">
        <StatsCard v-for="stat in stats" :key="stat.label" :label="stat.label" :value="stat.value" />
      </div>

      <StartWorkoutSessionCard
        name="Push Day"
        meta="5 exercises · Chest, Shoulders, Triceps"
        cta-label="Start Workout"
      />

      <div>
        <h2 class="text-white font-semibold text-base mb-3">Recent Workouts</h2>
        <div class="space-y-2">
          <WorkoutSessionItem
            v-for="ws in workoutSessionStore.sessions"
            :key="ws.id"
            :workout="ws"
            @click="workoutSessionStore.getCurrentSession(ws.id)"
          />
        </div>
      </div>
    </div>
  </template>
</template>
