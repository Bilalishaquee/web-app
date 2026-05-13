import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { ChevronRight, Clock, DollarSign, MapPin, Star, CheckCircle2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'

const QUOTES = [
  {
    id: 'Q-1301', status: 'received', proId: 1, proName: 'Mike Rodriguez', proAvatar: 'MR', proColor: 'bg-turquoise-500',
    proRating: 4.9, project: 'Kitchen Full Remodel', received: '2h ago',
    quote: { low: 42000, high: 48000, timeline: '8–10 weeks', deposit: 10500 },
    scope: 'Full gut renovation including new custom cabinetry, quartz countertops, tile backsplash, hardwood flooring, updated electrical and plumbing, and new appliances hookup.',
    breakdown: [
      { item: 'Labor', amount: 18000 },
      { item: 'Cabinetry & Hardware', amount: 12000 },
      { item: 'Countertops (Quartz)', amount: 8500 },
      { item: 'Flooring & Tile', amount: 5500 },
      { item: 'Plumbing & Electrical', amount: 4000 },
    ],
  },
  {
    id: 'Q-1302', status: 'received', proId: 3, proName: 'Lisa Chen', proAvatar: 'LC', proColor: 'bg-violet-500',
    proRating: 4.8, project: 'Kitchen Full Remodel', received: '5h ago',
    quote: { low: 51000, high: 58000, timeline: '10–12 weeks', deposit: 12750 },
    scope: 'Designer-led full renovation. Custom European cabinetry, waterfall quartz island, hidden appliances, radiant floor heating, and statement lighting package.',
    breakdown: [
      { item: 'Labor', amount: 22000 },
      { item: 'Designer Cabinetry', amount: 16000 },
      { item: 'Countertops & Island', amount: 11000 },
      { item: 'Flooring & Tile', amount: 6000 },
      { item: 'Plumbing & Electrical', amount: 3000 },
    ],
  },
  {
    id: 'Q-1298', status: 'pending', proId: 2, proName: 'Carlos Morales', proAvatar: 'CM', proColor: 'bg-blue-500',
    proRating: 4.7, project: 'ADU Garage Conversion', received: '1d ago',
    quote: null,
    scope: null, breakdown: null,
  },
  {
    id: 'Q-1289', status: 'accepted', proId: 1, proName: 'Mike Rodriguez', proAvatar: 'MR', proColor: 'bg-turquoise-500',
    proRating: 4.9, project: 'Backyard Deck', received: 'Apr 1',
    quote: { low: 22000, high: 25000, timeline: '3–4 weeks', deposit: 5500 },
    scope: 'Composite deck 400 sqft with built-in bench seating, pergola, string lights, and gas BBQ hookup.', breakdown: [],
  },
]

const STATUS_META = {
  received: { label: 'Quote Received', dot: 'bg-turquoise-500', bg: 'bg-turquoise-50 text-turquoise-700' },
  pending:  { label: 'Awaiting Response', dot: 'bg-amber-400',  bg: 'bg-amber-50 text-amber-700'         },
  accepted: { label: 'Accepted',         dot: 'bg-emerald-500', bg: 'bg-emerald-50 text-emerald-700'     },
}

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={11} className={i <= n ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'} />
      ))}
    </div>
  )
}

function QuoteCard({ q, onBook }) {
  const [open, setOpen] = useState(false)
  const meta = STATUS_META[q.status]

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Card header */}
      <button onClick={() => q.quote && setOpen(o => !o)} className="w-full text-left p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0">
            {q.proAvatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <p className="font-bold text-slate-900 text-sm">{q.proName}</p>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.bg}`}>{meta.label}</span>
            </div>
            <Stars n={Math.round(q.proRating)} />
            <p className="text-[11px] text-slate-400 mt-1">{q.project} · {q.received}</p>
          </div>
        </div>

        {q.quote ? (
          <div className="mt-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Quoted range</p>
              <p className="font-extrabold text-slate-900">${(q.quote.low/1000).toFixed(0)}K – ${(q.quote.high/1000).toFixed(0)}K</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Timeline</p>
              <p className="font-bold text-slate-700 text-sm">{q.quote.timeline}</p>
            </div>
            {q.status === 'received' && (
              open ? <ChevronUp size={16} className="text-slate-400 ml-2" /> : <ChevronDown size={16} className="text-slate-400 ml-2" />
            )}
          </div>
        ) : (
          <div className="mt-3 bg-amber-50 rounded-xl px-3 py-2 flex items-center gap-2">
            <Clock size={12} className="text-amber-500" />
            <p className="text-xs text-amber-700">Waiting for the contractor to respond...</p>
          </div>
        )}
      </button>

      {/* Expanded detail */}
      {open && q.quote && (
        <div className="border-t border-slate-100 px-4 pb-4 space-y-3">
          <div className="pt-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Scope of Work</p>
            <p className="text-xs text-slate-600 leading-relaxed">{q.scope}</p>
          </div>

          {q.breakdown && q.breakdown.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Cost Breakdown</p>
              <div className="space-y-1.5">
                {q.breakdown.map(b => (
                  <div key={b.item} className="flex justify-between text-xs">
                    <span className="text-slate-500">{b.item}</span>
                    <span className="font-semibold text-slate-800">${b.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-slate-100 pt-1.5 flex justify-between text-sm font-bold">
                  <span className="text-slate-700">Estimated Total</span>
                  <span className="text-slate-900">${(q.quote.low/1000).toFixed(0)}K–${(q.quote.high/1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-turquoise-50 border border-turquoise-200 rounded-xl px-3 py-2 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-turquoise-600 font-semibold">Deposit to confirm</p>
              <p className="font-extrabold text-turquoise-800">${q.quote.deposit.toLocaleString()}</p>
            </div>
            <Sparkles size={14} className="text-turquoise-500" />
          </div>

          {q.status === 'received' && (
            <button onClick={() => onBook(q)}
              className="w-full py-3 bg-turquoise-500 hover:bg-turquoise-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
              <CheckCircle2 size={15}/> Accept & Book
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function AppUserQuotes() {
  const navigate  = useNavigate()
  const [tab, setTab] = useState('received')
  const [quotes]  = useState(QUOTES)

  const tabs = ['received', 'pending', 'accepted']
  const visible = tab === 'all' ? quotes : quotes.filter(q => q.status === tab)

  return (
    <MobileAppLayout role="user">
      <div className="pt-12 pb-6 space-y-4">
        <div className="flex items-center justify-between px-4">
          <h1 className="text-xl font-extrabold text-slate-900">My Quotes</h1>
          {quotes.filter(q => q.status === 'received').length > 0 && (
            <span className="bg-turquoise-100 text-turquoise-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
              {quotes.filter(q => q.status === 'received').length} new
            </span>
          )}
        </div>

        <div className="px-4">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                  tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}>{t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-3">
          {visible.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
              <DollarSign size={28} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-500">No {tab} quotes yet</p>
              <button onClick={() => navigate('/app/user/browse')}
                className="mt-3 text-xs font-bold text-turquoise-600">
                Browse Contractors
              </button>
            </div>
          )}
          {visible.map(q => (
            <QuoteCard key={q.id} q={q} onBook={q => navigate('/app/user/book', { state: { quote: q } })} />
          ))}
        </div>

        {/* Browse CTA */}
        <div className="px-4">
          <button onClick={() => navigate('/app/user/browse')}
            className="w-full flex items-center justify-center gap-2 py-3 border border-turquoise-300 text-turquoise-600 font-semibold text-sm rounded-2xl hover:bg-turquoise-50 transition-colors">
            Get More Quotes <ChevronRight size={14}/>
          </button>
        </div>
      </div>
    </MobileAppLayout>
  )
}
