import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import PageTransition from '../components/PageTransition'

const recentActivity = [
  { food: 'Biryani (8 kg)', org: 'Asha Trust', time: '2 hrs ago', status: 'Claimed', statusVariant: 'green' },
  { food: 'Bread Rolls (50 pcs)', org: 'Ravi (Volunteer)', time: '5 hrs ago', status: 'Delivered', statusVariant: 'blue' },
  { food: 'Paneer (5 kg)', org: 'you', time: 'Today 9:00 AM', status: 'Pending', statusVariant: 'orange' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeRole, setActiveRole] = useState('donor')

  return (
    <PageTransition>
      <DashboardLayout role={activeRole} orgName="The Grand Hotel">
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-black text-gray-800">Good Morning, Grand Hotel! 👋</h1>
              <p className="text-sm text-gray-500 mt-0.5">Monday, 17 June 2025</p>
            </div>
            <button
              onClick={() => navigate('/list-food')}
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              + List Leftover Food
            </button>
          </div>

          {/* Role switcher */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'donor', label: '🏪 Donor', variant: 'green' },
              { id: 'ngo', label: '🤝 NGO', variant: 'blue' },
              { id: 'volunteer', label: '🚴 Volunteer', variant: 'purple' },
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeRole === r.id
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard value="24" label="Active Listings" icon="📋" delay={0} />
            <StatCard value="8" label="Claims Today" icon="✅" delay={0.05} />
            <StatCard value="3" label="In Transit" icon="🚴" delay={0.1} />
            <StatCard value="642 kg" label="Food Saved (MTD)" icon="🌱" delay={0.15} />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Recent Activity</p>
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{a.food} {a.status === 'Delivered' ? 'delivered' : a.status === 'Claimed' ? 'claimed' : 'listed'}</p>
                      <p className="text-xs text-gray-400">by {a.org} • {a.time}</p>
                    </div>
                    <Badge variant={a.statusVariant}>{a.status}</Badge>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Quick Actions</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '📋', label: 'Add New Listing', path: '/list-food', color: 'bg-primary text-white hover:bg-primary-dark' },
                  { icon: '📦', label: 'View Pickups', path: '/pickup-management', color: 'bg-white border border-primary text-primary hover:bg-primary-50' },
                  { icon: '📈', label: 'Impact Report', path: '/impact', color: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50' },
                  { icon: '💬', label: 'Messages', path: '/messages', color: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50' },
                  { icon: '🔔', label: 'Notifications', path: '/notifications', color: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50' },
                  { icon: '📊', label: 'Analytics', path: '/reports', color: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50' },
                ].map((a) => (
                  <button
                    key={a.label}
                    onClick={() => navigate(a.path)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 ${a.color}`}
                  >
                    <span>{a.icon}</span> {a.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Impact preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-5 bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Your Cumulative Impact</p>
                <h3 className="text-2xl font-black">7,200 Lives Changed 🌱</h3>
                <p className="text-white/70 text-sm mt-1">2,840 kg rescued • 142 donations • 22 NGOs served</p>
              </div>
              <button
                onClick={() => navigate('/impact')}
                className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors flex-shrink-0"
              >
                View Impact →
              </button>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
