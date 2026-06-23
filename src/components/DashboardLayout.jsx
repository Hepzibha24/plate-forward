import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from './Navbar'

const donorNav = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '📋', label: 'My Listings', path: '/food-listings' },
  { icon: '📦', label: 'Pickup Mgmt', path: '/pickup-management' },
  { icon: '🚴', label: 'Volunteers', path: '/volunteer-assigned' },
  { icon: '💬', label: 'Messages', path: '/messages' },
  { icon: '📈', label: 'Reports', path: '/reports' },
  { icon: '👤', label: 'Profile', path: '/profile' },
]

const ngoNav = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '🍽️', label: 'Food Listings', path: '/food-listings' },
  { icon: '✅', label: 'My Claims', path: '/pickup-management' },
  { icon: '📦', label: 'In Transit', path: '/food-picked-up' },
  { icon: '💬', label: 'Messages', path: '/messages' },
  { icon: '📈', label: 'Impact', path: '/impact' },
  { icon: '👤', label: 'Profile', path: '/profile' },
]

const volunteerNav = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '📦', label: 'Assignments', path: '/volunteer-assigned' },
  { icon: '🗺️', label: 'Route', path: '/pickup-drop' },
  { icon: '💬', label: 'Messages', path: '/messages' },
  { icon: '🏅', label: 'Impact', path: '/impact' },
  { icon: '👤', label: 'Profile', path: '/profile' },
]

export default function DashboardLayout({ children, role = 'donor', orgName = 'The Grand Hotel' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = role === 'ngo' ? ngoNav : role === 'volunteer' ? volunteerNav : donorNav

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role={role} orgName={orgName} />
      <div className="flex h-[calc(100vh-56px)]">
        <aside className="w-44 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary font-semibold border-r-2 border-primary'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </aside>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
