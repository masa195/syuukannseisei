import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNotification } from '@/hooks/useNotification'
import { Bell, BellOff, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function NotificationSettings() {
  const { permission, isSupported, requestPermission, showNotification } = useNotification()
  const [isRequesting, setIsRequesting] = useState(false)

  const handleRequestPermission = async () => {
    setIsRequesting(true)
    try {
      const granted = await requestPermission()
      if (granted) {
        toast.success('通知が有効になりました')
      }
    } catch (error) {
      toast.error('通知の許可を取得できませんでした')
    } finally {
      setIsRequesting(false)
    }
  }

  const testNotification = () => {
    if (permission !== 'granted') {
      toast.error('通知が許可されていません')
      return
    }

    showNotification('テスト通知', {
      body: '通知が正常に動作しています！',
      icon: '/pwa-192x192.png'
    })
  }

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <BellOff className="h-5 w-5" />
            通知がサポートされていません
          </CardTitle>
          <CardDescription>
            このブラウザは通知機能をサポートしていません
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          通知設定
        </CardTitle>
        <CardDescription>
          習慣のリマインダーと通知の管理
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 通知許可ステータス */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">通知の許可</h3>
              <p className="text-sm text-muted-foreground">
                習慣のリマインダーを受け取るには通知を許可してください
              </p>
            </div>
            <div className="flex items-center gap-2">
              {permission === 'granted' ? (
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  許可済み
                </Badge>
              ) : permission === 'denied' ? (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  拒否済み
                </Badge>
              ) : (
                <Badge variant="outline">
                  未設定
                </Badge>
              )}
            </div>
          </div>

          {permission !== 'granted' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">通知を有効にしてください</p>
                  <p className="text-xs text-muted-foreground">
                    習慣のリマインダーを受け取るには、ブラウザの通知を許可する必要があります
                  </p>
                </div>
                <Button
                  onClick={handleRequestPermission}
                  disabled={isRequesting}
                  size="sm"
                >
                  {isRequesting ? '許可中...' : '許可する'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* 通知テスト */}
        {permission === 'granted' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <h3 className="font-medium">通知テスト</h3>
              <p className="text-sm text-muted-foreground">
                通知が正常に動作するかテストできます
              </p>
            </div>
            <Button
              variant="outline"
              onClick={testNotification}
              className="w-full"
            >
              <Bell className="h-4 w-4 mr-2" />
              テスト通知を送信
            </Button>
          </motion.div>
        )}

        {/* 通知の設定方法 */}
        <div className="space-y-4">
          <h3 className="font-medium">通知の設定方法</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <span className="font-medium text-foreground">1.</span>
              <span>習慣を作成する際に「リマインダー時間」を設定してください</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-foreground">2.</span>
              <span>設定した時間になると自動的に通知が送信されます</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-foreground">3.</span>
              <span>通知をタップするとアプリが開きます</span>
            </div>
          </div>
        </div>

        {/* ブラウザ別設定方法 */}
        <div className="space-y-4">
          <h3 className="font-medium">ブラウザ別設定方法</h3>
          <div className="grid gap-3 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium">Chrome / Edge</div>
              <div className="text-muted-foreground">
                アドレスバーの左側の🔔アイコンをクリック → 「許可」を選択
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium">Firefox</div>
              <div className="text-muted-foreground">
                アドレスバーの左側の🔔アイコンをクリック → 「許可」を選択
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium">Safari</div>
              <div className="text-muted-foreground">
                Safari → 環境設定 → ウェブサイト → 通知 → このサイトを「許可」に設定
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
