import { useState } from 'react'
import ProviderLayout from '../../components/layout/ProviderLayout'
import { DollarSign, TrendingUp, Clock, CheckCircle2, Download } from 'lucide-react'

const MONTHLY = [
  { month:'Nov', earned:7200, jobs:3 },
  { month:'Dec', earned:8100, jobs:4 },
  { month:'Jan', earned:9400, jobs:4 },
  { month:'Feb', earned:10200,jobs:5 },
  { month:'Mar', earned:11100,jobs:5 },
  { month:'Apr', earned:11800,jobs:6 },
  { month:'May', earned:12400,jobs:4 },
]
const maxEarned = Math.max(...MONTHLY.map(m => m.earned))

const TRANSACTIONS = [
  { id:'PAY-0021', project:'Kitchen Remodel #P-1247',  milestone:'Milestone 3 — Cabinetry', amount:13500, fee:1350, net:12150, date:'May 3, 2025',  status:'completed' },
  { id:'PAY-0020', project:'Full Renovation #P-1089',   milestone:'Milestone 5 — Drywall',   amount:36000, fee:3600, net:32400, date:'May 1, 2025',  status:'processing'},
  { id:'PAY-0019', project:'Deck Addition #P-1198',     milestone:'Final Payment',            amount:28000, fee:2800, net:25200, date:'Apr 28, 2025', status:'completed' },
  { id:'PAY-0018', project:'Kitchen Remodel #P-1247',  milestone:'Milestone 2 — Electrical', amount:8200,  fee:820,  net:7380,  date:'Apr 20, 2025', status:'completed' },
  { id:'PAY-0017', project:'Full Renovation #P-1089',   milestone:'Milestone 4 — MEP',        amount:28000, fee:2800, net:25200, date:'Apr 12, 2025', status:'completed' },
  { id:'PAY-0016', project:'Kitchen Remodel #P-1247',  milestone:'Milestone 1 — Demo & Rough',amount:6800,  fee:680,  net:6120,  date:'Apr 5, 2025',  status:'completed' },
]

const PENDING_PAYOUTS = [
  { project:'Full Renovation #P-1089',  amount:32400, expected:'May 6, 2025' },
  { project:'ADU Conversion #P-1312',   amount:8500,  expected:'May 12, 2025' },
]

export default function ProviderEarnings() {
  const [period, setPeriod] = useState('month')

  const totalEarned   = MONTHLY.reduce((a, m) => a + m.earned, 0)
  const monthEarned   = MONTHLY[MONTHLY.length - 1].earned
  const pendingTotal  = PENDING_PAYOUTS.reduce((a, p) => a + p.amount, 0)

  return (
    <ProviderLayout title="Earnings" subtitle="Your revenue, payouts, and financial summary">
      <div className="p-6 space-y-5">

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:'This Month',     value:`$${monthEarned.toLocaleString()}`,  sub:'Net after platform fee', color:'text-turquoise-600 bg-turquoise-50' },
            { label:'Pending Payout', value:`$${pendingTotal.toLocaleString()}`, sub:'Est. 3-5 business days',  color:'text-amber-600 bg-amber-50'         },
            { label:'YTD Earnings',   value:`$${totalEarned.toLocaleString()}`,  sub:'Jan – May 2026',          color:'text-emerald-600 bg-emerald-50'     },
            { label:'Platform Fee',   value:'10%',                               sub:'Per completed project',   color:'text-slate-600 bg-slate-100'        },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500 mb-2">{label}</p>
              <p className={`text-xl font-extrabold ${color.split(' ')[0]}`}>{value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Earnings chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-slate-900">Monthly Earnings</h2>
              <p className="text-xs text-slate-400">Net revenue after 10% platform fee</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-xs font-semibold rounded-lg transition-colors">
              <Download size={12}/> Export
            </button>
          </div>
          <div className="flex items-end gap-3 h-36">
            {MONTHLY.map(({ month, earned, jobs }) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-600">${(earned/1000).toFixed(1)}K</span>
                <div className="w-full rounded-t-lg bg-turquoise-500 transition-all"
                  style={{ height: `${(earned / maxEarned) * 100}%` }} />
                <span className="text-[11px] text-slate-400">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending payouts */}
        {PENDING_PAYOUTS.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={15} className="text-amber-600" />
              <h2 className="font-bold text-amber-800 text-sm">Pending Payouts</h2>
            </div>
            <div className="space-y-2">
              {PENDING_PAYOUTS.map(p => (
                <div key={p.project} className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{p.project}</p>
                    <p className="text-xs text-slate-400">Expected {p.expected}</p>
                  </div>
                  <p className="font-bold text-slate-900">${p.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transaction history */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm">Payment History</h2>
            <button className="flex items-center gap-1 text-xs text-turquoise-600 font-semibold hover:underline">
              <Download size={11}/> Download CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Transaction','Project','Milestone','Gross','Fee (10%)','Net','Date','Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {TRANSACTIONS.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-[11px] font-mono text-slate-400">{t.id}</td>
                    <td className="px-4 py-3 text-xs font-medium text-slate-700 whitespace-nowrap">{t.project}</td>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{t.milestone}</td>
                    <td className="px-4 py-3 text-xs text-slate-700 font-semibold">${t.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-red-400">-${t.fee.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm font-bold text-slate-900">${t.net.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">{t.date}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        t.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {t.status === 'completed' ? <CheckCircle2 size={10}/> : <Clock size={10}/>}
                        {t.status.charAt(0).toUpperCase()+t.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </ProviderLayout>
  )
}
