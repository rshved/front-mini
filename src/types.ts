export interface Set {
  weight: number
  reps: number
}

export interface Exercise {
  name: string
  sets: Set[]
}

export interface Workout {
  name: string
  date: string
  summary: string
  volume?: string
  exercises: Exercise[]
}
