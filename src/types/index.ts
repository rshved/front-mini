
export interface WorkoutItem {
  id: number
  name: string
  repeats: number
  workoutSessionId: number
}

export interface WorkoutSession {
  id: number
  name?: string
  createdAt: string
  startedAt: string
  endedAt?: string
  items: WorkoutItem[]
}
