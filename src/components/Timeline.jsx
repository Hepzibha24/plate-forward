import { motion } from 'framer-motion'

export default function Timeline({ steps }) {
  return (
    <div className="pl-2 space-y-0">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`relative pl-6 pb-5 border-l-2 last:pb-0 ${
            step.done ? 'border-primary' : 'border-gray-200'
          }`}
        >
          <div
            className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 ${
              step.done
                ? 'bg-primary border-primary'
                : step.current
                ? 'bg-white border-primary'
                : 'bg-gray-200 border-gray-300'
            }`}
          />
          {step.current && (
            <div className="absolute -left-[9px] top-[-3px] w-[18px] h-[18px] rounded-full border-2 border-primary opacity-40 animate-ping" />
          )}
          <div className={`text-sm font-semibold ${step.current ? 'text-primary' : step.done ? 'text-gray-700' : 'text-gray-400'}`}>
            {step.label}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">{step.time}</div>
        </motion.div>
      ))}
    </div>
  )
}
