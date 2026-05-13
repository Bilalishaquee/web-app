import { Link } from 'react-router-dom'
import ProviderLayout from '../../components/layout/ProviderLayout'
import { Briefcase, DollarSign, Star, Clock, MapPin, CheckCircle2, ArrowRight, MessageSquare, FileText, Calendar } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const ACTIVE_JOBS = [
  { id:'P-1247', name:'Kitchen Full Remodel',    client:'Sarah Johnson',    progress:48, status:'In Progress', daysLeft:24, budget:45000, city:'Austin, TX',     img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=80' },
  { id:'P-1089', name:'Full Home Renovation',    client:'Emily Rodriguez',  progress:61, status:'In Progress', daysLeft:17, budget:180000,city:'Miami, FL',      img:'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&auto=format&fit=crop&q=80' },
  { id:'P-1312', name:'Garage to ADU Conversion',client:'Chris Wilson',    progress:10, status:'Starting',    daysLeft:45, budget:85000, city:'Los Angeles, CA',img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80' },
  { id:'P-1320', name:'Bathroom & Half Bath Reno',client:'Barbara Anderson',progress:2,  status:'Planning',   daysLeft:28, budget:38000, city:'San Francisco, CA',img:'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&auto=format&fit=crop&q=80' },
]

const TODAY_SCHEDULE = [
  { time:'9:00 AM',  project:'Johnson Kitchen',     task:'Cabinetry installation — upper row',    location:'2847 Oak St, Austin' },
  { time:'1:00 PM',  project:'Rodriguez Renovation', task:'Countertop template measurement',       location:'1524 Bayshore Dr, Miami' },
  { time:'4:30 PM',  project:'Chen Bathroom',        task:'Site inspection & tile review',         location:'880 Denver Blvd, Denver' },
]

const PENDING_QUOTES = [
  { id:'Q-1294', service:'Full Kitchen Renovation', client:'Sarah Parker',  range:'$42K–$58K', received:'2h ago'  },
  { id:'Q-1295', service:'Master Bathroom Remodel', client:'Jason Kim',     range:'$18K–$26K', received:'5h ago'  },
  { id:'Q-1296', service:'Basement Finishing',       client:'Maria Torres',  range:'$35K–$55K', received:'1d ago'  },
]

const RECENT_REVIEWS = [
  { client:'David Williams', rating:5, text:'Mike and his team exceeded expectations on our deck. Clean, fast, and pro from start to finish.', date:'May 1' },
  { client:'Linda Davis',    rating:5, text:'Very impressed with the window installation. Everything is perfect and on budget.',              date:'Apr 28' },
]

export default function ProviderDashboard() {
  const { user } = useAuth()

  return (
    <ProviderLayout title="Dashboard" subtitle={`Good morning, ${user?.name?.split(' ')[0]}. Here's your day.`}>
      <div className="p-6 space-y-6">

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:'Active Jobs',      value:'4',      sub:'2 milestones due this week',   icon:Briefcase,  color:'bg-turquoise-500' },
            { label:'Pending Quotes',   value:'3',      sub:'Respond within 24h',            icon:FileText,   color:'bg-amber-500'     },
            { label:'Month Earnings',   value:'$12.4K', sub:'vs $10.1K last month',          icon:DollarSign, color:'bg-emerald-500'   },
            { label:'Average Rating',   value:'4.9 ★',  sub:'Based on 127 reviews',          icon:Star,       color:'bg-violet-500'    },
          ].map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <div className={`w-7 h-7 ${color} rounded-lg flex items-center justify-center`}>
                  <Icon size={13} className="text-white" />
                </div>
              </div>
              <p className="text-xl font-extrabold text-slate-900">{value}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active jobs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">Active Jobs</h2>
              <Link to="/provider/jobs" className="text-xs text-turquoise-600 font-semibold hover:underline flex items-center gap-1">
                View all <ArrowRight size={11} />
              </Link>
            </div>
            <div className="space-y-3">
              {ACTIVE_JOBS.map(j => (
                <div key={j.id} className="bg-white rounded-xl border border-slate-200 flex overflow-hidden hover:shadow-md transition-all">
                  <img src={j.img} alt={j.name} className="w-24 object-cover shrink-0" />
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{j.name}</p>
                        <p className="text-xs text-slate-400">{j.client}</p>
                      </div>
                      <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        j.status === 'In Progress' ? 'bg-turquoise-50 text-turquoise-700' :
                        j.status === 'Starting'    ? 'bg-blue-50 text-blue-700' :
                                                     'bg-amber-50 text-amber-700'
                      }`}>{j.status}</span>
                    </div>
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-slate-500">{j.progress}% complete</span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1"><Clock size={9} /> {j.daysLeft} days left</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-turquoise-500 rounded-full" style={{ width: `${j.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1"><MapPin size={9}/>{j.city}</span>
                      <span className="text-[11px] font-bold text-slate-700">${j.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Today's schedule */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 text-sm">Today's Schedule</h2>
                <Link to="/provider/schedule" className="text-[11px] text-turquoise-600 font-semibold hover:underline">Full calendar</Link>
              </div>
              <div className="divide-y divide-slate-50">
                {TODAY_SCHEDULE.map((s, i) => (
                  <div key={i} className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Clock size={11} className="text-turquoise-500" />
                      <span className="text-xs font-bold text-turquoise-600">{s.time}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{s.task}</p>
                    <p className="text-[11px] text-slate-400">{s.project}</p>
                    <p className="text-[11px] text-slate-300 flex items-center gap-0.5 mt-0.5"><MapPin size={9}/>{s.location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending quotes */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 text-sm">Quote Requests</h2>
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">3 new</span>
              </div>
              <div className="divide-y divide-slate-50">
                {PENDING_QUOTES.map(q => (
                  <div key={q.id} className="px-4 py-3">
                    <p className="text-xs font-semibold text-slate-800">{q.service}</p>
                    <p className="text-[11px] text-slate-400">{q.client} · {q.received}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-xs font-bold text-slate-700">{q.range}</span>
                      <div className="flex gap-1">
                        <button className="px-2 py-1 bg-turquoise-50 hover:bg-turquoise-100 text-turquoise-700 text-[11px] font-semibold rounded transition-colors">Accept</button>
                        <button className="px-2 py-1 bg-slate-50 hover:bg-slate-100 text-slate-500 text-[11px] font-semibold rounded transition-colors">Pass</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent reviews */}
        <div>
          <h2 className="font-bold text-slate-900 mb-3">Recent Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RECENT_REVIEWS.map(r => (
              <div key={r.client} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-slate-800">{r.client}</p>
                  <div className="flex">
                    {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{r.text}</p>
                <p className="text-[11px] text-slate-300 mt-2">{r.date}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ProviderLayout>
  )
}
