import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PlusCircle, ArrowRight, Clock, CheckCircle2, AlertCircle,
  FileText, Calendar, MessageSquare, DollarSign, Hammer,
  Bell, ChevronRight, Zap, Download, X, Send, Paperclip,
  Shield, FileCheck, Receipt, ClipboardList
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/* ── Data ─────────────────────────────────── */
const projects = [
  {
    id: 'PRJ-001', title: 'Kitchen Remodeling', status: 'In Progress',
    stage: 4, budget: '$10,700', spent: '$3,200',
    start: 'Apr 20', eta: 'May 18', contractor: 'Mike Rodriguez', contractorInitials: 'MR',
    progress: 60, lastUpdate: 'Cabinetry installation 70% complete — upper units done',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'PRJ-002', title: 'Master Bathroom', status: 'Scheduled',
    stage: 3, budget: '$8,200', spent: '$0',
    start: 'May 10', eta: 'May 28', contractor: 'Carlos Morales', contractorInitials: 'CM',
    progress: 18, lastUpdate: 'Tile and fixtures ordered · Work begins May 10',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop&q=80',
  },
]

const STAGES = ['Inquiry', 'Quoted', 'Approved', 'Scheduled', 'In Progress', 'Done']

const statusBadge = {
  'In Progress': 'badge-turquoise',
  'Scheduled':   'badge-info',
  'Completed':   'badge-success',
  'Pending':     'badge-warning',
}

const MESSAGES = [
  {
    id: 'PRJ-001', contractor: 'Mike Rodriguez', initials: 'MR', color: 'bg-turquoise-500',
    project: 'Kitchen Remodeling', unread: 2,
    preview: 'Starting lower cabinets tomorrow — should be done by EOD.',
    time: '9:42 AM',
    thread: [
      { from: 'contractor', text: 'Good morning! I finished the upper cabinets today. All 6 units installed, level and plumb. Starting the lower cabinets first thing tomorrow.', time: '9:42 AM' },
      { from: 'contractor', text: 'Starting lower cabinets tomorrow — should be done by EOD. Then we can do the countertop template Thursday.', time: '9:45 AM' },
      { from: 'me', text: 'Sounds great! Will the quartz be ready by then?', time: '10:02 AM' },
      { from: 'contractor', text: 'Yes — I already called the fabricator. They confirmed a 5-day lead time after template, so countertops arrive around May 9th. We\'re right on schedule.', time: '10:08 AM' },
      { from: 'me', text: 'Perfect. Can you send photos of today\'s work?', time: '10:11 AM' },
      { from: 'contractor', text: '📷 Just uploaded 4 photos to the project portal. Upper cabinet run looks great — the alignment is perfect all the way across.', time: '10:15 AM' },
    ],
  },
  {
    id: 'PRJ-002', contractor: 'Carlos Morales', initials: 'CM', color: 'bg-emerald-500',
    project: 'Master Bathroom', unread: 0,
    preview: 'Tile delivery confirmed for May 9. See you on the 10th!',
    time: 'Yesterday',
    thread: [
      { from: 'contractor', text: 'Hi Alex! Just confirming the tile delivery. The Calacatta marble tile and the mosaic floor tile are both arriving May 9th.', time: 'Yesterday 3:20 PM' },
      { from: 'me', text: 'Great, and the Kohler fixtures?', time: 'Yesterday 3:35 PM' },
      { from: 'contractor', text: 'Fixtures are already in my shop — picked them up last week. Everything is ready. See you on the 10th at 8am to start demo!', time: 'Yesterday 3:40 PM' },
      { from: 'me', text: 'Perfect, see you then. Do you need me to be home?', time: 'Yesterday 4:00 PM' },
      { from: 'contractor', text: 'Just for the first hour to go over the layout. After that you\'re free to leave — I\'ll lock up when we\'re done for the day.', time: 'Yesterday 4:05 PM' },
    ],
  },
]

const DOCUMENTS = [
  { name: 'Kitchen_Remodel_Contract_Signed.pdf', project: 'Kitchen Remodeling', type: 'Contract',  size: '1.4 MB', date: 'Apr 17', icon: FileCheck, color: 'text-turquoise-500', bg: 'bg-turquoise-50',  status: 'Signed' },
  { name: 'Kitchen_Remodel_Quote_QT-001.pdf',    project: 'Kitchen Remodeling', type: 'Quote',     size: '340 KB', date: 'Apr 15', icon: ClipboardList, color: 'text-blue-500',     bg: 'bg-blue-50',      status: 'Approved' },
  { name: 'Invoice_INV-034_Deposit.pdf',          project: 'Kitchen Remodeling', type: 'Invoice',   size: '180 KB', date: 'Apr 18', icon: Receipt,       color: 'text-amber-500',   bg: 'bg-amber-50',     status: 'Paid' },
  { name: 'Liability_Insurance_Certificate.pdf',  project: 'Kitchen Remodeling', type: 'Insurance', size: '890 KB', date: 'Apr 20', icon: Shield,        color: 'text-emerald-500', bg: 'bg-emerald-50',   status: 'Valid' },
  { name: 'Material_Selections_Kitchen.pdf',      project: 'Kitchen Remodeling', type: 'Specs',     size: '2.8 MB', date: 'Apr 20', icon: FileText,      color: 'text-violet-500',  bg: 'bg-violet-50',    status: 'Approved' },
  { name: 'Bathroom_Quote_QT-002.pdf',            project: 'Master Bathroom',    type: 'Quote',     size: '310 KB', date: 'Apr 28', icon: ClipboardList, color: 'text-blue-500',    bg: 'bg-blue-50',      status: 'Approved' },
]

const ACTIVITY = [
  { icon: CheckCircle2, color: 'text-turquoise-500', bg: 'bg-turquoise-50', text: 'Upper cabinet installation milestone marked complete', time: '2 hours ago' },
  { icon: MessageSquare,color: 'text-blue-500',      bg: 'bg-blue-50',      text: 'New message from Mike Rodriguez — Kitchen project', time: '3 hours ago' },
  { icon: Bell,         color: 'text-amber-500',     bg: 'bg-amber-50',     text: 'Countertop template appointment: May 6 at 9am', time: '5 hours ago' },
  { icon: FileText,     color: 'text-violet-500',    bg: 'bg-violet-50',    text: 'Invoice INV-034 marked as paid', time: '1 day ago' },
  { icon: AlertCircle,  color: 'text-emerald-500',   bg: 'bg-emerald-50',   text: 'Tile delivery confirmed for May 9 — Bathroom project', time: '1 day ago' },
]

/* ── Component ──────────────────────────────── */
export default function Dashboard() {
  const [msgOpen, setMsgOpen]     = useState(false)
  const [activeThread, setThread] = useState(null)
  const [docsOpen, setDocsOpen]   = useState(false)
  const [msgText, setMsgText]     = useState('')
  const [threads, setThreads]     = useState(MESSAGES)

  const openThread = (m) => { setThread(m); setMsgOpen(true) }

  const sendMsg = () => {
    if (!msgText.trim() || !activeThread) return
    setThreads(ts => ts.map(t =>
      t.id === activeThread.id
        ? { ...t, thread: [...t.thread, { from: 'me', text: msgText, time: 'Just now' }], preview: msgText, unread: 0 }
        : t
    ))
    setThread(prev => ({ ...prev, thread: [...prev.thread, { from: 'me', text: msgText, time: 'Just now' }] }))
    setMsgText('')
  }

  const totalUnread = threads.reduce((s, t) => s + t.unread, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Good morning, Alex</h1>
            <p className="text-slate-500 text-sm mt-1">
              You have <span className="font-semibold text-turquoise-600">2 active projects</span>
              {totalUnread > 0 && <> and <span className="font-semibold text-blue-600">{totalUnread} new messages</span></>}.
            </p>
          </div>
          <Link to="/quote" className="btn-primary text-sm shrink-0">
            <PlusCircle size={16} /> New Quote
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Projects',    val: '2',      icon: Hammer,     color: 'text-turquoise-500', bg: 'bg-turquoise-50' },
            { label: 'Total Budget',       val: '$18,900', icon: DollarSign, color: 'text-blue-500',     bg: 'bg-blue-50'      },
            { label: 'Unread Messages',    val: String(totalUnread), icon: MessageSquare, color: 'text-violet-500', bg: 'bg-violet-50' },
            { label: 'Days to ETA',        val: '16',     icon: Clock,      color: 'text-amber-500',    bg: 'bg-amber-50'     },
          ].map(s => (
            <div key={s.label} className="card flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.bg}`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <div className="text-xl font-extrabold text-slate-900 leading-none">{s.val}</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ── Left column: Projects + Messages ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Active Projects</h2>
                <button className="text-sm text-turquoise-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  All projects <ChevronRight size={14} />
                </button>
              </div>

              <div className="space-y-4">
                {projects.map(p => (
                  <div key={p.id} className="card overflow-hidden p-0">
                    {/* Project cover image strip */}
                    <div className="h-28 relative overflow-hidden">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                      <div className="absolute inset-0 p-4 flex items-end justify-between">
                        <div>
                          <span className={`badge ${statusBadge[p.status]} mb-1`}>
                            {p.status === 'In Progress' && <span className="status-dot bg-turquoise-300 animate-pulse" />}
                            {p.status}
                          </span>
                          <h3 className="font-extrabold text-white text-lg leading-tight">{p.title}</h3>
                        </div>
                        <Link to={`/tracking/${p.id}`} className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-turquoise-50 transition-colors">
                          Track →
                        </Link>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      {/* Stage pills */}
                      <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-0.5">
                        {STAGES.map((s, i) => (
                          <div key={s} className="flex items-center gap-0.5 shrink-0">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                              i < p.stage ? 'bg-turquoise-500 text-white' :
                              i === p.stage ? 'bg-turquoise-100 text-turquoise-700 ring-2 ring-turquoise-400 ring-offset-1' :
                              'bg-slate-100 text-slate-400'
                            }`}>
                              {i < p.stage && '✓ '}{s}
                            </span>
                            {i < STAGES.length - 1 && <div className={`w-2.5 h-px ${i < p.stage ? 'bg-turquoise-400' : 'bg-slate-200'}`} />}
                          </div>
                        ))}
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                          <span>Overall progress</span>
                          <span className="font-bold text-turquoise-600">{p.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-turquoise-500 rounded-full" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>

                      {/* Footer row */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-sm flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full ${p.contractorInitials === 'MR' ? 'bg-turquoise-500' : 'bg-emerald-500'} flex items-center justify-center text-white text-[10px] font-bold`}>
                            {p.contractorInitials}
                          </div>
                          <span className="text-slate-500 text-xs">{p.contractor}</span>
                        </div>
                        <div className="flex gap-4 text-xs text-slate-500">
                          <span>Budget: <strong className="text-slate-800">{p.budget}</strong></span>
                          <span>ETA: <strong className="text-slate-800">{p.eta}</strong></span>
                        </div>
                      </div>

                      {/* Last update */}
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-xl px-3 py-2.5">
                        <AlertCircle size={12} className="text-turquoise-400 shrink-0" />
                        {p.lastUpdate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Messages</h2>
                  {totalUnread > 0 && (
                    <span className="w-5 h-5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{totalUnread}</span>
                  )}
                </div>
              </div>

              <div className="card p-0 overflow-hidden divide-y divide-slate-100">
                {threads.map((m, i) => (
                  <button key={i} onClick={() => openThread(m)}
                    className="w-full flex items-start gap-4 p-4 hover:bg-slate-50 transition-colors text-left">
                    <div className={`w-11 h-11 rounded-full ${m.color} flex items-center justify-center text-white font-bold text-sm shrink-0 relative`}>
                      {m.initials}
                      {m.unread > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white text-[9px] text-white font-bold flex items-center justify-center">{m.unread}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className={`text-sm font-semibold truncate ${m.unread ? 'text-slate-900' : 'text-slate-700'}`}>{m.contractor}</p>
                        <span className="text-xs text-slate-400 shrink-0">{m.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-0.5">{m.project}</p>
                      <p className={`text-sm truncate ${m.unread ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>{m.preview}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="space-y-5">

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-bold text-slate-900 mb-3">Quick Actions</h3>
              <div className="space-y-1">
                {[
                  { icon: PlusCircle,    label: 'Get New Quote',          to: '/quote',    color: 'text-turquoise-500 bg-turquoise-50' },
                  { icon: Calendar,      label: 'Schedule Consultation',  to: '/schedule', color: 'text-blue-500 bg-blue-50' },
                  { icon: MessageSquare, label: 'Message Contractor',     action: () => openThread(threads[0]), color: 'text-violet-500 bg-violet-50' },
                  { icon: FileText,      label: 'View Documents',         action: () => setDocsOpen(true), color: 'text-amber-500 bg-amber-50' },
                ].map(a => {
                  const inner = (
                    <>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.color}`}>
                        <a.icon size={17} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{a.label}</span>
                      <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-slate-500" />
                    </>
                  )
                  return a.to ? (
                    <Link key={a.label} to={a.to} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group">{inner}</Link>
                  ) : (
                    <button key={a.label} onClick={a.action} className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group text-left">{inner}</button>
                  )
                })}
              </div>
            </div>

            {/* Recent Documents */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900">Recent Documents</h3>
                <button onClick={() => setDocsOpen(true)} className="text-xs text-turquoise-600 font-semibold hover:underline">View all</button>
              </div>
              <div className="space-y-2">
                {DOCUMENTS.slice(0, 4).map((d, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${d.bg}`}>
                      <d.icon size={15} className={d.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{d.type}</p>
                      <p className="text-[10px] text-slate-400 truncate">{d.project}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      d.status === 'Signed' || d.status === 'Paid' || d.status === 'Valid'
                        ? 'bg-emerald-50 text-emerald-700'
                        : d.status === 'Approved'
                        ? 'bg-turquoise-50 text-turquoise-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}>{d.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="card">
              <h3 className="font-bold text-slate-900 mb-4">Activity</h3>
              <div className="space-y-4">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${a.bg}`}>
                      <a.icon size={14} className={a.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 leading-snug">{a.text}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next milestone */}
            <div className="card bg-turquoise-50 border-turquoise-100">
              <h3 className="font-bold text-slate-900 mb-3 text-sm">Next Milestone</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-turquoise-500 rounded-xl flex items-center justify-center shrink-0">
                  <Calendar size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">Countertop Template</p>
                  <p className="text-xs text-turquoise-600 font-medium">May 6 · Kitchen Remodel</p>
                </div>
              </div>
              <Link to="/schedule" className="btn-secondary w-full text-xs py-2">
                View Full Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Message Modal ──────────────────────── */}
      {msgOpen && activeThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden animate-scale-in" style={{ maxHeight: '85vh' }}>
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-100 shrink-0">
              <div className={`w-10 h-10 rounded-full ${activeThread.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {activeThread.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 text-sm">{activeThread.contractor}</p>
                <p className="text-xs text-turquoise-500">{activeThread.project}</p>
              </div>
              <Link to={`/tracking/${activeThread.id}`} className="text-xs text-turquoise-600 font-semibold hover:underline mr-2">
                View Project
              </Link>
              <button onClick={() => setMsgOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 min-h-0">
              {activeThread.thread.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                  {m.from !== 'me' && (
                    <div className={`w-7 h-7 rounded-full ${activeThread.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                      {activeThread.initials}
                    </div>
                  )}
                  <div className={`max-w-[80%] flex flex-col gap-1 ${m.from === 'me' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === 'me'
                        ? 'bg-turquoise-500 text-white rounded-br-sm'
                        : 'bg-white text-slate-800 shadow-sm rounded-bl-sm border border-slate-100'
                    }`}>
                      {m.text}
                    </div>
                    <span className="text-[10px] text-slate-400 px-1">{m.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-100 flex gap-2 bg-white shrink-0">
              <button className="p-2 text-slate-400 hover:text-turquoise-500 transition-colors">
                <Paperclip size={16} />
              </button>
              <input
                className="flex-1 input-field text-sm py-2.5 text-sm"
                placeholder={`Message ${activeThread.contractor.split(' ')[0]}…`}
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button onClick={sendMsg} disabled={!msgText.trim()}
                className="w-9 h-9 bg-turquoise-500 hover:bg-turquoise-600 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Documents Modal ────────────────────── */}
      {docsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="font-extrabold text-slate-900">All Documents</h2>
              <button onClick={() => setDocsOpen(false)} className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-2">
              {DOCUMENTS.map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-turquoise-200 hover:bg-turquoise-50/30 transition-colors group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${d.bg}`}>
                    <d.icon size={18} className={d.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{d.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{d.project} · {d.size} · {d.date}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                    d.status === 'Signed' || d.status === 'Paid' || d.status === 'Valid'
                      ? 'bg-emerald-50 text-emerald-700'
                      : d.status === 'Approved'
                      ? 'bg-turquoise-50 text-turquoise-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}>{d.status}</span>
                  <button className="p-1.5 text-slate-300 hover:text-turquoise-500 transition-colors opacity-0 group-hover:opacity-100">
                    <Download size={15} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100">
              <button className="btn-secondary w-full text-sm py-2.5">
                <Paperclip size={15} /> Upload New Document
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
