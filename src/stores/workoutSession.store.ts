import { defineStore } from 'pinia'
import { api } from '../services/api'

type WorkoutItem = {
  id: number
  name: string
  repeats: number
}

type WorkoutSession = {
  id: number
  name?: string
  createdAt: string
  items: WorkoutItem[]
}

export const useWorkoutSessionStore = defineStore('workoutSession', {
  state: () => ({
    sessions: [] as WorkoutSession[],
    currentSession: null as WorkoutSession | null,
    loading: false,
  }),

  actions: {
    async getSessions() {
        const data = await api.get<WorkoutSession[]>('/workout-sessions')
        this.sessions = data
    },
    setSessions(sessions: WorkoutSession[]) {
      this.sessions = sessions
    },

    setCurrentSession(session: WorkoutSession) {
      this.currentSession = session
    },

    clearCurrentSession() {
      this.currentSession = null
    },
  },
})