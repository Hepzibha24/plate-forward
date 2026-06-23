import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import PageTransition from '../components/PageTransition'

export default function OrgProfile() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <DashboardLayout orgName="The Grand Hotel">
        <div>
          {/* Header banner */}
          <div className="bg-gradient-to-r from-primary-dark to-primary px-8 py-8 flex items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-4xl flex-shrink-0 backdrop-blur-sm"
            >
              🏪
            </motion.div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-white"
            >
              <div className="flex items-center gap-3 mb-1.5">
                <h1 className="text-2xl font-black">The Grand Hotel</h1>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm">✓ Verified</span>
              </div>
              <p className="text-white/80 text-sm mb-3">🏪 Restaurant / Hotel &nbsp;•&nbsp; 📍 Chennai, Tamil Nadu</p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-white/15 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">Member since Jan 2024</span>
                <span className="bg-white/15 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">⭐ 4.9 Rating</span>
                <span className="bg-white/15 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">🍽️ 2,840 kg donated</span>
              </div>
            </motion.div>
            <div className="ml-auto">
              <button className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-50 transition-colors">
                ✏️ Edit Profile
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard value="142" label="Total Donations" delay={0} />
              <StatCard value="2,840 kg" label="Food Donated" delay={0.05} />
              <StatCard value="7,200" label="Meals Enabled" delay={0.1} />
              <StatCard value="22" label="NGOs Served" delay={0.15} />
            </div>

            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Contact Information</p>
                <div className="space-y-2.5 text-sm text-gray-600">
                  {[
                    ['📧', 'manager@grandhotel.com'],
                    ['📞', '+91 98765 43210'],
                    ['📍', '12, Anna Salai, Chennai - 600002'],
                    ['🕐', 'Pickup available: 9 PM – 11 PM daily'],
                    ['🌐', 'www.grandhotel.com'],
                  ].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-3">
                      <span>{icon}</span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Food preferences */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-xl border border-gray-200 p-5"
              >
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Food Preferences</p>
                <p className="text-sm text-gray-500 mb-3">Usually donates:</p>
                <div className="flex flex-wrap gap-2">
                  {['🍚 Cooked Rice', '🍗 Curry', '🍞 Bread', '🥗 Salads', '🍰 Desserts', '🍜 Pasta', '🥘 Stew'].map(f => (
                    <span key={f} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium">{f}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Certificate */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border border-gray-200 p-5 mb-5"
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">FSSAI / Registration Documents</p>
              <div className="flex items-center gap-4">
                <div className="w-28 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl border border-gray-200">
                  📄
                </div>
                <div>
                  <p className="font-bold text-gray-800">FSSAI Licence No: 10020112000123</p>
                  <p className="text-sm text-gray-500 mt-1">Valid until: Dec 2026</p>
                  <Badge variant="green" className="mt-2">✓ Verified by Admin</Badge>
                </div>
              </div>
            </motion.div>

            {/* Achievement badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Achievements</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {[
                  { icon: '🏅', name: 'Hero', earned: true },
                  { icon: '⭐', name: 'Top Donor', earned: true },
                  { icon: '🌱', name: 'Eco Warrior', earned: true },
                  { icon: '🤝', name: 'Partner Pro', earned: true },
                  { icon: '🚀', name: 'Fast Lister', earned: false },
                  { icon: '👑', name: 'Platinum', earned: false },
                ].map(b => (
                  <div key={b.name} className={`text-center p-3 rounded-xl ${b.earned ? 'bg-primary-50' : 'bg-gray-50 opacity-50'}`}>
                    <div className="text-2xl mb-1">{b.icon}</div>
                    <div className="text-xs font-medium text-gray-600">{b.name}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
