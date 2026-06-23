import { motion } from 'framer-motion'

export default function StatCard({ value, label, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-xl border border-gray-200 p-4 text-center hover-lift"
    >
      {icon && <div className="text-2xl mb-1">{icon}</div>}
      <div className="text-2xl font-black text-primary leading-tight">{value}</div>
      <div className="text-xs text-gray-500 mt-1 font-medium">{label}</div>
    </motion.div>
  )
}
