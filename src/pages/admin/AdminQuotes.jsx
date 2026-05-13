import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Sparkles, Clock, CheckCircle2, XCircle, Search, ChevronDown, Eye, RotateCcw } from 'lucide-react'

const QUOTES = [
  { id:'Q-1294', client:'Sarah Parker',     service:'Full Kitchen Renovation',      range:'$42,000 – $58,000', ai_confidence:91, created:'May 3, 2025',  status:'pending',  rooms:['Kitchen'], sqft:320,  notes:'Includes custom cabinetry, quartz countertops, full appliance package.'  },
  { id:'Q-1293', client:'Mark Stevens',     service:'Master Bathroom Remodel',      range:'$18,000 – $24,000', ai_confidence:94, created:'May 3, 2025',  status:'approved', rooms:['Bathroom'],sqft:120,  notes:'Tile shower, double vanity, heated floors, smart toilet.'               },
  { id:'Q-1292', client:'Rachel Turner',    service:'Home Addition (500 sq ft)',     range:'$120,000 – $180,000',ai_confidence:78, created:'May 2, 2025', status:'pending',  rooms:['General'], sqft:500,  notes:'Two-story addition above existing garage. Requires structural review.'   },
  { id:'Q-1291', client:'James Wright',     service:'Basement Finishing',           range:'$35,000 – $55,000', ai_confidence:87, created:'May 2, 2025',  status:'approved', rooms:['Basement'],sqft:900,  notes:'Egress window, bedroom, full bath, wet bar, and recreation room.'       },
  { id:'Q-1290', client:'Lisa Morgan',      service:'Roof Replacement (2400 sq ft)',range:'$15,000 – $28,000', ai_confidence:89, created:'May 1, 2025',  status:'expired',  rooms:['Roof'],    sqft:2400, notes:'Architectural shingles, gutters, ridge vents. Expired — client no response.'},
  { id:'Q-1289', client:'Daniel Ross',      service:'Deck Construction',            range:'$22,000 – $35,000', ai_confidence:92, created:'May 1, 2025',  status:'approved', rooms:['Outdoor'], sqft:400,  notes:'Composite decking, built-in seating, pergola, landscape lighting.'       },
  { id:'Q-1288', client:'Emily Clark',      service:'Primary Suite Addition',       range:'$68,000 – $95,000', ai_confidence:82, created:'Apr 30, 2025', status:'pending',  rooms:['General'], sqft:650,  notes:'Walk-in closet, spa bath, sitting area. Requires structural engineer.'   },
  { id:'Q-1287', client:'Carlos Vega',      service:'Whole-Home Painting',          range:'$8,200 – $12,000',  ai_confidence:96, created:'Apr 30, 2025', status:'approved', rooms:['Painting'],sqft:2800, notes:'Interior 4 bed / 3 bath, 9ft ceilings. Includes trim and doors.'         },
  { id:'Q-1286', client:'Nina Patel',       service:'HVAC Replacement',             range:'$9,500 – $14,500',  ai_confidence:90, created:'Apr 29, 2025', status:'expired',  rooms:['HVAC'],    sqft:1800, notes:'2-ton unit + mini split for bonus room. Expired after 72h.'              },
  { id:'Q-1285', client:'Thomas Reed',      service:'Flooring Replacement',         range:'$14,000 – $20,000', ai_confidence:93, created:'Apr 29, 2025', status:'approved', rooms:['Flooring'],sqft:1600, notes:'Engineered hardwood throughout main level, tile in kitchen and baths.'   },
]

const STATUS_STYLE = {
  pending:  { cls: 'bg-amber-50     text-amber-700   border border-amber-200',   label: 'Pending Review', icon: Clock        },
  approved: { cls: 'bg-emerald-50   text-emerald-700  border border-emerald-200', label: 'Approved',       icon: CheckCircle2 },
  expired:  { cls: 'bg-slate-100    text-slate-500    border border-slate-200',   label: 'Expired',        icon: XCircle      },
}

export default function AdminQuotes() {
  const [filter, setFilter]   = useState('all')
  const [search, setSearch]   = useState('')
  const [expanded, setExpanded] = useState(null)

  const visible = QUOTES.filter(q => {
    const matchFilter = filter === 'all' || q.status === filter
    const matchSearch = !search || q.client.toLowerCase().includes(search.toLowerCase()) || q.service.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const pendingCount  = QUOTES.filter(q => q.status === 'pending').length
  const approvedCount = QUOTES.filter(q => q.status === 'approved').length

  return (
    <AdminLayout title="Quotes & AI" subtitle={`${pendingCount} pending review · ${approvedCount} approved`}>
      <div className="p-6 space-y-4">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            ['AI Quote Requests (Today)',  89, 'text-turquoise-600'],
            ['Acceptance Rate',            '68.4%', 'text-emerald-600'],
            ['Avg. Response Time',         '1.4 hrs', 'text-slate-900'],
          ].map(([l,v,cls]) => (
            <div key={l} className="bg-white rounded-xl border border-slate-200 px-5 py-4">
              <p className="text-xs text-slate-500 mb-1">{l}</p>
              <p className={`text-2xl font-extrabold ${cls}`}>{v}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {['all','pending','approved','expired'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                  filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
            ))}
          </div>
          <div className="relative ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input placeholder="Search quotes…" value={search} onChange={e=>setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-turquoise-300" />
          </div>
        </div>

        {/* Quote cards */}
        <div className="space-y-3">
          {visible.map(q => {
            const s = STATUS_STYLE[q.status]
            const isOpen = expanded === q.id
            return (
              <div key={q.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-9 h-9 bg-turquoise-50 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles size={16} className="text-turquoise-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-900 text-sm">{q.client}</p>
                      <span className="text-slate-300">·</span>
                      <p className="text-xs text-slate-500">{q.id}</p>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{q.service}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-900 text-sm">{q.range}</p>
                    <p className="text-[11px] text-slate-400">{q.created}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${s.cls}`}>{s.label}</span>
                    <button onClick={() => setExpanded(isOpen ? null : q.id)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                      <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="px-4 pb-4 pt-0 border-t border-slate-50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 mt-3">
                      {[
                        ['AI Confidence', `${q.ai_confidence}%`],
                        ['Square Footage', `${q.sqft.toLocaleString()} sq ft`],
                        ['Scope', q.rooms.join(', ')],
                        ['Quote Range', q.range],
                      ].map(([l,v]) => (
                        <div key={l} className="bg-slate-50 rounded-lg p-2.5">
                          <p className="text-[10px] text-slate-400">{l}</p>
                          <p className="text-sm font-bold text-slate-800">{v}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">{q.notes}</p>
                    {q.status === 'pending' && (
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg transition-colors">
                          <CheckCircle2 size={13} /> Approve
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors">
                          <XCircle size={13} /> Reject
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg transition-colors">
                          <Eye size={13} /> Review Details
                        </button>
                      </div>
                    )}
                    {q.status === 'expired' && (
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold rounded-lg transition-colors">
                        <RotateCcw size={13} /> Resend Quote
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
