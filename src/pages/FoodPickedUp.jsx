import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import Badge from '../components/Badge'
import Timeline from '../components/Timeline'
import PageTransition from '../components/PageTransition'

const steps = [
  { label: '✅ Claim Confirmed', time: '6:30 PM', done: true },
  { label: '🚴 Volunteer Assigned — Ravi Kumar', time: '6:45 PM', done: true },
  { label: '📦 Food Picked Up from The Grand Hotel', time: '9:14 PM', done: true },
  { label: '🛵 En Route to Asha Trust', time: 'Now • ETA 9:28 PM', done: false, current: true },
  { label: 'Delivered to NGO', time: '—', done: false },
]

export default function FoodPickedUp() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6">
          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 flex items-center gap-4"
          >
            <span className="text-4xl">📦</span>
            <div>
              <h2 className="font-black text-blue-800 text-lg">Food Has Been Picked Up!</h2>
              <p className="text-sm text-blue-600 mt-0.5">Ravi Kumar collected Chicken Biryani at 9:14 PM from The Grand Hotel</p>
            </div>
            <Badge variant="blue" className="ml-auto flex-shrink-0">In Transit</Badge>
          </motion.div>

          <div className="max-w-xl mx-auto">
            {/* Timeline */}
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Delivery Progress</p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 mb-5"
            >
              <Timeline steps={steps} />
            </motion.div>

            {/* Mini map */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-2xl h-36 flex flex-col items-center justify-center gap-2 mb-5"
            >
              <span className="text-4xl">🗺️</span>
              <p className="text-sm font-bold text-primary">Volunteer is 2.1 km away</p>
              <p className="text-xs text-gray-400">ETA 14 min &nbsp;•&nbsp; Heading to Asha Trust</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Live tracking active</span>
              </div>
            </motion.div>

            {/* Volunteer card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4 mb-5"
            >
              <div className="w-12 h-12 rounded-full bg-primary-50 border-2 border-primary/20 flex items-center justify-center text-2xl">🧑</div>
              <div className="flex-1">
                <p className="font-bold text-gray-800">Ravi Kumar</p>
                <p className="text-xs text-gray-400">⭐ 4.8 • 87 deliveries • 🛵 En Route</p>
              </div>
              <div className="text-right">
                <Badge variant="blue">In Transit</Badge>
                <p className="text-xs text-gray-400 mt-1">Collected at 9:14 PM</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3"
            >
              <button
                onClick={() => navigate('/pickup-drop')}
                className="flex-1 bg-primary text-white py-3 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                📍 Track Live
              </button>
              <button className="border border-primary text-primary px-5 py-3 rounded-xl text-sm font-semibold hover:bg-primary-50 transition-colors">
                📞 Call Ravi
              </button>
              <button
                onClick={() => navigate('/messages')}
                className="border border-gray-200 text-gray-600 px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                💬 Chat
              </button>
            </motion.div>

            {/* CTA when delivered */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 bg-primary-50 border border-primary/20 rounded-xl p-4 text-center"
            >
              <p className="text-sm text-gray-600">Once delivered, you can rate the volunteer and view impact.</p>
              <button
                onClick={() => navigate('/food-delivered')}
                className="mt-2 text-sm text-primary font-semibold hover:underline"
              >
                Skip to Delivery Confirmation →
              </button>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
