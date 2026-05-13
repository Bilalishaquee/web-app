import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle2, AlertCircle, Filter } from 'lucide-react'

const TRANSACTIONS = [
  { id:'TXN-8821', type:'platform_fee',  desc:'Kitchen Remodel #P-1247',       from:'James Carter',      to:'Platform',        amount:4500,   date:'May 3, 2025',  status:'completed' },
  { id:'TXN-8820', type:'payout',        desc:'Weekly payout — Mike Rodriguez', from:'Platform',           to:'Mike Rodriguez',  amount:12400,  date:'May 3, 2025',  status:'completed' },
  { id:'TXN-8819', type:'payment',       desc:'Milestone 2 — Full Reno #P-1089',from:'Emily Rodriguez',   to:'Escrow',          amount:54000,  date:'May 2, 2025',  status:'processing'},
  { id:'TXN-8818', type:'platform_fee',  desc:'HVAC Upgrade #P-1301',           from:'Thomas Brown',      to:'Platform',        amount:850,    date:'May 2, 2025',  status:'completed' },
  { id:'TXN-8817', type:'payout',        desc:'Weekly payout — Carlos Morales', from:'Platform',           to:'Carlos Morales',  amount:5200,   date:'May 2, 2025',  status:'processing'},
  { id:'TXN-8816', type:'platform_fee',  desc:'Window Replacement #P-1278',     from:'Linda Davis',       to:'Platform',        amount:1800,   date:'May 1, 2025',  status:'completed' },
  { id:'TXN-8815', type:'payout',        desc:'Weekly payout — Tony Nguyen',    from:'Platform',           to:'Tony Nguyen',     amount:3800,   date:'May 1, 2025',  status:'completed' },
  { id:'TXN-8814', type:'payment',       desc:'Deposit — Basement Finish #P-1205',from:'Amanda Foster',   to:'Escrow',          amount:19500,  date:'Apr 30, 2025', status:'completed' },
  { id:'TXN-8813', type:'payout',        desc:'Weekly payout — Jennifer Walsh', from:'Platform',           to:'Jennifer Walsh',  amount:4100,   date:'Apr 30, 2025', status:'completed' },
  { id:'TXN-8812', type:'refund',        desc:'Cancelled quote #Q-1282',        from:'Platform',           to:'Lisa Morgan',     amount:250,    date:'Apr 29, 2025', status:'completed' },
  { id:'TXN-8811', type:'platform_fee',  desc:'Deck Construction #P-1289',      from:'Patricia Moore',    to:'Platform',        amount:2400,   date:'Apr 29, 2025', status:'completed' },
  { id:'TXN-8810', type:'payment',       desc:'Final payment — Deck #P-1198',   from:'David Williams',    to:'Escrow',          amount:28000,  date:'Apr 28, 2025', status:'completed' },
]

const TYPE_STYLE = {
  platform_fee: { cls:'bg-turquoise-50 text-turquoise-700', icon: ArrowDownLeft, label:'Fee'      },
  payout:       { cls:'bg-violet-50    text-violet-700',    icon: ArrowUpRight,  label:'Payout'   },
  payment:      { cls:'bg-blue-50      text-blue-700',      icon: DollarSign,    label:'Payment'  },
  refund:       { cls:'bg-amber-50     text-amber-700',     icon: TrendingUp,    label:'Refund'   },
}

const STATUS_STYLE = {
  completed:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  processing: 'bg-amber-50   text-amber-700   border border-amber-200',
  failed:     'bg-red-50     text-red-600     border border-red-200',
}

const PAYOUTS = [
  { name:'Mike Rodriguez',  amount:12400, jobs:4, status:'completed', date:'May 3' },
  { name:'Carlos Morales',  amount:5200,  jobs:2, status:'processing',date:'May 3' },
  { name:'Tony Nguyen',     amount:3800,  jobs:3, status:'completed', date:'May 2' },
  { name:'Jennifer Walsh',  amount:4100,  jobs:2, status:'completed', date:'May 1' },
  { name:'Maria Santos',    amount:2900,  jobs:2, status:'pending',   date:'May 5' },
]

export default function AdminPayments() {
  const [tab, setTab] = useState('transactions')

  const monthlyRevenue = 284500
  const platformFees   = TRANSACTIONS.filter(t => t.type === 'platform_fee').reduce((a, t) => a + t.amount, 0)
  const totalPayouts   = TRANSACTIONS.filter(t => t.type === 'payout').reduce((a, t) => a + t.amount, 0)

  return (
    <AdminLayout title="Payments & Finance" subtitle="Transactions, payouts, and revenue tracking">
      <div className="p-6 space-y-5">

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:'Monthly Revenue',    value:`$${(monthlyRevenue/1000).toFixed(1)}K`, sub:'May 2026',           color:'bg-turquoise-500' },
            { label:'Platform Fees (MTD)', value:`$${(platformFees).toLocaleString()}`, sub:'10% commission',      color:'bg-violet-500'    },
            { label:'Provider Payouts',   value:`$${(totalPayouts/1000).toFixed(1)}K`,  sub:'This week',           color:'bg-blue-500'      },
            { label:'Escrow Held',        value:'$247.3K',                              sub:'14 active projects',  color:'bg-amber-500'     },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className={`w-2 h-2 ${color} rounded-full mb-3`} />
              <p className="text-2xl font-extrabold text-slate-900">{value}</p>
              <p className="text-xs font-medium text-slate-500 mt-0.5">{label}</p>
              <p className="text-[11px] text-slate-400">{sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
          {[['transactions','Transactions'],['payouts','Provider Payouts']].map(([v,l]) => (
            <button key={v} onClick={() => setTab(v)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                tab === v ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>{l}</button>
          ))}
        </div>

        {tab === 'transactions' ? (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Transaction','Type','From','To','Amount','Date','Status'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TRANSACTIONS.map(t => {
                    const ty = TYPE_STYLE[t.type]
                    const Icon = ty.icon
                    return (
                      <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-semibold text-slate-800 text-xs">{t.desc}</p>
                          <p className="text-[11px] text-slate-400 font-mono">{t.id}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${ty.cls}`}>
                            <Icon size={10} /> {ty.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{t.from}</td>
                        <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{t.to}</td>
                        <td className="px-4 py-3 text-sm font-bold text-slate-900 whitespace-nowrap">
                          ${t.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{t.date}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${STATUS_STYLE[t.status]}`}>
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {PAYOUTS.map(p => (
              <div key={p.name} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
                <div className="w-9 h-9 bg-turquoise-100 text-turquoise-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {p.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.jobs} jobs · Due {p.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-lg">${p.amount.toLocaleString()}</p>
                  <span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[p.status] || 'bg-slate-100 text-slate-500'}`}>
                    {p.status}
                  </span>
                </div>
                {p.status === 'pending' && (
                  <button className="shrink-0 px-4 py-2 bg-turquoise-500 hover:bg-turquoise-600 text-white text-xs font-bold rounded-lg transition-colors">
                    Process
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </AdminLayout>
  )
}
