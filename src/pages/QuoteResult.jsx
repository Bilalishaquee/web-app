import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CheckCircle2, XCircle, MessageSquare, Download, Share2,
  ChevronDown, ChevronUp, Zap, Clock, DollarSign, Info,
  Wrench, Star, Calendar, ThumbsUp, ThumbsDown, Edit3
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const lineItems = [
  { category: 'Labor',     item: 'Demolition & Removal',          cost: 480,  hrs: 6  },
  { category: 'Labor',     item: 'Cabinet Installation (48 hrs)', cost: 3200, hrs: 48 },
  { category: 'Labor',     item: 'Countertop Installation',       cost: 800,  hrs: 8  },
  { category: 'Labor',     item: 'Appliance Hook-up',             cost: 320,  hrs: 4  },
  { category: 'Materials', item: 'Shaker Cabinetry (12 units)',   cost: 4800, hrs: null },
  { category: 'Materials', item: 'Quartz Countertops (28 sq ft)', cost: 2100, hrs: null },
  { category: 'Materials', item: 'Subway Tile Backsplash',        cost: 420,  hrs: null },
  { category: 'Materials', item: 'Fixtures & Hardware',           cost: 380,  hrs: null },
]

const aiInsights = [
  'Surface scan detected oak cabinets — replacement recommended over refinishing for best ROI.',
  'Countertop area estimated at 28 sq ft via AI measurement from uploaded photos.',
  'Labor estimate based on 482 completed kitchen projects in your area.',
  'Quote reflects current material costs (updated daily from supplier APIs).',
]

export default function QuoteResult() {
  const [expanded, setExpanded] = useState({ Labor: true, Materials: true })
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMsg, setChatMsg] = useState('')
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hi! I\'m your AI renovation assistant. Ask me anything about this quote — materials, timeline, alternatives, or anything else.' }
  ])
  const navigate = useNavigate()

  const toggle = (cat) => setExpanded(e => ({ ...e, [cat]: !e[cat] }))

  const grouped = lineItems.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item)
    return acc
  }, {})

  const total   = lineItems.reduce((s, i) => s + i.cost, 0)
  const labor   = lineItems.filter(i => i.category === 'Labor').reduce((s, i) => s + i.cost, 0)
  const materials = lineItems.filter(i => i.category === 'Materials').reduce((s, i) => s + i.cost, 0)

  const sendMsg = () => {
    if (!chatMsg.trim()) return
    const userMsg = chatMsg; setChatMsg('')
    setMessages(m => [...m, { from: 'user', text: userMsg }])
    setTimeout(() => {
      setMessages(m => [...m, { from: 'ai', text: 'Great question! Based on the scope of your kitchen renovation, I\'d recommend allowing 2–3 weeks for this project. The cabinetry installation typically takes the longest. Would you like me to adjust any line items?' }])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="card mb-6 bg-gradient-to-r from-turquoise-500 to-turquoise-700 text-white border-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={16} className="fill-white" />
                <span className="text-turquoise-100 text-xs font-semibold uppercase tracking-wide">AI-Generated Quote · QT-20240501</span>
              </div>
              <h1 className="text-2xl font-extrabold">Kitchen Remodeling Estimate</h1>
              <p className="text-turquoise-100 text-sm mt-1">Generated in 1.8s · Based on 4 uploaded photos · LA area pricing</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-extrabold">${total.toLocaleString()}</div>
              <p className="text-turquoise-100 text-sm">Total Estimate</p>
            </div>
          </div>
          {/* Summary strip */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-turquoise-400/30">
            <div className="text-center">
              <DollarSign size={18} className="mx-auto mb-1 opacity-80" />
              <div className="font-bold">${labor.toLocaleString()}</div>
              <div className="text-turquoise-100 text-xs">Labor</div>
            </div>
            <div className="text-center">
              <Wrench size={18} className="mx-auto mb-1 opacity-80" />
              <div className="font-bold">${materials.toLocaleString()}</div>
              <div className="text-turquoise-100 text-xs">Materials</div>
            </div>
            <div className="text-center">
              <Clock size={18} className="mx-auto mb-1 opacity-80" />
              <div className="font-bold">2–3 wks</div>
              <div className="text-turquoise-100 text-xs">Timeline</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Line items */}
          <div className="lg:col-span-2 space-y-4">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="card p-0 overflow-hidden">
                <button
                  onClick={() => toggle(cat)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`badge ${cat === 'Labor' ? 'badge-turquoise' : 'badge-purple'}`}>{cat}</span>
                    <span className="font-bold text-slate-900">${(cat === 'Labor' ? labor : materials).toLocaleString()}</span>
                  </div>
                  {expanded[cat] ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>
                {expanded[cat] && (
                  <div className="border-t border-slate-50 divide-y divide-slate-50">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-turquoise-50/30 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{item.item}</p>
                          {item.hrs && <p className="text-xs text-slate-400 mt-0.5">{item.hrs} hrs @ $66.67/hr</p>}
                        </div>
                        <span className="font-semibold text-slate-900 text-sm">${item.cost.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Total */}
            <div className="card border-turquoise-200 bg-turquoise-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900 text-lg">Grand Total</p>
                  <p className="text-xs text-slate-500 mt-0.5">Includes all labor & materials · Tax may apply</p>
                </div>
                <span className="text-3xl font-extrabold text-turquoise-600">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* AI Insights */}
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-turquoise-500 rounded-lg flex items-center justify-center">
                  <Zap size={15} className="text-white fill-white" />
                </div>
                <h3 className="font-bold text-slate-900">AI Quote Insights</h3>
              </div>
              <ul className="space-y-2.5">
                {aiInsights.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Info size={14} className="text-turquoise-500 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Actions */}
            <div className="card">
              <h3 className="font-bold text-slate-900 mb-4">Your Decision</h3>
              <div className="space-y-3">
                <Link to="/schedule" className="btn-primary w-full py-3 text-sm">
                  <CheckCircle2 size={16} /> Approve Quote
                </Link>
                <button className="btn-ghost w-full py-2.5 text-sm border border-slate-200 rounded-xl hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 text-slate-600 flex items-center justify-center gap-2">
                  <Edit3 size={16} /> Request Edits
                </button>
                <button className="btn-ghost w-full py-2.5 text-sm border border-slate-200 rounded-xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-slate-500 flex items-center justify-center gap-2">
                  <XCircle size={16} /> Decline
                </button>
              </div>
            </div>

            {/* Quote details */}
            <div className="card">
              <h3 className="font-bold text-slate-900 mb-4">Quote Details</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Quote ID',      val: 'QT-20240501' },
                  { label: 'Generated',     val: 'May 1, 2026' },
                  { label: 'Valid until',   val: 'May 31, 2026' },
                  { label: 'AI confidence', val: '94%' },
                  { label: 'Area pricing',  val: 'Los Angeles, CA' },
                ].map(r => (
                  <div key={r.label} className="flex justify-between">
                    <span className="text-slate-400">{r.label}</span>
                    <span className="font-medium text-slate-800">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Download & share */}
            <div className="card">
              <h3 className="font-bold text-slate-900 mb-3">Share & Save</h3>
              <div className="space-y-2">
                <button className="btn-ghost w-full text-sm border border-slate-200 rounded-xl flex items-center justify-center gap-2 py-2.5">
                  <Download size={15} /> Download PDF
                </button>
                <button className="btn-ghost w-full text-sm border border-slate-200 rounded-xl flex items-center justify-center gap-2 py-2.5">
                  <Share2 size={15} /> Share Quote Link
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="card text-center bg-slate-50">
              <p className="text-sm font-semibold text-slate-700 mb-3">Was this quote accurate?</p>
              <div className="flex justify-center gap-3">
                <button className="flex items-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors">
                  <ThumbsUp size={15} /> Yes
                </button>
                <button className="flex items-center gap-1.5 py-2 px-4 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors">
                  <ThumbsDown size={15} /> No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-turquoise-500 p-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">AI Quote Assistant</p>
                <p className="text-turquoise-100 text-xs">Online · Powered by GPT-4 Turbo</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="ml-auto text-white/70 hover:text-white">✕</button>
            </div>
            <div className="p-4 h-64 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.from === 'user' ? 'bg-turquoise-500 text-white rounded-br-sm' : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 p-3 flex gap-2">
              <input
                className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-turquoise-400"
                placeholder="Ask about materials, timeline…"
                value={chatMsg} onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button onClick={sendMsg} className="w-9 h-9 bg-turquoise-500 rounded-xl flex items-center justify-center text-white hover:bg-turquoise-600 transition-colors shrink-0">
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-turquoise-500 hover:bg-turquoise-600 text-white rounded-2xl shadow-xl flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <MessageSquare size={22} />
        </button>
      </div>

      <Footer />
    </div>
  )
}

function ArrowRight({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
