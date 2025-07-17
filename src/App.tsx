import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { blink } from './blink/client'
import { User } from './types'

// Components
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import CrisisZoneDetail from './pages/CrisisZoneDetail'
import DataSources from './pages/DataSources'
import Workflows from './pages/Workflows'
import ReportsArchive from './pages/ReportsArchive'
import Settings from './pages/Settings'

// Layout
import Layout from './components/layout/Layout'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Crisis Intelligence Platform...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/crisis-zone/:id" element={<CrisisZoneDetail />} />
          <Route path="/data-sources" element={<DataSources />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/reports" element={<ReportsArchive />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App