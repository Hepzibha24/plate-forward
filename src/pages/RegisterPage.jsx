import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

const roles = [
  { id: 'donor', icon: '🏪', title: 'Donor', desc: 'Restaurant, Hotel or Event' },
  { id: 'ngo', icon: '🤝', title: 'NGO', desc: 'Registered charitable org' },
  { id: 'volunteer', icon: '🚴', title: 'Volunteer', desc: 'Pickup & delivery rider' },
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('donor')
  const [form, setForm] = useState({ name: '', phone: '', email: '', orgType: 'Restaurant', address: '', password: '', confirm: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Nav */}
        <header className="bg-white border-b border-gray-200 px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="font-extrabold text-lg text-primary">🍽️ FoodRescue</button>
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-primary font-semibold hover:underline">Login →</button>
          </p>
        </header>

        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-primary-dark">Create Your Account</h1>
            <p className="text-gray-500 mt-2">Choose your role to get started</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {roles.map((r, i) => (
              <motion.button
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedRole(r.id)}
                className={`p-5 rounded-xl border-2 text-center transition-all hover:-translate-y-0.5 ${
                  selectedRole === r.id
                    ? 'border-primary bg-primary-50 shadow-md shadow-primary/10'
                    : 'border-gray-200 bg-white hover:border-primary/50'
                }`}
              >
                <div className="text-4xl mb-2">{r.icon}</div>
                <div className="font-bold text-gray-800 text-sm">{r.title}</div>
                <div className="text-xs text-gray-500 mt-1">{r.desc}</div>
              </motion.button>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Organization / Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                  placeholder="e.g. The Grand Hotel" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                  placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                <input name="email" value={form.email} onChange={handleChange} type="email"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                  placeholder="you@organization.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Organization Type</label>
                <select name="orgType" value={form.orgType} onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50">
                  <option>Restaurant</option>
                  <option>Hotel</option>
                  <option>Event Organizer</option>
                  <option>NGO / Trust</option>
                  <option>Individual</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Address / Location *</label>
              <input name="address" value={form.address} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                placeholder="Full address with city, PIN code" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
                <input name="password" value={form.password} onChange={handleChange} type="password"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                  placeholder="Min 8 characters" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
                <input name="confirm" value={form.confirm} onChange={handleChange} type="password"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                  placeholder="Re-enter password" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Registration Certificate (FSSAI / Trust Reg.)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg h-16 flex items-center justify-center text-sm text-gray-400 cursor-pointer hover:border-primary hover:bg-primary-50 transition-colors">
                📎 Click to upload document
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold text-base hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 hover:shadow-xl"
            >
              Create Account →
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
