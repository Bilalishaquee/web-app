import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { Clock, MapPin, User, CalendarDays, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const today = new Date()

function buildWeek(offset = 0) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - today.getDay() + i + offset * 7)
    return d
  })
}

const SCHEDULE = {
  1: [
    { time:'9:00 AM',  end:'12:00 PM', task:'Cabinet installation — upper row',  client:'Sarah Johnson',    project:'Kitchen Remodel', addr:'2847 Oak St, Austin',      color:'bg-turquoise-500' },
    { time:'1:00 PM',  end:'3:30 PM',  task:'Countertop template measurement',   client:'Sarah Johnson',    project:'Kitchen Remodel', addr:'2847 Oak St, Austin',      color:'bg-turquoise-500' },
  ],
  2: [
    { time:'8:00 AM',  end:'5:00 PM',  task:'Drywall finishing — all rooms',     client:'Emily Rodriguez',  project:'Full Renovation', addr:'1524 Bayshore Dr, Miami',  color:'bg-turquoise-500' },
  ],
  4: [
    { time:'10:00 AM', end:'11:30 AM', task:'Permit walk-through with inspector', client:'Chris Wilson',    project:'ADU Conversion',  addr:'982 Garden Ln, Austin',    color:'bg-turquoise-500' },
    { time:'2:00 PM',  end:'4:00 PM',  task:'Tile selection review',              client:'Barbara Anderson',project:'Bathroom Remodel', addr:'2204 Market St, Austin',  color:'bg-turquoise-500' },
  ],
  5: [
    { time:'9:00 AM',  end:'11:00 AM', task:'Final walkthrough & punch list',    client:'Sarah Johnson',    project:'Kitchen Remodel', addr:'2847 Oak St, Austin',      color:'bg-turquoise-500' },
  ],
}

export default function AppProviderSchedule() {
  const navigate = useNavigate()
  const [weekOffset, setWeekOffset] = useState(0)
  const [selDay, setSelDay] = useState(today.getDay())
  const week = buildWeek(weekOffset)

  const appts = SCHEDULE[selDay] || []

  return (
    <MobileAppLayout role="provider">
      <div className="pt-12 pb-8">
        <div className="flex items-center justify-between px-4 mb-5">
          <h1 className="text-xl font-extrabold text-slate-900">Schedule</h1>
          <button onClick={() => navigate('/app/provider/add-block-time')} className="w-8 h-8 bg-turquoise-500 rounded-full flex items-center justify-center shadow-sm">
            <Plus size={16} className="text-white" />
          </button>
        </div>

        {/* Week navigation */}
        <div className="px-4 mb-1 flex items-center justify-between">
          <button onClick={() => setWeekOffset(o => o - 1)} className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
            <ChevronLeft size={14} className="text-slate-500" />
          </button>
          <p className="text-xs font-bold text-slate-500">
            {week[0].toLocaleDateString('en-US',{month:'short',day:'numeric'})} – {week[6].toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
          </p>
          <button onClick={() => setWeekOffset(o => o + 1)} className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
            <ChevronRight size={14} className="text-slate-500" />
          </button>
        </div>

        {/* Day strip */}
        <div className="px-4 mb-5 mt-3">
          <div className="flex gap-1">
            {week.map((d, i) => {
              const hasAppts = !!SCHEDULE[i]
              const isToday  = weekOffset === 0 && i === today.getDay()
              const isSel    = i === selDay
              return (
                <button key={i} onClick={() => setSelDay(i)}
                  className={`flex-1 flex flex-col items-center py-2 rounded-xl transition-all ${
                    isSel ? 'bg-turquoise-500' : isToday ? 'bg-turquoise-50 border border-turquoise-200' : 'bg-white border border-slate-100'
                  }`}>
                  <span className={`text-[10px] font-semibold ${isSel ? 'text-turquoise-200' : 'text-slate-400'}`}>{DAYS[i]}</span>
                  <span className={`text-sm font-extrabold mt-0.5 ${isSel ? 'text-white' : isToday ? 'text-turquoise-600' : 'text-slate-800'}`}>{d.getDate()}</span>
                  {hasAppts && <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSel ? 'bg-white/60' : 'bg-turquoise-500'}`} />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Day label + count */}
        <div className="px-4 mb-3 flex items-center gap-2">
          <CalendarDays size={14} className="text-slate-400" />
          <p className="text-sm font-bold text-slate-700">
            {weekOffset === 0 && selDay === today.getDay() ? 'Today' : DAYS[selDay]},{' '}
            {week[selDay]?.toLocaleDateString('en-US',{month:'short',day:'numeric'})}
          </p>
          {appts.length > 0 && (
            <span className="ml-auto text-[10px] font-bold bg-turquoise-100 text-turquoise-700 px-2 py-0.5 rounded-full">
              {appts.length} job{appts.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Appointments */}
        <div className="px-4 space-y-3">
          {appts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <CalendarDays size={28} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-500">No jobs scheduled</p>
              <p className="text-xs text-slate-400 mt-0.5">Accept quote requests to fill your calendar</p>
            </div>
          ) : appts.map((a, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className={`w-1 self-stretch rounded-full ${a.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-slate-900 text-sm">{a.task}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${a.color}`}>Confirmed</span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock size={11} className="text-slate-400" /> {a.time} – {a.end}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={11} className="text-slate-400" /> {a.client} · {a.project}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} className="text-slate-400" /> {a.addr}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* This week summary */}
        <div className="px-4 mt-5">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <CalendarDays size={18} className="text-turquoise-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">This Week</p>
              <p className="text-slate-400 text-xs">
                {Object.values(SCHEDULE).flat().length} jobs · {Object.values(SCHEDULE).flat().reduce((s) => s + 1, 0)} sites
              </p>
            </div>
            <p className="text-turquoise-400 font-extrabold text-sm">$6.2K est.</p>
          </div>
        </div>
      </div>
    </MobileAppLayout>
  )
}
