import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search, MapPin, SlidersHorizontal, Star, Award, ChevronRight,
  X, CheckCircle2, Clock, Zap, Shield, ChevronDown, Filter
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const ALL_PROS = [
  { id:'mike-rodriguez',  name:'Mike Rodriguez',  title:'Kitchen & Bath Specialist',    rating:4.9, reviews:214, jobs:312, badge:'Top Pro', resp:'< 1 hr', zip:'90001', price:'$$',  color:'bg-turquoise-500', initials:'MR', services:['Kitchen Remodeling','Bathroom Renovation','Tile Work'], bio:'15+ years specializing in high-end kitchen and bathroom transformations in the LA area.', verified:true },
  { id:'sara-chen',       name:'Sara Chen',       title:'Interior Remodeling Expert',   rating:4.8, reviews:187, jobs:260, badge:'Top Pro', resp:'< 2 hr', zip:'90210', price:'$$$', color:'bg-blue-500',     initials:'SC', services:['Kitchen Remodeling','Painting','Flooring'],           bio:'Award-winning interior remodeler. Specializes in open-concept transformations and modern design.',          verified:true },
  { id:'carlos-morales',  name:'Carlos Morales',  title:'Flooring & Tile Pro',          rating:4.9, reviews:156, jobs:198, badge:'',        resp:'< 3 hr', zip:'90005', price:'$',   color:'bg-emerald-500',  initials:'CM', services:['Flooring','Tile Work','Bathroom Renovation'],          bio:'Expert tile installer with 10+ years of experience in residential and commercial flooring.',               verified:true },
  { id:'amara-williams',  name:'Amara Williams',  title:'Full Renovation Contractor',   rating:5.0, reviews:98,  jobs:140, badge:'Top Pro', resp:'< 1 hr', zip:'91001', price:'$$',  color:'bg-violet-500',   initials:'AW', services:['General Contracting','Kitchen Remodeling','Roofing'],  bio:'Full-service renovation contractor. From concept to completion, every detail handled professionally.',       verified:true },
  { id:'james-park',      name:'James Park',      title:'HVAC & Electrical Expert',     rating:4.7, reviews:203, jobs:380, badge:'',        resp:'< 4 hr', zip:'90025', price:'$',   color:'bg-amber-500',    initials:'JP', services:['HVAC','Electrical','Plumbing'],                         bio:'Licensed HVAC and electrical contractor with 20 years of experience in residential and light commercial.',   verified:true },
  { id:'lucia-gomez',     name:'Lucia Gomez',     title:'Landscape & Outdoor Designer', rating:4.8, reviews:134, jobs:220, badge:'Top Pro', resp:'< 2 hr', zip:'90045', price:'$$',  color:'bg-lime-600',     initials:'LG', services:['Landscaping','Deck Building','Outdoor Living'],        bio:'Transform your outdoor space into a paradise. Specializes in drought-resistant California landscaping.',    verified:true },
  { id:'tom-sullivan',    name:'Tom Sullivan',    title:'Roofing & Exterior Pro',       rating:4.6, reviews:178, jobs:290, badge:'',        resp:'< 5 hr', zip:'91030', price:'$$',  color:'bg-rose-500',     initials:'TS', services:['Roofing','Siding','Gutters','Painting'],               bio:'25+ years of roofing experience. Specializes in tile, shingle, and flat roof systems.',                   verified:true },
  { id:'priya-patel',     name:'Priya Patel',     title:'Basement & Additions Expert',  rating:4.9, reviews:89,  jobs:120, badge:'Top Pro', resp:'< 1 hr', zip:'90066', price:'$$$', color:'bg-indigo-500',   initials:'PP', services:['Basement Finishing','Home Additions','Framing'],       bio:'Structural expert specializing in basement conversions, ADUs, and home additions throughout SoCal.',        verified:true },
]

const SERVICES = ['Kitchen Remodeling','Bathroom Renovation','Flooring','Painting & Drywall','Roofing','Basement Finishing','HVAC','Plumbing','Electrical','Landscaping','General Contracting','Home Inspection']
const SORT_OPTIONS = ['Best Match','Highest Rated','Most Reviews','Fastest Response','Lowest Price']
const PRICE_FILTERS = ['Any','$','$$','$$$']

export default function BrowsePros() {
  const [params] = useSearchParams()
  const initialService = params.get('service') || ''

  const [query, setQuery]         = useState(initialService)
  const [zip, setZip]             = useState('')
  const [service, setService]     = useState(initialService)
  const [sort, setSort]           = useState('Best Match')
  const [price, setPrice]         = useState('Any')
  const [badgeFilter, setBadge]   = useState(false)
  const [showFilters, setFilters] = useState(false)

  const filtered = ALL_PROS.filter(p => {
    const svc = service ? p.services.some(s => s.toLowerCase().includes(service.toLowerCase())) : true
    const prc = price === 'Any' || p.price === price
    const bdg = !badgeFilter || p.badge === 'Top Pro'
    return svc && prc && bdg
  }).sort((a, b) => {
    if (sort === 'Highest Rated') return b.rating - a.rating
    if (sort === 'Most Reviews')  return b.reviews - a.reviews
    return 0
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Search header */}
      <div className="pt-[68px] bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="search-bar flex-1">
              <div className="flex items-center flex-1 px-4 gap-2">
                <Search size={17} className="text-slate-400 shrink-0" />
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="flex-1 bg-transparent text-slate-700 text-sm py-3.5 focus:outline-none font-medium appearance-none cursor-pointer"
                >
                  <option value="">All services</option>
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="search-divider" />
              <div className="flex items-center px-4 gap-2">
                <MapPin size={15} className="text-slate-400 shrink-0" />
                <input
                  className="py-3.5 bg-transparent text-sm text-slate-700 placeholder-slate-400 focus:outline-none w-32"
                  placeholder="ZIP code"
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                />
              </div>
              <button className="btn-primary rounded-xl m-2 px-5 text-sm">Search</button>
            </div>
            <button onClick={() => setFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 border-2 border-slate-200 rounded-xl font-semibold text-slate-600 hover:border-turquoise-400 hover:text-turquoise-600 transition-colors text-sm bg-white">
              <SlidersHorizontal size={16} /> Filters {badgeFilter || price !== 'Any' ? <span className="w-2 h-2 bg-turquoise-500 rounded-full" /> : null}
            </button>
          </div>

          {/* Filter row */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-3 pt-4 border-t border-slate-100 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Price:</span>
                {PRICE_FILTERS.map(p => (
                  <button key={p} onClick={() => setPrice(p)}
                    className={price === p ? 'filter-pill-active' : 'filter-pill'}>
                    {p}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => setBadge(!badgeFilter)}
                  className={badgeFilter ? 'filter-pill-active flex items-center gap-1' : 'filter-pill flex items-center gap-1'}>
                  <Award size={12} className={badgeFilter ? 'text-amber-500 fill-amber-500' : 'text-slate-400'} /> Top Pro only
                </button>
              </div>
              {(badgeFilter || price !== 'Any') && (
                <button onClick={() => { setPrice('Any'); setBadge(false) }}
                  className="flex items-center gap-1 text-xs text-red-500 font-semibold hover:underline ml-auto">
                  <X size={12} /> Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              {service ? `${service} Pros` : 'All Contractors'}
              <span className="text-slate-400 font-normal text-base ml-2">({filtered.length} results)</span>
            </h1>
            {zip && <p className="text-sm text-slate-500 mt-0.5"><MapPin size={12} className="inline mr-1" />{zip} area</p>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 font-medium">Sort:</span>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-turquoise-400">
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* AI CTA banner */}
        <div className="bg-turquoise-gradient bg-turquoise-500 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Zap size={22} className="text-white fill-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">Get an AI-powered quote first</p>
            <p className="text-turquoise-100 text-xs mt-0.5">Upload photos → get a detailed estimate → then compare with any contractor on this list</p>
          </div>
          <Link to="/quote" className="btn-white text-sm py-2.5 px-5 shrink-0">
            Get AI Quote <Zap size={14} />
          </Link>
        </div>

        {/* Pro list */}
        <div className="space-y-4">
          {filtered.map((pro, i) => (
            <div key={pro.id} className="card hover:shadow-card-hover transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                {/* Avatar */}
                <div className={`pro-avatar ${pro.color} w-16 h-16 text-xl shrink-0`}>{pro.initials}</div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-extrabold text-slate-900 text-lg">{pro.name}</h2>
                    {pro.badge && (
                      <span className="top-pro-badge text-[11px]">
                        <Award size={11} className="fill-amber-600 text-amber-600" /> {pro.badge}
                      </span>
                    )}
                    {pro.verified && (
                      <span className="badge-success text-[11px]">
                        <Shield size={11} /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm mb-2">{pro.title}</p>

                  {/* Rating row */}
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1,2,3,4,5].map(n => <Star key={n} size={14} className={n <= Math.floor(pro.rating) ? 'star-filled' : 'star-empty'} />)}
                      </div>
                      <span className="font-bold text-slate-900 text-sm">{pro.rating}</span>
                      <span className="text-slate-400 text-xs">({pro.reviews} reviews)</span>
                    </div>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-sm text-slate-500"><strong className="text-slate-700">{pro.jobs}</strong> jobs done</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-sm text-slate-500"><Clock size={13} className="inline mr-1 text-turquoise-400" />Responds {pro.resp}</span>
                  </div>

                  <p className="text-sm text-slate-500 mb-3 max-w-xl leading-relaxed">{pro.bio}</p>

                  {/* Service tags */}
                  <div className="flex flex-wrap gap-2">
                    {pro.services.map(s => (
                      <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex flex-col gap-3 md:items-end shrink-0">
                  <div className="flex items-center gap-1">
                    {['$','$$','$$$'].map(p => (
                      <span key={p} className={`text-xs font-bold ${p === pro.price ? 'text-turquoise-600' : 'text-slate-300'}`}>{p[0]}</span>
                    ))}
                  </div>
                  <Link to={`/pro/${pro.id}`} className="btn-secondary text-sm py-2.5 px-5 w-full md:w-auto">
                    View Profile
                  </Link>
                  <Link to="/quote" className="btn-primary text-sm py-2.5 px-5 w-full md:w-auto">
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-slate-300" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">No pros found</h3>
            <p className="text-slate-500 text-sm mb-5">Try adjusting your filters or searching a different service.</p>
            <button onClick={() => { setService(''); setPrice('Any'); setBadge(false) }} className="btn-primary text-sm">
              Clear all filters
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
