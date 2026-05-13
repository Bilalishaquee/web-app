import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { MapPin, DollarSign, Clock, Wrench, Home, Bath, TreePine, Layers } from 'lucide-react'

const JOBS = [
  { id:'P-1247', name:'Kitchen Full Remodel',    client:'Sarah Johnson',    progress:48, daysLeft:24, budget:45000, status:'active',    city:'Austin, TX',      icon:Wrench  },
  { id:'P-1089', name:'Full Home Renovation',    client:'Emily Rodriguez',  progress:61, daysLeft:17, budget:180000,status:'active',    city:'Miami, FL',       icon:Home    },
  { id:'P-1312', name:'ADU Garage Conversion',   client:'Chris Wilson',     progress:10, daysLeft:99, budget:85000, status:'planning',  city:'Los Angeles, CA', icon:Layers  },
  { id:'P-1320', name:'Bathroom & Half Bath',    client:'Barbara Anderson', progress:2,  daysLeft:28, budget:38000, status:'planning',  city:'San Francisco, CA',icon:Bath   },
  { id:'P-1198', name:'Composite Deck',          client:'David Williams',   progress:100,daysLeft:0,  budget:28000, status:'completed', city:'Nashville, TN',   icon:TreePine},
]

const STATUS_BAR   = { active:'bg-turquoise-500', planning:'bg-slate-300',            completed:'bg-emerald-500' }
const STATUS_PILL  = { active:'bg-turquoise-100 text-turquoise-700', planning:'bg-slate-100 text-slate-500', completed:'bg-emerald-100 text-emerald-700' }
const STATUS_LABEL = { active:'Active', planning:'Planning', completed:'Completed' }

export default function AppProviderJobs() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('active')
  const visible = tab === 'all' ? JOBS : JOBS.filter(j => j.status === tab)

  return (
    <MobileAppLayout role="provider">
      <div className="pt-12 pb-6 space-y-4">
        <h1 className="text-xl font-extrabold text-slate-900 px-4">My Jobs</h1>

        <div className="px-4">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {['active','planning','completed','all'].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                  tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </div>

        <div className="space-y-2 px-4">
          {visible.map(j => {
            const Icon = j.icon
            return (
              <button
                key={j.id}
                onClick={() => navigate(`/app/provider/job/${j.id}`)}
                className="w-full text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:bg-slate-50 transition-colors">

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{j.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{j.client}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${STATUS_PILL[j.status]}`}>
                    {STATUS_LABEL[j.status]}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span className="flex items-center gap-0.5"><MapPin size={10}/>{j.city}</span>
                  <span className="flex items-center gap-0.5"><DollarSign size={10}/>${(j.budget/1000).toFixed(0)}K</span>
                  <span className="flex items-center gap-0.5"><Clock size={10}/>{j.daysLeft > 0 ? `${j.daysLeft}d left` : 'Done'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${STATUS_BAR[j.status]} rounded-full`} style={{width:`${j.progress}%`}} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">{j.progress}%</span>
                </div>

              </button>
            )
          })}
        </div>
      </div>
    </MobileAppLayout>
  )
}
