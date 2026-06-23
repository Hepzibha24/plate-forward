import { useNavigate } from 'react-router-dom'
import { Bell, User, ChevronDown } from 'lucide-react'

export default function Navbar({ role = 'donor', orgName = 'The Grand Hotel', showActions = true }) {
  const navigate = useNavigate()

  const roleColors = {
    donor: 'bg-green-100 text-green-800',
    ngo: 'bg-blue-100 text-blue-800',
    volunteer: 'bg-purple-100 text-purple-800',
  }

  const roleLabels = {
    donor: '🏪 Donor',
    ngo: '🤝 NGO',
    volunteer: '🚴 Volunteer',
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="px-5 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 font-extrabold text-lg text-primary hover:opacity-80 transition-opacity"
        >
          🍽️ <span>FoodRescue</span>
        </button>

        {showActions && (
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${roleColors[role]}`}>
              {roleLabels[role]}
            </span>
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-primary-50 border-2 border-primary flex items-center justify-center">
                <User size={13} className="text-primary" />
              </div>
              <span className="text-sm text-gray-700 font-medium">{orgName}</span>
              <ChevronDown size={13} className="text-gray-400" />
            </button>
          </div>
        )}

        {!showActions && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-primary border border-primary px-4 py-1.5 rounded-lg hover:bg-primary-50 transition-colors font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-sm bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
