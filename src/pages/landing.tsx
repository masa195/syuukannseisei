import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, Calendar, BarChart3, Bell, Users, Star, CheckCircle, Zap, Heart, Smartphone, LogIn } from 'lucide-react'
import { PaymentModal } from '@/components/payment/payment-modal'
import { AuthModal } from '@/components/auth/auth-modal'
import { useAuthStore } from '@/store/authStore'

export default function Landing() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'premium'>('pro')
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
    },
    {
      name: 'プレミアムプラン',
      price: 1980,
      features: [
        'プロプランの全機能',
        'チーム機能',
        'カスタムテーマ',
        '高度な分析ツール',
        'API連携',
        '専任サポート'
      ],
      popular: false
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
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            新機能：町育成ゲームが追加されました！
          </div>
          
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            HabitFlow Pro
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            習慣管理と町育成ゲームを組み合わせた、世界最高の習慣トラッカーアプリ。
            <br />
            目標達成を楽しく、効果的にサポートします。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <a href="/app">
                無料で始める
                <Zap className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold transition-all duration-300" asChild>
              <a href="/app/town">
                町を見る
                <Star className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
          
          {/* 統計情報 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">アクティブユーザー</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">習慣達成率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">4.9★</div>
              <div className="text-gray-600">ユーザー評価</div>
            </div>
          </div>
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
                        setSelectedPlan(plan.name === 'プロプラン' ? 'pro' : 'premium')
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
              <h5 className="text-lg font-semibold mb-4">サポート</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/terms" className="hover:text-white transition-colors">利用規約</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
                <li><a href="/app" className="hover:text-white transition-colors">アプリを開く</a></li>
                <li><a href="/app/town" className="hover:text-white transition-colors">町を見る</a></li>
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
        amount={selectedPlan === 'pro' ? 980 : 1980}
        planName={selectedPlan === 'pro' ? 'プロプラン' : 'プレミアムプラン'}
      />
    </div>
  )
}