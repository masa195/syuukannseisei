import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
 
import { Button } from '@/components/ui/button'
import { useHabitStore } from '@/store/habitStore'
import { formatDateShort, getStartOfWeek } from '@/lib/utils'
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target,
  Flame,
  CheckCircle2,
  
  Award
} from 'lucide-react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

type TimeRange = 'week' | 'month' | 'year'

export function Statistics() {
  const { habits, getHabitStats, getWeekProgress, getMonthProgress } = useHabitStore()
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('week')
  // const [selectedHabit, setSelectedHabit] = useState<string | null>(null)

  const activeHabits = habits.filter(habit => habit.isActive)
  const currentDate = new Date()

  // 時間範囲に応じたデータを取得
  const timeRangeData = useMemo(() => {
    switch (selectedTimeRange) {
      case 'week':
        const weekStart = getStartOfWeek(currentDate)
        return getWeekProgress(weekStart)
      case 'month':
        return getMonthProgress(currentDate.getFullYear(), currentDate.getMonth())
      case 'year':
        // 年データは月ごとの集計
        const yearData = []
        for (let month = 0; month < 12; month++) {
          const monthData = getMonthProgress(currentDate.getFullYear(), month)
          const totalCompletions = monthData.reduce((sum, day) => 
            sum + day.habits.filter(h => h.completed).length, 0
          )
          yearData.push({
            month: month + 1,
            completions: totalCompletions,
            name: `${month + 1}月`
          })
        }
        return yearData
      default:
        return []
    }
  }, [selectedTimeRange, currentDate, getWeekProgress, getMonthProgress])

  // 習慣別統計
  const habitStats = activeHabits.map(habit => {
    const stats = getHabitStats(habit.id)
    return {
      ...habit,
      ...stats,
    }
  })

  // 全体統計
  const overallStats = useMemo(() => {
    const totalCompletions = habitStats.reduce((sum, habit) => sum + habit.totalCompletions, 0)
    const totalStreak = habitStats.reduce((sum, habit) => sum + habit.currentStreak, 0)
    const avgCompletionRate = habitStats.length > 0 
      ? Math.round(habitStats.reduce((sum, habit) => sum + habit.completionRate, 0) / habitStats.length)
      : 0
    const longestStreak = Math.max(...habitStats.map(habit => habit.longestStreak), 0)

    return {
      totalCompletions,
      totalStreak,
      avgCompletionRate,
      longestStreak,
      totalHabits: activeHabits.length,
    }
  }, [habitStats, activeHabits.length])

  // チャート用データ
  const chartData = useMemo(() => {
    if (selectedTimeRange === 'year') {
      return timeRangeData as { month: number; completions: number; name: string }[]
    }

    // week/month は DailyProgress[]
    const days = timeRangeData as { date: string; habits: { habitId: string; completed: boolean }[] }[]
    return days.map((day) => ({
      date: selectedTimeRange === 'week'
        ? formatDateShort(new Date(day.date))
        : new Date(day.date).getDate(),
      completions: day.habits.filter((h) => h.completed).length,
      total: activeHabits.length,
      percentage:
        activeHabits.length > 0
          ? Math.round((day.habits.filter((h) => h.completed).length / activeHabits.length) * 100)
          : 0,
    }))
  }, [timeRangeData, selectedTimeRange, activeHabits.length])

  // 習慣別完了率データ（円グラフ用）
  const pieData = habitStats.map(habit => ({
    name: habit.name,
    value: habit.completionRate,
    color: habit.color,
  }))

  // const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6']

  if (activeHabits.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">統計</h1>
          <p className="text-muted-foreground">
            習慣の進捗と統計を確認できます
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">統計データがありません</h3>
            <p className="text-muted-foreground text-center">
              習慣を作成して、データを蓄積しましょう
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">統計</h1>
          <p className="text-muted-foreground">
            習慣の進捗と統計を確認できます
          </p>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={selectedTimeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeRange(range)}
            >
              {range === 'week' && '週間'}
              {range === 'month' && '月間'}
              {range === 'year' && '年間'}
            </Button>
          ))}
        </div>
      </div>

      {/* 全体統計カード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{overallStats.totalCompletions}</div>
                  <div className="text-sm text-muted-foreground">総完了数</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold">{overallStats.totalStreak}</div>
                  <div className="text-sm text-muted-foreground">総ストリーク</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{overallStats.avgCompletionRate}%</div>
                  <div className="text-sm text-muted-foreground">平均完了率</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{overallStats.longestStreak}</div>
                  <div className="text-sm text-muted-foreground">最長ストリーク</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 進捗チャート */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {selectedTimeRange === 'week' && '週間進捗'}
              {selectedTimeRange === 'month' && '月間進捗'}
              {selectedTimeRange === 'year' && '年間進捗'}
            </CardTitle>
            <CardDescription>
              {selectedTimeRange === 'week' && '過去7日間の習慣完了数'}
              {selectedTimeRange === 'month' && '今月の習慣完了数'}
              {selectedTimeRange === 'year' && '月別の習慣完了数'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {selectedTimeRange === 'year' ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completions" fill="#3b82f6" />
                  </BarChart>
                ) : (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completions" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 習慣別統計 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* 習慣別完了率 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                習慣別完了率
              </CardTitle>
              <CardDescription>
                各習慣の完了率を表示
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 習慣一覧 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                習慣詳細
              </CardTitle>
              <CardDescription>
                各習慣の詳細統計
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {habitStats.map((habit, index) => (
                  <motion.div
                    key={habit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg"
                      style={{ backgroundColor: habit.color }}
                    >
                      {habit.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{habit.name}</div>
                      <div className="text-sm text-muted-foreground">
                        完了率: {habit.completionRate}% | ストリーク: {habit.currentStreak}日
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{habit.totalCompletions}</div>
                      <div className="text-xs text-muted-foreground">完了</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


