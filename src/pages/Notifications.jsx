import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleCanvas from '../components/ParticleCanvas'
import PageTransition from '../components/PageTransition'

const notifData = [
  {
    id: 1, icon: '✅', title: 'Claim Confirmed', tag: 'Claims', unread: true,
    desc: 'Asha Trust confirmed claim for Chicken Biryani (15 kg)', time: '9:15 PM',
  },
  {
    id: 2, icon: '🚴', title: 'Volunteer Assigned', tag: 'Pickups', unread: true,
    desc: 'Ravi Kumar has been assigned to your pickup — ETA 12 min', time: '9:00 PM',
  },
  {
    id: 3, icon: '📦', title: 'Food Picked Up', tag: 'Pickups', unread: true,
    desc: 'Ravi Kumar collected the food from your location at 9:14 PM', time: '9:14 PM',
  },
  {
    id: 4, icon: '🏠', title: 'Delivery Completed', tag: 'Deliveries', unread: false,
    desc: 'Chicken Biryani delivered to Asha Trust successfully at 9:27 PM', time: '9:27 PM',
  },
  {
    id: 5, icon: '🆕', title: 'New Claim Request', tag: 'Claims', unread: false,
    desc: "Sunrise Home wants to claim your Bread Rolls listing", time: '8:30 PM', group: 'Yesterday',
  },
  {
    id: 6, icon: '⭐', title: 'New Rating Received', tag: 'System', unread: false,
    desc: 'Ravi Kumar rated your food listing ⭐⭐⭐⭐⭐', time: '6:00 PM', group: 'Yesterday',
  },
  {
    id: 7, icon: '🏠', title: 'Delivery Completed', tag: 'Deliveries', unread: false,
    desc: 'Bread Rolls delivered to Sunrise Home successfully', time: '5:00 PM', group: 'Yesterday',
  },
  {
    id: 8, icon: '🔔', title: 'Listing Expiring Soon', tag: 'System', unread: false,
    desc: 'Your Paneer listing expires in 1 hour — no claims yet. Consider re-listing.', time: '2:00 PM', group: 'Yesterday',
  },
]

const tabs = ['All (8)', 'Claims (3)', 'Pickups (2)', 'Deliveries (2)', 'System (1)']

function SpotlightCard({ children, unread }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mouse-x', `${x}%`)
    card.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} className="spotlight-card">
      {children}
    </div>
  )
}

export default function Notifications() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All (8)')
  const [notifs, setNotifs] = useState(notifData)
  const [markAllRead, setMarkAllRead] = useState(false)

  const unreadCount = notifs.filter(n => n.unread).length

  const handleMarkAll = () => {
    setNotifs(n => n.map(item => ({ ...item, unread: false })))
    setMarkAllRead(true)
  }

  const tagColors = {
    Claims: 'text-green-400 bg-green-400/10',
    Pickups: 'text-blue-400 bg-blue-400/10',
    Deliveries: 'text-purple-400 bg-purple-400/10',
    System: 'text-yellow-400 bg-yellow-400/10',
  }

  const todayNotifs = notifs.filter(n => !n.group)
  const yesterdayNotifs = notifs.filter(n => n.group === 'Yesterday')

  return (
    <PageTransition>
      <div className="min-h-screen aurora-bg relative overflow-hidden">
        {/* Particle canvas */}
        <ParticleCanvas />

        {/* Rotating decorative rings */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-green-500/5 rounded-full rotating-ring" />
          <div className="absolute bottom-1/3 left-1/3 w-96 h-96 border border-green-400/4 rounded-full" style={{ animation: 'spinRing 20s linear infinite reverse' }} />
          {/* Glow orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="dark-glass border-b border-green-500/10 px-5 py-3.5 flex items-center justify-between sticky top-0 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-green-400/60 hover:text-green-400 transition-colors text-sm"
              >
                ←
              </button>
              <span className="font-bold text-lg text-primary-light">🍽️ FoodRescue</span>
              <span className="text-green-400/40 text-sm">/ Notifications</span>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && !markAllRead && (
                <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-semibold border border-green-500/20">
                  {unreadCount} unread
                </span>
              )}
              <button
                onClick={handleMarkAll}
                className="text-xs text-green-400/70 hover:text-green-400 border border-green-500/20 hover:border-green-500/50 px-3 py-1.5 rounded-full transition-all"
              >
                Mark All Read
              </button>
              <button className="text-xs text-green-400/70 hover:text-green-400 border border-green-500/20 hover:border-green-500/50 px-3 py-1.5 rounded-full transition-all">
                ⚙️ Settings
              </button>
            </div>
          </header>

          {/* Tabs */}
          <div className="flex border-b border-green-500/10 px-5 backdrop-blur-sm dark-glass">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium transition-all relative ${
                  activeTab === tab
                    ? 'text-green-400 border-b-2 border-green-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Notifications list */}
          <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-5 space-y-6">
            {/* Today */}
            <div>
              <p className="text-xs font-bold tracking-widest text-green-500/50 uppercase mb-3 px-1">Today</p>
              <div className="space-y-2">
                <AnimatePresence>
                  {todayNotifs.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 40, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 25 }}
                    >
                      <SpotlightCard unread={n.unread}>
                        <div className={`rounded-xl border transition-all cursor-pointer ${
                          n.unread
                            ? 'border-green-500/30 bg-green-900/20 glow-pulse'
                            : 'border-green-500/8 bg-white/3 hover:bg-white/5'
                        }`}>
                          <div className="flex items-start gap-4 p-4">
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                              n.unread ? 'bg-green-500/20 ring-1 ring-green-500/40' : 'bg-white/5'
                            }`}>
                              {n.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2 mb-1">
                                <p className={`text-sm font-bold ${n.unread ? 'text-white' : 'text-gray-300'}`}>
                                  {n.title}
                                </p>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[n.tag]}`}>
                                  {n.tag}
                                </span>
                              </div>
                              <p className={`text-xs leading-relaxed ${n.unread ? 'text-gray-300' : 'text-gray-500'}`}>
                                {n.desc}
                              </p>
                              <p className="text-xs text-gray-600 mt-1.5">{n.time}</p>
                            </div>

                            {/* Unread indicator */}
                            {n.unread && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2.5 h-2.5 bg-green-400 rounded-full flex-shrink-0 mt-1 shadow-lg shadow-green-400/50 animate-pulse"
                              />
                            )}
                          </div>

                          {/* Bottom action bar for unread */}
                          {n.unread && (
                            <div className="border-t border-green-500/10 px-4 py-2 flex gap-3">
                              <button className="text-xs text-green-400 hover:text-green-300 transition-colors font-medium">
                                View →
                              </button>
                              <button
                                onClick={() => setNotifs(prev => prev.map(item => item.id === n.id ? { ...item, unread: false } : item))}
                                className="text-xs text-gray-500 hover:text-gray-300 transition-colors ml-auto"
                              >
                                Dismiss
                              </button>
                            </div>
                          )}
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Yesterday */}
            <div>
              <p className="text-xs font-bold tracking-widest text-green-500/50 uppercase mb-3 px-1">Yesterday</p>
              <div className="space-y-2">
                {yesterdayNotifs.map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  >
                    <SpotlightCard unread={false}>
                      <div className="rounded-xl border border-green-500/8 bg-white/3 hover:bg-white/5 transition-all cursor-pointer">
                        <div className="flex items-start gap-4 p-4">
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl flex-shrink-0 text-gray-400">
                            {n.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 mb-1">
                              <p className="text-sm font-medium text-gray-400">{n.title}</p>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium opacity-60 ${tagColors[n.tag]}`}>{n.tag}</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{n.desc}</p>
                            <p className="text-xs text-gray-700 mt-1.5">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom spacer with scan line effect */}
            <div className="scan-line h-px bg-green-500/10 rounded-full" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center py-4"
            >
              <p className="text-xs text-gray-700">You're all caught up! 🌱</p>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-3 text-xs text-green-500/60 hover:text-green-400 transition-colors underline underline-offset-2"
              >
                Back to Dashboard
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
