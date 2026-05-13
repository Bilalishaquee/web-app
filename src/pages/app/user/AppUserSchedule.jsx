import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { ChevronLeft, Clock, MapPin, User, CalendarDays, Plus } from 'lucide-react'

const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const today = new Date()

function buildWeek() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - today.getDay() + i)
    return d
  })
}

const APPOINTMENTS = {
  1: [
    { time:'9:00 AM',  end:'10:30 AM', type:'Site Visit',       contractor:'Mike Rodriguez', project:'Kitchen Remodel',   addr:'2847 Oak St, Austin', color:'bg-turquoise-500' },
    { time:'2:00 PM',  end:'3:00 PM',  type:'Countertop Review', contractor:'Mike Rodriguez', project:'Kitchen Remodel',   addr:'2847 Oak St, Austin', color:'bg-turquoise-500' },
  ],
  3: [
    { time:'11:00 AM', end:'12:00 PM', type:'Design Consultation',contractor:'Carlos Morales', project:'ADU Conversion',  addr:'2847 Oak St, Austin', color:'bg-turquoise-500' },
  ],
  5: [
    { time:'10:00 AM', end:'11:30 AM', type:'Final Inspection',  contractor:'Mike Rodriguez', project:'Kitchen Remodel',  addr:'2847 Oak St, Austin', color:'bg-emerald-500' },
  ],
}

export default function AppUserSchedule() {
  const navigate = useNavigate()
  const week     = buildWeek()
  const [selDay, setSelDay] = useState(today.getDay())

  const appts = APPOINTMENTS[selDay] || []

  return (
    <MobileAppLayout role="user">
      <div className="pt-10 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 mb-5">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <ChevronLeft size={18} className="text-slate-600" />
            </button>
            <h1 className="font-extrabold text-slate-900 text-lg">My Schedule</h1>
          </div>
          <Link to="/app/user/book-appointment" className="w-8 h-8 bg-turquoise-500 rounded-full flex items-center justify-center">
            <Plus size={16} className="text-white" />
          </Link>
        </div>

        {/* Week strip */}
        <div className="px-4 mb-5">
          <div className="flex gap-1">
            {week.map((d, i) => {
              const hasAppts = !!APPOINTMENTS[i]
              const isToday  = i === today.getDay()
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

        {/* Selected day label */}
        <div className="px-4 mb-3 flex items-center gap-2">
          <CalendarDays size={14} className="text-slate-400" />
          <p className="text-sm font-bold text-slate-700">
            {selDay === today.getDay() ? "Today" : DAYS[selDay]}, {week[selDay]?.toLocaleDateString('en-US', { month:'short', day:'numeric' })}
          </p>
          {appts.length > 0 && (
            <span className="ml-auto text-[10px] font-bold bg-turquoise-100 text-turquoise-700 px-2 py-0.5 rounded-full">{appts.length} appointment{appts.length > 1 ? 's' : ''}</span>
          )}
        </div>

        {/* Appointments */}
        <div className="px-4 space-y-3">
          {appts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <CalendarDays size={28} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-500">No appointments</p>
              <p className="text-xs text-slate-400 mt-0.5">Tap + to schedule a consultation</p>
            </div>
          ) : appts.map((a, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className={`w-1 self-stretch rounded-full ${a.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-slate-900 text-sm">{a.type}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${a.color}`}>Confirmed</span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock size={11} className="text-slate-400" />
                      {a.time} – {a.end}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={11} className="text-slate-400" />
                      {a.contractor} · {a.project}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} className="text-slate-400" />
                      {a.addr}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Book CTA */}
        <div className="px-4 mt-5">
          <Link to="/app/user/book-appointment" className="flex items-center gap-4 bg-slate-900 rounded-2xl p-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
              <CalendarDays size={18} className="text-turquoise-400" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Book a Consultation</p>
              <p className="text-slate-400 text-xs">Meet with verified contractors</p>
            </div>
            <ChevronLeft size={16} className="text-white/70 rotate-180" />
          </Link>
        </div>
      </div>
    </MobileAppLayout>
  )
}
