import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import OrgProfile from './pages/OrgProfile'
import ListLeftover from './pages/ListLeftover'
import FoodPublished from './pages/FoodPublished'
import FoodListings from './pages/FoodListings'
import FoodDetails from './pages/FoodDetails'
import ClaimFood from './pages/ClaimFood'
import PickupManagement from './pages/PickupManagement'
import VolunteerAssigned from './pages/VolunteerAssigned'
import PickupDropLocations from './pages/PickupDropLocations'
import FoodPickedUp from './pages/FoodPickedUp'
import FoodDelivered from './pages/FoodDelivered'
import ImpactUpdate from './pages/ImpactUpdate'
import ReportAnalysis from './pages/ReportAnalysis'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<OrgProfile />} />
        <Route path="/list-food" element={<ListLeftover />} />
        <Route path="/food-published" element={<FoodPublished />} />
        <Route path="/food-listings" element={<FoodListings />} />
        <Route path="/food-details" element={<FoodDetails />} />
        <Route path="/claim-food" element={<ClaimFood />} />
        <Route path="/pickup-management" element={<PickupManagement />} />
        <Route path="/volunteer-assigned" element={<VolunteerAssigned />} />
        <Route path="/pickup-drop" element={<PickupDropLocations />} />
        <Route path="/food-picked-up" element={<FoodPickedUp />} />
        <Route path="/food-delivered" element={<FoodDelivered />} />
        <Route path="/impact" element={<ImpactUpdate />} />
        <Route path="/reports" element={<ReportAnalysis />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}
