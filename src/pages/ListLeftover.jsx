import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import PageTransition from '../components/PageTransition'

export default function ListLeftover() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: 'Chicken Biryani', category: 'Cooked Meal', qty: '15', unit: 'kg',
    from: '21:00', to: '23:00', notes: '', veg: true, nonVeg: false, vegan: false
  })
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const toggleCheck = k => setForm(f => ({ ...f, [k]: !f[k] }))

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <button onClick={() => navigate('/dashboard')} className="text-sm text-gray-400 hover:text-primary transition-colors">← Back to Dashboard</button>
          </div>
          <div className="grid md:grid-cols-[1fr_260px] gap-6">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-gray-200 p-6"
            >
              <h1 className="text-xl font-black text-primary-dark mb-1">📋 List Your Leftover Food</h1>
              <p className="text-sm text-gray-500 mb-6">Fill in details so NGOs can find and claim your donation</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Food Name *</label>
                  <input name="name" value={form.name} onChange={handle}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                    placeholder="e.g. Chicken Biryani" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                  <select name="category" value={form.category} onChange={handle}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50">
                    {['Cooked Meal', 'Packaged Food', 'Baked Goods', 'Beverages', 'Raw Produce'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity *</label>
                  <input name="qty" value={form.qty} onChange={handle} type="number"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                    placeholder="e.g. 15" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit *</label>
                  <select name="unit" value={form.unit} onChange={handle}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50">
                    {['kg', 'litres', 'portions', 'pieces', 'boxes'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Available From *</label>
                  <input name="from" value={form.from} onChange={handle} type="time"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Deadline *</label>
                  <input name="to" value={form.to} onChange={handle} type="time"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Info</label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { key: 'veg', label: 'Vegetarian' }, { key: 'nonVeg', label: 'Non-Vegetarian' },
                    { key: 'vegan', label: 'Vegan' }, { key: 'glutenFree', label: 'Gluten-Free' }
                  ].map(d => (
                    <label key={d.key} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="checkbox" checked={!!form[d.key]} onChange={() => toggleCheck(d.key)}
                        className="accent-primary w-4 h-4" />
                      {d.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Address</label>
                <input className="w-full border border-green-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-green-50"
                  defaultValue="12, Anna Salai, Chennai - 600002 (auto-filled)" readOnly />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes</label>
                <textarea name="notes" value={form.notes} onChange={handle} rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50 resize-none"
                  placeholder="e.g. 'Freshly made, no preservatives. Carry containers.'" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload Food Photo</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl h-20 flex items-center justify-center text-sm text-gray-400 cursor-pointer hover:border-primary hover:bg-primary-50 transition-colors">
                  📷 Click to upload or drag photo here
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Save as Draft
                </button>
                <button
                  onClick={() => navigate('/food-published')}
                  className="flex-1 bg-primary text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  🚀 Publish Listing
                </button>
              </div>
            </motion.div>

            {/* Live Preview */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Live Preview</p>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="h-32 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center text-5xl">
                  🍛
                </div>
                <div className="p-4">
                  <p className="font-bold text-gray-800 mb-2">{form.name || 'Food Name'}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="bg-primary-50 text-primary text-xs px-2.5 py-1 rounded-full font-medium">{form.category}</span>
                    {form.veg && <span className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">Veg</span>}
                    {form.nonVeg && <span className="bg-red-50 text-red-700 text-xs px-2.5 py-1 rounded-full font-medium">Non-Veg</span>}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">📦 {form.qty} {form.unit}</p>
                  <p className="text-xs text-gray-500 mb-1">🕐 Pickup by {form.to}</p>
                  <p className="text-xs text-gray-500 mb-4">📍 The Grand Hotel, Chennai</p>
                  <button className="w-full bg-primary text-white text-xs font-semibold py-2 rounded-lg">
                    Claim Food
                  </button>
                </div>
              </div>
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-800">
                💡 This is how NGOs will see your listing
              </div>

              {/* Tips */}
              <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-600 mb-2">Tips for better claims</p>
                <ul className="text-xs text-gray-500 space-y-1.5">
                  <li>✅ Add a clear photo</li>
                  <li>✅ Mention container requirements</li>
                  <li>✅ Set accurate pickup window</li>
                  <li>✅ List allergens if any</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
