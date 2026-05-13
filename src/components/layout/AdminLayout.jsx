import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, HardHat, FolderKanban, Sparkles,
  CreditCard, BarChart3, Settings, LogOut, Bell, Menu,
  Wrench, ChevronDown,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/admin',             icon: LayoutDashboard, label: 'Dashboard'         },
  { to: '/admin/users',       icon: Users,           label: 'Users'             },
  { to: '/admin/providers',   icon: HardHat,         label: 'Service Providers' },
  { to: '/admin/projects',    icon: FolderKanban,    label: 'Projects'          },
  { to: '/admin/quotes',      icon: Sparkles,        label: 'Quotes & AI'       },
  { to: '/admin/payments',    icon: CreditCard,      label: 'Payments'          },
  { to: '/admin/analytics',   icon: BarChart3,       label: 'Analytics'         },
  { to: '/admin/settings',    icon: Settings,        label: 'Settings'          },
]

function Sidebar({ collapsed, mobile = false, onClose }) {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const wide = mobile || !collapsed

  return (
    <div className={`flex flex-col h-full bg-slate-900 text-white transition-all duration-300 ${
      mobile ? 'w-72' : collapsed ? 'w-[68px]' : 'w-60'
    }`}>
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-slate-800 ${!wide ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-turquoise-500 rounded-lg flex items-center justify-center shrink-0">
          <Wrench size={14} className="text-white" />
        </div>
        {wide && <span className="font-extrabold text-sm tracking-tight whitespace-nowrap">A-1 Admin</span>}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => {
          const active = pathname === to || (to !== '/admin' && pathname.startsWith(to))
          return (
            <Link key={to} to={to}
              onClick={() => mobile && onClose?.()}
              title={!wide ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-turquoise-500/20 text-turquoise-400'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              } ${!wide ? 'justify-center' : ''}`}
            >
              <Icon size={17} className="shrink-0" />
              {wide && label}
            </Link>
          )
        })}
      </nav>

      <div className={`px-2 py-3 border-t border-slate-800 ${!wide ? 'flex flex-col items-center gap-2' : ''}`}>
        {wide && (
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <div className="w-7 h-7 bg-turquoise-500 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0">
              {user?.initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-slate-400 truncate">Administrator</p>
            </div>
          </div>
        )}
        <button
          onClick={() => { logout(); navigate('/login') }}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 text-sm font-medium transition-colors w-full ${!wide ? 'justify-center' : ''}`}
          title={!wide ? 'Sign out' : undefined}
        >
          <LogOut size={16} />
          {wide && 'Sign out'}
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout({ children, title, subtitle }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col shrink-0 border-r border-slate-800/50">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full shadow-2xl">
            <Sidebar mobile onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-4 shrink-0">
          <button className="lg:hidden text-slate-500 hover:text-slate-700 p-1" onClick={() => setMobileOpen(true)}>
            <Menu size={20} />
          </button>
          <button className="hidden lg:block text-slate-400 hover:text-slate-600 p-1 rounded transition-colors" onClick={() => setCollapsed(c => !c)}>
            <Menu size={18} />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-slate-900 font-bold text-base leading-tight truncate">{title}</h1>
            {subtitle && <p className="text-slate-400 text-xs truncate">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
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
