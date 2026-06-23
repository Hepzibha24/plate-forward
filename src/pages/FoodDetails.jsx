import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import Badge from '../components/Badge'
import PageTransition from '../components/PageTransition'

export default function FoodDetails() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <DashboardLayout role="ngo" orgName="Asha Trust">
        <div>
          <div className="px-5 py-3 border-b border-gray-100 bg-white">
            <button onClick={() => navigate('/food-listings')} className="text-sm text-gray-400 hover:text-primary transition-colors">
              ← Back to Listings
            </button>
          </div>

          <div className="grid md:grid-cols-[1fr_280px]">
            {/* Left */}
            <div className="p-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl h-48 flex items-center justify-center text-7xl mb-5 border border-orange-100">
                  🍛
                </div>
                <h1 className="text-3xl font-black text-gray-800 mb-3">Chicken Biryani</h1>
                <div className="flex flex-wrap gap-2 mb-5">
                  <Badge variant="orange">⏳ Available</Badge>
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">Cooked Meal</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">Non-Vegetarian</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { label: 'QUANTITY', value: '15 kg', big: true },
                    { label: 'SERVES APPROX.', value: '~60 people', big: true },
                    { label: 'PICKUP WINDOW', value: '9:00 PM – 11:00 PM' },
                    { label: 'POSTED', value: '2 hours ago' },
                  ].map(m => (
                    <div key={m.label} className="bg-white border border-gray-200 rounded-xl p-4">
                      <p className="text-xs text-gray-400 font-bold tracking-wider uppercase mb-1">{m.label}</p>
                      <p className={`font-black ${m.big ? 'text-xl text-primary' : 'text-base text-gray-700'}`}>{m.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
                  <p className="font-bold text-gray-700 mb-2 text-sm">Notes from Donor</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Freshly prepared biryani with raita. Please bring your own containers. Rice and gravy packed separately. No preservatives added. Best consumed within 3 hours of pickup.
                  </p>
                </div>

                {/* Dietary tags */}
                <div className="flex flex-wrap gap-2">
                  {['🌶️ Spicy', '🥩 Non-Veg', '🚫 No Preservatives', '🌾 Contains Gluten'].map(t => (
                    <span key={t} className="bg-gray-50 text-gray-600 text-xs px-3 py-1.5 rounded-full border border-gray-200">{t}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-gray-50 border-l border-gray-200 p-5"
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Posted By</p>
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                <div className="flex gap-3 items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary-50 border border-primary/20 flex items-center justify-center text-xl">
                    🏪
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">The Grand Hotel</p>
                    <p className="text-xs text-gray-400">⭐ 4.9 &nbsp;•&nbsp; 142 donations</p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 space-y-1.5">
                  <p>📍 12, Anna Salai, Chennai</p>
                  <p>📞 +91 98765 43210</p>
                  <p>🕐 Pickup: 9 PM – 11 PM daily</p>
                </div>
              </div>

              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Pickup Location</p>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl h-36 flex flex-col items-center justify-center gap-2 border border-green-200 mb-4">
                <span className="text-4xl">🗺️</span>
                <p className="text-sm font-bold text-primary">Anna Salai, Chennai</p>
                <p className="text-xs text-gray-400">2.4 km from you • ~8 min drive</p>
              </div>

              <button
                onClick={() => navigate('/claim-food')}
                className="w-full bg-primary text-white py-3 rounded-xl font-semibold mb-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
              >
                🤝 Claim This Food
              </button>
              <button
                onClick={() => navigate('/messages')}
                className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                💬 Message Donor
              </button>

              {/* Urgency indicator */}
              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-3">
                <p className="text-xs font-bold text-orange-700 mb-1">⏰ Act Fast!</p>
                <p className="text-xs text-orange-600">1 other NGO is viewing this listing</p>
                <div className="mt-2 h-1.5 bg-orange-100 rounded-full">
                  <div className="h-1.5 bg-orange-400 rounded-full w-[65%]" />
                </div>
                <p className="text-xs text-orange-400 mt-1">65% pickup window elapsed</p>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
