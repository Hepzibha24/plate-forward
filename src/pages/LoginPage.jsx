import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left panel */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex w-5/12 bg-gradient-to-br from-primary-dark to-primary flex-col items-center justify-center px-12 text-white text-center relative overflow-hidden"
        >
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 border border-white/5 rounded-full rotating-ring" />
            <div className="absolute w-56 h-56 border border-white/8 rounded-full" style={{ animation: 'spinRing 18s linear infinite reverse' }} />
            <div className="absolute w-36 h-36 border border-white/10 rounded-full rotating-ring" style={{ animationDuration: '6s' }} />
          </div>

          <div className="relative z-10">
            <div className="text-6xl mb-6 animate-float">🍽️</div>
            <h2 className="text-3xl font-black mb-3">Welcome Back</h2>
            <p className="text-white/70 leading-relaxed text-lg">
              Your actions feed people<br />and fight food waste.
            </p>
            <div className="w-20 border-t border-white/20 mx-auto my-6" />
            <p className="text-white/50 text-sm">12,480 meals rescued and counting...</p>
            <div className="mt-8 grid grid-cols-2 gap-3 text-center">
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-2xl font-black">340+</div>
                <div className="text-xs text-white/60 mt-0.5">Donors</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-2xl font-black">85</div>
                <div className="text-xs text-white/60 mt-0.5">NGO Partners</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right panel */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col justify-center px-10 py-12 bg-white"
        >
          <div className="max-w-sm mx-auto w-full">
            <div className="mb-2">
              <button onClick={() => navigate('/')} className="font-extrabold text-2xl text-primary mb-6 block">🍽️ FoodRescue</button>
              <h1 className="text-3xl font-black text-primary-dark">Sign In</h1>
              <p className="text-gray-500 mt-1">Enter your credentials to continue</p>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gray-50 transition-all"
                  placeholder="you@organization.com"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <button className="text-xs text-primary hover:underline">Forgot Password?</button>
                </div>
                <input
                  type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-gray-50 transition-all"
                  placeholder="••••••••"
                />
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold text-base hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl"
              >
                Login →
              </button>

              <div className="relative flex items-center gap-3 my-2">
                <div className="flex-1 border-t border-gray-200" />
                <span className="text-xs text-gray-400">or continue with</span>
                <div className="flex-1 border-t border-gray-200" />
              </div>

              <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <span>🔐</span> Login with Google
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{' '}
                <button onClick={() => navigate('/register')} className="text-primary font-semibold hover:underline">
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
