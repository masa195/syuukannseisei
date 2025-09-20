import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported('Notification' in window)
    setPermission(Notification.permission)
  }, [])

  const requestPermission = async () => {
    if (!isSupported) {
      toast.error('このブラウザは通知をサポートしていません')
      return false
    }

    if (permission === 'granted') {
      return true
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      
      if (result === 'granted') {
        toast.success('通知が有効になりました')
        return true
      } else {
        toast.error('通知が拒否されました')
        return false
      }
    } catch (error) {
      toast.error('通知の許可を取得できませんでした')
      return false
    }
  }

  const showNotification = (title: string, options?: NotificationOptions) => {
    if (permission !== 'granted') {
      toast.error('通知が許可されていません')
      return
    }

    try {
      const notification = new Notification(title, {
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        ...options
      })

      // 通知をクリックしたらウィンドウをフォーカス
      notification.onclick = () => {
        window.focus()
        notification.close()
      }

      // 5秒後に自動で閉じる
      setTimeout(() => {
        notification.close()
      }, 5000)
    } catch (error) {
      console.error('通知の表示に失敗しました:', error)
      toast.error('通知の表示に失敗しました')
    }
  }

  const scheduleNotification = (title: string, delay: number, options?: NotificationOptions) => {
    if (permission !== 'granted') return

    setTimeout(() => {
      showNotification(title, options)
    }, delay)
  }

  return {
    permission,
    isSupported,
    requestPermission,
    showNotification,
    scheduleNotification
  }
}











