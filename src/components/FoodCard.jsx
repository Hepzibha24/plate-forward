import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Badge from './Badge'

export default function FoodCard({ emoji, name, quantity, location, pickup, category, isHot, delay = 0 }) {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="food-card-hover rounded-xl overflow-hidden bg-white cursor-pointer"
      onClick={() => navigate('/food-details')}
    >
      <div className="h-28 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-5xl relative">
        {emoji}
        {isHot && (
          <span className="absolute top-2 right-2 bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">
            🔥 Hot
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="font-bold text-sm text-gray-800 mb-1">{name}</div>
        {category && <Badge variant="green" className="mb-2 text-xs">{category}</Badge>}
        <div className="text-xs text-gray-500 mb-0.5">📦 {quantity} &nbsp;•&nbsp; 📍 {location}</div>
        <div className="text-xs text-gray-500 mb-3">🕐 Pickup by {pickup}</div>
        <button
          className="w-full bg-primary text-white text-xs font-semibold py-2 rounded-lg hover:bg-primary-dark transition-colors"
          onClick={(e) => { e.stopPropagation(); navigate('/food-details') }}
        >
          View &amp; Claim →
        </button>
      </div>
    </motion.div>
  )
}
