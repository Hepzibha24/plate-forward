import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts'
import DashboardLayout from '../components/DashboardLayout'
import StatCard from '../components/StatCard'
import Badge from '../components/Badge'
import PageTransition from '../components/PageTransition'

const monthlyData = [
  { month: 'Jan', kg: 180 }, { month: 'Feb', kg: 260 }, { month: 'Mar', kg: 310 },
  { month: 'Apr', kg: 215 }, { month: 'May', kg: 380 }, { month: 'Jun', kg: 430 },
  { month: 'Jul', kg: 390 }, { month: 'Aug', kg: 460 }, { month: 'Sep', kg: 415 },
]

const pieData = [
  { name: 'Cooked Meal', value: 62, color: '#2C7A4B' },
  { name: 'Baked Goods', value: 22, color: '#5DBE7A' },
  { name: 'Raw Produce', value: 11, color: '#A8D8B8' },
  { name: 'Beverages', value: 5, color: '#D4EDDA' },
]

const deliveryTrend = [
  { month: 'Jan', rate: 94 }, { month: 'Feb', rate: 96 }, { month: 'Mar', rate: 97 },
  { month: 'Apr', rate: 95 }, { month: 'May', rate: 98 }, { month: 'Jun', rate: 98.3 },
]

const transactions = [
  { date: '17 Jun', food: 'Chicken Biryani', donor: 'Grand Hotel', ngo: 'Asha Trust', qty: '15 kg', status: 'Delivered', variant: 'green' },
  { date: '16 Jun', food: 'Bread Rolls', donor: 'Bakehouse', ngo: 'Sunrise Home', qty: '50 pcs', status: 'Delivered', variant: 'green' },
  { date: '16 Jun', food: 'Veg Dal', donor: 'Curry Pot', ngo: 'Care India', qty: '8 kg', status: 'In Transit', variant: 'blue' },
  { date: '15 Jun', food: 'Paneer', donor: 'Grand Hotel', ngo: 'Hope NGO', qty: '5 kg', status: 'Delivered', variant: 'green' },
  { date: '15 Jun', food: 'Lemon Rice', donor: 'Saffron Kitchen', ngo: 'Asha Trust', qty: '20 kg', status: 'Delivered', variant: 'green' },
]

const navItems = ['📊 Overview', '🍽️ Food Analysis', '🤝 NGO Reach', '🚴 Volunteers', '🌱 Environment']

export default function ReportAnalysis() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="h-[calc(100vh-56px)] flex">
          {/* Sidebar */}
          <div className="w-44 bg-white border-r border-gray-200 flex-shrink-0 pt-3">
            {navItems.map((item, i) => (
              <button key={i}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${i === 0 ? 'bg-primary-50 text-primary font-semibold border-r-2 border-primary' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Main */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Filter row */}
            <div className="flex gap-3 items-center mb-5 flex-wrap">
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-gray-50">
                {['Last 30 days', 'Last 90 days', 'This Year', 'All Time'].map(o => <option key={o}>{o}</option>)}
              </select>
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-gray-50">
                {['All Donors', 'The Grand Hotel', 'Bakehouse', 'Curry Pot'].map(o => <option key={o}>{o}</option>)}
              </select>
              <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">Apply</button>
              <div className="ml-auto flex gap-2">
                <button className="border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">📥 Export CSV</button>
                <button className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors">📊 Full Report</button>
              </div>
            </div>

            {/* Top stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              <StatCard value="142" label="Total Donations" delay={0} />
              <StatCard value="118" label="Claims Made" delay={0.05} />
              <StatCard value="2,840 kg" label="Food Rescued" delay={0.1} />
              <StatCard value="98.3%" label="Delivery Rate" delay={0.15} />
            </div>

            {/* Charts row */}
            <div className="grid md:grid-cols-2 gap-5 mb-5">
              {/* Bar chart */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl p-5"
              >
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Monthly Food Rescued (kg)</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={monthlyData} barCategoryGap="30%">
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                      cursor={{ fill: 'rgba(44,122,75,0.06)' }}
                    />
                    <Bar dataKey="kg" fill="#2C7A4B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Pie chart */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white border border-gray-200 rounded-2xl p-5"
              >
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Food Category Breakdown</p>
                <div className="flex items-center gap-4">
                  <ResponsiveContainer width={160} height={160}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" stroke="none">
                        {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={v => `${v}%`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 flex-1">
                    {pieData.map(d => (
                      <div key={d.name} className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                        <span className="text-gray-600 flex-1">{d.name}</span>
                        <span className="font-bold text-gray-800">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Delivery rate line chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 mb-5"
            >
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Delivery Rate Trend (%)</p>
              <ResponsiveContainer width="100%" height={140}>
                <LineChart data={deliveryTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[90, 100]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} formatter={v => `${v}%`} />
                  <Line type="monotone" dataKey="rate" stroke="#2C7A4B" strokeWidth={2.5} dot={{ fill: '#2C7A4B', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Transactions table */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-4 border-b border-gray-100">
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Recent Transactions</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      {['Date', 'Food', 'Donor', 'NGO', 'Qty', 'Status'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((t, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-500 text-xs">{t.date}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{t.food}</td>
                        <td className="px-4 py-3 text-gray-500">{t.donor}</td>
                        <td className="px-4 py-3 text-gray-500">{t.ngo}</td>
                        <td className="px-4 py-3 text-gray-500">{t.qty}</td>
                        <td className="px-4 py-3"><Badge variant={t.variant}>{t.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
