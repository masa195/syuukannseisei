import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle } from 'lucide-react'

interface PayPalPaymentProps {
  amount: number
  planName: string
  onSuccess: (orderId: string) => void
  onError: (error: string) => void
}

const PayPalButtonWrapper = ({ amount, planName, onSuccess, onError }: PayPalPaymentProps) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const createOrder = (_data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'JPY',
            value: amount.toString()
          },
          description: `${planName} - 習慣トラッカー`
        }
      ]
    })
  }

  const onApprove = (_data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      onSuccess(details.id)
    })
  }

  const handleError = (err: any) => {
    onError(err.message || '支払い処理中にエラーが発生しました')
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2">PayPalを読み込み中...</span>
      </div>
    )
  }

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={handleError}
      style={{
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      }}
    />
  )
}

export function PayPalPayment({ amount, planName, onSuccess, onError }: PayPalPaymentProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  const handleSuccess = (id: string) => {
    setOrderId(id)
    setIsSuccess(true)
    onSuccess(id)
  }

  const handleError = (error: string) => {
    onError(error)
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-xl text-green-600">支払い完了！</CardTitle>
          <CardDescription>
            ご利用ありがとうございます。プランが有効になりました。
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            注文ID: {orderId}
          </p>
          <Button className="w-full" onClick={() => window.location.href = '/app'}>
            アプリを開く
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">PayPalで支払い</CardTitle>
        <CardDescription>
          {planName} - ¥{amount.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PayPalScriptProvider
          options={{
            clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'demo',
            currency: 'JPY',
            intent: 'capture'
          }}
        >
          <PayPalButtonWrapper
            amount={amount}
            planName={planName}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </PayPalScriptProvider>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            安全なPayPal決済でお支払いいただけます
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
