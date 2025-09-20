import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Layout } from '@/components/layout'
import { PWAInstallPrompt } from '@/components/pwa-install-prompt'
import { WelcomeFlow } from '@/components/onboarding/welcome-flow'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'

// Pages
import Dashboard from '@/pages/dashboard'
import Habits from '@/pages/habits'
import Statistics from '@/pages/statistics'
import Settings from '@/pages/settings'
import Town from '@/pages/town'
import Features from '@/pages/features'
import Landing from '@/pages/landing'
import Terms from '@/pages/terms'
import Privacy from '@/pages/privacy'

function App() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // 初回訪問かどうかをチェック
    const hasSeenWelcome = localStorage.getItem('habitflow-welcome-seen')
    if (!hasSeenWelcome) {
      setShowWelcome(true)
    }
  }, [])

  const handleWelcomeComplete = () => {
    localStorage.setItem('habitflow-welcome-seen', 'true')
    setShowWelcome(false)
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="habit-tracker-theme">
      <Router basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-background">
          <PWAInstallPrompt />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/app" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="habits" element={<Habits />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="town" element={<Town />} />
              <Route path="features" element={<Features />} />
            </Route>
          </Routes>
          <Toaster position="top-right" />
          
          {/* ウェルカムフロー */}
          <WelcomeFlow
            isOpen={showWelcome}
            onComplete={handleWelcomeComplete}
          />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
