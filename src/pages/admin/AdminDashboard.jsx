import AdminLayout from '../../components/layout/AdminLayout'
import { TrendingUp, TrendingDown, Users, HardHat, FolderKanban, DollarSign, Sparkles, Star, CheckCircle2, Clock, AlertCircle, UserPlus, ShieldCheck } from 'lucide-react'

const STATS = [
  { label: 'Total Users',       value: '8,420',   change: '+12.4%', up: true,  icon: Users,       color: 'bg-blue-500'     },
  { label: 'Active Providers',  value: '1,247',   change: '+8.2%',  up: true,  icon: HardHat,     color: 'bg-turquoise-500'},
  { label: 'Active Projects',   value: '342',     change: '+18.7%', up: true,  icon: FolderKanban,color: 'bg-violet-500'   },
  { label: 'Monthly Revenue',   value: '$284.5K', change: '+22.1%', up: true,  icon: DollarSign,  color: 'bg-emerald-500'  },
  { label: 'Quote Requests',    value: '89',      change: '+15 today',up: true, icon: Sparkles,   color: 'bg-amber-500'    },
  { label: 'Platform Rating',   value: '4.8 ★',  change: '+0.1',   up: true,  icon: Star,        color: 'bg-rose-500'     },
]

const ACTIVITY = [
  { icon: UserPlus,    color: 'text-blue-500   bg-blue-50',     msg: 'New user registered',              sub: 'Jennifer Adams · Austin, TX',                 time: '2m ago'  },
  { icon: CheckCircle2,color: 'text-emerald-500 bg-emerald-50', msg: 'Quote accepted — Kitchen Remodel', sub: '#Q-1247 · $45,000 · James Carter',            time: '8m ago'  },
  { icon: ShieldCheck, color: 'text-turquoise-500 bg-turquoise-50', msg: 'Provider verified',           sub: 'Tony Nguyen · Plumbing License TX-7821',      time: '14m ago' },
  { icon: FolderKanban,color: 'text-violet-500 bg-violet-50',   msg: 'Project milestone completed',      sub: 'Bathroom Remodel #1198 · Tile Installation',  time: '31m ago' },
  { icon: DollarSign,  color: 'text-emerald-500 bg-emerald-50', msg: 'Payout processed',                 sub: '$12,400 → Mike Rodriguez',                    time: '1h ago'  },
  { icon: Star,        color: 'text-amber-500 bg-amber-50',     msg: 'New 5-star review posted',         sub: 'Sarah Johnson → Mike Rodriguez',              time: '1h ago'  },
  { icon: AlertCircle, color: 'text-rose-500 bg-rose-50',       msg: 'Quote request flagged',            sub: '#Q-1289 · Unusually high budget range',       time: '2h ago'  },
  { icon: UserPlus,    color: 'text-blue-500 bg-blue-50',       msg: 'New provider application',         sub: 'Derek Johnson · Roofing · Pending review',    time: '3h ago'  },
]

const PENDING_VERIFICATIONS = [
  { name: 'Derek Johnson',  service: 'Roofing',      location: 'Nashville, TN', submitted: '2d ago'  },
  { name: 'Rosa Gutierrez', service: 'Landscaping',  location: 'Phoenix, AZ',   submitted: '3d ago'  },
  { name: 'Alan Brooks',    service: 'HVAC',         location: 'Denver, CO',    submitted: '4d ago'  },
]

const TOP_SERVICES = [
  { label: 'Kitchen Remodeling', pct: 31, value: '$88.2K', color: 'bg-turquoise-500' },
  { label: 'Bathroom Renovation',pct: 24, value: '$68.3K', color: 'bg-blue-500'      },
  { label: 'General Contractor', pct: 18, value: '$51.2K', color: 'bg-violet-500'    },
  { label: 'Electrical',         pct: 12, value: '$34.1K', color: 'bg-amber-500'     },
  { label: 'Plumbing',           pct:  8, value: '$22.8K', color: 'bg-emerald-500'   },
  { label: 'Other',              pct:  7, value: '$19.9K', color: 'bg-slate-400'     },
]

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back, Sarah. Here's what's happening.">
      <div className="p-6 space-y-6">

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {STATS.map(({ label, value, change, up, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <div className={`w-7 h-7 ${color} rounded-lg flex items-center justify-center`}>
                  <Icon size={13} className="text-white" />
                </div>
              </div>
              <p className="text-xl font-extrabold text-slate-900">{value}</p>
              <div className={`flex items-center gap-1 text-xs font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>
                {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Activity feed */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-sm">Recent Activity</h2>
              <button className="text-xs text-turquoise-600 font-semibold hover:underline">View all</button>
            </div>
            <div className="divide-y divide-slate-50">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.color}`}>
                    <a.icon size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{a.msg}</p>
                    <p className="text-xs text-slate-400 truncate">{a.sub}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Revenue by service */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-900 text-sm">Revenue by Service</h2>
                <p className="text-xs text-slate-400">May 2026</p>
              </div>
              <div className="px-5 py-4 space-y-3">
                {TOP_SERVICES.map(({ label, pct, value, color }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-slate-600">{label}</span>
                      <span className="text-xs font-bold text-slate-800">{value}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending verifications */}
            <div className="bg-white rounded-xl border border-slate-200">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 text-sm">Pending Verifications</h2>
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{PENDING_VERIFICATIONS.length} pending</span>
              </div>
              <div className="divide-y divide-slate-50">
                {PENDING_VERIFICATIONS.map((p) => (
                  <div key={p.name} className="px-5 py-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.service} · {p.location}</p>
                      <p className="text-[10px] text-slate-300 mt-0.5">Submitted {p.submitted}</p>
                    </div>
                    <button className="shrink-0 bg-turquoise-50 hover:bg-turquoise-100 text-turquoise-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Quotes sent this month',   value: '1,284', sub: 'AI-generated responses'  },
            { label: 'Avg. quote acceptance rate',value: '68.4%', sub: 'Up from 61.2% last month' },
            { label: 'Avg. project duration',     value: '23 days',sub: 'Down 3 days vs last month'},
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex flex-col gap-1">
              <p className="text-xs text-slate-500 font-medium">{label}</p>
              <p className="text-2xl font-extrabold text-slate-900">{value}</p>
              <p className="text-xs text-slate-400">{sub}</p>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  )
}
