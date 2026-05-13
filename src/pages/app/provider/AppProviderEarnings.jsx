import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { DollarSign, ArrowDownLeft, ArrowUpRight, RefreshCw, TrendingUp, Landmark } from 'lucide-react'

const MONTHS = ['Jan','Feb','Mar','Apr','May']
const MONTHLY = [18400, 22100, 19800, 24600, 12400]

const TRANSACTIONS = [
  { id:'P-2041', type:'payout',   amount:12400, project:'Kitchen Remodel',    client:'Sarah Johnson',    date:'May 3, 2026',  status:'completed' },
  { id:'P-2038', type:'payout',   amount:8200,  project:'Full Renovation',    client:'Emily Rodriguez',  date:'Apr 28, 2026', status:'completed' },
  { id:'P-2031', type:'payout',   amount:15600, project:'ADU Conversion',     client:'Chris Wilson',     date:'Apr 15, 2026', status:'completed' },
  { id:'P-2024', type:'hold',     amount:9400,  project:'Bathroom Remodel',   client:'Barbara Anderson', date:'Due May 20',   status:'pending'   },
  { id:'P-2017', type:'payout',   amount:5800,  project:'Composite Deck',     client:'David Williams',   date:'Mar 30, 2026', status:'completed' },
  { id:'P-2009', type:'bonus',    amount:500,   project:'Platform Bonus',     client:'A-1 Renovations',  date:'Mar 28, 2026', status:'completed' },
]

const TYPE_META = {
  payout: { icon: ArrowDownLeft, color:'text-emerald-500', bg:'bg-emerald-50',  label:'Payout'  },
  hold:   { icon: RefreshCw,     color:'text-amber-500',   bg:'bg-amber-50',    label:'Pending' },
  bonus:  { icon: TrendingUp,    color:'text-turquoise-600', bg:'bg-turquoise-50', label:'Bonus'   },
}

const maxBar = Math.max(...MONTHLY)

export default function AppProviderEarnings() {
  const navigate  = useNavigate()
  const [tab, setTab] = useState('all')

  const visible = tab === 'all'
    ? TRANSACTIONS
    : TRANSACTIONS.filter(t => t.type === tab || t.status === tab)

  const mtd  = MONTHLY[4]
  const ytd  = MONTHLY.reduce((s, v) => s + v, 0)
  const pending = TRANSACTIONS.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0)

  return (
    <MobileAppLayout role="provider">
      <div className="pt-12 pb-8 space-y-5">
        <h1 className="text-xl font-extrabold text-slate-900 px-4">Earnings</h1>

        {/* KPI row */}
        <div className="px-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              ['This Month', `$${(mtd/1000).toFixed(1)}K`,   'text-turquoise-700', 'bg-turquoise-50'],
              ['Pending',    `$${(pending/1000).toFixed(1)}K`,'text-amber-700',     'bg-amber-50'    ],
              ['YTD',        `$${(ytd/1000).toFixed(0)}K`,   'text-slate-900',     'bg-slate-50'    ],
            ].map(([l, v, tc, bg]) => (
              <div key={l} className={`${bg} rounded-2xl p-3 text-center`}>
                <p className={`font-extrabold text-base ${tc}`}>{v}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <p className="text-xs font-bold text-slate-500 mb-4">Monthly Earnings (2026)</p>
            <div className="flex items-end gap-2 h-24">
              {MONTHLY.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <p className="text-[9px] text-slate-400">${(v/1000).toFixed(0)}K</p>
                  <div
                    className={`w-full rounded-t-lg transition-all ${i === 4 ? 'bg-turquoise-500' : 'bg-turquoise-200'}`}
                    style={{ height: `${(v / maxBar) * 72}px` }}
                  />
                  <p className="text-[10px] text-slate-500 font-medium">{MONTHS[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payout method */}
        <div className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Landmark size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">Chase Business Checking</p>
              <p className="text-[11px] text-slate-400">····4821 · Next payout May 15</p>
            </div>
            <button onClick={() => navigate('/app/provider/bank-account')} className="text-xs font-semibold text-turquoise-600">Edit</button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="px-4">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {['all','payout','hold','bonus'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                  tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}>{t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}</button>
            ))}
          </div>
        </div>

        {/* Transaction list */}
        <div className="px-4 space-y-2.5">
          {visible.map(t => {
            const meta = TYPE_META[t.type]
            const Icon = meta.icon
            return (
              <button key={t.id} onClick={() => navigate(`/app/provider/payout-detail?id=${t.id}`)} className="w-full text-left bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3 shadow-sm hover:border-turquoise-300 transition-colors">
                <div className={`w-9 h-9 ${meta.bg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon size={16} className={meta.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{t.project}</p>
                  <p className="text-[11px] text-slate-400 truncate">{t.client} · {t.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-extrabold ${t.status === 'pending' ? 'text-amber-600' : 'text-emerald-600'}`}>
                    +${t.amount.toLocaleString()}
                  </p>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    t.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>{t.status}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </MobileAppLayout>
  )
}
