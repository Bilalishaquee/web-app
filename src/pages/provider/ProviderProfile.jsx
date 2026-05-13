import { useState } from 'react'
import ProviderLayout from '../../components/layout/ProviderLayout'
import { Star, Shield, MapPin, Phone, Mail, Camera, Plus, CheckCircle2, Save } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const SERVICES = [
  { name:'Kitchen Remodeling',  price:'$250–$400/sq ft', years:12 },
  { name:'Bathroom Renovation', price:'$180–$320/sq ft', years:10 },
  { name:'General Contracting', price:'$120–$200/hr',    years:15 },
  { name:'Home Addition',       price:'$200–$380/sq ft', years:8  },
]

const CERTS = [
  { name:'NAHB Certified Graduate Builder', issued:'2018', valid:true },
  { name:'OSHA 30-Hour Construction',       issued:'2022', valid:true },
  { name:'EPA Lead Renovation Certified',   issued:'2020', valid:true },
  { name:'Texas Residential Contractor',    issued:'2016', valid:true, num:'TX-GC-4821' },
]

const PORTFOLIO = [
  { title:'Modern Kitchen Remodel',  city:'Austin, TX',   year:2024, img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&auto=format&fit=crop&q=80' },
  { title:'Spa Bathroom Renovation', city:'Dallas, TX',   year:2024, img:'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&auto=format&fit=crop&q=80' },
  { title:'Open-Concept Living',     city:'Houston, TX',  year:2023, img:'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&auto=format&fit=crop&q=80' },
  { title:'ADU Garage Conversion',   city:'Austin, TX',   year:2023, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80' },
  { title:'Full Home Renovation',    city:'Miami, FL',    year:2024, img:'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&auto=format&fit=crop&q=80' },
  { title:'Composite Deck Build',    city:'Nashville, TN',year:2024, img:'https://images.unsplash.com/photo-1558618047-f5e2b7f0c7cf?w=400&auto=format&fit=crop&q=80' },
]

const TABS = ['Profile','Services','Portfolio','Certifications']

export default function ProviderProfile() {
  const { user } = useAuth()
  const [tab, setTab]       = useState('Profile')
  const [saved, setSaved]   = useState(false)
  const [form, setForm]     = useState({
    name: 'Mike Rodriguez', title: 'Licensed General Contractor',
    bio: "With 15+ years of experience in residential renovation, I specialize in kitchen remodels, bathroom renovations, and whole-home transformations. My team delivers quality craftsmanship on time and on budget. We're licensed, bonded, and insured in Texas and Florida.",
    phone: '+1 (512) 555-0142', email: 'mike.rodriguez@pros.com',
    address: 'Austin, TX 78701', serviceRadius: '50 miles',
    website: 'mrodriguezcontracting.com', instagram: '@mrodriguezpros',
    available: true,
  })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <ProviderLayout title="My Profile" subtitle="Manage your public profile and portfolio">
      <div className="p-6">
        {/* Hero */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-5">
          <div className="h-28 bg-gradient-to-br from-turquoise-600 to-turquoise-800 relative">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage:'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&auto=format&fit=crop&q=40)', backgroundSize:'cover'}} />
          </div>
          <div className="px-6 pb-5 relative">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="relative">
                <div className="w-20 h-20 bg-turquoise-500 rounded-2xl border-4 border-white flex items-center justify-center text-2xl font-extrabold text-white shadow-lg">
                  MR
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center border-2 border-white">
                  <Camera size={10} className="text-white" />
                </button>
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900">{form.name}</h2>
                  <Shield size={16} className="text-turquoise-500" />
                </div>
                <p className="text-sm text-slate-500">{form.title}</p>
              </div>
              <div className="ml-auto flex items-center gap-4 text-center pb-1">
                {[['4.9', 'Rating', 'text-amber-600'],['127', 'Jobs', 'text-turquoise-600'],['$284K', 'Earned', 'text-emerald-600']].map(([v, l, c]) => (
                  <div key={l}>
                    <p className={`text-lg font-extrabold ${c}`}>{v}</p>
                    <p className="text-[11px] text-slate-400">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability toggle */}
            <div className="flex items-center gap-2">
              <button onClick={() => set('available', !form.available)}
                className={`relative w-10 h-5 rounded-full transition-colors ${form.available ? 'bg-emerald-500' : 'bg-slate-300'}`}
                style={{height:22, width:40}}>
                <span className="absolute top-0.5 w-[18px] h-[18px] bg-white rounded-full shadow transition-transform"
                  style={{transform: form.available ? 'translateX(20px)' : 'translateX(2px)'}} />
              </button>
              <span className={`text-xs font-semibold ${form.available ? 'text-emerald-600' : 'text-slate-400'}`}>
                {form.available ? 'Available for new projects' : 'Not accepting new projects'}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit mb-5">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${
                tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>{t}</button>
          ))}
        </div>

        {tab === 'Profile' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[['Full Name', 'name'],['Professional Title', 'title'],['Phone', 'phone'],['Email', 'email'],['Business Address', 'address'],['Service Radius', 'serviceRadius'],['Website', 'website'],['Instagram', 'instagram']].map(([l, k]) => (
                <div key={k}>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">{l}</label>
                  <input value={form[k]} onChange={e => set(k, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300" />
                </div>
              ))}
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 mb-1 block">Bio / About</label>
              <textarea rows={4} value={form.bio} onChange={e => set('bio', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300 resize-none" />
            </div>
            <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-turquoise-500 hover:bg-turquoise-600 text-white'}`}>
              {saved ? <><CheckCircle2 size={14}/> Saved!</> : <><Save size={14}/> Save Profile</>}
            </button>
          </div>
        )}

        {tab === 'Services' && (
          <div className="space-y-3">
            {SERVICES.map(s => (
              <div key={s.name} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.years} years experience</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-turquoise-600">{s.price}</p>
                  <button className="text-[11px] text-slate-400 hover:text-slate-600 underline">Edit</button>
                </div>
              </div>
            ))}
            <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-300 text-slate-500 hover:border-turquoise-300 hover:text-turquoise-600 rounded-xl text-sm font-medium transition-colors w-full justify-center">
              <Plus size={14}/> Add Service
            </button>
          </div>
        )}

        {tab === 'Portfolio' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {PORTFOLIO.map(p => (
              <div key={p.title} className="group rounded-xl overflow-hidden border border-slate-200 relative aspect-[4/3] cursor-pointer">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 p-3">
                    <p className="text-white text-xs font-bold">{p.title}</p>
                    <p className="text-white/70 text-[11px]">{p.city} · {p.year}</p>
                  </div>
                </div>
              </div>
            ))}
            <button className="aspect-[4/3] rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-turquoise-300 hover:text-turquoise-600 transition-colors cursor-pointer">
              <Camera size={20}/>
              <span className="text-xs font-medium">Add Photo</span>
            </button>
          </div>
        )}

        {tab === 'Certifications' && (
          <div className="space-y-3">
            {CERTS.map(c => (
              <div key={c.name} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
                <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <Shield size={16} className="text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-sm">{c.name}</p>
                  {c.num && <p className="text-xs text-slate-400">License #{c.num}</p>}
                  <p className="text-xs text-slate-400">Issued {c.issued}</p>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">Active</span>
              </div>
            ))}
            <button className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-slate-300 text-slate-500 hover:border-turquoise-300 hover:text-turquoise-600 rounded-xl text-sm font-medium transition-colors w-full justify-center">
              <Plus size={14}/> Add Certification
            </button>
          </div>
        )}
      </div>
    </ProviderLayout>
  )
}
