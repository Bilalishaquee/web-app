import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { ChevronLeft, Sparkles, Camera, ChevronRight, CheckCircle2 } from 'lucide-react'

const ROOM_TYPES = [
  { label:'Kitchen',    emoji:'🍳' },
  { label:'Bathroom',   emoji:'🚿' },
  { label:'Living Room',emoji:'🛋️' },
  { label:'Bedroom',    emoji:'🛏️' },
  { label:'Basement',   emoji:'🏠' },
  { label:'Deck/Patio', emoji:'🌿' },
  { label:'Addition',   emoji:'🏗️' },
  { label:'Whole Home', emoji:'✨' },
]

export default function AppUserQuote() {
  const navigate = useNavigate()
  const [step, setStep]       = useState(1)
  const [room, setRoom]       = useState(null)
  const [size, setSize]       = useState('')
  const [desc, setDesc]       = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)

  const runAI = () => {
    setLoading(true)
    setTimeout(() => {
      setResult({ low:28000, high:45000, confidence:87, time:'3–6 weeks' })
      setLoading(false)
      setStep(3)
    }, 1800)
  }

  return (
    <MobileAppLayout role="user">
      <div className="pt-10 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 mb-6">
          <button onClick={() => step === 1 ? navigate(-1) : setStep(s => s - 1)}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <ChevronLeft size={18} className="text-slate-600" />
          </button>
          <div>
            <h1 className="font-extrabold text-slate-900 text-lg">AI Quote</h1>
            <p className="text-[11px] text-slate-400">Step {step} of 3</p>
          </div>
          <div className="ml-auto flex gap-1">
            {[1,2,3].map(n => (
              <div key={n} className={`h-1.5 rounded-full transition-all ${n <= step ? 'bg-turquoise-500 w-6' : 'bg-slate-200 w-4'}`} />
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="px-4 space-y-5">
            <div>
              <p className="font-bold text-slate-900 mb-1">What are you renovating?</p>
              <p className="text-xs text-slate-400">Select the primary space for your project</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ROOM_TYPES.map(r => (
                <button key={r.label} onClick={() => setRoom(r.label)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    room === r.label
                      ? 'border-turquoise-500 bg-turquoise-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}>
                  <span className="text-2xl">{r.emoji}</span>
                  <span className={`text-sm font-semibold ${room === r.label ? 'text-turquoise-700' : 'text-slate-700'}`}>{r.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => room && setStep(2)} disabled={!room}
              className="w-full py-3.5 bg-turquoise-500 disabled:opacity-40 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
              Continue <ChevronRight size={16}/>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="px-4 space-y-5">
            <div>
              <p className="font-bold text-slate-900 mb-1">{room} Details</p>
              <p className="text-xs text-slate-400">Help us estimate more accurately</p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Approximate Size (sq ft)</label>
              <input type="number" value={size} onChange={e => setSize(e.target.value)}
                placeholder="e.g. 200"
                className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise-300" />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 mb-1.5 block">Describe the work</label>
              <textarea rows={4} value={desc} onChange={e => setDesc(e.target.value)}
                placeholder="e.g. Full gut renovation — new cabinets, countertops, flooring, and backsplash..."
                className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-turquoise-300 resize-none" />
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center">
                <Camera size={18} className="text-slate-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">Add Photos</p>
                <p className="text-[11px] text-slate-400">Improves estimate accuracy by 30%</p>
              </div>
              <span className="text-xs font-semibold text-turquoise-600">Upload</span>
            </div>

            <button onClick={runAI} disabled={!size || !desc}
              className="w-full py-3.5 bg-turquoise-500 disabled:opacity-40 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
              <Sparkles size={16}/> Get AI Quote
            </button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="w-14 h-14 bg-turquoise-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Sparkles size={24} className="text-turquoise-500" />
            </div>
            <p className="font-bold text-slate-900 mb-1">Analyzing your project...</p>
            <p className="text-xs text-slate-400">Our AI is reviewing local market rates and material costs</p>
          </div>
        )}

        {step === 3 && result && (
          <div className="px-4 space-y-4">
            <div className="bg-gradient-to-br from-turquoise-600 to-turquoise-700 rounded-2xl p-5 text-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles size={18} className="text-white" />
              </div>
              <p className="text-turquoise-200 text-xs mb-1">Estimated Range for your {room}</p>
              <p className="text-white font-extrabold text-3xl">${(result.low/1000).toFixed(0)}K – ${(result.high/1000).toFixed(0)}K</p>
              <p className="text-turquoise-200 text-xs mt-2">{result.time} · {result.confidence}% AI confidence</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
              {[['Timeline',`${result.time}`],['Scope',room],['Size',`${size} sq ft`]].map(([k,v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-slate-400">{k}</span>
                  <span className="font-semibold text-slate-800">{v}</span>
                </div>
              ))}
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-emerald-800">Quote sent to 3 verified contractors in your area. You will receive responses within 24 hours.</p>
            </div>

            <button onClick={() => navigate('/app/user/browse')}
              className="w-full py-3.5 bg-turquoise-500 text-white font-bold rounded-2xl">
              Browse Matching Contractors
            </button>
            <button onClick={() => navigate('/app/user/home')}
              className="w-full py-3 text-slate-500 text-sm font-semibold">
              Back to Home
            </button>
          </div>
        )}
      </div>
    </MobileAppLayout>
  )
}
