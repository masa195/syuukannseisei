export interface Habit {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  frequency: 'daily' | 'weekly' | 'monthly'
  targetDays: number // 週間目標日数（週間・月間の場合）
  reminderTime?: string // HH:MM形式
  createdAt: Date
  updatedAt: Date
  isActive: boolean
  completions: Date[]
}

export interface HabitCompletion {
  id: string
  habitId: string
  completedAt: Date
  notes?: string
}

export interface HabitStats {
  habitId: string
  totalCompletions: number
  currentStreak: number
  longestStreak: number
  completionRate: number // 0-100のパーセンテージ
  lastCompletedAt?: Date
}

export interface DailyProgress {
  date: string // YYYY-MM-DD形式
  habits: {
    habitId: string
    completed: boolean
    completedAt?: Date
  }[]
}

export const HABIT_COLORS = [
  { name: 'ブルー', value: '#3b82f6', bg: 'bg-blue-500', text: 'text-blue-500' },
  { name: 'グリーン', value: '#10b981', bg: 'bg-green-500', text: 'text-green-500' },
  { name: 'パープル', value: '#8b5cf6', bg: 'bg-purple-500', text: 'text-purple-500' },
  { name: 'ピンク', value: '#ec4899', bg: 'bg-pink-500', text: 'text-pink-500' },
  { name: 'オレンジ', value: '#f59e0b', bg: 'bg-orange-500', text: 'text-orange-500' },
  { name: 'レッド', value: '#ef4444', bg: 'bg-red-500', text: 'text-red-500' },
  { name: 'インディゴ', value: '#6366f1', bg: 'bg-indigo-500', text: 'text-indigo-500' },
  { name: 'ティール', value: '#14b8a6', bg: 'bg-teal-500', text: 'text-teal-500' },
] as const

export const HABIT_ICONS = [
  '🏃‍♂️', '💪', '📚', '🧘‍♀️', '💧', '🍎', '🛌', '✍️',
  '🎵', '🎨', '🌱', '🚴‍♂️', '🏋️‍♀️', '🧠', '❤️', '🌟'
] as const











