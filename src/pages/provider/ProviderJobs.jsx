import { useState } from 'react'
import ProviderLayout from '../../components/layout/ProviderLayout'
import { MapPin, DollarSign, Clock, Calendar, X, MessageSquare, Camera, ChevronRight } from 'lucide-react'

const JOBS = [
  {
    id:'P-1247', name:'Kitchen Full Remodel', client:'Sarah Johnson', clientPhone:'+1 (512) 555-0187',
    address:'2847 Oak Street, Austin, TX 78701', service:'Kitchen Renovation', budget:45000,
    start:'Apr 1, 2025', end:'Jun 15, 2025', progress:48, status:'active',
    milestones:['Demolition ✓','Plumbing rough-in ✓','Electrical rough-in ✓','Drywall ✓','Cabinetry (In Progress)','Countertops','Backsplash','Appliances','Final walkthrough'],
    img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80',
  },
  {
    id:'P-1089', name:'Full Home Renovation', client:'Emily Rodriguez', clientPhone:'+1 (786) 555-0312',
    address:'1524 Bayshore Drive, Miami, FL 33137', service:'General Contractor', budget:180000,
    start:'Mar 1, 2025', end:'Jul 30, 2025', progress:61, status:'active',
    milestones:['Demo & site prep ✓','Foundation work ✓','Framing ✓','MEP rough-in ✓','Insulation ✓','Drywall (In Progress)','Flooring','Interior finishes','Exterior','Final inspection'],
    img:'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop&q=80',
  },
  {
    id:'P-1312', name:'Garage to ADU Conversion', client:'Christopher Wilson', clientPhone:'+1 (213) 555-0342',
    address:'914 Silver Lake Blvd, Los Angeles, CA 90039', service:'General Contractor', budget:85000,
    start:'Apr 18, 2025', end:'Aug 10, 2025', progress:10, status:'active',
    milestones:['Permits (In Progress)','Structural','Plumbing','Electrical','Framing','Drywall','Kitchen','Bathroom','Finish work'],
    img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80',
  },
  {
    id:'P-1320', name:'Bathroom & Half Bath Reno', client:'Barbara Anderson', clientPhone:'+1 (415) 555-0456',
    address:'2204 Market Street, San Francisco, CA 94114', service:'Bathroom Renovation', budget:38000,
    start:'Apr 28, 2025', end:'Jun 5, 2025', progress:2, status:'planning',
    milestones:['Design approval (In Progress)','Material selection','Demo','Plumbing','Tile','Fixtures','Paint','Final'],
    img:'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&auto=format&fit=crop&q=80',
  },
  {
    id:'P-1198', name:'Composite Deck Addition', client:'David Williams', clientPhone:'+1 (615) 555-0421',
    address:'4110 Hillwood Dr, Nashville, TN 37215', service:'Outdoor', budget:28000,
    start:'Feb 20, 2025', end:'Mar 28, 2025', progress:100, status:'completed',
    milestones:['Permits ✓','Footings ✓','Frame ✓','Decking ✓','Railing ✓','Lighting ✓','Final walkthrough ✓'],
    img:'https://images.unsplash.com/photo-1558618047-f5e2b7f0c7cf?w=600&auto=format&fit=crop&q=80',
  },
]

const STATUS = {
  active:    'bg-turquoise-50 text-turquoise-700',
  planning:  'bg-blue-50      text-blue-700',
  completed: 'bg-emerald-50   text-emerald-700',
}

export default function ProviderJobs() {
  const [tab, setTab]       = useState('active')
  const [selected, setSelected] = useState(null)

  const visible = tab === 'all' ? JOBS : JOBS.filter(j => j.status === tab)

  return (
    <ProviderLayout title="My Jobs" subtitle={`${JOBS.filter(j=>j.status==='active').length} active · ${JOBS.filter(j=>j.status==='completed').length} completed`}>
      <div className="p-6 space-y-4">

        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
          {['active','planning','completed','all'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
          ))}
        </div>

        <div className="space-y-4">
          {visible.map(j => (
            <div key={j.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => setSelected(j)}>
              <div className="flex">
                <img src={j.img} alt={j.name} className="w-32 sm:w-44 object-cover shrink-0" />
                <div className="flex-1 p-5 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="font-bold text-slate-900">{j.name}</p>
                      <p className="text-xs text-slate-400">{j.id} · {j.client}</p>
                    </div>
                    <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS[j.status]}`}>{j.status}</span>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={11}/>{j.address.split(',')[1]?.trim()}</span>
                    <span className="flex items-center gap-1"><DollarSign size={11}/>${j.budget.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Calendar size={11}/>{j.start} – {j.end}</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-500">{j.progress}% complete</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${j.status === 'completed' ? 'bg-emerald-500' : 'bg-turquoise-500'}`}
                        style={{ width: `${j.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="relative bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">
            <img src={selected.img} alt={selected.name} className="w-full h-40 object-cover" />
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">{selected.name}</p>
                <p className="text-xs text-slate-400">{selected.id}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><X size={18}/></button>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {[['Client', selected.client],['Budget', `$${selected.budget.toLocaleString()}`],['Start', selected.start],['End', selected.end]].map(([l,v]) => (
                  <div key={l} className="bg-slate-50 rounded-xl p-3">
                    <p className="text-[11px] text-slate-400">{l}</p>
                    <p className="text-sm font-bold text-slate-900">{v}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><MapPin size={11}/> Address</p>
                <p className="text-sm text-slate-800">{selected.address}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2">Milestones</p>
                <div className="space-y-1.5">
                  {selected.milestones.map((m, i) => (
                    <div key={i} className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 ${
                      m.includes('✓') ? 'bg-emerald-50 text-emerald-700' :
                      m.includes('In Progress') ? 'bg-turquoise-50 text-turquoise-700' :
                      'bg-slate-50 text-slate-400'
                    }`}>
                      <span className="text-[10px]">{m.includes('✓') ? '✓' : m.includes('In Progress') ? '→' : '○'}</span>
                      {m.replace(' ✓','').replace(' (In Progress)','')}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-turquoise-500 hover:bg-turquoise-600 text-white text-sm font-semibold rounded-lg transition-colors">
                  <MessageSquare size={14}/> Message Client
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold rounded-lg transition-colors">
                  <Camera size={14}/> Upload Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProviderLayout>
  )
}
