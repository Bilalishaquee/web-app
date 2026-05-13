import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock, Eye, EyeOff, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react'
import StepIndicator from '../components/ui/StepIndicator'

const STEPS = ['Your Info', 'Verify Phone', 'Account Setup']

export default function Register() {
  const [step, setStep] = useState(0)
  const [showPwd, setShowPwd] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', otp: '',
    projectType: '', zipCode: '', referral: '',
  })
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-turquoise-50 via-white to-slate-50 flex">
      {/* Left */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-slate-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-turquoise-500/10 rounded-full blur-3xl" />
        </div>
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-turquoise-500 rounded-xl flex items-center justify-center"><Wrench size={18} /></div>
          <span className="font-bold text-lg">A-1 Renovations</span>
        </Link>
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold mb-3 leading-tight">Start your renovation journey today</h2>
            <p className="text-slate-400">Create a free account and get your first AI-powered quote in under 2 minutes.</p>
          </div>
          {[
            { n: '01', t: 'Create your account', d: 'Takes about 2 minutes' },
            { n: '02', t: 'Upload renovation photos', d: 'Any space you want to transform' },
            { n: '03', t: 'Get instant AI quote', d: 'No waiting, no callbacks' },
            { n: '04', t: 'Track your project', d: 'Real-time updates throughout' },
          ].map(s => (
            <div key={s.n} className="flex items-start gap-4">
              <div className="w-8 h-8 bg-turquoise-500/20 border border-turquoise-500/30 rounded-lg flex items-center justify-center text-turquoise-400 text-xs font-bold shrink-0">
                {s.n}
              </div>
              <div>
                <p className="font-semibold text-sm">{s.t}</p>
                <p className="text-slate-400 text-xs">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-slate-600 text-xs relative z-10">© 2026 A-1 Renovations LLC</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 bg-turquoise-500 rounded-xl flex items-center justify-center"><Wrench size={16} className="text-white" /></div>
            <span className="font-bold text-slate-900">A-1 Renovations</span>
          </Link>

          <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Create your free account</h1>
          <p className="text-slate-500 text-sm mb-7">
            Already have one? <Link to="/login" className="text-turquoise-600 font-semibold hover:underline">Sign in</Link>
          </p>

          <div className="mb-8">
            <StepIndicator steps={STEPS} currentStep={step} />
          </div>

          {/* Step 0 — Personal Info */}
          {step === 0 && (
            <form className="space-y-4" onSubmit={e => { e.preventDefault(); next() }}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">First name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input className="input-field pl-10 text-sm" placeholder="John"
                      value={form.firstName} onChange={e => update('firstName', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Last name</label>
                  <input className="input-field text-sm" placeholder="Smith"
                    value={form.lastName} onChange={e => update('lastName', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" className="input-field pl-10 text-sm" placeholder="john@example.com"
                    value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone number</label>
                <div className="flex gap-2">
                  <select className="input-field w-24 shrink-0 text-sm"><option>+1</option></select>
                  <div className="relative flex-1">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="tel" className="input-field pl-10 text-sm" placeholder="(555) 000-0000"
                      value={form.phone} onChange={e => update('phone', e.target.value)} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type={showPwd ? 'text' : 'password'} className="input-field pl-10 pr-10 text-sm" placeholder="Min. 8 characters"
                    value={form.password} onChange={e => update('password', e.target.value)} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div className="flex gap-1 mt-2">
                  {['bg-turquoise-500','bg-turquoise-400','bg-turquoise-200','bg-slate-200'].map((c,i)=>(
                    <div key={i} className={`h-1 flex-1 rounded-full ${form.password.length > i*3 ? c : 'bg-slate-200'}`} />
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-3.5">
                Continue <ArrowRight size={17} />
              </button>
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-slate-200" /><span className="text-xs text-slate-400">or</span><div className="flex-1 h-px bg-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700">
                  <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-medium text-slate-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  Apple
                </button>
              </div>
            </form>
          )}

          {/* Step 1 — OTP */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center bg-turquoise-50 rounded-2xl p-6">
                <div className="w-14 h-14 bg-turquoise-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Phone size={24} className="text-white" />
                </div>
                <p className="font-bold text-slate-900 mb-1">Check your phone</p>
                <p className="text-sm text-slate-500">We sent a 6-digit code to <strong className="text-turquoise-600">+1 {form.phone || '(555) 000-0000'}</strong></p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 text-center">Enter verification code</label>
                <input type="text" maxLength={6} placeholder="000000"
                  className="input-field text-center text-3xl tracking-[0.5em] font-mono py-4"
                  value={form.otp} onChange={e => update('otp', e.target.value)} />
              </div>
              <button onClick={next} className="btn-primary w-full py-3.5">
                Verify & Continue <ArrowRight size={17} />
              </button>
              <p className="text-center text-sm text-slate-500">
                Didn't receive it? <button className="text-turquoise-600 font-semibold hover:underline">Resend in 0:45</button>
              </p>
              <button onClick={() => setStep(0)} className="btn-ghost w-full text-sm">← Back</button>
            </div>
          )}

          {/* Step 2 — Account Setup */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">What are you looking to renovate?</label>
                <select className="input-field text-sm" value={form.projectType} onChange={e => update('projectType', e.target.value)}>
                  <option value="">Select a project type</option>
                  {['Kitchen Remodeling','Bathroom Renovation','Flooring Installation','Basement Finishing','Painting & Drywall','Roofing'].map(o=>(
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">ZIP / Postal code</label>
                <input className="input-field text-sm" placeholder="90001"
                  value={form.zipCode} onChange={e => update('zipCode', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">How did you hear about us?</label>
                <select className="input-field text-sm" value={form.referral} onChange={e => update('referral', e.target.value)}>
                  <option value="">Select one</option>
                  {['Google Search','Facebook / Instagram','Referral from friend','Yelp','Thumbtack','Other'].map(o=>(
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="bg-turquoise-50 border border-turquoise-100 rounded-xl p-4 flex gap-3">
                <CheckCircle2 size={20} className="text-turquoise-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  By creating an account, you agree to our <a href="#" className="text-turquoise-600 font-semibold">Terms of Service</a> and <a href="#" className="text-turquoise-600 font-semibold">Privacy Policy</a>. We never share your data.
                </p>
              </div>
              <button onClick={next} className="btn-primary w-full py-3.5">
                Create Account & Get My Quote <ArrowRight size={17} />
              </button>
              <button onClick={() => setStep(1)} className="btn-ghost w-full text-sm">← Back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
