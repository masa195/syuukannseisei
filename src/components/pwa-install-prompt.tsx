import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, X, Smartphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePWA } from '@/hooks/usePWA'

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, installApp } = usePWA()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isInstallable && !isInstalled) {
      // 少し遅延してから表示
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isInstallable, isInstalled])

  if (!isVisible || !isInstallable || isInstalled) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
      >
        <Card className="shadow-lg border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">アプリをインストール</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>
              ホーム画面に追加して、より快適にご利用いただけます
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2">
              <Button onClick={installApp} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                インストール
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsVisible(false)}
              >
                後で
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
