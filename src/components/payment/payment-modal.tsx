import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PayPalPayment } from './paypal-payment'
import { X } from 'lucide-react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  planName: string
}

export function PaymentModal({ isOpen, onClose, amount, planName }: PaymentModalProps) {

  const handleSuccess = (orderId: string) => {
    // 実際のアプリケーションでは、ここでユーザーのプランを更新
    console.log('Payment successful:', orderId)
    onClose()
  }

  const handleError = (error: string) => {
    console.error('Payment error:', error)
    // エラーハンドリング
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>支払い情報</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <PayPalPayment
          amount={amount}
          planName={planName}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </DialogContent>
    </Dialog>
  )
}