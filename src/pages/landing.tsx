import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PaymentModal } from '@/components/payment/payment-modal'
import { 
  Target, 
  BarChart3, 
  MapPin, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Globe,
  Lock
} from 'lucide-react'

export default function Landing() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'premium'>('free')

  const features = [
    {
      icon: Target,
      title: '習慣管理',
      description: '日々の習慣を効率的に管理し、目標達成をサポートします'
    },
    {
      icon: BarChart3,
      title: '詳細な統計',
      description: '進捗を可視化し、パフォーマンスを分析します'
    },
    {
      icon: MapPin,
      title: '町育成ゲーム',
      description: '習慣完了で町を発展させ、楽しく継続できます'
    },
    {
      icon: Shield,
      title: 'プライバシー保護',
      description: 'データは暗号化され、安全に管理されます'
    }
  ]

  const plans = [
    {
      id: 'free',
      name: '無料プラン',
      price: 0,
      features: [
        '基本的な習慣管理',
        '7日間の統計',
        '基本的な町育成',
        'コミュニティサポート'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'プロプラン',
      price: 980,
      features: [
        '無制限の習慣管理',
        '詳細な統計と分析',
        '高度な町育成機能',
        '優先サポート',
        'データエクスポート'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'プレミアムプラン',
      price: 1980,
      features: [
        'プロプランの全機能',
        'AI パーソナルコーチ',
        'チーム機能',
        'カスタムテーマ',
        '24/7 サポート'
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
              <h1 className="text-2xl font-bold">習慣トラッカー</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <a href="/syuukannseisei/terms">利用規約</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/syuukannseisei/privacy">プライバシー</a>
              </Button>
              <Button asChild>
                <a href="/syuukannseisei/app">アプリを開く</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4">新機能: 町育成ゲーム</Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            習慣を楽しく継続しよう
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            習慣管理と町育成ゲームを組み合わせた、世界最高の習慣トラッカーアプリ。
            目標達成を楽しく、効果的にサポートします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/app">
                無料で始める
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">機能を見る</a>
            </Button>
          </div>
        </div>
      </section>

      {/* 機能セクション */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">主な機能</h3>
            <p className="text-xl text-muted-foreground">
              習慣管理を革新する機能が満載
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
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
              <h3 className="text-4xl font-bold mb-6">町育成ゲーム</h3>
              <p className="text-lg text-muted-foreground mb-6">
                習慣を完了するたびに町が発展します。建物を建て、住民を増やし、
                美しい町を作り上げましょう。ゲーム要素で楽しく習慣を継続できます。
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>習慣完了で建物が増える</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>レベルアップで新しいエリアが解放</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>連続達成で特別な建物が出現</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto text-green-600 mb-4" />
                  <h4 className="text-xl font-semibold mb-2">あなたの町</h4>
                  <p className="text-muted-foreground mb-4">
                    習慣を続けて美しい町を作りましょう
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="h-8 bg-green-200 rounded"></div>
                    <div className="h-8 bg-blue-200 rounded"></div>
                    <div className="h-8 bg-yellow-200 rounded"></div>
                    <div className="h-8 bg-purple-200 rounded"></div>
                    <div className="h-8 bg-red-200 rounded"></div>
                    <div className="h-8 bg-pink-200 rounded"></div>
                  </div>
                  <Button asChild>
                    <a href="/app/town">町を見る</a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プランセクション */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">料金プラン</h3>
            <p className="text-xl text-muted-foreground">
              あなたに最適なプランを選んでください
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    人気
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    ¥{plan.price.toLocaleString()}
                    {plan.price > 0 && <span className="text-lg text-muted-foreground">/月</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => {
                      setSelectedPlan(plan.id as any)
                      setShowPaymentModal(true)
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

      {/* セキュリティセクション */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">セキュリティとプライバシー</h3>
            <p className="text-xl text-muted-foreground">
              あなたのデータは安全に保護されます
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Lock className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <CardTitle>データ暗号化</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  すべてのデータは業界標準の暗号化技術で保護されています
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <CardTitle>プライバシー保護</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  個人情報は第三者と共有されることはありません
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Globe className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>GDPR準拠</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  国際的なプライバシー規制に完全準拠しています
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6" />
                <h4 className="text-lg font-semibold">習慣トラッカー</h4>
              </div>
              <p className="text-gray-400">
                習慣管理を革新するアプリ
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">製品</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/syuukannseisei/app" className="hover:text-white">アプリ</a></li>
                <li><a href="/syuukannseisei/app/town" className="hover:text-white">町育成</a></li>
                <li><a href="#features" className="hover:text-white">機能</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">サポート</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/syuukannseisei/terms" className="hover:text-white">利用規約</a></li>
                <li><a href="/syuukannseisei/privacy" className="hover:text-white">プライバシー</a></li>
                <li><a href="#" className="hover:text-white">ヘルプ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">会社</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">会社概要</a></li>
                <li><a href="#" className="hover:text-white">採用情報</a></li>
                <li><a href="#" className="hover:text-white">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 習慣トラッカー. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
