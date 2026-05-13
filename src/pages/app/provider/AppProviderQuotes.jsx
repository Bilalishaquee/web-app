import { useState } from 'react'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { CheckCircle2, XCircle, Clock, MapPin, DollarSign, ChevronRight, Sparkles } from 'lucide-react'

const INITIAL_QUOTES = [
  {
    id:'Q-1294', service:'Full Kitchen Renovation', client:'Sarah Parker',     location:'Austin, TX',
    range:'$42K–$58K', budget:50000, sqft:280, received:'2h ago',   status:'new',
    desc:'Complete gut renovation — new cabinets, quartz countertops, tile backsplash, hardwood floors, and island addition.',
  },
  {
    id:'Q-1295', service:'Master Bathroom Remodel', client:'Jason Kim',        location:'Denver, CO',
    range:'$18K–$26K', budget:22000, sqft:120, received:'5h ago',   status:'new',
    desc:'Walk-in shower conversion, double vanity, heated floor, frameless glass door.',
  },
  {
    id:'Q-1296', service:'Basement Finishing',      client:'Amber Williams',   location:'Austin, TX',
    range:'$35K–$50K', budget:42000, sqft:900, received:'1d ago',   status:'new',
    desc:'Full basement finish — living room, wet bar, full bath, and home office. Egress window required.',
  },
  {
    id:'Q-1291', service:'Deck & Pergola Build',    client:'Robert Chang',     location:'Nashville, TN',
    range:'$22K–$30K', budget:26000, sqft:400, received:'2d ago',   status:'accepted',
    desc:'Composite deck with built-in seating, pergola cover, string lights, and gas line for BBQ.',
  },
  {
    id:'Q-1288', service:'Home Addition — Bedroom', client:'Linda Torres',     location:'Austin, TX',
    range:'$65K–$90K', budget:76000, sqft:320, received:'3d ago',   status:'passed',
    desc:'Primary bedroom addition over garage — full bath, walk-in closet, and balcony.',
  },
]

const STATUS_STYLES = {
  new:      'bg-amber-100 text-amber-700',
  accepted: 'bg-emerald-100 text-emerald-700',
  passed:   'bg-slate-100 text-slate-500',
}

export default function AppProviderQuotes() {
  const [quotes, setQuotes] = useState(INITIAL_QUOTES)
  const [tab, setTab]       = useState('new')
  const [detail, setDetail] = useState(null)

  const act = (id, action) =>
    setQuotes(qs => qs.map(q => q.id === id ? { ...q, status: action } : q))

  const visible = tab === 'all' ? quotes : quotes.filter(q => q.status === tab)

  if (detail) {
    return (
      <MobileAppLayout role="provider">
        <div className="pt-10 pb-8">
          <div className="flex items-center gap-3 px-4 mb-6">
            <button onClick={() => setDetail(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <ChevronRight size={18} className="text-slate-600 rotate-180" />
            </button>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg">{detail.service}</h1>
              <p className="text-[11px] text-slate-400">{detail.id}</p>
            </div>
          </div>

          <div className="px-4 space-y-4">
            {/* Client + details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Project Details</p>
              {[
                ['Client',   detail.client],
                ['Location', detail.location],
                ['Size',     `${detail.sqft} sq ft`],
                ['Budget',   detail.range],
                ['Received', detail.received],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-slate-400">{k}</span>
                  <span className="font-semibold text-slate-800">{v}</span>
                </div>
              ))}
            </div>

            {/* Scope */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Scope of Work</p>
              <p className="text-sm text-slate-700 leading-relaxed">{detail.desc}</p>
            </div>

            {/* AI suggestion */}
            <div className="bg-turquoise-50 border border-turquoise-200 rounded-2xl p-4 flex items-start gap-3">
              <Sparkles size={15} className="text-turquoise-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-turquoise-800">AI Market Insight</p>
                <p className="text-xs text-turquoise-700 mt-0.5">Based on your history, you typically complete similar projects for {detail.range}. This client budget aligns well — recommended to accept.</p>
              </div>
            </div>

            {detail.status === 'new' && (
              <div className="flex gap-3">
                <button onClick={() => { act(detail.id, 'accepted'); setDetail(null) }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-turquoise-500 hover:bg-turquoise-600 text-white font-bold rounded-2xl transition-colors">
                  <CheckCircle2 size={16}/> Accept
                </button>
                <button onClick={() => { act(detail.id, 'passed'); setDetail(null) }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-colors">
                  <XCircle size={16}/> Pass
                </button>
              </div>
            )}

            {detail.status !== 'new' && (
              <div className={`py-3 rounded-2xl text-center text-sm font-bold ${
                detail.status === 'accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {detail.status === 'accepted' ? 'Quote Accepted' : 'Passed on this request'}
              </div>
            )}
          </div>
        </div>
      </MobileAppLayout>
    )
  }

  return (
    <MobileAppLayout role="provider">
      <div className="pt-12 pb-6 space-y-4">
        <div className="flex items-center justify-between px-4">
          <h1 className="text-xl font-extrabold text-slate-900">Quote Requests</h1>
          {quotes.filter(q => q.status === 'new').length > 0 && (
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
              {quotes.filter(q => q.status === 'new').length} new
            </span>
          )}
        </div>

        <div className="px-4">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {['new','accepted','passed','all'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                  tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-3">
          {visible.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <Sparkles size={28} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-500">No {tab} requests</p>
            </div>
          )}
          {visible.map(q => (
            <button key={q.id} onClick={() => setDetail(q)}
              className="w-full text-left bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="font-bold text-slate-900 text-sm">{q.service}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{q.client}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLES[q.status]}`}>
                  {q.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-0.5"><MapPin size={10}/>{q.location}</span>
                <span className="flex items-center gap-0.5"><DollarSign size={10}/>{q.range}</span>
                <span className="flex items-center gap-0.5"><Clock size={10}/>{q.received}</span>
              </div>

              {q.status === 'new' && (
                <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                  <button onClick={() => act(q.id, 'accepted')}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-turquoise-50 hover:bg-turquoise-100 text-turquoise-700 text-xs font-bold rounded-xl transition-colors">
                    <CheckCircle2 size={12}/> Accept
                  </button>
                  <button onClick={() => act(q.id, 'passed')}
                    className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 text-xs font-bold rounded-xl transition-colors">
                    <XCircle size={12}/> Pass
                  </button>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </MobileAppLayout>
  )
}
