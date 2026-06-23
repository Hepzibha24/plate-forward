import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import Badge from '../components/Badge'
import Timeline from '../components/Timeline'
import PageTransition from '../components/PageTransition'

const steps = [
  { label: '✅ Claim Confirmed', time: '6:30 PM', done: true },
  { label: '🚴 Volunteer Assigned — Ravi Kumar', time: '6:45 PM', done: true },
  { label: '⏳ Volunteer En Route to Pickup Point', time: 'Now • ETA 7:02 PM', done: false, current: true },
  { label: 'Food Picked Up', time: '—', done: false },
  { label: 'Delivered to NGO', time: '—', done: false },
]

export default function VolunteerAssigned() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <DashboardLayout>
        {/* Blue banner */}
        <div className="bg-blue-50 border-b-2 border-blue-300 px-5 py-3 flex items-center gap-3">
          <span className="text-xl">🚴</span>
          <div>
            <p className="font-bold text-blue-800 text-sm">Volunteer Successfully Assigned</p>
            <p className="text-xs text-blue-600">Ravi Kumar will handle pickup for Claim #FR-CLM-2025-0391</p>
          </div>
          <Badge variant="blue" className="ml-auto">Assigned</Badge>
        </div>

        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            {/* Volunteer card */}
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Assigned Volunteer</p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 mb-6 hover-lift"
            >
              <div className="w-14 h-14 rounded-full bg-primary-50 border-2 border-primary/20 flex items-center justify-center text-3xl flex-shrink-0">
                🧑
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-800 text-lg">Ravi Kumar</p>
                <p className="text-sm text-gray-500">⭐ 4.8 &nbsp;•&nbsp; 87 deliveries &nbsp;•&nbsp; Active since Jan 2024</p>
                <p className="text-sm text-gray-500">📞 +91 98765 00123 &nbsp;•&nbsp; 🛵 2-wheeler</p>
              </div>
              <div className="text-right flex-shrink-0">
                <Badge variant="green">Available</Badge>
                <p className="text-xs text-gray-400 mt-2">ETA to pickup: ~12 min</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-green-600 font-medium">Live tracking</span>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Pickup Status Timeline</p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 mb-5"
            >
              <Timeline steps={steps} />
            </motion.div>

            {/* Route mini-map */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-5 flex items-center gap-4"
            >
              <span className="text-4xl">🗺️</span>
              <div className="flex-1">
                <p className="font-bold text-primary text-sm">Route: Grand Hotel → Asha Trust</p>
                <p className="text-xs text-gray-500 mt-0.5">2.4 km • ~8 min drive • Volunteer en route</p>
              </div>
              <button
                onClick={() => navigate('/pickup-drop')}
                className="bg-primary text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-primary-dark transition-colors"
              >
                View Map →
              </button>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex gap-3"
            >
              <button
                onClick={() => navigate('/pickup-drop')}
                className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                📍 Track on Map
              </button>
              <button
                onClick={() => navigate('/messages')}
                className="border border-primary text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-50 transition-colors"
              >
                💬 Message Volunteer
              </button>
              <button className="ml-auto border border-gray-200 text-gray-500 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                🔄 Reassign
              </button>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
