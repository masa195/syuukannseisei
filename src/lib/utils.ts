import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // 月曜日を週の開始とする
  return new Date(d.setDate(diff))
}

export function getEndOfWeek(date: Date): Date {
  const startOfWeek = getStartOfWeek(date)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  return endOfWeek
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function getStreakDays(completionDates: Date[]): number {
  if (completionDates.length === 0) return 0
  
  const sortedDates = [...completionDates].sort((a, b) => b.getTime() - a.getTime())
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let streak = 0
  let currentDate = new Date(today)
  
  for (const completionDate of sortedDates) {
    const completionDay = new Date(completionDate)
    completionDay.setHours(0, 0, 0, 0)
    
    if (isSameDay(completionDay, currentDate)) {
      streak++
      currentDate = addDays(currentDate, -1)
    } else if (completionDay < currentDate) {
      break
    }
  }
  
  return streak
}











