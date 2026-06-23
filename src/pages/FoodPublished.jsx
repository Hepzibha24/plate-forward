import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import Badge from '../components/Badge'
import PageTransition from '../components/PageTransition'

export default function FoodPublished() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-56px)] p-6">
          <div className="max-w-md w-full">
            {/* Success animation */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-50 rounded-full mb-5">
                <span className="text-5xl">🎉</span>
              </div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h1 className="text-3xl font-black text-primary mb-2">Your Food Has Been Listed!</h1>
                <p className="text-gray-500 mb-6">NGOs in your area can now see and claim your donation.</p>
              </motion.div>
            </motion.div>

            {/* Listing card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm"
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Listing Details</p>
              <h3 className="text-xl font-black text-gray-800 mb-4">🍛 Chicken Biryani</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📋 Listing ID:</span>
                  <span className="font-bold">#FR-2025-0847</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📦 Quantity:</span>
                  <span className="font-bold">15 kg</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">🕐 Pickup window:</span>
                  <span className="font-bold">9:00 PM – 11:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📍 Location:</span>
                  <span className="font-bold">The Grand Hotel, Chennai</span>
                </div>
              </div>
              <div className="border-t border-gray-100 mt-4 pt-4 flex items-center gap-3">
                <Badge variant="orange">⏳ Awaiting Claim</Badge>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
                  Notifying 12 NGOs nearby...
                </span>
              </div>
            </motion.div>

            {/* Progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-primary-50 rounded-xl p-4 mb-6"
            >
              <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                <span>Listed</span>
                <span>Claimed</span>
                <span>In Transit</span>
                <span>Delivered</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary rounded-full w-[10%] progress-fill" />
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3"
            >
              <button
                onClick={() => navigate('/food-listings')}
                className="flex-1 border border-primary text-primary py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-50 transition-colors"
              >
                👁️ View Listing
              </button>
              <button
                onClick={() => navigate('/list-food')}
                className="flex-1 bg-primary text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                + List Another
              </button>
            </motion.div>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
