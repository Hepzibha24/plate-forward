import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import Badge from '../components/Badge'
import PageTransition from '../components/PageTransition'

export default function ClaimFood() {
  const navigate = useNavigate()
  const [needVolunteer, setNeedVolunteer] = useState(true)
  const [qty, setQty] = useState(15)

  return (
    <PageTransition>
      <DashboardLayout role="ngo" orgName="Asha Trust">
        <div className="p-6">
          <button onClick={() => navigate('/food-details')} className="text-sm text-gray-400 hover:text-primary mb-5 flex items-center gap-1 transition-colors">
            ← Back to Food Details
          </button>

          <div className="max-w-lg mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-black text-primary-dark mb-1">🤝 Confirm Your Claim</h1>
              <p className="text-sm text-gray-500 mb-6">Review the details before confirming</p>

              {/* Food summary card */}
              <div className="bg-primary-50 border border-primary/20 rounded-xl p-4 mb-6 flex items-center gap-3">
                <span className="text-4xl">🍛</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">Chicken Biryani — 15 kg</p>
                  <p className="text-sm text-gray-500">The Grand Hotel &nbsp;•&nbsp; Pickup by 11:00 PM tonight</p>
                </div>
                <Badge variant="green">Available</Badge>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Claiming Organization (NGO)</label>
                  <input readOnly value="Asha Trust"
                    className="w-full border border-green-200 rounded-lg px-3 py-2.5 text-sm bg-green-50 text-gray-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Representative Name *</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                    placeholder="Name of person picking up" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Representative Contact *</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50"
                    placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity Needed (max: 15 kg)</label>
                  <input type="number" value={qty} onChange={e => setQty(e.target.value)} min={1} max={15}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50" />
                  <p className="text-xs text-gray-400 mt-1">You may claim a partial quantity if needed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Will you need a volunteer for pickup?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="vol" checked={needVolunteer} onChange={() => setNeedVolunteer(true)} className="accent-primary" />
                      Yes, assign a volunteer
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input type="radio" name="vol" checked={!needVolunteer} onChange={() => setNeedVolunteer(false)} className="accent-primary" />
                      We'll arrange it ourselves
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes to Donor (optional)</label>
                  <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary bg-gray-50 resize-none"
                    placeholder="e.g. 'We'll bring 3 large containers'" />
                </div>
              </div>

              {/* Warning */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mt-4 text-xs text-orange-700">
                ⚠️ By confirming, you commit to pickup within the stated window. No-shows may affect your NGO's trust score.
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => navigate('/food-details')}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate('/pickup-management')}
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                >
                  ✅ Confirm Claim
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
