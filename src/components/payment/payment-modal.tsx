import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Smartphone, Wallet } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  planName: string
}

export function PaymentModal({ isOpen, onClose, amount, planName }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'wallet'>('card')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen) return null

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // 実際の決済処理をシミュレート
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    onClose()
    
    // 成功通知
    alert('決済が完了しました！')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            決済
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* プラン情報 */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold">{planName}</h3>
            <p className="text-2xl font-bold">¥{amount.toLocaleString()}/月</p>
          </div>

          {/* 決済方法選択 */}
          <div className="space-y-3">
            <h4 className="font-medium">決済方法</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPaymentMethod('card')}
                className="flex flex-col items-center p-3"
              >
                <CreditCard className="h-4 w-4 mb-1" />
                <span className="text-xs">クレジットカード</span>
              </Button>
              <Button
                variant={paymentMethod === 'mobile' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPaymentMethod('mobile')}
                className="flex flex-col items-center p-3"
              >
                <Smartphone className="h-4 w-4 mb-1" />
                <span className="text-xs">モバイル決済</span>
              </Button>
              <Button
                variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPaymentMethod('wallet')}
                className="flex flex-col items-center p-3"
              >
                <Wallet className="h-4 w-4 mb-1" />
                <span className="text-xs">電子マネー</span>
              </Button>
            </div>
          </div>

          {/* クレジットカード情報 */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">カード番号</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">有効期限</label>
                  <Input
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">CVV</label>
                  <Input
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">カード名義</label>
                <Input
                  placeholder="TARO YAMADA"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* モバイル決済 */}
          {paymentMethod === 'mobile' && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <Smartphone className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  モバイル決済アプリで決済を完了してください
                </p>
              </div>
            </div>
          )}

          {/* 電子マネー */}
          {paymentMethod === 'wallet' && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <Wallet className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  電子マネーで決済を完了してください
                </p>
              </div>
            </div>
          )}

          {/* セキュリティ情報 */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Badge variant="secondary">SSL暗号化</Badge>
            <Badge variant="secondary">PCI準拠</Badge>
          </div>

          {/* 決済ボタン */}
          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? '処理中...' : `¥${amount.toLocaleString()}を決済`}
          </Button>

          {/* 利用規約 */}
          <p className="text-xs text-muted-foreground text-center">
            決済を完了することで、
            <a href="/terms" className="underline">利用規約</a>
            および
            <a href="/privacy" className="underline">プライバシーポリシー</a>
            に同意したものとみなされます。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
