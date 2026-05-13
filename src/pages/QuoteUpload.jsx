import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Upload, Camera, X, CheckCircle2, Loader2, Image, ArrowRight,
  Zap, FileImage, AlertCircle, Info
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import StepIndicator from '../components/ui/StepIndicator'

const STEPS = ['Upload Photos', 'Project Details', 'AI Processing']

const SERVICES = ['Kitchen Remodeling','Bathroom Renovation','Flooring Installation','Basement Finishing','Painting & Drywall','Roof Replacement','General Renovation']

export default function QuoteUpload() {
  const [step, setStep] = useState(0)
  const [files, setFiles] = useState([])
  const [dragging, setDragging] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [details, setDetails] = useState({ service: '', description: '', budget: '', zip: '' })
  const inputRef = useRef()
  const navigate = useNavigate()

  const addFiles = (incoming) => {
    const newFiles = Array.from(incoming).map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      url: URL.createObjectURL(f),
      name: f.name,
    }))
    setFiles(p => [...p, ...newFiles].slice(0, 8))
  }

  const removeFile = (id) => setFiles(f => f.filter(x => x.id !== id))

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const simulateProcessing = () => {
    setStep(2); setProcessing(true); setProgress(0)
    const steps = [
      { p: 15, msg: 'Analyzing surfaces & materials…' },
      { p: 35, msg: 'Detecting damage & wear…' },
      { p: 55, msg: 'Measuring dimensions…' },
      { p: 75, msg: 'Calculating labor costs…' },
      { p: 90, msg: 'Generating itemized breakdown…' },
      { p: 100, msg: 'Quote ready!' },
    ]
    let i = 0
    const interval = setInterval(() => {
      if (i >= steps.length) { clearInterval(interval); setProcessing(false); setTimeout(() => navigate('/quote/result'), 600) }
      else { setProgress(steps[i].p); i++ }
    }, 900)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="badge-turquoise mx-auto mb-3 w-fit"><Zap size={13} /> AI-Powered Quoting</div>
          <h1 className="text-3xl font-extrabold text-slate-900">Get Your Free Renovation Quote</h1>
          <p className="text-slate-500 mt-2">Upload photos and let our AI generate a detailed estimate in seconds</p>
        </div>

        <div className="mb-8">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>

        {/* Step 0 — Upload */}
        {step === 0 && (
          <div className="card space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Upload Photos</h2>
              <p className="text-sm text-slate-500">Add up to 8 photos of the space you want renovated. Better photos = more accurate quotes.</p>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
                dragging ? 'border-turquoise-500 bg-turquoise-50 drop-zone-active' : 'border-slate-200 hover:border-turquoise-400 hover:bg-turquoise-50/50'
              }`}
            >
              <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => addFiles(e.target.files)} />
              <div className="w-16 h-16 bg-turquoise-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload size={28} className="text-turquoise-500" />
              </div>
              <p className="font-semibold text-slate-700 mb-1">Drop photos here or <span className="text-turquoise-600">browse</span></p>
              <p className="text-sm text-slate-400">JPG, PNG, HEIC up to 10MB each · Max 8 photos</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs text-slate-400">
                {['Kitchen area','Bathroom tiles','Damaged walls','Flooring','Cabinets'].map(t=>(
                  <span key={t} className="bg-slate-100 px-2.5 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* Preview grid */}
            {files.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-700">{files.length} photo{files.length>1?'s':''} selected</p>
                  <button onClick={() => setFiles([])} className="text-xs text-red-500 hover:underline">Remove all</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {files.map(f => (
                    <div key={f.id} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group shadow-sm">
                      <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFile(f.id) }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                      >
                        <X size={12} />
                      </button>
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 p-2">
                        <p className="text-white text-[10px] truncate">{f.name}</p>
                      </div>
                    </div>
                  ))}
                  {files.length < 8 && (
                    <button onClick={() => inputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-turquoise-400 flex items-center justify-center text-slate-400 hover:text-turquoise-500 transition-colors">
                      <Camera size={24} />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <strong>Photo tips:</strong> Include wide shots of the full room plus close-ups of areas needing work. Good lighting improves AI accuracy by up to 40%.
              </div>
            </div>

            <button
              onClick={() => files.length > 0 && setStep(1)}
              disabled={files.length === 0}
              className={`btn-primary w-full py-3.5 ${files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Continue with {files.length || 0} photo{files.length !== 1 ? 's' : ''} <ArrowRight size={17} />
            </button>
            <p className="text-center text-xs text-slate-400">
              No photos yet? <button onClick={() => setStep(1)} className="text-turquoise-600 font-semibold hover:underline">Continue without photos →</button>
            </p>
          </div>
        )}

        {/* Step 1 — Project Details */}
        {step === 1 && (
          <div className="card space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Project Details</h2>
              <p className="text-sm text-slate-500">Tell us more so our AI can give you the most accurate estimate.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Type of renovation <span className="text-red-400">*</span></label>
              <select className="input-field" value={details.service} onChange={e => setDetails(d=>({...d,service:e.target.value}))}>
                <option value="">Select renovation type</option>
                {SERVICES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Describe what you want done</label>
              <textarea rows={4}
                className="input-field resize-none"
                placeholder="e.g. I want to completely remodel my kitchen — new cabinets, countertops, and repaint the walls. The current cabinets are old oak from the 90s…"
                value={details.description} onChange={e => setDetails(d=>({...d,description:e.target.value}))}
              />
              <p className="text-xs text-slate-400 mt-1">{details.description.length}/500 characters</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Budget range</label>
                <select className="input-field" value={details.budget} onChange={e => setDetails(d=>({...d,budget:e.target.value}))}>
                  <option value="">Not sure</option>
                  <option>Under $5,000</option>
                  <option>$5,000 – $10,000</option>
                  <option>$10,000 – $25,000</option>
                  <option>$25,000 – $50,000</option>
                  <option>$50,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">ZIP code</label>
                <input className="input-field" placeholder="90001"
                  value={details.zip} onChange={e => setDetails(d=>({...d,zip:e.target.value}))} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred timeline</label>
              <div className="grid grid-cols-3 gap-3">
                {['ASAP','Within 1 month','Flexible'].map(t => (
                  <button key={t}
                    className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      details.timeline === t ? 'border-turquoise-500 bg-turquoise-50 text-turquoise-700' : 'border-slate-200 text-slate-600 hover:border-turquoise-300'
                    }`}
                    onClick={() => setDetails(d=>({...d,timeline:t}))}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-secondary flex-1 py-3">← Back</button>
              <button
                onClick={simulateProcessing}
                disabled={!details.service}
                className={`btn-primary flex-1 py-3 ${!details.service ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Generate AI Quote <Zap size={17} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — AI Processing */}
        {step === 2 && (
          <div className="card text-center py-12">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-turquoise-100 flex items-center justify-center">
                {processing ? (
                  <Loader2 size={40} className="text-turquoise-500 animate-spin" />
                ) : (
                  <CheckCircle2 size={40} className="text-turquoise-500" />
                )}
              </div>
              {!processing && (
                <div className="absolute inset-0 animate-ping rounded-full border-2 border-turquoise-300 opacity-40" />
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {processing ? 'AI is analyzing your photos…' : 'Quote is ready!'}
            </h2>
            <p className="text-slate-500 text-sm mb-8">
              {processing ? 'Using computer vision + GPT-4 Turbo to generate your estimate' : 'Redirecting to your quote…'}
            </p>

            {/* Progress bar */}
            <div className="max-w-sm mx-auto">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>Processing</span><span>{progress}%</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-turquoise-500 rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto text-center">
              {[
                { icon: Image,       label: `${files.length || 2} photos scanned` },
                { icon: Zap,         label: 'GPT-4 Turbo active' },
                { icon: CheckCircle2,label: 'AES-256 encrypted' },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 rounded-xl p-3">
                  <s.icon size={18} className="text-turquoise-500 mx-auto mb-1" />
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
