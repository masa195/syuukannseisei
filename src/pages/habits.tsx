import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useHabitStore } from '@/store/habitStore'
import { HABIT_COLORS, HABIT_ICONS } from '@/types/habit'
import { HabitWizard } from '@/components/habits/habit-wizard'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock,
  Calendar,
  CheckCircle2,
  X,
  Sparkles,
  Target
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

interface HabitFormData {
  name: string
  description: string
  color: string
  icon: string
  frequency: 'daily' | 'weekly' | 'monthly'
  targetDays: number
  reminderTime: string
}

const initialFormData: HabitFormData = {
  name: '',
  description: '',
  color: HABIT_COLORS[0].value,
  icon: HABIT_ICONS[0],
  frequency: 'daily',
  targetDays: 1,
  reminderTime: '',
}

export default function Habits() {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabitActive } = useHabitStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState<string | null>(null)
  const [formData, setFormData] = useState<HabitFormData>(initialFormData)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('習慣名を入力してください')
      return
    }

    if (editingHabit) {
      updateHabit(editingHabit, {
        ...formData,
        updatedAt: new Date(),
      })
      toast.success('習慣を更新しました')
    } else {
      addHabit({
        ...formData,
        isActive: true,
        completions: [],
      })
      toast.success('習慣を作成しました')
      console.log('習慣を追加しました:', formData.name)
    }

    setFormData(initialFormData)
    setIsFormOpen(false)
    setEditingHabit(null)
  }

  const handleEdit = (habit: any) => {
    setFormData({
      name: habit.name,
      description: habit.description || '',
      color: habit.color,
      icon: habit.icon,
      frequency: habit.frequency,
      targetDays: habit.targetDays,
      reminderTime: habit.reminderTime || '',
    })
    setEditingHabit(habit.id)
    setIsFormOpen(true)
  }

  const handleDelete = (habitId: string) => {
    deleteHabit(habitId)
    setShowDeleteConfirm(null)
    toast.success('習慣を削除しました')
  }

  const handleCancel = () => {
    setFormData(initialFormData)
    setIsFormOpen(false)
    setEditingHabit(null)
  }

  const handleWizardComplete = (habitData: any) => {
    addHabit({
      ...habitData,
      isActive: true,
      completions: [],
    })
    toast.success('🎉 素晴らしい習慣ができました！', {
      duration: 3000,
      icon: '✨'
    })
    setIsWizardOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl p-6 text-white overflow-hidden"
      >
        {/* 背景アニメーション */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
        
        {/* 浮遊する要素 */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-yellow-400/30 rounded-full animate-bounce"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Target className="h-8 w-8" />
              習慣管理
            </h1>
            <p className="text-white/90">
              習慣を作成・編集して、目標達成をサポートします
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setIsWizardOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              楽しく習慣を作成
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsFormOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm hover:scale-105 transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              簡単に追加
            </Button>
          </div>
        </div>
      </motion.div>

      {/* デバッグ情報 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-600">
          デバッグ: 習慣数 = {habits.length}
        </p>
        {habits.length === 0 && (
          <p className="text-sm text-blue-600 mt-2">
            習慣がありません。右上の「習慣を追加」ボタンから追加してください。
          </p>
        )}
      </div>

      {/* 習慣一覧 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`transition-all duration-200 hover:shadow-lg ${
              !habit.isActive ? 'opacity-60' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
                      style={{ backgroundColor: habit.color }}
                    >
                      {habit.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{habit.name}</CardTitle>
                      {habit.description && (
                        <CardDescription className="text-sm">
                          {habit.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(habit)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowDeleteConfirm(habit.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* 頻度と目標 */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {habit.frequency === 'daily' && '毎日'}
                      {habit.frequency === 'weekly' && `週${habit.targetDays}回`}
                      {habit.frequency === 'monthly' && `月${habit.targetDays}回`}
                    </span>
                  </div>
                  
                  {/* リマインダー */}
                  {habit.reminderTime && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{habit.reminderTime}</span>
                    </div>
                  )}
                  
                  {/* ステータス */}
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={habit.isActive ? "success" : "secondary"}
                      className="text-xs"
                    >
                      {habit.isActive ? (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          アクティブ
                        </>
                      ) : (
                        <>
                          <X className="h-3 w-3 mr-1" />
                          非アクティブ
                        </>
                      )}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleHabitActive(habit.id)}
                    >
                      {habit.isActive ? '無効化' : '有効化'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 習慣作成/編集フォーム */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {editingHabit ? '習慣を編集' : '新しい習慣を作成'}
                  </h2>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* 基本情報 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      習慣名 *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="例: 毎日30分読書"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      説明
                    </label>
                    <Input
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="習慣の詳細や目標を入力"
                    />
                  </div>
                </div>

                {/* アイコンと色 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      アイコン
                    </label>
                    <div className="grid grid-cols-8 gap-2">
                      {HABIT_ICONS.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon })}
                          className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-2xl transition-all ${
                            formData.icon === icon
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      色
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {HABIT_COLORS.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, color: color.value })}
                          className={`w-12 h-12 rounded-lg border-2 transition-all ${
                            formData.color === color.value
                              ? 'border-primary ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/50'
                          }`}
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 頻度設定 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      頻度
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'daily', label: '毎日' },
                        { value: 'weekly', label: '週間' },
                        { value: 'monthly', label: '月間' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData({ 
                            ...formData, 
                            frequency: option.value as any,
                            targetDays: option.value === 'daily' ? 1 : formData.targetDays
                          })}
                          className={`px-4 py-2 rounded-md border transition-all ${
                            formData.frequency === option.value
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.frequency !== 'daily' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        目標日数
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max={formData.frequency === 'weekly' ? 7 : 31}
                        value={formData.targetDays}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          targetDays: parseInt(e.target.value) || 1 
                        })}
                      />
                    </div>
                  )}
                </div>

                {/* リマインダー */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    リマインダー時間
                  </label>
                  <Input
                    type="time"
                    value={formData.reminderTime}
                    onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                  />
                </div>

                {/* ボタン */}
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    キャンセル
                  </Button>
                  <Button type="submit">
                    {editingHabit ? '更新' : '作成'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 削除確認ダイアログ */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-lg shadow-lg p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-2">習慣を削除</h3>
              <p className="text-muted-foreground mb-6">
                この習慣を削除しますか？この操作は元に戻せません。
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  キャンセル
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(showDeleteConfirm)}
                >
                  削除
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 習慣作成ウィザード */}
      <HabitWizard
        isOpen={isWizardOpen}
        onComplete={handleWizardComplete}
        onClose={() => setIsWizardOpen(false)}
      />
    </div>
  )
}


