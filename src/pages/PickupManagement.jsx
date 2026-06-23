import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import Badge from '../components/Badge'
import PageTransition from '../components/PageTransition'

const pickups = [
  { icon: '✅', food: 'Chicken Biryani', org: 'Asha Trust', date: 'Today', status: 'Confirmed', variant: 'green' },
  { icon: '🚴', food: 'Bread Rolls (50 pcs)', org: 'Sunrise Home', date: 'Today', status: 'In Transit', variant: 'blue' },
  { icon: '⏳', food: 'Veg Dal (8 kg)', org: 'Care India', date: 'Today', status: 'Pending Volunteer', variant: 'orange' },
  { icon: '🏠', food: 'Paneer (5 kg)', org: 'Hope NGO', date: 'Yesterday', status: 'Delivered', variant: 'green' },
]

const filters = ['All (12)', 'Pending Volunteer (4)', 'In Transit (3)', 'Delivered (5)']

export default function PickupManagement() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All (12)')
  const [selected, setSelected] = useState(0)

  return (
    <PageTransition>
      <DashboardLayout>
        {/* Success banner */}
        <div className="bg-green-50 border-b-2 border-green-300 px-5 py-3 flex items-center gap-3">
          <span className="text-xl">✅</span>
          <div>
            <p className="font-bold text-green-800 text-sm">Claim Confirmed! Claim ID: #FR-CLM-2025-0391</p>
            <p className="text-xs text-green-600">Asha Trust has claimed Chicken Biryani (15 kg) from The Grand Hotel</p>
          </div>
          <Badge variant="green" className="ml-auto">Confirmed</Badge>
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          {/* Sidebar filter */}
          <div className="w-48 bg-gray-50 border-r border-gray-200 flex-shrink-0 pt-3">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase px-4 mb-2">Filter by Status</p>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  activeFilter === f ? 'bg-primary-50 text-primary font-semibold border-r-2 border-primary' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-black text-gray-800">Active Pickup Requests</h2>
              <button
                onClick={() => navigate('/volunteer-assigned')}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                + Assign Volunteer
              </button>
            </div>

            <div className="space-y-3 mb-5">
              {pickups.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setSelected(i)}
                  className={`bg-white border rounded-xl p-4 flex items-center gap-3 cursor-pointer transition-all hover:shadow-sm ${
                    selected === i ? 'border-primary shadow-sm' : 'border-gray-200'
                  }`}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">{p.food}</p>
                    <p className="text-xs text-gray-400">Claimed by {p.org} • {p.date}</p>
                  </div>
                  <Badge variant={p.variant}>{p.status}</Badge>
                  <button
                    className="text-xs border border-primary text-primary px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors ml-1"
                    onClick={e => { e.stopPropagation(); navigate('/volunteer-assigned') }}
                  >
                    Manage →
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Selected claim panel */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              key={selected}
              className="bg-white border-2 border-primary rounded-xl p-5"
            >
              <h3 className="font-black text-primary-dark mb-4">📋 Selected Claim — #FR-CLM-2025-0391</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                <div><span className="text-gray-400">Food: </span><span className="font-medium">Chicken Biryani (15 kg)</span></div>
                <div><span className="text-gray-400">Donor: </span><span className="font-medium">The Grand Hotel</span></div>
                <div><span className="text-gray-400">NGO: </span><span className="font-medium">Asha Trust</span></div>
                <div><span className="text-gray-400">Pickup by: </span><span className="font-medium">11:00 PM today</span></div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => navigate('/volunteer-assigned')}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                  🚴 Assign Volunteer
                </button>
                <button
                  onClick={() => navigate('/messages')}
                  className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors"
                >
                  💬 Message NGO
                </button>
                <button className="ml-auto bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors">
                  ✗ Cancel Claim
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
