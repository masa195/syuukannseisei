import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
 
import { useTheme } from '@/components/theme-provider'
import { useHabitStore } from '@/store/habitStore'
import { NotificationSettings } from '@/components/notification-settings'
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Monitor,
  
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const { habits, completions, dailyProgress } = useHabitStore()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleExportData = () => {
    const data = {
      habits,
      completions,
      dailyProgress,
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('データをエクスポートしました')
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        
        // データの検証
        if (!data.habits || !Array.isArray(data.habits)) {
          throw new Error('無効なデータ形式です')
        }

        // データをインポート（実際の実装では、ストアにインポート機能を追加する必要があります）
        localStorage.setItem('habit-tracker-storage', JSON.stringify(data))
        
        toast.success('データをインポートしました。ページを再読み込みしてください。')
        
        // ページを再読み込み
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (error) {
        toast.error('データのインポートに失敗しました')
        console.error('Import error:', error)
      }
    }
    reader.readAsText(file)
  }

  const handleDeleteAllData = () => {
    localStorage.removeItem('habit-tracker-storage')
    toast.success('すべてのデータを削除しました')
    setShowDeleteConfirm(false)
    
    // ページを再読み込み
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const stats = {
    totalHabits: habits.length,
    activeHabits: habits.filter(h => h.isActive).length,
    totalCompletions: completions.length,
    totalDays: dailyProgress.length,
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-3xl font-bold">設定</h1>
        <p className="text-muted-foreground">
          アプリの設定とデータ管理
        </p>
      </div>

      {/* 統計情報 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              データ統計
            </CardTitle>
            <CardDescription>
              現在のデータの概要
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{stats.totalHabits}</div>
                <div className="text-sm text-muted-foreground">総習慣数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{stats.activeHabits}</div>
                <div className="text-sm text-muted-foreground">アクティブ習慣</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">{stats.totalCompletions}</div>
                <div className="text-sm text-muted-foreground">総完了数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{stats.totalDays}</div>
                <div className="text-sm text-muted-foreground">記録日数</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* テーマ設定 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                テーマ設定
              </CardTitle>
              <CardDescription>
                アプリの外観をカスタマイズ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                  className="flex items-center gap-2"
                >
                  <Sun className="h-4 w-4" />
                  ライト
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                  className="flex items-center gap-2"
                >
                  <Moon className="h-4 w-4" />
                  ダーク
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  onClick={() => setTheme('system')}
                  className="flex items-center gap-2"
                >
                  <Monitor className="h-4 w-4" />
                  システム
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                現在のテーマ: {theme === 'light' && 'ライト'}
                {theme === 'dark' && 'ダーク'}
                {theme === 'system' && 'システム設定に従う'}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 通知設定 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <NotificationSettings />
        </motion.div>

        {/* データ管理 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                データ管理
              </CardTitle>
              <CardDescription>
                データのバックアップと復元
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button onClick={handleExportData} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  データをエクスポート
                </Button>
                
                <div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                    id="import-file"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('import-file')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    データをインポート
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                データはJSON形式でエクスポート・インポートされます
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 危険な操作 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                危険な操作
              </CardTitle>
              <CardDescription>
                データの完全削除（元に戻せません）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                すべてのデータを削除
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                この操作は元に戻せません。事前にバックアップを取ることをお勧めします。
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* アプリ情報 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>アプリ情報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">バージョン</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ビルド日</span>
                <span>{new Date().toLocaleDateString('ja-JP')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">フレームワーク</span>
                <span>React + TypeScript + Vite</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 削除確認ダイアログ */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-background rounded-lg shadow-lg p-6 max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <h3 className="text-lg font-semibold">データを削除</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              すべての習慣データ、完了記録、統計データが完全に削除されます。
              この操作は元に戻せません。
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                キャンセル
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAllData}
              >
                削除する
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
