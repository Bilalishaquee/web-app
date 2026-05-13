import { useState } from 'react'
import ProviderLayout from '../../components/layout/ProviderLayout'
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus } from 'lucide-react'

const WEEK_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const WEEK_DATES = ['Apr 28','Apr 29','Apr 30','May 1','May 2','May 3','May 4']

const EVENTS = {
  'May 1': [
    { time:'9:00–12:00', job:'Kitchen Remodel #P-1247', task:'Cabinet installation — upper row', color:'bg-turquoise-500', client:'Sarah Johnson', addr:'2847 Oak St, Austin' },
    { time:'1:00–4:00',  job:'Full Renovation #P-1089', task:'Countertop template measurement',  color:'bg-blue-500',      client:'Emily Rodriguez', addr:'1524 Bayshore Dr, Miami' },
  ],
  'May 2': [
    { time:'10:00–2:00', job:'ADU Conversion #P-1312',  task:'Permit review + framing consultation', color:'bg-violet-500', client:'Chris Wilson', addr:'914 Silver Lake Blvd, LA' },
    { time:'3:00–5:00',  job:'Kitchen Remodel #P-1247', task:'Countertop template review',        color:'bg-turquoise-500', client:'Sarah Johnson', addr:'2847 Oak St, Austin' },
  ],
  'May 3': [
    { time:'9:00–1:00',  job:'Kitchen Remodel #P-1247', task:'Backsplash tile dry-lay layout',    color:'bg-turquoise-500', client:'Sarah Johnson', addr:'2847 Oak St, Austin' },
    { time:'3:00–5:00',  job:'Bathroom Reno #P-1320',   task:'Design approval walkthrough',       color:'bg-rose-500',      client:'Barbara Anderson', addr:'2204 Market St, SF' },
  ],
  'May 4': [
    { time:'All day',    job:'Site visits',              task:'Quarterly client check-ins (4 sites)', color:'bg-amber-500', client:'Multiple', addr:'Austin / Dallas' },
  ],
  'May 5': [
    { time:'10:00–3:00', job:'Full Renovation #P-1089', task:'Drywall installation — main level',  color:'bg-blue-500',   client:'Emily Rodriguez', addr:'Miami, FL' },
  ],
}

const UPCOMING = [
  { date:'May 6',  task:'Cabinetry installation — lower row',    job:'Kitchen Remodel #P-1247', time:'9:00 AM' },
  { date:'May 7',  task:'Electrical panel upgrade',               job:'ADU Conversion #P-1312',  time:'8:00 AM' },
  { date:'May 8',  task:'Tile installation kickoff',              job:'Bathroom Reno #P-1320',   time:'10:00 AM' },
  { date:'May 9',  task:'Flooring installation — hardwood',       job:'Full Renovation #P-1089', time:'8:00 AM' },
  { date:'May 10', task:'Client walkthrough — kitchen progress',  job:'Kitchen Remodel #P-1247', time:'2:00 PM' },
]

export default function ProviderSchedule() {
  const [selectedDay, setSelectedDay] = useState('May 3')

  const events = EVENTS[selectedDay] || []

  return (
    <ProviderLayout title="Schedule" subtitle="Your weekly calendar and upcoming appointments">
      <div className="p-6 space-y-5">

        {/* Week header */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <h2 className="font-bold text-slate-900 text-sm">April 28 – May 4, 2026</h2>
            <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day columns */}
          <div className="grid grid-cols-7">
            {WEEK_DAYS.map((day, i) => {
              const date = WEEK_DATES[i]
              const hasEvents = !!EVENTS[date]
              const isSelected = date === selectedDay
              const isToday = date === 'May 3'
              return (
                <button key={day} onClick={() => setSelectedDay(date)}
                  className={`py-3 text-center border-r last:border-r-0 border-slate-100 transition-all ${isSelected ? 'bg-turquoise-500' : 'hover:bg-slate-50'}`}
                >
                  <p className={`text-[11px] font-semibold ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>{day}</p>
                  <p className={`text-sm font-bold mt-0.5 ${isSelected ? 'text-white' : isToday ? 'text-turquoise-600' : 'text-slate-700'}`}>
                    {date.split(' ')[1]}
                  </p>
                  {hasEvents && (
                    <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-1.5 ${isSelected ? 'bg-white' : 'bg-turquoise-400'}`} />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Events for selected day */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-sm">{selectedDay}</h2>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-turquoise-50 hover:bg-turquoise-100 text-turquoise-700 text-xs font-semibold rounded-lg transition-colors">
              <Plus size={12}/> Add Event
            </button>
          </div>
          {events.length === 0 ? (
            <div className="px-5 py-10 text-center text-slate-400 text-sm">No events scheduled for this day.</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {events.map((e, i) => (
                <div key={i} className="flex gap-3 p-4">
                  <div className={`w-1 rounded-full shrink-0 ${e.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Clock size={11} className="text-slate-400"/>
                      <span className="text-xs font-bold text-slate-600">{e.time}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{e.task}</p>
                    <p className="text-xs text-slate-500">{e.job}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                      <span>{e.client}</span>
                      <span className="flex items-center gap-0.5"><MapPin size={9}/>{e.addr}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-3.5 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-sm">Upcoming This Week</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {UPCOMING.map((u, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3">
                <div className="text-center w-10 shrink-0">
                  <p className="text-[10px] text-slate-400 uppercase">{u.date.split(' ')[0]}</p>
                  <p className="text-base font-extrabold text-slate-900">{u.date.split(' ')[1]}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{u.task}</p>
                  <p className="text-xs text-slate-400">{u.job}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 shrink-0">
                  <Clock size={11}/>{u.time}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ProviderLayout>
  )
}
