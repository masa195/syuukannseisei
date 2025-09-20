import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  Target, 
  MapPin, 
  Heart, 
  Trophy,
  CheckCircle,
  ArrowRight,
  Play,
  BarChart3,
  Gift
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const features = [
  {
    id: 'welcome-flow',
    title: '🎯 ウェルカムフロー',
    description: '初回訪問時に楽しいオンボーディングでアプリの魅力を紹介',
    icon: Sparkles,
    color: 'from-blue-500 to-purple-500',
    benefits: [
      '4ステップの楽しい説明',
      'アニメーション付きの案内',
      '町育成ゲームの紹介',
      '使い方の理解促進'
    ],
    demo: '初回アクセス時に自動表示'
  },
  {
    id: 'habit-wizard',
    title: '🧙‍♂️ 習慣作成ウィザード',
    description: '5ステップの楽しい習慣作成で、簡単に習慣を設定',
    icon: Target,
    color: 'from-green-500 to-blue-500',
    benefits: [
      '視覚的な色とアイコン選択',
      '進捗バーとアニメーション',
      '完成時の祝福メッセージ',
      '直感的な操作'
    ],
    demo: '「楽しく習慣を作成」ボタンから体験'
  },
  {
    id: 'celebration',
    title: '🎉 祝福アニメーション',
    description: '習慣完了時の祝福エフェクトで達成感を演出',
    icon: Heart,
    color: 'from-pink-500 to-red-500',
    benefits: [
      '習慣完了時の祝福エフェクト',
      'トースト通知で達成感',
      '町の成長との連携',
      'モチベーション向上'
    ],
    demo: 'ダッシュボードで習慣を完了して確認'
  },
  {
    id: 'town-game',
    title: '🏘️ 町育成ゲーム',
    description: '習慣完了で町が発展！建物を建て、住民を増やそう',
    icon: MapPin,
    color: 'from-green-500 to-teal-500',
    benefits: [
      '習慣完了で経験値獲得',
      '建物の建設とアップグレード',
      '住民の増加とレベルアップ',
      '特別な建物の解放'
    ],
    demo: '町ページで習慣完了による成長を確認'
  },
  {
    id: 'dashboard',
    title: '📊 美しいダッシュボード',
    description: 'グラデーションヘッダーとリアルタイム統計で進捗を可視化',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    benefits: [
      'グラデーションヘッダー',
      'リアルタイム統計表示',
      '経験値と町の人口表示',
      '完了率の視覚化'
    ],
    demo: 'ダッシュボードページで確認'
  },
  {
    id: 'pricing',
    title: '💳 料金プラン',
    description: '無料・プロ・プレミアムの3つのプランで柔軟な選択',
    icon: Gift,
    color: 'from-yellow-500 to-orange-500',
    benefits: [
      '無料プラン：基本機能',
      'プロプラン：月額980円',
      'プレミアムプラン：月額1,980円',
      'PayPal決済対応'
    ],
    demo: 'ランディングページで料金詳細を確認'
  }
]

const plans = [
  {
    name: '無料プラン',
    price: '無料',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    features: [
      '習慣登録（最大5個）',
      '基本的な統計',
      '町育成ゲーム（基本機能）',
      'ウェルカムフロー',
      '祝福アニメーション'
    ]
  },
  {
    name: 'プロプラン',
    price: '月額980円',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    features: [
      '無制限の習慣登録',
      '詳細な統計とレポート',
      '町育成ゲーム（全機能）',
      '優先サポート',
      '習慣作成ウィザード'
    ]
  },
  {
    name: 'プレミアムプラン',
    price: '月額1,980円',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    features: [
      'プロプランの全機能',
      '特別な建物とエリア',
      'カスタムテーマ',
      '専用サポート',
      '高度な分析機能'
    ]
  }
]

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="h-8 w-8 text-blue-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            新機能紹介
          </h1>
          <Sparkles className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          HabitFlow Proの最新機能で、楽しく効果的に習慣を身につけましょう！
        </p>
      </motion.div>

      {/* 機能一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">デモ:</span>
                    <span className="text-sm text-muted-foreground">{feature.demo}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      クリックして詳細を表示
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 機能詳細モーダル */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const feature = features.find(f => f.id === selectedFeature)
                if (!feature) return null

                return (
                  <>
                    <div className={`bg-gradient-to-r ${feature.color} p-6 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                            <feature.icon className="h-8 w-8" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">{feature.title}</h2>
                            <p className="text-white/90">{feature.description}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFeature(null)}
                          className="text-white hover:bg-white/20"
                        >
                          ✕
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            主な機能
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {feature.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2 flex items-center gap-2">
                            <Play className="h-4 w-4 text-blue-500" />
                            デモの確認方法
                          </h3>
                          <p className="text-sm text-muted-foreground">{feature.demo}</p>
                        </div>

                        <div className="flex gap-3">
                          <Button 
                            onClick={() => setSelectedFeature(null)}
                            variant="outline"
                            className="flex-1"
                          >
                            閉じる
                          </Button>
                          <Button 
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                            asChild
                          >
                            <Link to="/app">
                              アプリで試す
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 料金プラン比較 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">料金プラン</h2>
          <p className="text-muted-foreground">
            あなたに最適なプランを選択してください
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className={`${plan.bgColor} hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="text-center">
                  <CardTitle className={plan.color}>{plan.name}</CardTitle>
                  <div className="text-2xl font-bold">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-4"
                    variant={plan.name === 'プロプラン' ? 'default' : 'outline'}
                  >
                    {plan.name === '無料プラン' ? '今すぐ開始' : 'プランを選択'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* アクションボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            asChild
          >
            <Link to="/app">
              <Play className="h-5 w-5 mr-2" />
              アプリを試す
            </Link>
          </Button>
          <Button 
            size="lg"
            variant="outline"
            asChild
          >
            <Link to="/">
              <Trophy className="h-5 w-5 mr-2" />
              ランディングページ
            </Link>
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          すべての機能を無料でお試しいただけます
        </p>
      </motion.div>
    </div>
  )
}
