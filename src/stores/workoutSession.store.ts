import { api } from '../services/api'

export const useWorkoutSessionStore = defineStore('workoutSession', {
  state: () => ({
    sessions: [] as WorkoutSession[],
    currentSession: null as WorkoutSession | null,
    page: 1,
    totalPages: 1,
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
    async getSessions(page = 1, limit = 10) {
      try {
        const data = await api.get<{ items: WorkoutSession[]; page: number; totalPages: number }>(`/workout-sessions?page=${page}&limit=${limit}`)
        this.sessions = data.items
        this.page = data.page
        this.totalPages = data.totalPages
      } catch (e) {
        console.error('getSessions error:', e)
        throw e
      }
    },

    async getCurrentSession(id: number) {
      try {
        const data = await api.get<WorkoutSession>(`/workout-sessions/${id}`)
        this.currentSession = data
      } catch (e) {
        console.error('getCurrentSession error:', e)
        throw e
      }
    },

    async startSession(name?: string) {
      try {
        const data = await api.post<WorkoutSession>('/workout-sessions', { name })
        this.currentSession = data
      } catch (e) {
        console.error('startSession error:', e)
        throw e
      }
    },

    async finishSession() {
      if (!this.currentSession) return

      try {
        await api.patch(`/workout-sessions/${this.currentSession.id}/finish`)
        this.currentSession = null
        await this.getSessions(this.page)
      } catch (e) {
        console.error('finishSession error:', e)
        throw e
      }
    },

    async deleteSession(id: number) {
      try {
        await api.delete(`/workout-sessions/${id}`)
        await this.getSessions(this.page)
      } catch (e) {
        console.error('deleteSession error:', e)
        throw e
      }
    },

    async addWorkoutItem(name: string, repeats: number, weight: number | null) {
      if (!this.currentSession) return

      try {
        await api.post<WorkoutItem>('/workout-items', {
          name,
          repeats,
          workoutSessionId: this.currentSession.id,
          weight
        })
        await this.getCurrentSession(this.currentSession.id)
      } catch (e) {
        console.error('addWorkoutItem error:', e)
        throw e
      }
    },

    async updateWorkoutItem(id: number, data: { name?: string; repeats?: number; weight?: number | null }) {
      if (!this.currentSession) return

      try {
        await api.patch<WorkoutItem>(`/workout-items/${id}`, data)
        await this.getCurrentSession(this.currentSession.id)
      } catch (e) {
        console.error('updateWorkoutItem error:', e)
        throw e
      }
    },

    async deleteWorkoutItem(id: number) {
      if (!this.currentSession) return

      try {
        await api.delete(`/workout-items/${id}`)
        await this.getCurrentSession(this.currentSession.id)
      } catch (e) {
        console.error('deleteWorkoutItem error:', e)
        throw e
      }
    },
  },
})
