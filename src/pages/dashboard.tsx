import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useHabitStore } from '@/store/habitStore'
import { formatDate } from '@/lib/utils'
import { 
  Target, 
  CheckCircle, 
  TrendingUp, 
  Calendar,
  Plus,
  Flame
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { 
    getActiveHabits, 
    getTodayProgress, 
    getHabitStats, 
    completeHabit, 
    uncompleteHabit,
    isHabitCompleted 
  } = useHabitStore()
  
  const [currentDate] = useState(new Date())
  const activeHabits = getActiveHabits()
  const todayProgress = getTodayProgress()
  
  const completedToday = todayProgress.habits.filter(h => h.completed).length
  const totalHabits = activeHabits.length
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  const handleToggleCompletion = (habitId: string) => {
    const isCompleted = isHabitCompleted(habitId, currentDate)
    if (isCompleted) {
      uncompleteHabit(habitId, currentDate)
    } else {
      completeHabit(habitId, currentDate)
    }
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ダッシュボード</h1>
          <p className="text-muted-foreground">
            {formatDate(currentDate)}
          </p>
        </div>
        <Link to="/habits">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            習慣を追加
          </Button>
        </Link>
      </div>

      {/* 今日の進捗サマリー */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="gradient-primary text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              今日の進捗
            </CardTitle>
            <CardDescription className="text-white/80">
              {completedToday} / {totalHabits} の習慣を完了
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress 
                value={completionRate} 
                className="h-3 bg-white/20"
              />
              <div className="flex items-center justify-between text-sm">
                <span>{completionRate}% 完了</span>
                {completionRate === 100 && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    完璧！
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 習慣一覧 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {activeHabits.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">習慣がありません</h3>
              <p className="text-muted-foreground text-center mb-4">
                最初の習慣を作成して、目標達成を始めましょう
              </p>
              <Link to="/habits">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  習慣を作成
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          activeHabits.map((habit, index) => {
            const isCompleted = isHabitCompleted(habit.id, currentDate)
            const stats = getHabitStats(habit.id)
            
            return (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`transition-all duration-200 hover:shadow-lg ${
                  isCompleted ? 'ring-2 ring-green-500' : ''
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                          style={{ backgroundColor: habit.color }}
                        >
                          {habit.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{habit.name}</CardTitle>
                          {habit.description && (
                            <CardDescription className="text-sm">
                              {habit.description}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                      <Button
                        variant={isCompleted ? "default" : "outline"}
                        size="icon"
                        onClick={() => handleToggleCompletion(habit.id)}
                        className={`transition-all ${
                          isCompleted 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'hover:bg-green-50'
                        }`}
                      >
                        <CheckCircle className={`h-5 w-5 ${
                          isCompleted ? 'text-white' : 'text-green-500'
                        }`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* ストリーク表示 */}
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">
                          {stats.currentStreak} 日連続
                        </span>
                        <Badge variant="outline" className="text-xs">
                          最長 {stats.longestStreak} 日
                        </Badge>
                      </div>
                      
                      {/* 完了率 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>完了率</span>
                          <span>{stats.completionRate}%</span>
                        </div>
                        <Progress value={stats.completionRate} className="h-2" />
                      </div>
                      
                      {/* 頻度 */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {habit.frequency === 'daily' && '毎日'}
                        {habit.frequency === 'weekly' && `週${habit.targetDays}回`}
                        {habit.frequency === 'monthly' && `月${habit.targetDays}回`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </div>

      {/* 今週の統計 */}
      {activeHabits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                今週の統計
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {activeHabits.reduce((sum, habit) => {
                      const stats = getHabitStats(habit.id)
                      return sum + stats.currentStreak
                    }, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">総ストリーク</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {activeHabits.reduce((sum, habit) => {
                      const stats = getHabitStats(habit.id)
                      return sum + stats.totalCompletions
                    }, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">総完了数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {Math.round(activeHabits.reduce((sum, habit) => {
                      const stats = getHabitStats(habit.id)
                      return sum + stats.completionRate
                    }, 0) / activeHabits.length) || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">平均完了率</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    {activeHabits.length}
                  </div>
                  <div className="text-sm text-muted-foreground">アクティブ習慣</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}


