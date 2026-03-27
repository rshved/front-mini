import { api } from '../services/api'

export const useWorkoutSessionStore = defineStore('workoutSession', {
  state: () => ({
    sessions: [] as WorkoutSession[],
    currentSession: null as WorkoutSession | null,
    loading: false,
  }),

  getters: {
    getDuration:
      () =>
      (start: string, end: string): string => {
        const diff = Math.max(0, new Date(end).getTime() - new Date(start).getTime())

        const minutes = Math.floor(diff / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)

        return `${minutes}m ${String(seconds).padStart(2, '0')}s`
      },
  },

  actions: {
    async getSessions() {
      this.loading = true
      try {
        const data = await api.get<WorkoutSession[]>('/workout-sessions')
        this.sessions = data
      } catch (e) {
        console.error('getSessions error:', e)
        throw e
      } finally {
        this.loading = false
      }
    },

    async startSession(name?: string) {
      this.loading = true
      try {
        const data = await api.post<WorkoutSession>('/workout-sessions', { name })
        this.currentSession = data
      } catch (e) {
        console.error('startSession error:', e)
        throw e
      } finally {
        this.loading = false
      }
    },

    async finishSession() {
      if (!this.currentSession) return

      this.loading = true
      try {
        await api.patch<WorkoutSession>(`/workout-sessions/${this.currentSession.id}/finish`)
        this.currentSession = null
        this.getSessions()
      } catch (e) {
        console.error('finishSession error:', e)
        throw e
      } finally {
        this.loading = false
      }
    },

    async deleteSession(id: number) {
      this.loading = true
      try {
        await api.delete(`/workout-sessions/${id}`)
        this.getSessions()
      } catch (e) {
        console.error('deleteSession error:', e)
        throw e
      } finally {
        this.loading = false
      }
    },
  },
})
