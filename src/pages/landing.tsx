import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, Calendar, BarChart3, Bell, Users, Star, CheckCircle, Zap, Heart, Smartphone, LogIn, Sparkles, MapPin, ArrowRight, Play } from 'lucide-react'
import { PaymentModal } from '@/components/payment/payment-modal'
import { AuthModal } from '@/components/auth/auth-modal'
import { useAuthStore } from '@/store/authStore'
import { motion } from 'framer-motion'

export default function Landing() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'pro'>('pro')
  const { user, isAuthenticated, logout } = useAuthStore()

  const features = [
    {
      icon: Target,
      title: '習慣トラッキング',
      description: '毎日の習慣を簡単に記録・管理。進捗を可視化してモチベーションを維持します。',
      popular: false
    },
    {
      icon: BarChart3,
      title: '詳細分析',
      description: '習慣の達成率や傾向をグラフで分析。データに基づいた改善提案を提供します。',
      popular: true
    },
    {
      icon: Bell,
      title: 'スマート通知',
      description: '最適なタイミングでリマインダーを送信。習慣化を自然にサポートします。',
      popular: false
    },
    {
      icon: Users,
      title: 'コミュニティ',
      description: '同じ目標を持つ仲間とつながり、励まし合いながら習慣化を実現します。',
      popular: false
    },
    {
      icon: Star,
      title: '町育成ゲーム',
      description: '習慣達成で町を発展させよう！建物を建て、住民を増やし、特別な建物を解放します。',
      popular: true
    },
    {
      icon: Calendar,
      title: 'ストリーク管理',
      description: '連続達成日数を記録し、特別な建物の解放条件を満たしましょう。',
      popular: false
    },
    {
      icon: Zap,
      title: 'レベルアップ',
      description: '習慣達成で経験値を獲得し、新しいエリアを解放して町を拡張します。',
      popular: false
    },
    {
      icon: Heart,
      title: 'モチベーション',
      description: 'ゲーム要素で楽しく継続。習慣化が苦ではなく、楽しみに変わります。',
      popular: false
    }
  ]

  const plans = [
    {
      name: '無料プラン',
      price: 0,
      features: [
        '基本的な習慣トラッキング',
        '7日間のデータ保持',
        '基本的な通知機能',
        '町育成ゲーム（制限あり）'
      ],
      popular: false
    },
    {
      name: 'プロプラン',
      price: 980,
      features: [
        '無制限の習慣トラッキング',
        '無制限のデータ保持',
        '詳細な分析レポート',
        'カスタム通知設定',
        '町育成ゲーム（フル機能）',
        '優先サポート'
      ],
      popular: true
    }
  ]

  const newFeatures = [
    {
      icon: Sparkles,
      title: 'ウェルカムフロー',
      description: '初回訪問時に楽しいオンボーディングでアプリの魅力を紹介',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Target,
      title: '習慣作成ウィザード',
      description: '5ステップの楽しい習慣作成で、簡単に習慣を設定',
      color: 'from-green-500 to-blue-500'
    },
    {
      icon: Heart,
      title: '祝福アニメーション',
      description: '習慣完了時の祝福エフェクトで達成感を演出',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: MapPin,
      title: '町育成ゲーム',
      description: '習慣完了で町が発展！建物を建て、住民を増やそう',
      color: 'from-green-500 to-teal-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold">HabitFlow Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <a href="/terms">利用規約</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/privacy">プライバシー</a>
              </Button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">こんにちは、{user?.name}さん</span>
                  <Button variant="outline" onClick={logout}>
                    ログアウト
                  </Button>
                  <Button asChild>
                    <a href="/app">アプリを開く</a>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={() => setShowAuthModal(true)}>
                    <LogIn className="h-4 w-4 mr-2" />
                    ログイン
                  </Button>
                  <Button asChild>
                    <a href="/app">アプリを開く</a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="relative py-20 overflow-hidden">
        {/* 動的背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600">
          <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        </div>
        </div>
        
        {/* 浮遊する要素 */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-400/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 right-10 w-8 h-8 bg-green-400/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        
        <div className="relative container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20"
          >
            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
            <span className="animate-pulse">新機能：町育成ゲームが追加されました！</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            HabitFlow Pro
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            習慣管理と町育成ゲームを組み合わせた、世界最高の習慣トラッカーアプリ。
            <br />
            目標達成を楽しく、効果的にサポートします。
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
              asChild
            >
              <a href="/app">
                <Play className="mr-2 h-5 w-5" />
                無料で始める
                <Zap className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105" 
              asChild
            >
              <a href="/app/town">
                <MapPin className="mr-2 h-5 w-5" />
                町を見る
                <Star className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
          
          {/* 統計情報 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">10,000+</div>
              <div className="text-white/80">アクティブユーザー</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-white/80">習慣達成率</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="text-4xl font-bold text-pink-400 mb-2">4.9★</div>
              <div className="text-white/80">ユーザー評価</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 機能セクション */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">主な機能</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              習慣管理を革新する機能が満載。あなたの目標達成をサポートします。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 町育成ゲームセクション */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">新機能</Badge>
              <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                町育成ゲーム
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                習慣を達成するたびに町が発展します。建物を建て、住民を増やし、特別な建物を解放して、あなただけの理想の町を作り上げましょう。
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">習慣達成で建物が増える</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">レベルアップで新しいエリアが解放</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">ストリークで特別な建物が出現</span>
                </div>
              </div>
              <Button size="lg" className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <a href="/app/town">
                  町を見る
                  <Star className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-gradient-to-r from-green-400 to-blue-400">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">あなたの町</h4>
                  <p className="text-gray-600">習慣達成で町を発展させよう！</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-100 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🏠</div>
                    <div className="text-sm font-semibold">住宅</div>
                    <div className="text-xs text-gray-600">5棟</div>
                  </div>
                  <div className="bg-blue-100 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🏪</div>
                    <div className="text-sm font-semibold">商店</div>
                    <div className="text-xs text-gray-600">3棟</div>
                  </div>
                  <div className="bg-purple-100 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🏛️</div>
                    <div className="text-sm font-semibold">公共施設</div>
                    <div className="text-xs text-gray-600">2棟</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新機能セクション */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-blue-500" />
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                新機能
              </h3>
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              最新のアップデートで、より楽しく効果的に習慣を身につけましょう！
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {newFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 shadow-md group">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="/app/features">
                新機能を詳しく見る
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 料金プランセクション */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">料金プラン</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              あなたに最適なプランを選んで、習慣化の旅を始めましょう。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'border shadow-lg'} hover:shadow-xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">人気</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">¥{plan.price.toLocaleString()}</span>
                    {plan.price > 0 && <span className="text-gray-500">/月</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
                    onClick={() => {
                      if (plan.price > 0) {
                        setSelectedPlan('pro')
                        setShowPaymentModal(true)
                      }
                    }}
                  >
                    {plan.price === 0 ? '無料で始める' : 'プランを選択'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 法的文書まとめ */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">法的文書まとめ</h3>
            <p className="text-gray-600">HabitFlow Proのご利用に関する重要な情報をこちらに集約しました。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/terms" className="group block rounded-2xl border p-6 bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">利用規約</h4>
                  <p className="text-sm text-gray-500 mt-1">サービスのご利用条件</p>
                </div>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
            <a href="/privacy" className="group block rounded-2xl border p-6 bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">プライバシーポリシー</h4>
                  <p className="text-sm text-gray-500 mt-1">個人情報の取扱い</p>
                </div>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
            <a href="/terms#退会" className="group block rounded-2xl border p-6 bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">退会手続き</h4>
                  <p className="text-sm text-gray-500 mt-1">手順と注意事項</p>
                </div>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
            <a href="/terms#料金" className="group block rounded-2xl border p-6 bg-white hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold">料金詳細</h4>
                  <p className="text-sm text-gray-500 mt-1">プランとお支払い</p>
                </div>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* かんたん3ステップ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">かんたん3ステップでスタート</h3>
            <p className="text-gray-600">誰でも迷わず、今日から習慣づくりを楽しく。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border p-6">
              <div className="text-sm text-blue-600 font-semibold mb-2">STEP 1</div>
              <h4 className="text-lg font-semibold">ログイン・登録</h4>
              <p className="text-sm text-gray-600 mt-2">1分で完了。すぐに習慣づくりを始められます。</p>
              <div className="mt-4">
                <a href="/app" className="text-blue-600 hover:underline">今すぐはじめる</a>
              </div>
            </div>
            <div className="rounded-2xl border p-6">
              <div className="text-sm text-blue-600 font-semibold mb-2">STEP 2</div>
              <h4 className="text-lg font-semibold">習慣を作る</h4>
              <p className="text-sm text-gray-600 mt-2">ウィザードで楽しく作成。色やアイコンも選べます。</p>
              <div className="mt-4">
                <a href="/app/habits" className="text-blue-600 hover:underline">習慣を作成</a>
              </div>
            </div>
            <div className="rounded-2xl border p-6">
              <div className="text-sm text-blue-600 font-semibold mb-2">STEP 3</div>
              <h4 className="text-lg font-semibold">毎日チェック</h4>
              <p className="text-sm text-gray-600 mt-2">ダッシュボードで達成をタップ。町もどんどん発展！</p>
              <div className="mt-4">
                <a href="/app" className="text-blue-600 hover:underline">ダッシュボードへ</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-8 w-8 text-blue-400" />
                <h4 className="text-xl font-bold">HabitFlow Pro</h4>
              </div>
              <p className="text-gray-400 leading-relaxed">
                習慣管理と町育成ゲームを組み合わせた、世界最高の習慣トラッカーアプリ。
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">機能</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">習慣トラッキング</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">町育成ゲーム</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">詳細分析</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">スマート通知</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">アプリ</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/app" className="hover:text-white transition-colors">アプリを開く</a></li>
                <li><a href="/app/features" className="hover:text-white transition-colors">新機能紹介</a></li>
                <li><a href="/app/town" className="hover:text-white transition-colors">町を見る</a></li>
                <li><a href="/app/statistics" className="hover:text-white transition-colors">統計を見る</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">法的文書</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/terms" className="hover:text-white transition-colors">利用規約</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="/terms#退会" className="hover:text-white transition-colors">退会手続き</a></li>
                <li><a href="/terms#料金" className="hover:text-white transition-colors">料金詳細</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">お問い合わせ</h5>
              <p className="text-gray-400 mb-4">
                ご質問やご要望がございましたら、お気軽にお問い合わせください。
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Smartphone className="h-4 w-4 mr-2" />
                  アプリ
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HabitFlow Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* 認証モーダル */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />

      {/* 決済モーダル */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={980}
        planName={'プロプラン'}
      />
    </div>
  )
}