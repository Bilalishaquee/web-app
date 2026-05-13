import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Search, Star, ShieldCheck, Clock, X, CheckCircle2, XCircle, MapPin, Phone, Mail } from 'lucide-react'

const PROVIDERS = [
  { id:1,  name:'Mike Rodriguez',    service:'Kitchen & Bathroom',  location:'Austin, TX',       rating:4.9, jobs:127, revenue:284750, status:'verified', joined:'Sep 2023', license:'TX-GC-4821', phone:'+1 (512) 555-0142', email:'mike.r@pros.com'    },
  { id:2,  name:'Carlos Morales',    service:'General Contractor',  location:'Dallas, TX',        rating:4.8, jobs:93,  revenue:198400, status:'verified', joined:'Oct 2023', license:'TX-GC-3917', phone:'+1 (214) 555-0281', email:'c.morales@pros.com' },
  { id:3,  name:'Jennifer Walsh',    service:'Interior Design',     location:'Denver, CO',        rating:4.9, jobs:64,  revenue:142600, status:'verified', joined:'Nov 2023', license:'CO-ID-1124', phone:'+1 (720) 555-0347', email:'j.walsh@design.com' },
  { id:4,  name:'Tony Nguyen',       service:'Plumbing',            location:'Houston, TX',       rating:4.7, jobs:189, revenue:167300, status:'verified', joined:'Aug 2023', license:'TX-PL-7821', phone:'+1 (713) 555-0192', email:'tony.n@pros.com'    },
  { id:5,  name:'Robert Chang',      service:'Electrical',          location:'Seattle, WA',       rating:4.8, jobs:156, revenue:198900, status:'verified', joined:'Jul 2023', license:'WA-EL-5512', phone:'+1 (206) 555-0463', email:'r.chang@electric.com'},
  { id:6,  name:'Maria Santos',      service:'Flooring',            location:'Miami, FL',         rating:4.9, jobs:112, revenue:123400, status:'verified', joined:'Dec 2023', license:'FL-FL-2298', phone:'+1 (786) 555-0318', email:'m.santos@floors.com'},
  { id:7,  name:'Susan Park',        service:'Painting',            location:'Los Angeles, CA',   rating:4.8, jobs:234, revenue:89700,  status:'verified', joined:'Jun 2023', license:'CA-PT-8874', phone:'+1 (213) 555-0521', email:'s.park@paint.com'   },
  { id:8,  name:'Alex Thompson',     service:'HVAC',                location:'Chicago, IL',       rating:4.7, jobs:145, revenue:178500, status:'verified', joined:'Aug 2023', license:'IL-HV-3341', phone:'+1 (312) 555-0189', email:'a.thompson@hvac.com'},
  { id:9,  name:'Derek Johnson',     service:'Roofing',             location:'Nashville, TN',     rating:4.6, jobs:78,  revenue:198200, status:'pending',  joined:'Jan 2025', license:'TN-RF-1102', phone:'+1 (615) 555-0274', email:'d.johnson@roof.com' },
  { id:10, name:'Rosa Gutierrez',    service:'Landscaping',         location:'Phoenix, AZ',       rating:4.9, jobs:98,  revenue:87400,  status:'pending',  joined:'Feb 2025', license:'AZ-LA-4455', phone:'+1 (602) 555-0387', email:'r.gutierrez@land.com'},
  { id:11, name:'Alan Brooks',       service:'HVAC',                location:'Denver, CO',        rating:4.5, jobs:0,   revenue:0,      status:'pending',  joined:'Apr 2025', license:'CO-HV-7789', phone:'+1 (720) 555-0498', email:'a.brooks@hvac.com'  },
]

const STATUS_STYLE = {
  verified: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending:  'bg-amber-50   text-amber-700   border border-amber-200',
  suspended:'bg-red-50     text-red-600     border border-red-200',
}

export default function AdminProviders() {
  const [tab, setTab]       = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const visible = PROVIDERS.filter(p => {
    const matchTab = tab === 'all' || p.status === tab
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.service.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <AdminLayout title="Service Providers" subtitle={`${PROVIDERS.length} registered providers`}>
      <div className="p-6 space-y-4">

        {/* Tabs + search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {[['all','All'],['verified','Verified'],['pending','Pending Review'],['suspended','Suspended']].map(([v,l]) => (
              <button key={v} onClick={() => setTab(v)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  tab === v ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >{l}</button>
            ))}
          </div>
          <div className="relative ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              placeholder="Search providers…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-turquoise-300"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map(p => (
            <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all cursor-pointer" onClick={() => setSelected(p)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-turquoise-100 text-turquoise-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    {p.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.service}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLE[p.status]}`}>
                  {p.status === 'verified' ? '✓ Verified' : p.status === 'pending' ? 'Pending' : 'Suspended'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="bg-slate-50 rounded-lg py-2">
                  <p className="text-xs text-slate-500">Rating</p>
                  <p className="font-bold text-slate-900 text-sm flex items-center justify-center gap-0.5"><Star size={11} className="text-amber-400 fill-amber-400" />{p.rating}</p>
                </div>
                <div className="bg-slate-50 rounded-lg py-2">
                  <p className="text-xs text-slate-500">Jobs</p>
                  <p className="font-bold text-slate-900 text-sm">{p.jobs}</p>
                </div>
                <div className="bg-slate-50 rounded-lg py-2">
                  <p className="text-xs text-slate-500">Revenue</p>
                  <p className="font-bold text-slate-900 text-sm">${(p.revenue/1000).toFixed(0)}K</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                <MapPin size={11} /> {p.location} · Since {p.joined}
              </div>

              {p.status === 'pending' && (
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg transition-colors">
                    <CheckCircle2 size={13} /> Approve
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition-colors">
                    <XCircle size={13} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Provider detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="relative bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Provider Details</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-turquoise-100 text-turquoise-700 rounded-full flex items-center justify-center text-lg font-bold">
                  {selected.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">{selected.name}</p>
                  <p className="text-sm text-slate-500">{selected.service}</p>
                  <span className={`inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1 ${STATUS_STYLE[selected.status]}`}>
                    {selected.status === 'verified' ? '✓ Verified' : 'Pending Review'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                {[['Rating', `${selected.rating}★`],['Jobs', selected.jobs],['Revenue', `$${(selected.revenue/1000).toFixed(0)}K`]].map(([l,v])=>(
                  <div key={l} className="bg-slate-50 rounded-xl py-3">
                    <p className="text-[11px] text-slate-500">{l}</p>
                    <p className="font-bold text-slate-900">{v}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                {[[Mail,selected.email],[Phone,selected.phone],[MapPin,selected.location],[ShieldCheck,`License: ${selected.license}`]].map(([Icon,val])=>(
                  <div key={val} className="flex items-center gap-3 text-sm text-slate-600">
                    <Icon size={14} className="text-slate-400 shrink-0" /> {val}
                  </div>
                ))}
              </div>

              {selected.status === 'pending' && (
                <div className="flex gap-3">
                  <button className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors">Approve</button>
                  <button className="flex-1 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors">Reject</button>
                </div>
              )}
              {selected.status === 'verified' && (
                <button className="w-full py-2.5 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors">
                  Suspend Provider
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
