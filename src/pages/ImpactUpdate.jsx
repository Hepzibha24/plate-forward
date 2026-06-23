import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import PageTransition from '../components/PageTransition'

const bigStats = [
  { num: '7,200', label: 'People Fed', icon: '👥' },
  { num: '2,840 kg', label: 'Food Rescued', icon: '🍽️' },
  { num: '142', label: 'Donations Made', icon: '📦' },
  { num: '5.4 T', label: 'CO₂ Prevented', icon: '🌱' },
]

const thisDelivery = [
  { num: '~60', label: 'People Fed' },
  { num: '15 kg', label: 'Food Saved' },
  { num: '0.03 T', label: 'CO₂ Offset' },
]

export default function ImpactUpdate() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <DashboardLayout>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-dark to-primary px-6 py-10 text-white text-center">
          <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Your Cumulative Impact</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black mb-1"
          >
            You've Changed 7,200 Lives 🌱
          </motion.h1>
          <p className="text-white/70">Since joining FoodRescue in January 2024</p>
          <div className="flex gap-3 justify-center mt-4">
            <button className="bg-white/20 text-white text-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm">
              Share Impact
            </button>
            <button className="bg-white text-primary text-sm px-4 py-2 rounded-full hover:bg-primary-50 transition-colors font-semibold">
              Post to Community
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Big stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {bigStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 text-center hover-lift"
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-primary">{s.num}</div>
                <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* This delivery */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary-50 border border-primary/20 rounded-2xl p-5 mb-5"
          >
            <h3 className="font-black text-primary-dark mb-4">🎯 This Delivery's Impact</h3>
            <div className="grid grid-cols-3 gap-4">
              {thisDelivery.map((s, i) => (
                <div key={s.label} className="text-center bg-white rounded-xl p-4 border border-primary/10">
                  <div className="text-2xl font-black text-primary">{s.num}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievement badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-5 mb-5"
          >
            <div className="text-5xl animate-float">🏅</div>
            <div className="flex-1">
              <h3 className="font-black text-gray-800 mb-0.5">Community Hero Badge</h3>
              <p className="text-sm text-gray-500 mb-2">Donate 8 more times to reach Platinum status</p>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>142 / 150 donations</span>
                <span>78%</span>
              </div>
            </div>
          </motion.div>

          {/* Monthly chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white border border-gray-200 rounded-2xl p-5 mb-5"
          >
            <h3 className="font-bold text-gray-700 mb-4 text-sm">Monthly People Fed</h3>
            <div className="flex items-end gap-2 h-28 border-b border-gray-200">
              {[320, 480, 540, 390, 620, 750, 680, 800, 740].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(h / 800) * 100}%` }}
                  transition={{ delay: 0.7 + i * 0.05, duration: 0.5 }}
                  className={`flex-1 rounded-t-md ${i < 6 ? 'bg-primary/30' : 'bg-primary'}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1.5">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map(m => <span key={m}>{m}</span>)}
            </div>
          </motion.div>

          {/* Environmental */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-green-900 to-green-700 rounded-2xl p-5 text-white"
          >
            <h3 className="font-black mb-3">🌍 Environmental Impact</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🌿', value: '5.4 T', label: 'CO₂ Prevented' },
                { icon: '💧', value: '8,500 L', label: 'Water Saved' },
                { icon: '🚛', value: '124 kg', label: 'Landfill Prevented' },
              ].map(e => (
                <div key={e.label} className="bg-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                  <div className="text-2xl mb-1">{e.icon}</div>
                  <div className="font-black text-lg">{e.value}</div>
                  <div className="text-white/60 text-xs mt-0.5">{e.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
