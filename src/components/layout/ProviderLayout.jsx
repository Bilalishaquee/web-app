import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, MessageSquare, FileText,
  Calendar, DollarSign, Star, User, LogOut, Bell, Menu, Wrench, ChevronDown,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/provider',            icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/provider/jobs',       icon: Briefcase,       label: 'My Jobs'   },
  { to: '/provider/quotes',     icon: FileText,        label: 'Quotes'    },
  { to: '/provider/schedule',   icon: Calendar,        label: 'Schedule'  },
  { to: '/provider/messages',   icon: MessageSquare,   label: 'Messages', badge: 3 },
  { to: '/provider/earnings',   icon: DollarSign,      label: 'Earnings'  },
  { to: '/provider/profile',    icon: User,            label: 'Profile'   },
]

function Sidebar({ collapsed, mobile = false, onClose }) {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const wide = mobile || !collapsed

  return (
    <div className={`flex flex-col h-full bg-white border-r border-slate-200 transition-all duration-300 ${
      mobile ? 'w-72' : collapsed ? 'w-[68px]' : 'w-60'
    }`}>
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-slate-100 ${!wide ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-turquoise-500 rounded-lg flex items-center justify-center shrink-0">
          <Wrench size={14} className="text-white" />
        </div>
        {wide && (
          <div>
            <p className="font-extrabold text-sm text-slate-900 leading-tight">A-1 Renovations</p>
            <p className="text-[10px] text-slate-400">Pro Portal</p>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label, badge }) => {
          const active = pathname === to || (to !== '/provider' && pathname.startsWith(to))
          return (
            <Link key={to} to={to}
              onClick={() => mobile && onClose?.()}
              title={!wide ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-turquoise-50 text-turquoise-700 border border-turquoise-200'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              } ${!wide ? 'justify-center' : ''}`}
            >
              <Icon size={17} className="shrink-0" />
              {wide && (
                <span className="flex-1">{label}</span>
              )}
              {wide && badge ? (
                <span className="bg-turquoise-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{badge}</span>
              ) : null}
              {!wide && badge ? (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-turquoise-500 rounded-full" />
              ) : null}
            </Link>
          )
        })}
      </nav>

      <div className={`px-2 py-3 border-t border-slate-100 ${!wide ? 'flex flex-col items-center' : ''}`}>
        {wide && (
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <div className="w-8 h-8 bg-turquoise-500 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0">
              {user?.initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{user?.name}</p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <p className="text-[10px] text-slate-400">Available</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => { logout(); navigate('/login') }}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 text-sm font-medium transition-colors w-full ${!wide ? 'justify-center' : ''}`}
          title={!wide ? 'Sign out' : undefined}
        >
          <LogOut size={15} />
          {wide && 'Sign out'}
        </button>
      </div>
    </div>
  )
}

export default function ProviderLayout({ children, title, subtitle }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <div className="hidden lg:flex flex-col shrink-0">
        <Sidebar collapsed={collapsed} />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full shadow-2xl">
            <Sidebar mobile onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-4 shrink-0">
          <button className="lg:hidden text-slate-500 p-1" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <button className="hidden lg:block text-slate-400 hover:text-slate-600 p-1 rounded" onClick={() => setCollapsed(c => !c)}>
            <Menu size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-slate-900 font-bold text-base leading-tight truncate">{title}</h1>
            {subtitle && <p className="text-slate-400 text-xs">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-turquoise-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-7 h-7 bg-turquoise-500 rounded-full flex items-center justify-center text-[11px] font-bold text-white">
                {user?.initials}
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-700">{user?.name}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
