import { useEffect, useRef } from 'react'
import { useHabitStore } from '@/store/habitStore'
import { useNotification } from '@/hooks/useNotification'
import { format } from 'date-fns'

export function useHabitReminders() {
  const { getActiveHabits } = useHabitStore()
  const { requestPermission, showNotification, scheduleNotification } = useNotification()
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const setupReminders = async () => {
      const hasPermission = await requestPermission()
      if (!hasPermission) return

      const activeHabits = getActiveHabits()
      const habitsWithReminders = activeHabits.filter(habit => habit.reminderTime)

      if (habitsWithReminders.length === 0) return

      // 既存のインターバルをクリア
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      // 1分ごとにリマインダーをチェック
      intervalRef.current = window.setInterval(() => {
        const now = new Date()
        const currentTime = format(now, 'HH:mm')

        habitsWithReminders.forEach(habit => {
          if (habit.reminderTime === currentTime) {
            showNotification(
              `習慣のリマインダー: ${habit.name}`,
              {
                body: habit.description || '今日も頑張りましょう！',
                icon: '/pwa-192x192.png',
                badge: '/pwa-192x192.png',
                tag: `habit-${habit.id}`,
                requireInteraction: false,
                silent: false
              }
            )
          }
        })
      }, 60000) // 1分ごと
    }

    setupReminders()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [getActiveHabits, requestPermission, showNotification])

  const scheduleHabitReminder = (habitId: string, reminderTime: string) => {
    const habit = getActiveHabits().find(h => h.id === habitId)
    if (!habit) return

    const [hours, minutes] = reminderTime.split(':').map(Number)
    const now = new Date()
    const reminderDate = new Date()
    reminderDate.setHours(hours, minutes, 0, 0)

    // 今日のリマインダー時間が過ぎている場合は明日に設定
    if (reminderDate <= now) {
      reminderDate.setDate(reminderDate.getDate() + 1)
    }

    const delay = reminderDate.getTime() - now.getTime()

    scheduleNotification(
      `習慣のリマインダー: ${habit.name}`,
      delay,
      {
        body: habit.description || '今日も頑張りましょう！',
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag: `habit-${habit.id}`,
        requireInteraction: false,
        silent: false
      }
    )
  }

  return {
    scheduleHabitReminder
  }
}


