import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Target, 
  Star, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Heart,
  Trophy
} from 'lucide-react'

interface WelcomeFlowProps {
  isOpen: boolean
  onComplete: () => void
}

const steps = [
  {
    id: 1,
    title: "🎯 HabitFlow Proへようこそ！",
    description: "習慣を楽しく継続して、理想の自分になりましょう！",
    icon: Target,
    color: "from-blue-500 to-purple-500"
  },
  {
    id: 2,
    title: "🏠 町を育てよう！",
    description: "習慣を完了するたびに、あなたの町が発展します。建物を建て、住民を増やしましょう！",
    icon: MapPin,
    color: "from-green-500 to-blue-500"
  },
  {
    id: 3,
    title: "⭐ レベルアップ！",
    description: "習慣を続けると経験値が貯まり、新しいエリアや特別な建物が解放されます！",
    icon: Star,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 4,
    title: "🏆 達成感を味わおう！",
    description: "毎日の小さな成功が、大きな変化につながります。一緒に頑張りましょう！",
    icon: Trophy,
    color: "from-purple-500 to-pink-500"
  }
]

export function WelcomeFlow({ isOpen, onComplete }: WelcomeFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleting(true)
      setTimeout(() => {
        onComplete()
      }, 1000)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  if (!isOpen) return null

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

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
        <div className={`bg-gradient-to-r ${currentStepData.color} p-6 text-white`}>
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
              onClick={handleSkip}
              className="text-white hover:bg-white/20"
            >
              スキップ
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Progress value={progress} className="flex-1 h-2" />
            <span className="text-sm font-medium">
              {currentStep + 1}/{steps.length}
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
              {currentStep === 0 && (
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Target className="h-16 w-16 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">習慣を楽しく継続しよう！</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      毎日の小さな行動が、大きな変化を生み出します。
                      <br />
                      ゲーム要素で楽しく、効果的に習慣化をサポートします。
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                      <MapPin className="h-16 w-16 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">町育成ゲーム</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      習慣を完了するたびに、あなたの町が発展します。
                      <br />
                      建物を建て、住民を増やし、特別な建物を解放しましょう！
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl mb-2">🏠</div>
                      <div className="text-sm font-medium">住宅</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl mb-2">🏪</div>
                      <div className="text-sm font-medium">商店</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl mb-2">🏛️</div>
                      <div className="text-sm font-medium">公共施設</div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
                      <Star className="h-16 w-16 text-yellow-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">レベルアップシステム</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      習慣を続けると経験値が貯まり、レベルアップ！
                      <br />
                      新しいエリアや特別な建物が解放されます。
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl">⚡</div>
                      <div>
                        <div className="font-medium">経験値獲得</div>
                        <div className="text-sm text-gray-600">習慣完了で経験値+10</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl">🎯</div>
                      <div>
                        <div className="font-medium">レベルアップ</div>
                        <div className="text-sm text-gray-600">100経験値でレベルアップ</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl">🏆</div>
                      <div>
                        <div className="font-medium">特別報酬</div>
                        <div className="text-sm text-gray-600">新しいエリアと建物が解放</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-16 w-16 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">一緒に頑張りましょう！</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      毎日の小さな成功が、大きな変化につながります。
                      <br />
                      あなたの成長をサポートします！
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-2xl">
                    <Heart className="h-6 w-6 text-red-500" />
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                    <Heart className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* フッター */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  戻る
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={isCompleting}
              >
                {isCompleting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2"
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.div>
                    準備中...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    始める
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
        </div>
      </motion.div>
    </motion.div>
  )
}
