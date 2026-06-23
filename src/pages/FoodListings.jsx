import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import FoodCard from '../components/FoodCard'
import PageTransition from '../components/PageTransition'

const listings = [
  { emoji: '🍛', name: 'Chicken Biryani', quantity: '15 kg', location: 'The Grand Hotel', pickup: '11:00 PM', category: 'Cooked Meal', isHot: true },
  { emoji: '🍚', name: 'Veg Pulao', quantity: '8 kg', location: 'Spice Garden', pickup: '10:00 PM', category: 'Cooked Meal' },
  { emoji: '🍞', name: 'Bread & Butter', quantity: '60 pieces', location: 'The Bakehouse', pickup: '9:30 PM', category: 'Baked Goods' },
  { emoji: '🍲', name: 'Dal Tadka', quantity: '10 kg', location: 'Curry Pot', pickup: '11:30 PM', category: 'Cooked Meal' },
  { emoji: '🥘', name: 'Mixed Curry', quantity: '12 portions', location: 'Events Palace', pickup: '10:00 PM', category: 'Cooked Meal' },
  { emoji: '🍋', name: 'Lemon Rice', quantity: '20 kg', location: 'Saffron Kitchen', pickup: '11:00 PM', category: 'Cooked Meal' },
  { emoji: '🧁', name: 'Assorted Muffins', quantity: '48 pieces', location: 'Cloud Bakery', pickup: '8:30 PM', category: 'Baked Goods' },
  { emoji: '🥗', name: 'Garden Salad', quantity: '5 kg', location: 'Green Bowl', pickup: '9:00 PM', category: 'Raw Produce' },
  { emoji: '🍜', name: 'Noodles', quantity: '8 kg', location: 'Dragon Palace', pickup: '10:30 PM', category: 'Cooked Meal' },
]

export default function FoodListings() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = listings.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'All Categories' || l.category === category)
  )

  return (
    <PageTransition>
      <DashboardLayout role="ngo" orgName="Asha Trust">
        <div>
          {/* Filter bar */}
          <div className="bg-white border-b border-gray-200 px-5 py-3 flex items-center gap-3 flex-wrap">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                className="border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-primary bg-gray-50 w-48"
                placeholder="Search food name..."
              />
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-gray-50">
              {['All Categories', 'Cooked Meal', 'Baked Goods', 'Raw Produce', 'Beverages', 'Packaged Food'].map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-gray-50">
              {['Within 5 km', 'Within 10 km', 'Any Distance'].map(o => <option key={o}>{o}</option>)}
            </select>
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary bg-gray-50">
              {['All Types', 'Vegetarian', 'Non-Veg', 'Vegan'].map(o => <option key={o}>{o}</option>)}
            </select>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-primary text-white' : 'border border-primary text-primary hover:bg-primary-50'}`}
              >
                🗺️ Map
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                ☰ List
              </button>
            </div>
          </div>

          <div className="p-5">
            <p className="text-sm text-gray-500 mb-4">
              Showing <strong className="text-gray-800">{filtered.length} listings</strong> near Asha Trust, Chennai
            </p>

            {viewMode === 'map' ? (
              <div className="grid md:grid-cols-[1fr_300px] gap-5">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl h-96 flex flex-col items-center justify-center gap-3 border border-green-200">
                  <span className="text-5xl">🗺️</span>
                  <p className="font-bold text-primary">Interactive Map View</p>
                  <p className="text-sm text-gray-500">Food listings plotted on map</p>
                  <div className="flex gap-4 text-sm mt-2">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded-full inline-block" /> Available</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-400 rounded-full inline-block" /> Claimed</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-400 rounded-full inline-block" /> In Transit</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {filtered.slice(0, 4).map((l, i) => (
                    <div key={i} onClick={() => navigate('/food-details')} className="bg-white border border-gray-200 rounded-xl p-3 flex gap-3 cursor-pointer hover:border-primary transition-colors">
                      <span className="text-3xl">{l.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{l.name}</p>
                        <p className="text-xs text-gray-400">{l.quantity} • {l.location}</p>
                        <p className="text-xs text-gray-400">By {l.pickup}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filtered.map((l, i) => (
                  <FoodCard key={i} {...l} delay={i * 0.05} />
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-3 text-center py-16 text-gray-400">
                    <div className="text-5xl mb-3">🔍</div>
                    <p>No listings match your search</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
