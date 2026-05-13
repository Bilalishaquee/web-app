import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Search, MapPin, DollarSign, Calendar, X, ChevronRight } from 'lucide-react'

const PROJECTS = [
  { id:'P-1247', name:'Kitchen Full Remodel',      client:'Sarah Johnson',     provider:'Mike Rodriguez',  service:'Kitchen',          city:'Austin, TX',     start:'Apr 1, 2025',  budget:45000,  status:'active',    progress:48 },
  { id:'P-1248', name:'Master Bathroom Update',    client:'Michael Chen',      provider:'Carlos Morales',  service:'Bathroom',         city:'Denver, CO',     start:'Apr 15, 2025', budget:12500,  status:'active',    progress:22 },
  { id:'P-1089', name:'Full Home Renovation',      client:'Emily Rodriguez',   provider:'Mike Rodriguez',  service:'General',          city:'Miami, FL',      start:'Mar 1, 2025',  budget:180000, status:'active',    progress:61 },
  { id:'P-1198', name:'Composite Deck Addition',   client:'David Williams',    provider:'Tony Nguyen',     service:'Outdoor',          city:'Nashville, TN',  start:'Feb 20, 2025', budget:28000,  status:'completed', progress:100},
  { id:'P-1205', name:'Basement Finishing',        client:'Amanda Foster',     provider:'Carlos Morales',  service:'Basement',         city:'Portland, OR',   start:'Mar 10, 2025', budget:65000,  status:'active',    progress:35 },
  { id:'P-1176', name:'Roof Replacement',          client:'Robert Kim',        provider:'Derek Johnson',   service:'Roofing',          city:'Seattle, WA',    start:'Jan 15, 2025', budget:22000,  status:'completed', progress:100},
  { id:'P-1301', name:'HVAC System Upgrade',       client:'Thomas Brown',      provider:'Alex Thompson',   service:'HVAC',             city:'Chicago, IL',    start:'Apr 20, 2025', budget:8500,   status:'active',    progress:65 },
  { id:'P-1278', name:'Window Replacement (12)',   client:'Linda Davis',       provider:'Robert Chang',    service:'Electrical',       city:'Boston, MA',     start:'Apr 5, 2025',  budget:18000,  status:'active',    progress:80 },
  { id:'P-1312', name:'Garage Conversion to ADU',  client:'Christopher Wilson',provider:'Carlos Morales',  service:'General',          city:'Los Angeles, CA',start:'Apr 18, 2025', budget:85000,  status:'active',    progress:10 },
  { id:'P-1289', name:'Kitchen Cabinet Refresh',   client:'Patricia Moore',    provider:'Jennifer Walsh',  service:'Interior Design',  city:'Houston, TX',    start:'Apr 25, 2025', budget:24000,  status:'active',    progress:5  },
  { id:'P-1320', name:'Bathroom + Half Bath Reno', client:'Barbara Anderson',  provider:'Maria Santos',    service:'Flooring',         city:'San Francisco, CA',start:'Apr 28, 2025',budget:38000, status:'active',   progress:2  },
  { id:'P-1253', name:'Master Bedroom Repaint',    client:'William Jackson',   provider:'Susan Park',      service:'Painting',         city:'Dallas, TX',     start:'Mar 22, 2025', budget:6800,   status:'completed', progress:100},
]

const STATUS_STYLE = {
  active:     { cls:'bg-turquoise-50 text-turquoise-700 border border-turquoise-200', label:'Active'    },
  completed:  { cls:'bg-emerald-50   text-emerald-700   border border-emerald-200',   label:'Completed' },
  'on-hold':  { cls:'bg-amber-50     text-amber-700     border border-amber-200',     label:'On Hold'   },
}

export default function AdminProjects() {
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [selected, setSelected] = useState(null)

  const visible = PROJECTS.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.provider.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const totalBudget = PROJECTS.reduce((a, p) => a + p.budget, 0)
  const activeCount = PROJECTS.filter(p => p.status === 'active').length

  return (
    <AdminLayout title="Projects" subtitle={`${PROJECTS.length} total projects · $${(totalBudget/1000).toFixed(0)}K total value`}>
      <div className="p-6 space-y-4">

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            ['Active Projects',  activeCount,              'text-turquoise-600'],
            ['Completed',        PROJECTS.filter(p=>p.status==='completed').length, 'text-emerald-600'],
            ['Total Value',      `$${(totalBudget/1000).toFixed(0)}K`, 'text-slate-900'],
          ].map(([l,v,cls]) => (
            <div key={l} className="bg-white rounded-xl border border-slate-200 px-5 py-4">
              <p className="text-xs text-slate-500 mb-1">{l}</p>
              <p className={`text-2xl font-extrabold ${cls}`}>{v}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input placeholder="Search projects…" value={search} onChange={e=>setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-turquoise-300" />
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {['all','active','completed','on-hold'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                  filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}>{f === 'on-hold' ? 'On Hold' : f.charAt(0).toUpperCase()+f.slice(1)}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Project','Client','Provider','Service','Started','Budget','Progress','Status',''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {visible.map(p => {
                  const s = STATUS_STYLE[p.status] || STATUS_STYLE.active
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900 whitespace-nowrap">{p.name}</p>
                        <p className="text-[11px] text-slate-400">{p.id}</p>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{p.client}</td>
                      <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{p.provider}</td>
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{p.service}</td>
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{p.start}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-slate-800 whitespace-nowrap">${p.budget.toLocaleString()}</td>
                      <td className="px-4 py-3 min-w-[100px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-turquoise-500 rounded-full" style={{width:`${p.progress}%`}} />
                          </div>
                          <span className="text-[11px] font-semibold text-slate-500">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${s.cls}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelected(p)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                          <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="relative bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Project Details</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <p className="text-[11px] text-slate-400 font-mono">{selected.id}</p>
                <p className="text-lg font-bold text-slate-900 mt-0.5">{selected.name}</p>
                <span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1 ${(STATUS_STYLE[selected.status]||STATUS_STYLE.active).cls}`}>
                  {(STATUS_STYLE[selected.status]||STATUS_STYLE.active).label}
                </span>
              </div>

              <div className="space-y-3">
                {[['Client', selected.client],['Provider', selected.provider],['Service Type', selected.service]].map(([l,v])=>(
                  <div key={l} className="flex items-center justify-between py-2 border-b border-slate-50">
                    <span className="text-xs text-slate-500">{l}</span>
                    <span className="text-sm font-semibold text-slate-800">{v}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[['Budget', `$${selected.budget.toLocaleString()}`],[' Started', selected.start],['Location', selected.city],['Progress', `${selected.progress}%`]].map(([l,v])=>(
                  <div key={l} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[11px] text-slate-500">{l}</p>
                    <p className="font-bold text-slate-900 text-sm">{v}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1.5">Overall Progress</p>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-turquoise-500 rounded-full transition-all" style={{width:`${selected.progress}%`}} />
                </div>
                <p className="text-xs text-slate-400 mt-1">{selected.progress}% complete</p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-turquoise-500 hover:bg-turquoise-600 text-white text-sm font-semibold rounded-lg transition-colors">View Full Project</button>
                <button className="flex-1 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold rounded-lg transition-colors">Message Parties</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
