import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import PageTransition from '../components/PageTransition'

export default function FoodDelivered() {
  const navigate = useNavigate()
  const [rating, setRating] = useState(4)
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)

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
              className="text-center mb-6"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-7xl mb-4 inline-block"
              >
                🏠
              </motion.div>
              <h1 className="text-3xl font-black text-primary mb-2">Food Successfully Delivered!</h1>
              <p className="text-gray-500">Chicken Biryani (15 kg) reached Asha Trust at 9:27 PM</p>
            </motion.div>

            {/* Delivery summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 mb-5 shadow-sm"
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Delivery Summary</p>
              <div className="space-y-2.5 text-sm">
                {[
                  ['🍛', 'Food', 'Chicken Biryani — 15 kg'],
                  ['🏪', 'Donor', 'The Grand Hotel'],
                  ['🤝', 'Recipient', 'Asha Trust'],
                  ['🚴', 'Volunteer', 'Ravi Kumar'],
                  ['🕐', 'Delivered', '9:27 PM'],
                  ['👥', 'Est. meals', '~60 people fed'],
                ].map(([icon, label, value]) => (
                  <div key={label} className="flex items-center gap-2">
                    <span>{icon}</span>
                    <span className="text-gray-400">{label}:</span>
                    <span className="font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Rating */}
            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="bg-white border border-gray-200 rounded-2xl p-5 mb-5 shadow-sm"
              >
                <h3 className="font-bold text-gray-800 mb-3">Rate the Volunteer</h3>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setRating(s)} className="text-4xl transition-transform hover:scale-110">
                      {s <= rating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
                <textarea
                  value={review} onChange={e => setReview(e.target.value)} rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50 resize-none mb-3"
                  placeholder="Leave a note for Ravi..."
                />
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
                >
                  Submit Rating
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-primary-50 border border-primary/20 rounded-2xl p-4 mb-5 text-center"
              >
                <div className="text-3xl mb-2">🙏</div>
                <p className="font-bold text-primary">Rating Submitted!</p>
                <p className="text-sm text-gray-500 mt-1">Thank you for your feedback</p>
              </motion.div>
            )}

            {/* Impact teaser */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-4 text-white text-center mb-4"
            >
              <p className="text-white/70 text-xs mb-1">Today's Impact</p>
              <p className="text-2xl font-black">~60 people fed 🌱</p>
              <p className="text-white/60 text-xs mt-1">15 kg rescued • 0.03T CO₂ offset</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3"
            >
              <button
                onClick={() => navigate('/impact')}
                className="flex-1 border border-primary text-primary py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-50 transition-colors"
              >
                📊 View Impact
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
              >
                ← Dashboard
              </button>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
