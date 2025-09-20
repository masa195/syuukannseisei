import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Habit, HabitCompletion, HabitStats, DailyProgress } from '@/types/habit'
import { getStreakDays, isSameDay, addDays } from '@/lib/utils'

interface HabitStore {
  habits: Habit[]
  completions: HabitCompletion[]
  dailyProgress: DailyProgress[]
  
  // Habit CRUD operations
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateHabit: (id: string, updates: Partial<Habit>) => void
  deleteHabit: (id: string) => void
  toggleHabitActive: (id: string) => void
  
  // Completion operations
  completeHabit: (habitId: string, date?: Date, notes?: string) => void
  uncompleteHabit: (habitId: string, date: Date) => void
  isHabitCompleted: (habitId: string, date: Date) => boolean
  
  // Statistics
  getHabitStats: (habitId: string) => HabitStats
  getTodayProgress: () => DailyProgress
  getWeekProgress: (startDate: Date) => DailyProgress[]
  getMonthProgress: (year: number, month: number) => DailyProgress[]
  
  // Utility functions
  getActiveHabits: () => Habit[]
  getHabitCompletions: (habitId: string) => HabitCompletion[]
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [],
      completions: [],
      dailyProgress: [],

      addHabit: (habitData) => {
        const newHabit: Habit = {
          ...habitData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        console.log('習慣ストア: 新しい習慣を追加', newHabit)
        
        set((state) => {
          const newHabits = [...state.habits, newHabit]
          console.log('習慣ストア: 更新後の習慣数', newHabits.length)
          return {
            habits: newHabits,
          }
        })
      },

      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id
              ? { ...habit, ...updates, updatedAt: new Date() }
              : habit
          ),
        }))
      },

      deleteHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
          completions: state.completions.filter((completion) => completion.habitId !== id),
          dailyProgress: state.dailyProgress.map((progress) => ({
            ...progress,
            habits: progress.habits.filter((h) => h.habitId !== id),
          })),
        }))
      },

      toggleHabitActive: (id) => {
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, isActive: !habit.isActive } : habit
          ),
        }))
      },

      completeHabit: (habitId, date = new Date(), notes) => {
        const completion: HabitCompletion = {
          id: crypto.randomUUID(),
          habitId,
          completedAt: date,
          notes,
        }

        set((state) => {
          // 既存の完了記録を削除（同じ日の重複を防ぐ）
          const filteredCompletions = state.completions.filter(
            (c) => !(c.habitId === habitId && isSameDay(c.completedAt, date))
          )

          // 新しい完了記録を追加
          const newCompletions = [...filteredCompletions, completion]

          // 日別進捗を更新
          const dateStr = date.toISOString().split('T')[0]
          const existingProgress = state.dailyProgress.find(p => p.date === dateStr)
          
          let newDailyProgress = [...state.dailyProgress]
          if (existingProgress) {
            newDailyProgress = newDailyProgress.map(p => 
              p.date === dateStr 
                ? {
                    ...p,
                    habits: p.habits.map(h => 
                      h.habitId === habitId 
                        ? { ...h, completed: true, completedAt: date }
                        : h
                    )
                  }
                : p
            )
          } else {
            newDailyProgress.push({
              date: dateStr,
              habits: [{ habitId, completed: true, completedAt: date }]
            })
          }

          return {
            completions: newCompletions,
            dailyProgress: newDailyProgress,
          }
        })
      },

      uncompleteHabit: (habitId, date) => {
        set((state) => {
          const newCompletions = state.completions.filter(
            (c) => !(c.habitId === habitId && isSameDay(c.completedAt, date))
          )

          const dateStr = date.toISOString().split('T')[0]
          const newDailyProgress = state.dailyProgress.map(p => 
            p.date === dateStr 
              ? {
                  ...p,
                  habits: p.habits.map(h => 
                    h.habitId === habitId 
                      ? { ...h, completed: false, completedAt: undefined }
                      : h
                  )
                }
              : p
          )

          return {
            completions: newCompletions,
            dailyProgress: newDailyProgress,
          }
        })
      },

      isHabitCompleted: (habitId, date) => {
        const state = get()
        return state.completions.some(
          (c) => c.habitId === habitId && isSameDay(c.completedAt, date)
        )
      },

      getHabitStats: (habitId) => {
        const state = get()
        const habitCompletions = state.completions
          .filter(c => c.habitId === habitId)
          .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())

        const totalCompletions = habitCompletions.length
        const currentStreak = getStreakDays(habitCompletions.map(c => c.completedAt))
        
        // 最長ストリークを計算
        let longestStreak = 0
        let currentStreakCount = 0
        let lastDate: Date | null = null

        for (const completion of habitCompletions) {
          const completionDate = completion.completedAt
          if (!lastDate || isSameDay(addDays(completionDate, 1), lastDate)) {
            currentStreakCount++
          } else {
            longestStreak = Math.max(longestStreak, currentStreakCount)
            currentStreakCount = 1
          }
          lastDate = completionDate
        }
        longestStreak = Math.max(longestStreak, currentStreakCount)

        // 完了率を計算（過去30日間）
        const thirtyDaysAgo = addDays(new Date(), -30)
        const recentCompletions = habitCompletions.filter(
          c => c.completedAt >= thirtyDaysAgo
        )
        const completionRate = recentCompletions.length > 0 
          ? Math.round((recentCompletions.length / 30) * 100)
          : 0

        return {
          habitId,
          totalCompletions,
          currentStreak,
          longestStreak,
          completionRate,
          lastCompletedAt: habitCompletions[0]?.completedAt,
        }
      },

      getTodayProgress: () => {
        const state = get()
        const today = new Date().toISOString().split('T')[0]
        return state.dailyProgress.find(p => p.date === today) || {
          date: today,
          habits: []
        }
      },

      getWeekProgress: (startDate) => {
        const state = get()
        const weekProgress: DailyProgress[] = []
        
        for (let i = 0; i < 7; i++) {
          const date = addDays(startDate, i)
          const dateStr = date.toISOString().split('T')[0]
          const progress = state.dailyProgress.find(p => p.date === dateStr)
          weekProgress.push(progress || { date: dateStr, habits: [] })
        }
        
        return weekProgress
      },

      getMonthProgress: (year, month) => {
        const state = get()
        const monthProgress: DailyProgress[] = []
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day)
          const dateStr = date.toISOString().split('T')[0]
          const progress = state.dailyProgress.find(p => p.date === dateStr)
          monthProgress.push(progress || { date: dateStr, habits: [] })
        }
        
        return monthProgress
      },

      getActiveHabits: () => {
        const state = get()
        return state.habits.filter(habit => habit.isActive)
      },

      getHabitCompletions: (habitId) => {
        const state = get()
        return state.completions
          .filter(c => c.habitId === habitId)
          .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
      },
    }),
    {
      name: 'habit-tracker-storage',
      version: 1,
    }
  )
)











