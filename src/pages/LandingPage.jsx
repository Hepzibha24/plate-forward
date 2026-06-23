import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import PageTransition from '../components/PageTransition'

function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const step = target / (duration / 16)
    let cur = 0
    const timer = setInterval(() => {
      cur = Math.min(cur + step, target)
      setCount(Math.floor(cur))
      if (cur >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return <>{count.toLocaleString()}</>
}

const stats = [
  { value: 12480, label: 'Meals Rescued', icon: '🍽️' },
  { value: 340, label: 'Active Donors', icon: '🏪' },
  { value: 85, label: 'NGO Partners', icon: '🤝' },
  { value: 520, label: 'Volunteers', icon: '🚴' },
]

const steps = [
  { icon: '📋', step: 1, title: 'Donors List Food', desc: 'Restaurants post leftover food with quantity, type & pickup window' },
  { icon: '🔔', step: 2, title: 'NGOs Claim', desc: 'Registered NGOs browse listings and claim food for beneficiaries' },
  { icon: '🚴', step: 3, title: 'Volunteer Delivers', desc: 'Assigned volunteers pick up and deliver food to the right people' },
]

const testimonials = [
  { name: 'Priya S., Asha Trust', quote: 'FoodRescue connects us with donors instantly. We feed 200+ people daily through this platform.', avatar: '👩' },
  { name: 'Ravi K., Volunteer', quote: "I've made 87 deliveries. Knowing each one feeds 60+ people keeps me motivated every day.", avatar: '🧑' },
  { name: 'The Grand Hotel', quote: "Before FoodRescue, we wasted 20 kg of food daily. Now it reaches people who truly need it.", avatar: '🏪' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="min-h-screen bg-white font-inter">
        {/* Navbar */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="text-xl font-black text-primary">🍽️ FoodRescue</span>
            <nav className="hidden md:flex items-center gap-6">
              {['How It Works', 'About', 'Impact'].map(l => (
                <button key={l} className="text-sm text-gray-600 hover:text-primary transition-colors">{l}</button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-primary border border-primary px-4 py-2 rounded-lg hover:bg-primary-50 transition-all font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-all font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#F0FAF4] via-[#E5F5EA] to-[#D8F0E0] overflow-hidden">
          {/* Animated blobs */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 blob opacity-60 pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-primary-light/10 blob opacity-40 pointer-events-none" style={{ animationDelay: '3s' }} />

          <div className="max-w-6xl mx-auto px-6 py-24 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                🌱 Fighting Food Waste, One Meal at a Time
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-primary-dark leading-tight mb-4">
                No Food Goes to Waste.<br />
                <span className="text-shimmer">Every Meal Finds a Home.</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                Connecting restaurants, hotels &amp; events with NGOs and the people who need it most.
                Making every leftover count.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <button
                onClick={() => navigate('/register')}
                className="bg-primary text-white px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                🏪 I'm a Donor (Restaurant / Hotel)
              </button>
              <button
                onClick={() => navigate('/register')}
                className="border-2 border-primary text-primary px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-primary-50 transition-all hover:-translate-y-0.5"
              >
                🤝 I'm an NGO
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-gray-100 text-gray-700 px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-gray-200 transition-all hover:-translate-y-0.5"
              >
                🚴 I'm a Volunteer
              </button>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white py-14 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-5 rounded-2xl bg-gradient-to-b from-primary-50 to-white border border-primary/10 hover-lift"
                >
                  <div className="text-3xl mb-1">{s.icon}</div>
                  <div className="text-3xl font-black text-primary">
                    <AnimatedCounter target={s.value} />
                  </div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs font-bold tracking-widest text-primary uppercase">Simple Process</span>
              <h2 className="text-4xl font-black text-gray-800 mt-2">How It Works</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white rounded-2xl p-7 text-center border border-gray-200 hover-lift relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {s.step}
                  </div>
                  <div className="text-5xl mb-4 mt-2">{s.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-widest text-primary uppercase">Community Voices</span>
              <h2 className="text-4xl font-black text-gray-800 mt-2">Stories of Impact</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-b from-primary-50 to-white border border-primary/10 rounded-2xl p-6 hover-lift"
                >
                  <div className="text-3xl mb-3">{t.avatar}</div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 italic">"{t.quote}"</p>
                  <div className="text-xs font-bold text-primary">{t.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-r from-primary-dark to-primary py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black text-white mb-4">Ready to Make a Difference?</h2>
            <p className="text-primary-50 mb-8 text-lg">Join 340+ donors, 85 NGOs, and 520 volunteers fighting food waste in your city.</p>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-primary font-bold px-8 py-3.5 rounded-xl text-lg hover:bg-primary-50 transition-all hover:-translate-y-0.5 shadow-xl"
            >
              Get Started — It's Free 🚀
            </button>
          </div>
        </section>

        {/* Partners */}
        <section className="py-12 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-center text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">Trusted Partners</p>
            <div className="flex gap-6 justify-center flex-wrap">
              {['Grand Hotel', 'Asha Trust', 'Sunrise NGO', 'City Volunteers', 'Care India'].map(p => (
                <div key={p} className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-500 font-medium hover-lift">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-primary-light font-bold text-lg">🍽️ FoodRescue</span>
            <span className="text-gray-500 text-sm">© 2025 FoodRescue. All rights reserved.</span>
            <div className="flex gap-4">
              {['Privacy', 'Terms', 'Contact'].map(l => (
                <button key={l} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
