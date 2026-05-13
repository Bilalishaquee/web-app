import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { Star, Shield, MapPin, Phone, Mail, ChevronRight, LogOut, DollarSign, Briefcase, Bell, HelpCircle, Settings, CalendarDays, Edit, MessageSquare } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const MENU = [
  { icon:Bell,         label:'Notifications',  sub:'Push alerts, job requests',       to:'/app/provider/settings'  },
  { icon:DollarSign,   label:'Earnings',        sub:'Payouts, bank account',           to:'/app/provider/earnings'  },
  { icon:CalendarDays, label:'My Schedule',     sub:'View weekly calendar',            to:'/app/provider/schedule'  },
  { icon:Star,         label:'My Reviews',      sub:'Client ratings and feedback',     to:'/app/provider/my-reviews'},
  { icon:Shield,       label:'License & Certs', sub:'TX-GC-4821 · Valid',             to:'/app/provider/license'   },
  { icon:Briefcase,    label:'Service Areas',   sub:'Austin, Dallas, Miami (3 cities)',to:'/app/provider/settings'  },
  { icon:Settings,     label:'Settings',        sub:'Account, notifications, privacy', to:'/app/provider/settings'  },
  { icon:HelpCircle,   label:'Help & Support',  sub:'Chat, FAQ, contact',             to:'/app/provider/support'   },
]

function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)}
      className={`relative rounded-full shrink-0 transition-colors`}
      style={{width:40, height:22, background: checked ? '#00BCD4' : '#E2E8F0'}}>
      <span className="absolute top-0.5 bg-white rounded-full shadow transition-transform"
        style={{width:18, height:18, transform: checked ? 'translateX(20px)' : 'translateX(2px)'}} />
    </button>
  )
}

export default function AppProviderProfile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [available, setAvailable] = useState(true)
  const [notifs, setNotifs] = useState(true)

  return (
    <MobileAppLayout role="provider">
      <div className="pt-12 pb-6 space-y-4">

        {/* Profile card */}
        <div className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-xl font-extrabold text-white">
                {user?.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="font-extrabold text-slate-900">{user?.name}</p>
                  <Shield size={14} className="text-turquoise-500" />
                </div>
                <p className="text-xs text-slate-400">{user?.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={11} className="text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-700">4.9</span>
                  <span className="text-[11px] text-slate-400">· 127 jobs · $284K earned</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-500 mb-3">
              {[[Mail, user?.email || 'mike.rodriguez@pros.com'],[Phone, '+1 (512) 555-0142'],[MapPin, 'Austin, TX']].map(([Icon, val]) => (
                <div key={val} className="flex items-center gap-2">
                  <Icon size={13} className="text-slate-400 shrink-0" /> {val}
                </div>
              ))}
            </div>
            <Link to="/app/provider/edit-profile"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors">
              <Edit size={12}/> Edit Profile
            </Link>
          </div>
        </div>

        {/* Availability toggle */}
        <div className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-900">Accepting New Jobs</p>
              <p className={`text-xs mt-0.5 ${available ? 'text-emerald-600' : 'text-slate-400'}`}>
                {available ? 'Your profile is visible to homeowners' : 'Hidden from new quote requests'}
              </p>
            </div>
            <Toggle checked={available} onChange={setAvailable} />
          </div>
        </div>

        {/* Menu */}
        <div className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-50">
            {MENU.map(({ icon: Icon, label, sub, to }) => {
              const inner = (
                <>
                  <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-slate-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-slate-800">{label}</p>
                    <p className="text-[11px] text-slate-400">{sub}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-300" />
                </>
              )
              return to ? (
                <Link key={label} to={to} className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors">{inner}</Link>
              ) : (
                <button key={label} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 transition-colors">{inner}</button>
              )
            })}
          </div>
        </div>

        {/* Notifications toggle */}
        <div className="px-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">Push Notifications</p>
            <Toggle checked={notifs} onChange={setNotifs} />
          </div>
        </div>

        {/* Logout */}
        <div className="px-4">
          <button onClick={() => { logout(); navigate('/login') }}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm rounded-2xl border border-red-200 transition-colors">
            <LogOut size={15}/> Sign Out
          </button>
        </div>

        <p className="text-center text-[11px] text-slate-300">A-1 Renovations Pro v1.0.0 · © 2026</p>
      </div>
    </MobileAppLayout>
  )
}
