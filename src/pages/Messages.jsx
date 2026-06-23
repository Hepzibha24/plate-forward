import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardLayout from '../components/DashboardLayout'
import PageTransition from '../components/PageTransition'

const conversations = [
  { id: 1, name: 'Asha Trust', preview: 'Re: Chicken Biryani pickup tonight', time: '9:15 PM', unread: 2, online: true, avatar: '🤝' },
  { id: 2, name: 'Ravi Kumar (Volunteer)', preview: 'On my way to pickup', time: '8:50 PM', unread: 0, online: true, avatar: '🚴' },
  { id: 3, name: 'Sunrise Home', preview: "Can we claim Friday's batch?", time: 'Yesterday', unread: 0, online: false, avatar: '🏡' },
  { id: 4, name: 'FoodRescue Support', preview: 'Welcome to FoodRescue! 👋', time: 'Mon', unread: 0, online: false, avatar: '🍽️' },
]

const initialMessages = [
  { id: 1, from: 'them', text: "Hi! We saw your Chicken Biryani listing. We'd like to claim it for tonight.", time: '8:32 PM' },
  { id: 2, from: 'me', text: 'Hello! Yes, it\'s available. Please go ahead and submit the claim through the portal.', time: '8:35 PM' },
  { id: 3, from: 'them', text: 'Done! Claim submitted. Should we bring our own containers?', time: '8:38 PM' },
  { id: 4, from: 'me', text: 'Yes please bring containers. Biryani and raita packed separately. Volunteer Ravi will be there by 9 PM.', time: '8:41 PM' },
  { id: 5, from: 'them', text: 'Perfect, thank you so much! 🙏', time: '9:15 PM' },
]

export default function Messages() {
  const [activeChat, setActiveChat] = useState(1)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(m => [...m, {
      id: Date.now(), from: 'me', text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
  }

  const active = conversations.find(c => c.id === activeChat)

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="h-[calc(100vh-56px)] flex">
          {/* Conversation list */}
          <div className="w-64 border-r border-gray-200 bg-white flex flex-col flex-shrink-0">
            <div className="p-3 border-b border-gray-100">
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary bg-gray-50"
                placeholder="🔍 Search chats..."
              />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 py-2">Conversations</p>
            <div className="flex-1 overflow-y-auto">
              {conversations
                .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
                .map(c => (
                  <button
                    key={c.id}
                    onClick={() => setActiveChat(c.id)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${activeChat === c.id ? 'bg-primary-50' : ''}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg">{c.avatar}</div>
                        {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <p className="font-semibold text-sm text-gray-800 truncate">{c.name}</p>
                          {c.unread > 0 && (
                            <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-1">{c.unread}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 truncate mt-0.5">{c.preview}</p>
                        <p className="text-xs text-gray-300 mt-0.5">{c.time}</p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Chat window */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat header */}
            <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-3 bg-gray-50">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center text-xl">{active?.avatar}</div>
                {active?.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{active?.name}</p>
                <p className="text-xs text-green-500 font-medium">● Online</p>
              </div>
              <div className="ml-auto flex gap-3 text-lg">
                <button className="hover:text-primary transition-colors cursor-pointer">📞</button>
                <button className="hover:text-primary transition-colors cursor-pointer">ℹ️</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
              <AnimatePresence initial={false}>
                {messages.map(m => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[65%] ${m.from === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        m.from === 'me'
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                      }`}>
                        {m.text}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 px-1">{m.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center gap-2">
              <button className="text-gray-400 hover:text-primary text-xl flex-shrink-0 transition-colors">📎</button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary bg-gray-50 transition-colors"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send ↑
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PageTransition>
  )
}
