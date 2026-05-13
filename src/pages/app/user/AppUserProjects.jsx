import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import {
  ChevronRight, ChevronLeft, Clock, CheckCircle2,
  DollarSign, Camera, Activity, Wrench, Building2, TreePine,
} from 'lucide-react'

const PROJECTS = [
  {
    id:'P-1247', name:'Kitchen Full Remodel', provider:'Mike Rodriguez', progress:48, status:'active',
    city:'Austin, TX', budget:45000, start:'Apr 1', end:'Jun 15', daysLeft:24,
    icon: Wrench,
    milestones:['Demolition','Plumbing rough-in','Electrical rough-in','Drywall','Cabinetry','Countertops','Backsplash','Appliances','Final walkthrough'],
    done:4,
  },
  {
    id:'P-1312', name:'Garage to ADU Conversion', provider:'Carlos Morales', progress:10, status:'planning',
    city:'Austin, TX', budget:85000, start:'Apr 18', end:'Aug 10', daysLeft:99,
    icon: Building2,
    milestones:['Permits','Structural','Plumbing','Electrical','Framing','Drywall','Kitchen','Bathroom','Finish work'],
    done:0,
  },
  {
    id:'P-1087', name:'Backyard Deck', provider:'Mike Rodriguez', progress:100, status:'completed',
    city:'Austin, TX', budget:22000, start:'Jan 10', end:'Feb 28', daysLeft:0,
    icon: TreePine,
    milestones:['Permits','Footings','Frame','Decking','Railing','Lighting','Final'],
    done:7,
  },
]

const STATUS_BAR   = { active:'bg-turquoise-500', planning:'bg-slate-300',   completed:'bg-emerald-500' }
const STATUS_PILL  = { active:'bg-turquoise-100 text-turquoise-700', planning:'bg-slate-100 text-slate-500', completed:'bg-emerald-100 text-emerald-700' }
const STATUS_LABEL = { active:'Active', planning:'Planning', completed:'Completed' }

export default function AppUserProjects() {
  const navigate   = useNavigate()
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('all')

  const visible = tab === 'all' ? PROJECTS : PROJECTS.filter(p => p.status === tab)

  if (selected) {
    const Icon = selected.icon
    return (
      <MobileAppLayout role="user">
        <div className="bg-white min-h-screen pb-8">

          {/* Header */}
          <div className="px-4 pt-10 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <ChevronLeft size={18} className="text-slate-600" />
              </button>
              <p className="text-sm font-semibold text-slate-400">My Projects</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0">
                <Icon size={22} className="text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-slate-900 text-base leading-tight">{selected.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{selected.provider}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${STATUS_PILL[selected.status]}`}>
                {STATUS_LABEL[selected.status]}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-4">

            {/* KPI row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Budget', `$${(selected.budget/1000).toFixed(0)}K`],
                ['Days Left', selected.daysLeft || 'Done'],
                ['Progress', `${selected.progress}%`],
              ].map(([l, v]) => (
                <div key={l} className="bg-slate-50 rounded-xl py-3 text-center border border-slate-100">
                  <p className="text-[11px] text-slate-400">{l}</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{v}</p>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate(`/app/user/project-photos?project=${encodeURIComponent(selected.name)}`)}
                className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-600 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors">
                <Camera size={13}/> Photos
              </button>
              <button
                onClick={() => navigate(`/app/user/project-activity?project=${encodeURIComponent(selected.name)}`)}
                className="flex items-center justify-center gap-2 py-2.5 bg-slate-100 text-slate-600 font-semibold text-xs rounded-xl hover:bg-slate-200 transition-colors">
                <Activity size={13}/> Activity Log
              </button>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-sm font-bold text-slate-900">Progress</p>
                <p className="text-xs text-slate-400">{selected.done}/{selected.milestones.length} milestones</p>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${STATUS_BAR[selected.status]} rounded-full transition-all`} style={{width:`${selected.progress}%`}} />
              </div>
            </div>

            {/* Milestones */}
            <div>
              <p className="text-sm font-bold text-slate-900 mb-2">Milestones</p>
              <div className="space-y-1.5">
                {selected.milestones.map((m, i) => (
                  <div key={m} className={`flex items-center gap-3 p-3 rounded-xl ${
                    i < selected.done     ? 'bg-emerald-50'
                    : i === selected.done ? 'bg-turquoise-50 border border-turquoise-200'
                    : 'bg-slate-50'
                  }`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      i < selected.done     ? 'bg-emerald-500'
                      : i === selected.done ? 'bg-turquoise-500'
                      : 'bg-slate-200'
                    }`}>
                      {i < selected.done    && <CheckCircle2 size={12} className="text-white" />}
                      {i === selected.done  && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className={`text-xs font-medium flex-1 ${
                      i < selected.done     ? 'text-emerald-700'
                      : i === selected.done ? 'text-turquoise-700 font-bold'
                      : 'text-slate-400'
                    }`}>{m}</span>
                    {i === selected.done && (
                      <span className="text-[10px] bg-turquoise-100 text-turquoise-700 px-1.5 py-0.5 rounded font-semibold">Current</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </MobileAppLayout>
    )
  }

  return (
    <MobileAppLayout role="user">
      <div className="px-4 pt-12 pb-6 space-y-4">
        <h1 className="text-xl font-extrabold text-slate-900">My Projects</h1>

        {/* Tab bar */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {['all','active','planning','completed'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
          ))}
        </div>

        {/* Project cards */}
        <div className="space-y-2">
          {visible.map(p => {
            const Icon = p.icon
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className="w-full text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:bg-slate-50 transition-colors">

                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{p.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{p.provider}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${STATUS_PILL[p.status]}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-400">{p.progress}% complete</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    {p.daysLeft > 0 ? <><Clock size={10}/>{p.daysLeft}d left</> : 'Finished'}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${STATUS_BAR[p.status]} rounded-full`} style={{width:`${p.progress}%`}} />
                </div>

              </button>
            )
          })}
        </div>
      </div>
    </MobileAppLayout>
  )
}
