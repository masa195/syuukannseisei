import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, startOfWeek, addDays as addDaysFn, isSameDay as isSameDayFn } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy年MM月dd日')
}

export function formatDateShort(date: Date): string {
  return format(date, 'MM/dd')
}

export function getStartOfWeek(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 1 })
}

export function getStreakDays(completions: Date[]): number {
  if (completions.length === 0) return 0
  
  const sortedCompletions = completions.sort((a, b) => b.getTime() - a.getTime())
  let streak = 0
  let currentDate = new Date()
  
  for (const completion of sortedCompletions) {
    if (isSameDayFn(completion, currentDate) || isSameDayFn(completion, addDaysFn(currentDate, -1))) {
      streak++
      currentDate = addDaysFn(completion, -1)
    } else {
      break
    }
  }
  
  return streak
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return isSameDayFn(date1, date2)
}

export function addDays(date: Date, days: number): Date {
  return addDaysFn(date, days)
}