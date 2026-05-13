import { useState, useRef, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  CheckCircle2, Clock, Camera, FileText, MessageSquare, Calendar,
  ChevronLeft, Download, Share2, Phone, AlertCircle, Paperclip,
  Send, MapPin, Zap, Shield, Receipt, FileCheck, ClipboardList,
  Image as ImageIcon, ExternalLink, Upload
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/* ─── Static data ─────────────────────────────── */
const STAGES = [
  { label: 'Inquiry',       date: 'Apr 15', done: true  },
  { label: 'Quote',         date: 'Apr 15', done: true  },
  { label: 'Approved',      date: 'Apr 17', done: true  },
  { label: 'Scheduled',     date: 'Apr 20', done: true  },
  { label: 'In Progress',   date: 'Apr 20', done: true, active: true },
  { label: 'Inspection',    date: 'May 15', done: false },
  { label: 'Complete',      date: 'May 18', done: false },
]

const MILESTONES = [
  { title: 'Demo & Site Prep',         date: 'Apr 22', status: 'done',    note: 'Old cabinetry, countertops, and tile removed. Walls patched and primed.' },
  { title: 'Electrical Rough-In',      date: 'Apr 25', status: 'done',    note: 'Under-cabinet LED circuit run. Passed city inspection Apr 26.' },
  { title: 'Upper Cabinet Install',    date: 'Apr 29', status: 'done',    note: 'All 6 upper wall units installed, leveled, and secured.' },
  { title: 'Lower Cabinet Install',    date: 'May 2',  status: 'active',  note: 'In progress — 4 of 8 base units installed.' },
  { title: 'Countertop Template',      date: 'May 6',  status: 'pending', note: 'Quartz fabricator visits for field measurements.' },
  { title: 'Countertop Installation',  date: 'May 13', status: 'pending', note: 'Calacatta quartz delivery & install (5–7 day lead after template).' },
  { title: 'Backsplash & Tile',        date: 'May 14', status: 'pending', note: '3"×6" white subway tile with grey grout, full wall behind range.' },
  { title: 'Appliance Hook-Up',        date: 'May 15', status: 'pending', note: 'Range, dishwasher, microwave, and refrigerator plumbing & electrical.' },
  { title: 'Final Punch & Walkthrough',date: 'May 15', status: 'pending', note: 'Client walkthrough, punch list review, and sign-off.' },
]

const UPDATES = [
  {
    date: 'Today, 9:42 AM', author: 'Mike Rodriguez', initials: 'MR', role: 'Lead Contractor',
    text: 'Finished the upper cabinet run this morning — all 6 units are installed, leveled, and shimmed tight. Starting the base cabinets this afternoon. Photos attached.',
    imgs: [
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&auto=format&fit=crop&q=80',
    ],
  },
  {
    date: 'Apr 29, 3:15 PM', author: 'Mike Rodriguez', initials: 'MR', role: 'Lead Contractor',
    text: 'Electrical rough-in is done and passed city inspection this afternoon. Inspector said the panel and circuit layout were clean. We\'re cleared to close up the walls and move to cabinets.',
    imgs: [],
  },
  {
    date: 'Apr 25, 10:00 AM', author: 'A-1 Renovations', initials: 'A1', role: 'Project Manager',
    text: 'City inspector completed the rough-in electrical inspection — PASSED. Certificate attached to documents. Scheduling cabinet delivery for Apr 28.',
    imgs: [],
  },
  {
    date: 'Apr 22, 11:00 AM', author: 'Mike Rodriguez', initials: 'MR', role: 'Lead Contractor',
    text: 'Demolition wrapped up this morning. All old cabinetry, countertops, and backsplash removed cleanly. Found some minor water damage behind the sink cabinet — dried out, treated with mold inhibitor, and patched. No structural issues.',
    imgs: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=300&auto=format&fit=crop&q=80',
    ],
  },
]

const DOCUMENTS = [
  {
    name: 'Kitchen_Remodel_Contract_Signed.pdf',
    desc: 'Fully executed contract — signed by both parties Apr 17.',
    type: 'Contract', size: '1.4 MB', date: 'Apr 17',
    status: 'Signed', statusColor: 'bg-emerald-50 text-emerald-700',
    icon: FileCheck, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600',
  },
  {
    name: 'Quote_QT-20240501_Kitchen.pdf',
    desc: 'AI-generated itemized quote — labor, materials, and timeline.',
    type: 'Quote', size: '340 KB', date: 'Apr 15',
    status: 'Approved', statusColor: 'bg-turquoise-50 text-turquoise-700',
    icon: ClipboardList, iconBg: 'bg-turquoise-50', iconColor: 'text-turquoise-600',
  },
  {
    name: 'Material_Selections_Kitchen.pdf',
    desc: 'Shaker cabinetry specs, Calacatta quartz finish, subway tile SKUs.',
    type: 'Spec Sheet', size: '2.8 MB', date: 'Apr 20',
    status: 'Approved', statusColor: 'bg-turquoise-50 text-turquoise-700',
    icon: FileText, iconBg: 'bg-blue-50', iconColor: 'text-blue-600',
  },
  {
    name: 'Building_Permit_City_LA.pdf',
    desc: 'City of Los Angeles renovation permit — valid through Nov 2026.',
    type: 'Permit', size: '620 KB', date: 'Apr 19',
    status: 'Active', statusColor: 'bg-emerald-50 text-emerald-700',
    icon: Shield, iconBg: 'bg-violet-50', iconColor: 'text-violet-600',
  },
  {
    name: 'Invoice_INV-034_Deposit_30pct.pdf',
    desc: '30% project deposit — $3,210. Paid via ACH Apr 18.',
    type: 'Invoice', size: '180 KB', date: 'Apr 18',
    status: 'Paid', statusColor: 'bg-emerald-50 text-emerald-700',
    icon: Receipt, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
  },
  {
    name: 'Invoice_INV-038_Progress_30pct.pdf',
    desc: '30% progress draw — $3,210. Due upon cabinet completion.',
    type: 'Invoice', size: '175 KB', date: 'May 2',
    status: 'Pending', statusColor: 'bg-amber-50 text-amber-700',
    icon: Receipt, iconBg: 'bg-amber-50', iconColor: 'text-amber-600',
  },
  {
    name: 'Liability_Insurance_MikeRodriguez.pdf',
    desc: 'General liability & workers\' comp — $2M coverage. Valid 2026.',
    type: 'Insurance', size: '890 KB', date: 'Apr 20',
    status: 'Valid', statusColor: 'bg-emerald-50 text-emerald-700',
    icon: Shield, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600',
  },
  {
    name: 'Electrical_Inspection_Certificate.pdf',
    desc: 'City of LA rough-in electrical inspection — passed Apr 26.',
    type: 'Inspection', size: '290 KB', date: 'Apr 26',
    status: 'Passed', statusColor: 'bg-emerald-50 text-emerald-700',
    icon: CheckCircle2, iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
  },
]

const INITIAL_CHAT = [
  { from: 'contractor', text: 'Good morning, Alex! We\'re starting day 1 of cabinet installation today. The shaker units arrived this morning and everything looks great — no damage in transit.', time: 'Apr 28, 8:05 AM' },
  { from: 'me',         text: 'Great news! How long do you expect the full cabinet install to take?', time: 'Apr 28, 8:22 AM' },
  { from: 'contractor', text: 'Upper cabinets today and tomorrow, base cabinets May 1–2. Then we\'ll be ready for the countertop template on May 6. Quartz is usually 5–7 business days to fabricate after that.', time: 'Apr 28, 8:30 AM' },
  { from: 'me',         text: 'That tracks perfectly with the schedule. Do you need me to be home today?', time: 'Apr 28, 8:35 AM' },
  { from: 'contractor', text: 'Not necessary — I have the code. I\'ll send a progress update with photos before I leave for the day.', time: 'Apr 28, 8:38 AM' },
  { from: 'contractor', text: 'Update: upper cabinets are all in as of 4pm. Alignment is perfect across the full run. Photos uploaded to the Updates tab.', time: 'Apr 28, 4:12 PM' },
  { from: 'me',         text: 'Wow, that was fast! Looks incredible in the photos.', time: 'Apr 28, 5:50 PM' },
  { from: 'contractor', text: 'Thanks! Starting base cabinets first thing tomorrow. The corner cabinet goes in first — trickiest part — and everything lines up from there.', time: 'Apr 28, 6:02 PM' },
  { from: 'contractor', text: 'Good morning! Finished the upper cabinet run today. Starting the lowers this afternoon. Countertop template is confirmed for May 6 at 9am — does that work for you?', time: 'Today, 9:42 AM' },
  { from: 'me',         text: 'May 6 at 9am works perfectly. Should I be home for the template?', time: 'Today, 10:05 AM' },
  { from: 'contractor', text: 'Yes, for the template you\'ll want to be there for the first 30 minutes so the fabricator can confirm the sink location and edge profile with you directly.', time: 'Today, 10:11 AM' },
]

/* ─── Component ───────────────────────────────── */
export default function ProjectTracking() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('timeline')
  const [chatMsgs, setChatMsgs]   = useState(INITIAL_CHAT)
  const [msgText, setMsgText]     = useState('')
  const chatEndRef                = useRef(null)

  useEffect(() => {
    if (activeTab === 'chat') chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMsgs, activeTab])

  const sendMsg = () => {
    if (!msgText.trim()) return
    setChatMsgs(m => [...m, { from: 'me', text: msgText, time: 'Just now' }])
    setMsgText('')
  }

  const TABS = [
    { id: 'timeline',  label: 'Timeline'  },
    { id: 'updates',   label: 'Site Log'  },
    { id: 'documents', label: 'Documents' },
    { id: 'chat',      label: 'Chat',     badge: 2 },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back */}
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-turquoise-600 mb-6 transition-colors">
          <ChevronLeft size={15} /> Back to Dashboard
        </Link>

        {/* ── Project Header ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden mb-5">
          {/* Cover image */}
          <div className="h-36 relative">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&auto=format&fit=crop&q=80"
              alt="Kitchen Remodeling"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-5 flex items-end justify-between">
              <div>
                <span className="badge badge-turquoise mb-2">
                  <span className="status-dot bg-turquoise-300 animate-pulse" /> In Progress
                </span>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">Kitchen Remodeling</h1>
                <p className="text-white/70 text-xs mt-1 flex flex-wrap gap-3">
                  <span className="flex items-center gap-1"><MapPin size={11} /> 1234 Maple St, Los Angeles, CA</span>
                  <span className="flex items-center gap-1"><Calendar size={11} /> Started Apr 20</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> ETA May 18</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 bg-white/20 hover:bg-white/30 border border-white/20 rounded-xl flex items-center justify-center text-white transition-colors backdrop-blur-sm">
                  <Share2 size={15} />
                </button>
                <a href="tel:+15551234567" className="flex items-center gap-2 bg-white text-slate-900 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                  <Phone size={14} /> Call Mike
                </a>
              </div>
            </div>
          </div>

          {/* Stats + progress */}
          <div className="p-5">
            <div className="grid grid-cols-4 gap-4 mb-4 text-center">
              {[
                { label: 'Budget',      val: '$10,700'       },
                { label: 'Spent',       val: '$3,200'        },
                { label: 'Progress',    val: '60%'           },
                { label: 'Days Left',   val: '16'            },
              ].map(s => (
                <div key={s.label}>
                  <div className="text-lg font-extrabold text-slate-900">{s.val}</div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-turquoise-500 rounded-full" style={{ width: '60%' }} />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
              <span>Apr 20 (start)</span><span>May 18 (ETA)</span>
            </div>
          </div>
        </div>

        {/* ── Stage pipeline ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 mb-5 overflow-x-auto">
          <div className="flex items-start min-w-max gap-0">
            {STAGES.map((s, i) => (
              <div key={s.label} className="flex items-center">
                <div className="flex flex-col items-center text-center w-[90px]">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 mb-2 text-xs font-bold transition-all ${
                    s.done   ? 'bg-turquoise-500 border-turquoise-500 text-white' :
                    s.active ? 'bg-white border-turquoise-500 text-turquoise-600 ring-4 ring-turquoise-100' :
                               'bg-white border-slate-200 text-slate-300'
                  }`}>
                    {s.done ? <CheckCircle2 size={16} /> : i + 1}
                  </div>
                  <p className={`text-[10px] font-semibold leading-tight ${s.done ? 'text-turquoise-600' : s.active ? 'text-turquoise-500' : 'text-slate-400'}`}>{s.label}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5">{s.date}</p>
                </div>
                {i < STAGES.length - 1 && (
                  <div className={`w-8 h-0.5 mb-7 ${s.done ? 'bg-turquoise-400' : 'bg-slate-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex bg-white rounded-xl border border-slate-100 p-1 mb-5 gap-0.5 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-turquoise-500 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${activeTab === tab.id ? 'bg-white text-turquoise-600' : 'bg-blue-500 text-white'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══ TIMELINE TAB ══════════════════════════ */}
        {activeTab === 'timeline' && (
          <div className="space-y-3 animate-fade-in">
            {MILESTONES.map((m, i) => (
              <div key={i} className={`relative flex gap-4 ${i < MILESTONES.length - 1 ? 'timeline-connector' : ''}`}>
                {/* Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${
                  m.status === 'done'   ? 'bg-turquoise-500 border-turquoise-500 text-white' :
                  m.status === 'active' ? 'bg-white border-turquoise-500 text-turquoise-600' :
                  'bg-white border-slate-200 text-slate-300'
                }`}>
                  {m.status === 'done'   ? <CheckCircle2 size={17} /> :
                   m.status === 'active' ? <Clock size={17} /> :
                   <span className="text-xs font-bold">{i + 1}</span>}
                </div>

                {/* Card */}
                <div className={`flex-1 bg-white rounded-2xl border p-4 mb-4 ${
                  m.status === 'active' ? 'border-turquoise-200 shadow-glow-sm' : 'border-slate-100'
                }`}>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h4 className={`font-bold text-sm ${m.status === 'active' ? 'text-turquoise-700' : 'text-slate-900'}`}>
                        {m.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{m.note}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400">{m.date}</span>
                      <span className={`badge text-[10px] ${
                        m.status === 'done'   ? 'badge-success' :
                        m.status === 'active' ? 'badge-turquoise' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {m.status === 'done' ? '✓ Done' : m.status === 'active' ? '● Active' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ══ SITE LOG TAB ══════════════════════════ */}
        {activeTab === 'updates' && (
          <div className="space-y-4 animate-fade-in">
            {UPDATES.map((u, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                {/* Author row */}
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${u.initials === 'MR' ? 'bg-turquoise-500' : 'bg-slate-700'}`}>
                      {u.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{u.author}</p>
                      <p className="text-xs text-slate-400">{u.role} · {u.date}</p>
                    </div>
                  </div>
                  {u.imgs.length > 0 && (
                    <span className="badge badge-turquoise text-[10px]">
                      <Camera size={11} /> {u.imgs.length} photos
                    </span>
                  )}
                </div>

                {/* Text */}
                <p className="text-sm text-slate-700 leading-relaxed mb-3">{u.text}</p>

                {/* Photos */}
                {u.imgs.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {u.imgs.map((src, j) => (
                      <div key={j} className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-100 group cursor-pointer">
                        <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <ExternalLink size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ══ DOCUMENTS TAB ═════════════════════════ */}
        {activeTab === 'documents' && (
          <div className="animate-fade-in space-y-3">
            {/* Summary bar */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Total Docs', val: DOCUMENTS.length, color: 'text-slate-900' },
                { label: 'Signed / Paid', val: DOCUMENTS.filter(d => ['Signed','Paid','Passed','Valid','Active'].includes(d.status)).length, color: 'text-emerald-600' },
                { label: 'Pending', val: DOCUMENTS.filter(d => d.status === 'Pending').length, color: 'text-amber-600' },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
                  <div className={`text-2xl font-extrabold ${s.color}`}>{s.val}</div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {DOCUMENTS.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 hover:border-turquoise-200 hover:shadow-card-hover transition-all duration-200 p-4 flex items-start gap-4 group">
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${d.iconBg}`}>
                  <d.icon size={20} className={d.iconColor} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="text-sm font-semibold text-slate-800 truncate max-w-xs">{d.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{d.desc}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${d.statusColor}`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                    <span className="font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{d.type}</span>
                    <span>{d.size}</span>
                    <span>Uploaded {d.date}</span>
                  </div>
                </div>

                {/* Download */}
                <button className="p-2 text-slate-300 hover:text-turquoise-500 opacity-0 group-hover:opacity-100 transition-all rounded-xl hover:bg-turquoise-50 shrink-0">
                  <Download size={16} />
                </button>
              </div>
            ))}

            <button className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-slate-200 hover:border-turquoise-400 hover:bg-turquoise-50/50 rounded-2xl text-sm font-semibold text-slate-400 hover:text-turquoise-600 transition-all duration-200">
              <Upload size={16} /> Upload a Document
            </button>
          </div>
        )}

        {/* ══ CHAT TAB ══════════════════════════════ */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden animate-fade-in flex flex-col" style={{ height: '560px' }}>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 shrink-0">
              <div className="relative">
                <div className="w-10 h-10 bg-turquoise-500 rounded-full flex items-center justify-center text-white font-bold text-sm">MR</div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Mike Rodriguez</p>
                <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" /> Online · Kitchen Remodel Lead
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <a href="tel:+15551234567"
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-turquoise-600 border border-slate-200 hover:border-turquoise-300 px-3 py-1.5 rounded-xl transition-colors">
                  <Phone size={13} /> Call
                </a>
              </div>
            </div>

            {/* Date divider helper */}
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-slate-50 min-h-0">
              {chatMsgs.map((m, i) => {
                const showDate = i === 0 || chatMsgs[i - 1]?.time?.split(',')[0] !== m.time?.split(',')[0]
                return (
                  <div key={i}>
                    {showDate && (
                      <div className="text-center my-3">
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-3 py-1 rounded-full font-medium">
                          {m.time?.split(',')[0] || 'Today'}
                        </span>
                      </div>
                    )}
                    <div className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'} items-end gap-2 mb-1.5`}>
                      {m.from !== 'me' && (
                        <div className="w-7 h-7 bg-turquoise-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0">MR</div>
                      )}
                      <div className={`max-w-[75%] flex flex-col gap-0.5 ${m.from === 'me' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          m.from === 'me'
                            ? 'bg-turquoise-500 text-white rounded-br-sm'
                            : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-bl-sm'
                        }`}>
                          {m.text}
                        </div>
                        <span className="text-[10px] text-slate-400 px-1">{m.time?.split(', ')[1] || m.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-slate-100 flex gap-2 bg-white shrink-0">
              <button className="p-2 text-slate-400 hover:text-turquoise-500 transition-colors rounded-lg hover:bg-turquoise-50">
                <Paperclip size={17} />
              </button>
              <button className="p-2 text-slate-400 hover:text-turquoise-500 transition-colors rounded-lg hover:bg-turquoise-50">
                <ImageIcon size={17} />
              </button>
              <input
                className="flex-1 input-field text-sm py-2.5"
                placeholder="Message Mike Rodriguez…"
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button
                onClick={sendMsg}
                disabled={!msgText.trim()}
                className="w-10 h-10 bg-turquoise-500 hover:bg-turquoise-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
