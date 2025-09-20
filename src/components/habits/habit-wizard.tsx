import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { HABIT_COLORS, HABIT_ICONS } from '@/types/habit'
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Sparkles,
  Target,
  Calendar,
  Clock,
  Palette,
  Smile
} from 'lucide-react'

interface HabitWizardProps {
  isOpen: boolean
  onComplete: (habitData: any) => void
  onClose: () => void
}

const wizardSteps = [
  {
    id: 'name',
    title: '習慣の名前を決めよう！',
    description: 'どんな習慣を作りたいですか？',
    icon: Target
  },
  {
    id: 'frequency',
    title: '頻度を選ぼう！',
    description: 'どのくらいの頻度で行いますか？',
    icon: Calendar
  },
  {
    id: 'reminder',
    title: 'リマインダーを設定しよう！',
    description: '忘れないように通知を設定できます',
    icon: Clock
  },
  {
    id: 'style',
    title: '見た目をカスタマイズ！',
    description: '色とアイコンを選んで、楽しくしましょう！',
    icon: Palette
  },
  {
    id: 'complete',
    title: '完成！',
    description: '素晴らしい習慣ができました！',
    icon: CheckCircle
  }
]

export function HabitWizard({ isOpen, onComplete, onClose }: HabitWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily' as 'daily' | 'weekly' | 'monthly',
    targetDays: 1,
    reminderTime: '',
    color: HABIT_COLORS[0].value as string,
    icon: HABIT_ICONS[0] as string
  })

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete(formData)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    setCurrentStep(0)
    setFormData({
      name: '',
      description: '',
      frequency: 'daily',
      targetDays: 1,
      reminderTime: '',
      color: HABIT_COLORS[0].value,
      icon: HABIT_ICONS[0]
    })
    onClose()
  }

  if (!isOpen) return null

  const currentStepData = wizardSteps[currentStep]
  const progress = ((currentStep + 1) / wizardSteps.length) * 100

  return (
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
        className="bg-background rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <currentStepData.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                <p className="text-white/90">{currentStepData.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white hover:bg-white/20"
            >
              ✕
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-medium">
              {currentStep + 1}/{wizardSteps.length}
            </span>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* ステップ1: 名前 */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                      <Target className="h-12 w-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">どんな習慣を作りたいですか？</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">習慣の名前</label>
                      <Input
                        placeholder="例: 毎日30分の読書"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">説明（任意）</label>
                      <Input
                        placeholder="例: 知識を増やして成長したい"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ステップ2: 頻度 */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                      <Calendar className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">どのくらいの頻度で行いますか？</h3>
                  </div>
                  
                  <div className="grid gap-4">
                    {[
                      { value: 'daily', label: '毎日', description: '毎日継続する習慣', icon: '🌅' },
                      { value: 'weekly', label: '週間', description: '週に数回の習慣', icon: '📅' },
                      { value: 'monthly', label: '月間', description: '月に数回の習慣', icon: '🗓️' }
                    ].map((option) => (
                      <Card
                        key={option.value}
                        className={`cursor-pointer transition-all ${
                          formData.frequency === option.value
                            ? 'ring-2 ring-blue-500 bg-blue-50'
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => setFormData({ ...formData, frequency: option.value as any })}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{option.icon}</div>
                            <div className="flex-1">
                              <div className="font-medium">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.description}</div>
                            </div>
                            {formData.frequency === option.value && (
                              <CheckCircle className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* ステップ3: リマインダー */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
                      <Clock className="h-12 w-12 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">リマインダーを設定しましょう</h3>
                    <p className="text-gray-600">忘れないように通知を送ります</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">通知時間</label>
                      <Input
                        type="time"
                        value={formData.reminderTime}
                        onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                        className="text-lg"
                      />
                    </div>
                    
                    <div className="text-center">
                      <Button
                        variant="outline"
                        onClick={() => setFormData({ ...formData, reminderTime: '' })}
                        className="text-sm"
                      >
                        リマインダーを設定しない
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* ステップ4: スタイル */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
                      <Palette className="h-12 w-12 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">見た目をカスタマイズ！</h3>
                    <p className="text-gray-600">色とアイコンを選んで、楽しくしましょう！</p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* 色選択 */}
                    <div>
                      <label className="block text-sm font-medium mb-3">色を選んでください</label>
                      <div className="grid grid-cols-4 gap-3">
                        {HABIT_COLORS.map((color) => (
                          <div
                            key={color.value}
                            className={`w-12 h-12 rounded-full cursor-pointer transition-all ${
                              formData.color === color.value
                                ? 'ring-4 ring-blue-500 scale-110'
                                : 'hover:scale-105'
                            }`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => setFormData({ ...formData, color: color.value })}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* アイコン選択 */}
                    <div>
                      <label className="block text-sm font-medium mb-3">アイコンを選んでください</label>
                      <div className="grid grid-cols-8 gap-3">
                        {HABIT_ICONS.map((icon) => (
                          <div
                            key={icon}
                            className={`w-12 h-12 rounded-full cursor-pointer transition-all flex items-center justify-center text-2xl ${
                              formData.icon === icon
                                ? 'ring-4 ring-blue-500 scale-110 bg-blue-50'
                                : 'hover:scale-105 hover:bg-gray-50'
                            }`}
                            onClick={() => setFormData({ ...formData, icon })}
                          >
                            {icon}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ステップ5: 完成 */}
              {currentStep === 4 && (
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-32 h-32 mx-auto bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-4">素晴らしい習慣ができました！</h3>
                    <p className="text-gray-600 text-lg">
                      <strong>{formData.name}</strong> の習慣を始めましょう！
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                        style={{ backgroundColor: formData.color }}
                      >
                        {formData.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">{formData.name}</div>
                        <div className="text-sm text-gray-600">
                          {formData.frequency === 'daily' && '毎日'}
                          {formData.frequency === 'weekly' && '週間'}
                          {formData.frequency === 'monthly' && '月間'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-2xl">
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                    <Smile className="h-6 w-6 text-blue-500" />
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* フッター */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={currentStep === 0 && !formData.name.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {currentStep === wizardSteps.length - 1 ? (
                <>
                  習慣を作成
                  <CheckCircle className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  次へ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
