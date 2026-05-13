import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Phone, Eye, EyeOff, Wrench, ArrowRight, Loader2, ShieldCheck, HardHat, Home } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ROLES = [
  { id:'user',     icon:Home,       label:'Homeowner',         sub:'Track projects & get quotes', color:'text-turquoise-600 bg-turquoise-50 border-turquoise-200' },
  { id:'provider', icon:HardHat,    label:'Service Provider',  sub:'Manage jobs & earnings',      color:'text-blue-600 bg-blue-50 border-blue-200'               },
  { id:'admin',    icon:ShieldCheck,label:'Administrator',     sub:'Platform management',         color:'text-violet-600 bg-violet-50 border-violet-200'         },
]

const ROLE_REDIRECT = { user:'/dashboard', provider:'/provider', admin:'/admin' }

const FEATURES = [
  'AI-generated quotes in under 2 minutes',
  'Real-time project milestone tracking',
  'Direct contractor messaging',
  'Secure document storage',
  'iOS & Android app with push notifications',
]

export default function Login() {
  const [role, setRole]       = useState('user')
  const [method, setMethod]   = useState('email')
  const [showPwd, setShowPwd] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm]       = useState({ email:'', password:'', phone:'', otp:'' })
  const { login } = useAuth()
  const navigate  = useNavigate()

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (method === 'phone' && !otpSent) { setOtpSent(true); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    login(role)
    navigate(ROLE_REDIRECT[role])
  }

  const socialLogin = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    login(role)
    navigate(ROLE_REDIRECT[role])
  }

  const selectedRole = ROLES.find(r => r.id === role)

  return (
    <div className="min-h-screen bg-white flex">

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[42%] bg-[#006064] p-14 text-white relative overflow-hidden shrink-0">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-28 -right-28 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full" />
        </div>

        <Link to="/" className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center border border-white/20">
            <Wrench size={17} />
          </div>
          <span className="font-extrabold text-lg tracking-tight">A-1 Renovations</span>
        </Link>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight mb-3">
              Welcome back to your renovation journey
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Track your projects, view AI quotes, communicate with your contractor, and manage everything in one place.
            </p>
          </div>

          <div className="space-y-3">
            {FEATURES.map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center shrink-0 text-[10px] font-bold">✓</div>
                {f}
              </div>
            ))}
          </div>

          <div className="bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['MR','SC','AW','JP'].map((i,n) => (
                <div key={n} className="w-8 h-8 rounded-full bg-turquoise-400 border-2 border-[#006064] flex items-center justify-center text-[10px] font-bold text-white">{i}</div>
              ))}
            </div>
            <p className="text-sm text-white/80"><strong className="text-white">1,200+ homeowners</strong> tracking their renovations today</p>
          </div>
        </div>

        <p className="text-white/40 text-xs relative z-10">© 2026 A-1 Renovations LLC</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-[420px]">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-7 lg:hidden">
            <div className="w-8 h-8 bg-turquoise-500 rounded-xl flex items-center justify-center">
              <Wrench size={15} className="text-white" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight">A-1 Renovations</span>
          </Link>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Sign in to your account</h1>
          <p className="text-slate-500 text-sm mb-6">
            No account?{' '}
            <Link to="/register" className="text-turquoise-600 font-semibold hover:underline">Create one free</Link>
          </p>

          {/* Role selector */}
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Sign in as</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {ROLES.map(r => {
              const Icon = r.icon
              const active = role === r.id
              return (
                <button key={r.id} onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                    active ? r.color : 'border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[11px] font-bold leading-tight text-center">{r.label}</span>
                </button>
              )
            })}
          </div>

          {/* Auth method toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-5 gap-1">
            {[{id:'email',label:'Email'},{id:'phone',label:'Phone / OTP'}].map(m => (
              <button key={m.id} onClick={() => { setMethod(m.id); setOtpSent(false) }}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  method === m.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}>{m.label}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {method === 'email' ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input type="email" placeholder="you@example.com"
                      className="input-field pl-10 text-sm"
                      value={form.email} onChange={e => update('email', e.target.value)} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold text-slate-700">Password</label>
                    <a href="#" className="text-xs text-turquoise-600 font-medium hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input type={showPwd ? 'text' : 'password'} placeholder="Your password"
                      className="input-field pl-10 pr-10 text-sm"
                      value={form.password} onChange={e => update('password', e.target.value)} />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone number</label>
                  <div className="flex gap-2">
                    <select className="input-field w-20 shrink-0 text-sm px-2">
                      <option>+1</option><option>+44</option><option>+91</option>
                    </select>
                    <div className="relative flex-1">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input type="tel" placeholder="(555) 000-0000" className="input-field pl-10 text-sm"
                        value={form.phone} onChange={e => update('phone', e.target.value)} />
                    </div>
                  </div>
                </div>
                {otpSent && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter the 6-digit code</label>
                    <input type="text" maxLength={6} placeholder="000 000"
                      className="input-field text-center text-2xl tracking-[0.4em] font-mono py-4"
                      value={form.otp} onChange={e => update('otp', e.target.value)} autoFocus />
                    <p className="text-xs text-slate-400 mt-2 text-center">
                      Sent to <strong>+1 {form.phone || '—'}</strong> ·{' '}
                      <button type="button" onClick={() => setOtpSent(false)} className="text-turquoise-600 font-medium hover:underline">Resend</button>
                    </p>
                  </div>
                )}
              </>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3.5 text-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Signing in…</>
              ) : method === 'phone' && !otpSent ? (
                <>Send OTP Code <ArrowRight size={16} /></>
              ) : (
                <>Sign In as {selectedRole?.label} <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="divider-text my-5">or continue with</div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={socialLogin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors">
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button type="button" onClick={socialLogin}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              Apple
            </button>
          </div>

          <p className="text-xs text-slate-400 text-center mt-7">
            By signing in you agree to our{' '}
            <a href="#" className="text-turquoise-600 hover:underline">Terms</a> and{' '}
            <a href="#" className="text-turquoise-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
