import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { DollarSign, Briefcase, Star, Clock, ChevronRight, CheckCircle2, XCircle, MapPin, CalendarDays, Settings, Eye, X, Sparkles } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const TODAY_JOBS = [
  { id:'P-1247', time:'9:00 AM',  task:'Cabinet install — upper row',      client:'Sarah Johnson',   addr:'2847 Oak St, Austin',    job:'Kitchen Remodel' },
  { id:'P-1089', time:'1:00 PM',  task:'Countertop template measurement',  client:'Emily Rodriguez', addr:'1524 Bayshore Dr, Miami', job:'Full Renovation' },
  { id:'P-1320', time:'4:30 PM',  task:'Tile selection review',            client:'Barbara Anderson',addr:'2204 Market St, SF',     job:'Bathroom Reno'   },
]

const INITIAL_REQUESTS = [
  {
    id:'Q-1294', service:'Full Kitchen Renovation', client:'Sarah Parker',
    location:'Austin, TX', range:'$42K–$58K', budget:50000,
    sqft:280, received:'2h ago', status:'new', timeline:'6–8 weeks',
    desc:'Complete gut renovation — new cabinets, quartz countertops, tile backsplash, hardwood floors throughout, and island addition. Home built in 1998, existing layout to remain.',
    tags:['Cabinets','Countertops','Flooring','Backsplash','Island'],
  },
  {
    id:'Q-1295', service:'Master Bathroom Remodel', client:'Jason Kim',
    location:'Denver, CO', range:'$18K–$26K', budget:22000,
    sqft:120, received:'5h ago', status:'new', timeline:'3–4 weeks',
    desc:'Walk-in shower conversion with frameless glass door, double vanity install, heated tile floor, and new fixtures throughout. Existing tub to be removed.',
    tags:['Shower','Vanity','Tile','Fixtures'],
  },
]

export default function AppProviderHome() {
  const { user }      = useAuth()
  const navigate      = useNavigate()
  const [requests,    setRequests]  = useState(INITIAL_REQUESTS)
  const [viewRequest, setViewRequest] = useState(null)

  const act = (id, action) => {
    setRequests(rs => rs.map(r => r.id === id ? { ...r, status: action } : r))
    setViewRequest(null)
  }
  const newRequests = requests.filter(r => r.status === 'new')
  return (
    <MobileAppLayout role="provider">
      {/* Gradient header */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-4 pt-10 pb-14">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-slate-400 text-xs">Good morning,</p>
            <p className="text-white font-extrabold text-lg">{user?.name?.split(' ')[0]}</p>
          </div>
          <div className="w-10 h-10 bg-turquoise-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
            {user?.initials}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[['$12.4K','Earned (MTD)','text-turquoise-400'],['4','Active Jobs','text-white'],['4.9★','Rating','text-amber-400']].map(([v,l,c]) => (
            <div key={l} className="bg-white/10 rounded-xl p-3 text-center">
              <p className={`font-extrabold text-base ${c}`}>{v}</p>
              <p className="text-white/60 text-[11px] mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 -mt-10 space-y-4 pb-6">
        {/* New quote requests */}
        {newRequests.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <p className="font-bold text-slate-900 text-sm">New Quote Requests</p>
              <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{newRequests.length} new</span>
            </div>
            <div className="divide-y divide-slate-50">
              {newRequests.map(r => (
                <div key={r.id} className="px-4 py-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-sm font-bold text-slate-900">{r.service}</p>
                      <div className="flex items-center justify-between mt-0.5">
                        <p className="text-xs text-slate-400">{r.location}</p>
                        <p className="text-xs font-bold text-slate-700">{r.range}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => act(r.id, 'accepted')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-turquoise-50 hover:bg-turquoise-100 text-turquoise-700 text-xs font-bold rounded-lg transition-colors">
                      <CheckCircle2 size={12}/> Accept
                    </button>
                    <button onClick={() => setViewRequest(r)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-colors">
                      <Eye size={12}/> View
                    </button>
                    <button onClick={() => act(r.id, 'passed')}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold rounded-lg transition-colors">
                      <XCircle size={12}/> Pass
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Today's schedule */}
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="font-bold text-slate-900 text-sm">Today's Jobs</p>
            <p className="text-xs text-slate-400">May 3, 2026</p>
          </div>
          <div className="divide-y divide-slate-50">
            {TODAY_JOBS.map((j, i) => (
              <button key={i} onClick={() => navigate(`/app/provider/job/${j.id}`)} className="w-full text-left flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                <div className="text-center w-14 shrink-0">
                  <Clock size={11} className="text-turquoise-400 mx-auto mb-0.5" />
                  <p className="text-[10px] font-bold text-turquoise-600 leading-tight">{j.time.split(' ')[0]}</p>
                  <p className="text-[10px] text-slate-400">{j.time.split(' ')[1]}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900">{j.task}</p>
                  <p className="text-[11px] text-slate-400">{j.client} · {j.job}</p>
                  <p className="text-[11px] text-slate-300 flex items-center gap-0.5 mt-0.5"><MapPin size={9}/>{j.addr}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          {[
            ['View All Jobs',  '/app/provider/jobs',     'bg-turquoise-500'],
            ['Earnings',       '/app/provider/earnings', 'bg-emerald-500'  ],
            ['Quote Requests', '/app/provider/quotes',   'bg-amber-500'    ],
            ['My Schedule',    '/app/provider/schedule', 'bg-slate-800'    ],
          ].map(([label, to, color]) => (
            <Link key={label} to={to} className={`${color} text-white rounded-2xl py-4 flex items-center justify-center gap-2 text-sm font-bold`}>
              {label} <ChevronRight size={14}/>
            </Link>
          ))}
        </div>
      </div>
      {/* Request detail bottom sheet */}
      {viewRequest && (
        <div className="fixed inset-0 z-50 flex items-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setViewRequest(null)} />

          {/* Sheet */}
          <div className="relative w-full max-w-sm mx-auto bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-slate-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-5 py-3 border-b border-slate-100">
              <div>
                <p className="font-extrabold text-slate-900 text-base">{viewRequest.service}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{viewRequest.id} · Received {viewRequest.received}</p>
              </div>
              <button onClick={() => setViewRequest(null)} className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center ml-3 shrink-0 mt-0.5">
                <X size={14} className="text-slate-500" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* Key details grid */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  ['Budget',   viewRequest.range],
                  ['Size',     `${viewRequest.sqft} sq ft`],
                  ['Timeline', viewRequest.timeline],
                ].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 rounded-xl py-2.5 text-center">
                    <p className="text-xs font-extrabold text-slate-900 leading-tight">{v}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{k}</p>
                  </div>
                ))}
              </div>

              {/* Location — city only, no street */}
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin size={13} className="text-slate-400 shrink-0" />
                <span className="font-medium">{viewRequest.location}</span>
                <span className="text-[11px] text-slate-400 ml-auto">(exact address shared after acceptance)</span>
              </div>

              {/* Scope of work */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">Scope of Work</p>
                <p className="text-sm text-slate-700 leading-relaxed">{viewRequest.desc}</p>
              </div>

              {/* Tags */}
              {viewRequest.tags && (
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">Project Includes</p>
                  <div className="flex flex-wrap gap-2">
                    {viewRequest.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-turquoise-50 text-turquoise-700 text-xs font-semibold rounded-full border border-turquoise-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI insight */}
              <div className="bg-turquoise-50 border border-turquoise-200 rounded-2xl p-4 flex items-start gap-3">
                <Sparkles size={14} className="text-turquoise-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-turquoise-800">AI Market Insight</p>
                  <p className="text-xs text-turquoise-700 mt-0.5 leading-relaxed">
                    Similar projects in {viewRequest.location} have averaged {viewRequest.range}. Your recent work aligns well — recommended to accept.
                  </p>
                </div>
              </div>

              {/* Privacy note */}
              <p className="text-[10px] text-slate-400 text-center">
                Client name and contact details are revealed only after you accept this request.
              </p>

              {/* CTA buttons */}
              <div className="flex gap-3 pb-2">
                <button onClick={() => act(viewRequest.id, 'accepted')}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-turquoise-500 hover:bg-turquoise-600 text-white font-bold rounded-2xl transition-colors shadow-lg">
                  <CheckCircle2 size={15}/> Accept
                </button>
                <button onClick={() => act(viewRequest.id, 'passed')}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-colors">
                  <XCircle size={15}/> Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MobileAppLayout>
  )
}
