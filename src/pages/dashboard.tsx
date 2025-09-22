import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useHabitStore } from '@/store/habitStore'
import { useTownStore } from '@/store/townStore'
import { formatDate } from '@/lib/utils'
import { 
  Target, 
  CheckCircle, 
  TrendingUp, 
  Calendar,
  Plus,
  Flame,
  Sparkles,
  Heart,
  Zap
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { 
    getActiveHabits, 
    getTodayProgress, 
    getHabitStats, 
    completeHabit, 
    uncompleteHabit,
    isHabitCompleted 
  } = useHabitStore()
  
  const { stats, completeHabit: completeTownHabit } = useTownStore()
  
  const [currentDate] = useState(new Date())
  const [showCelebration, setShowCelebration] = useState(false)
  const [lastCompletionCount, setLastCompletionCount] = useState(0)
  
  const activeHabits = getActiveHabits()
  const todayProgress = getTodayProgress()
  
  const completedToday = todayProgress.habits.filter(h => h.completed).length
  const totalHabits = activeHabits.length
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  // 完了数の変化を監視して祝福アニメーションを表示
  useEffect(() => {
    if (completedToday > lastCompletionCount && lastCompletionCount > 0) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
    setLastCompletionCount(completedToday)
  }, [completedToday, lastCompletionCount])

  const handleToggleCompletion = (habitId: string) => {
    const isCompleted = isHabitCompleted(habitId, currentDate)
    if (isCompleted) {
      uncompleteHabit(habitId, currentDate)
    } else {
      completeHabit(habitId, currentDate)
      completeTownHabit(habitId, 1) // 町の成長にも反映
      
      // 祝福メッセージ
      const habit = activeHabits.find(h => h.id === habitId)
      if (habit) {
        toast.success(`🎉 ${habit.name} を完了しました！`, {
          duration: 3000,
          icon: '🎊'
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* 祝福アニメーション */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.6, repeat: 2 }}
              className="text-6xl"
            >
              🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-2xl p-6 text-white overflow-hidden"
      >
        {/* 背景アニメーション */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
        
        {/* 浮遊する要素 */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Sparkles className="h-8 w-8" />
                今日の進捗
              </h1>
              <p className="text-white/90 text-lg">
                {formatDate(currentDate)} の習慣達成状況
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                asChild
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Link to="/app/habits">
                  <Plus className="h-4 w-4 mr-2" />
                  習慣を追加
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <Link to="/app/features">
                  <Sparkles className="h-4 w-4 mr-2" />
                  新機能を見る
                </Link>
              </Button>
            </div>
          </div>
        
          {/* 進捗サマリー */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-300" />
              <span className="font-medium">完了率</span>
            </div>
            <div className="text-3xl font-bold text-blue-300">{completionRate}%</div>
            <div className="text-sm text-white/80">
              {completedToday}/{totalHabits} 習慣完了
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-yellow-300" />
              <span className="font-medium">経験値</span>
            </div>
            <div className="text-3xl font-bold text-yellow-300">{stats.experience}</div>
            <div className="text-sm text-white/80">
              レベル {stats.level}
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(stats.experience % 100)}%` }}
              ></div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-pink-300" />
              <span className="font-medium">町の人口</span>
            </div>
            <div className="text-3xl font-bold text-pink-300">{stats.population}</div>
            <div className="text-sm text-white/80">
              住民が増えています
            </div>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full ${i < Math.min(stats.population / 2, 5) ? 'bg-pink-400' : 'bg-white/20'}`}
                ></div>
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 今日の進捗サマリー */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          {/* 既存の進捗やリストはこの中にある想定 */}
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

        {/* 今日やることガイド */}
        <div className="bg-white rounded-2xl border p-6">
          <h3 className="text-lg font-semibold mb-3">今日やること</h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
            <li>ダッシュボードで今日の習慣をチェック</li>
            <li>達成したら「完了」をタップして経験値GET</li>
            <li>町ページで発展の様子を見てみよう</li>
          </ol>
          <div className="mt-4 flex gap-2">
            <a href="/app/habits" className="text-blue-600 hover:underline text-sm">習慣を追加</a>
            <span className="text-gray-300">/</span>
            <a href="/app/town" className="text-blue-600 hover:underline text-sm">町を見る</a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}


