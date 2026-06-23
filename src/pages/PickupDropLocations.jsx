import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import Badge from '../components/Badge'
import PageTransition from '../components/PageTransition'

export default function PickupDropLocations() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="h-[calc(100vh-56px)] flex flex-col">
          {/* Top bar */}
          <div className="bg-white border-b border-gray-200 px-5 py-2.5 flex items-center justify-between">
            <span className="font-bold text-gray-700">Pickup &amp; Drop Locations</span>
            <Badge variant="blue">🚴 Volunteer En Route</Badge>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Map area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative flex items-center justify-center overflow-hidden"
            >
              {/* Animated route visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full opacity-20" viewBox="0 0 600 400">
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#2C7A4B" />
                    </marker>
                  </defs>
                  <path d="M 120 300 Q 300 100 480 200" stroke="#2C7A4B" strokeWidth="3" fill="none" strokeDasharray="10 5" markerEnd="url(#arrow)" />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <div className="text-7xl mb-4 animate-float">🗺️</div>
                <p className="text-xl font-bold text-primary mb-1">Live Map View</p>
                <p className="text-gray-500 text-sm mb-4">Pickup → Drop route displayed</p>
                <div className="flex gap-5 justify-center text-sm bg-white/80 px-6 py-2 rounded-full backdrop-blur-sm border border-green-200">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Pickup</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block" /> Volunteer</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-500 rounded-full inline-block" /> Drop</span>
                </div>
              </div>

              {/* Location pins */}
              <div className="absolute top-8 left-1/4 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                📍 Pickup: The Grand Hotel
              </div>
              <div className="absolute bottom-8 right-1/4 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                📍 Drop: Asha Trust
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg animate-pulse">
                🚴 Ravi Kumar
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="w-72 bg-white border-l border-gray-200 overflow-y-auto p-4"
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Route Details</p>

              {/* Pickup */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Pickup Point</span>
                </div>
                <p className="font-bold text-gray-800">The Grand Hotel</p>
                <p className="text-xs text-gray-500 mt-0.5">12, Anna Salai, Chennai - 600002</p>
                <p className="text-xs text-primary mt-1">🕐 Window: 9 PM – 11 PM</p>
              </div>

              <div className="text-center text-sm text-gray-400 py-1">↓ 2.4 km &nbsp;·&nbsp; ~8 min</div>

              {/* Drop */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Drop Point</span>
                </div>
                <p className="font-bold text-gray-800">Asha Trust</p>
                <p className="text-xs text-gray-500 mt-0.5">45, Poonamallee High Rd, Chennai - 600010</p>
              </div>

              {/* Volunteer */}
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Volunteer</p>
              <div className="border border-gray-200 rounded-xl p-3 flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-xl flex-shrink-0">🧑</div>
                <div>
                  <p className="font-bold text-sm text-gray-800">Ravi Kumar</p>
                  <p className="text-xs text-gray-400">⭐ 4.8 &nbsp;•&nbsp; 🛵 En Route</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-600">Live</span>
                  </div>
                </div>
              </div>

              {/* ETA */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-center">
                <p className="text-xs text-blue-500 mb-1">Estimated Arrival at Drop Point</p>
                <p className="text-2xl font-black text-blue-700">9:28 PM</p>
                <p className="text-xs text-blue-400 mt-0.5">~14 minutes remaining</p>
              </div>

              <button
                onClick={() => navigate('/food-picked-up')}
                className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-semibold mb-2 hover:bg-primary-dark transition-colors"
              >
                📞 Call Volunteer
              </button>
              <button
                onClick={() => navigate('/messages')}
                className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                💬 Chat
              </button>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
