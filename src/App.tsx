import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Layout } from '@/components/layout'
import { PWAInstallPrompt } from '@/components/pwa-install-prompt'
import { Toaster } from 'react-hot-toast'

// Pages
import Dashboard from '@/pages/dashboard'
import Habits from '@/pages/habits'
import Statistics from '@/pages/statistics'
import Settings from '@/pages/settings'
import Town from '@/pages/town'
import Landing from '@/pages/landing'
import Terms from '@/pages/terms'
import Privacy from '@/pages/privacy'

function App() {
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
            </Route>
          </Routes>
          <Toaster position="top-right" />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
