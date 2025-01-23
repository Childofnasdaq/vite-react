import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardLayout from './components/layout/DashboardLayout'
import DashboardPage from './pages/DashboardPage'
import PurchasePage from './pages/PurchasePage'
import KeysPage from './pages/KeysPage'
import EAsPage from './pages/EAsPage'
import StatsPage from './pages/StatsPage'
import HelpPage from './pages/HelpPage'
import ProfilePage from './pages/ProfilePage'
import ReferralsPage from './pages/ReferralsPage'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="purchase" element={<PurchasePage />} />
          <Route path="keys" element={<KeysPage />} />
          <Route path="eas" element={<EAsPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="referrals" element={<ReferralsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
