import AdminLayout from '../../components/layout/AdminLayout'
import { TrendingUp, Users, DollarSign, Sparkles, Star, MapPin } from 'lucide-react'

const MONTHLY_REVENUE = [
  { month:'Dec', value:168, max:300 },
  { month:'Jan', value:198, max:300 },
  { month:'Feb', value:221, max:300 },
  { month:'Mar', value:245, max:300 },
  { month:'Apr', value:268, max:300 },
  { month:'May', value:284, max:300 },
]

const USER_GROWTH = [
  { month:'Dec', users:5800 },
  { month:'Jan', users:6200 },
  { month:'Feb', users:6700 },
  { month:'Mar', users:7100 },
  { month:'Apr', users:7700 },
  { month:'May', users:8420 },
]
const maxUsers = Math.max(...USER_GROWTH.map(u => u.users))

const TOP_SERVICES = [
  { label:'Kitchen Remodeling', pct:31, revenue:'$88.2K', color:'bg-turquoise-500', jobs:284 },
  { label:'Bathroom Renovation', pct:24, revenue:'$68.3K', color:'bg-blue-500', jobs:219 },
  { label:'General Contractor',  pct:18, revenue:'$51.2K', color:'bg-violet-500', jobs:142 },
  { label:'Electrical',          pct:12, revenue:'$34.1K', color:'bg-amber-500', jobs:98  },
  { label:'Plumbing',            pct: 8, revenue:'$22.8K', color:'bg-rose-500', jobs:67  },
  { label:'Flooring',            pct: 4, revenue:'$11.4K', color:'bg-emerald-500', jobs:41 },
  { label:'Other',               pct: 3, revenue:'$8.5K',  color:'bg-slate-400', jobs:29  },
]

const TOP_CITIES = [
  { city:'Austin, TX',       projects:89, revenue:'$42.1K', growth:'+24%' },
  { city:'Dallas, TX',       projects:74, revenue:'$38.4K', growth:'+18%' },
  { city:'Houston, TX',      projects:68, revenue:'$35.2K', growth:'+15%' },
  { city:'Denver, CO',       projects:52, revenue:'$28.7K', growth:'+31%' },
  { city:'Miami, FL',        projects:47, revenue:'$26.3K', growth:'+22%' },
  { city:'Los Angeles, CA',  projects:43, revenue:'$24.8K', growth:'+19%' },
  { city:'Nashville, TN',    projects:38, revenue:'$19.4K', growth:'+28%' },
  { city:'Chicago, IL',      projects:35, revenue:'$18.2K', growth:'+12%' },
]

const FUNNEL = [
  { label:'Site Visitors',      value:142000, pct:100, color:'bg-turquoise-200' },
  { label:'Quote Requests',     value:8940,   pct:63,  color:'bg-turquoise-300' },
  { label:'Quotes Sent',        value:7210,   pct:51,  color:'bg-turquoise-400' },
  { label:'Quotes Accepted',    value:4923,   pct:35,  color:'bg-turquoise-500' },
  { label:'Projects Started',   value:4418,   pct:31,  color:'bg-turquoise-600' },
  { label:'Projects Completed', value:3847,   pct:27,  color:'bg-turquoise-700' },
]

export default function AdminAnalytics() {
  return (
    <AdminLayout title="Analytics" subtitle="Platform performance metrics — May 2026">
      <div className="p-6 space-y-6">

        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:'Monthly Revenue',   value:'$284.5K', change:'+22.1%', icon:DollarSign, color:'text-turquoise-600 bg-turquoise-50' },
            { label:'Active Users',      value:'8,420',   change:'+12.4%', icon:Users,      color:'text-blue-600 bg-blue-50'          },
            { label:'Quote Requests',    value:'2,714',   change:'+18.3%', icon:Sparkles,   color:'text-violet-600 bg-violet-50'      },
            { label:'Avg Platform Rating',value:'4.8 ★',  change:'+0.1',   icon:Star,       color:'text-amber-600 bg-amber-50'        },
          ].map(({ label, value, change, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-slate-500">{label}</p>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon size={13} />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{value}</p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={11} className="text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600">{change} vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 mb-1">Monthly Revenue</h2>
            <p className="text-xs text-slate-400 mb-5">Last 6 months ($K)</p>
            <div className="flex items-end gap-3 h-36">
              {MONTHLY_REVENUE.map(({ month, value, max }) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-700">${value}K</span>
                  <div className="w-full rounded-t-lg bg-turquoise-500 opacity-90 transition-all"
                    style={{ height: `${(value / max) * 100}%` }} />
                  <span className="text-[11px] text-slate-400">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User growth */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 mb-1">User Growth</h2>
            <p className="text-xs text-slate-400 mb-5">Total registered homeowners</p>
            <div className="flex items-end gap-3 h-36">
              {USER_GROWTH.map(({ month, users }) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-700">{(users/1000).toFixed(1)}K</span>
                  <div className="w-full rounded-t-lg bg-blue-500 opacity-90"
                    style={{ height: `${(users / maxUsers) * 100}%` }} />
                  <span className="text-[11px] text-slate-400">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top services */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 mb-1">Revenue by Service Category</h2>
            <p className="text-xs text-slate-400 mb-5">May 2026 · $284.5K total</p>
            <div className="space-y-4">
              {TOP_SERVICES.map(({ label, pct, revenue, color, jobs }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">{jobs} jobs</span>
                      <span className="text-sm font-bold text-slate-800 w-14 text-right">{revenue}</span>
                      <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top cities */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-900 mb-1">Top Markets</h2>
            <p className="text-xs text-slate-400 mb-5">By project count</p>
            <div className="space-y-3">
              {TOP_CITIES.map(({ city, projects, revenue, growth }, i) => (
                <div key={city} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-300 w-4">{i+1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{city}</p>
                    <p className="text-[11px] text-slate-400">{projects} projects · {revenue}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 shrink-0">{growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion funnel */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="font-bold text-slate-900 mb-1">Conversion Funnel</h2>
          <p className="text-xs text-slate-400 mb-5">Visitor → Completed Project</p>
          <div className="space-y-2.5">
            {FUNNEL.map(({ label, value, pct, color }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="text-xs font-medium text-slate-600 w-40 shrink-0">{label}</span>
                <div className="flex-1 h-6 bg-slate-50 rounded-lg overflow-hidden">
                  <div className={`h-full ${color} rounded-lg flex items-center px-2`} style={{ width: `${Math.max(pct, 8)}%` }}>
                    <span className="text-[11px] font-bold text-white whitespace-nowrap">{value.toLocaleString()}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  )
}
