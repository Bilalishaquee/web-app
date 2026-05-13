import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Wrench, ChevronDown, Bell, Search, User, Zap } from 'lucide-react'

const mainNav = [
  { label: 'Find Pros',    href: '/browse'       },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Cost Guides',  href: '/cost-guides'   },
  { label: 'For Pros',     href: '/for-pros'      },
]

const services = [
  'Kitchen Remodeling','Bathroom Renovation','Flooring','Painting & Drywall',
  'Roofing','Basement Finishing','HVAC','Plumbing','Electrical','Landscaping',
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()

  const isApp = ['/dashboard','/tracking','/schedule','/quote'].some(p => location.pathname.startsWith(p))

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  if (isApp) return <AppNavbar />

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-[0_2px_20px_rgba(0,0,0,0.09)] border-b border-slate-100' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[68px] gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 bg-turquoise-gradient rounded-xl flex items-center justify-center shadow-glow-sm bg-turquoise-500 group-hover:bg-turquoise-600 transition-colors">
              <Wrench size={17} className="text-white" />
            </div>
            <div className="leading-none">
              <span className="block text-[15px] font-extrabold text-slate-900 tracking-tight">A-1 Renovations</span>
              <span className="block text-[9px] font-bold tracking-[0.12em] uppercase text-turquoise-500 mt-0.5">AI-Powered Platform</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {mainNav.map(link => {
              if (link.label === 'Find Pros') return (
                <div key={link.label} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                  <button className="nav-link flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-turquoise-600">
                    {link.label} <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 pt-2 w-60">
                      <div className="bg-white rounded-2xl shadow-card-hover border border-slate-100 p-2 animate-scale-in">
                        {services.map(s => (
                          <Link key={s} to={`/browse?service=${encodeURIComponent(s)}`}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-turquoise-50 hover:text-turquoise-700 transition-colors font-medium">
                            {s}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
              return (
                <a key={link.label} href={link.href} className="nav-link px-3 py-2 rounded-lg hover:bg-slate-50">
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-2 ml-auto">
            <Link to="/login" className="nav-link px-3 py-2 rounded-lg hover:bg-slate-50">Sign In</Link>
            <Link to="/register" className="nav-link px-3 py-2 rounded-lg hover:bg-slate-50">Join Free</Link>
            <Link to="/quote" className="btn-primary text-sm py-2.5 px-5">
              <Zap size={14} className="fill-white" /> Get AI Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden ml-auto p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-lg">
          <div className="px-4 pt-3 pb-5 space-y-1 max-h-[80vh] overflow-y-auto">
            <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 px-3 pt-2 pb-1">Services</p>
            {services.slice(0,6).map(s => (
              <Link key={s} to={`/browse?service=${encodeURIComponent(s)}`}
                className="block px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-turquoise-50 hover:text-turquoise-700 font-medium"
                onClick={() => setMobileOpen(false)}>
                {s}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-3 mt-3 space-y-1">
              {mainNav.slice(1).map(link => (
                <a key={link.label} href={link.href}
                  className="block px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 font-medium"
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-3 mt-3 space-y-2">
              <Link to="/login" className="btn-secondary w-full py-3 text-sm" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/quote" className="btn-primary w-full py-3 text-sm" onClick={() => setMobileOpen(false)}>
                <Zap size={14} className="fill-white" /> Get AI Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function AppNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 bg-turquoise-500 rounded-lg flex items-center justify-center">
              <Wrench size={15} className="text-white" />
            </div>
            <span className="font-extrabold text-slate-900 text-[15px] tracking-tight">A-1 Renovations</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            {[
              {label:'Dashboard', to:'/dashboard'},
              {label:'My Projects', to:'/dashboard'},
              {label:'Get Quote', to:'/quote'},
              {label:'Schedule', to:'/schedule'},
            ].map(l => (
              <Link key={l.label} to={l.to} className="nav-link px-3 py-2 rounded-lg hover:bg-slate-50 text-sm">{l.label}</Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 text-slate-500 hover:text-turquoise-600 hover:bg-turquoise-50 rounded-xl transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-turquoise-500 flex items-center justify-center text-white font-bold text-sm shadow-glow-sm">AJ</div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 leading-none">Alex Johnson</p>
                <p className="text-xs text-slate-400 mt-0.5">Premium Member</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
