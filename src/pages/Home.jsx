import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight, Star, Shield, Clock, Zap, Camera, CheckCircle2,
  ChevronRight, Home as HomeIcon, Bath, Layers, Hammer, PaintBucket,
  TreePine, Phone, TrendingUp, Users, Award, ThumbsUp, Wrench,
  Wind, Droplets, Plug, Trees, Settings, MapPin, Search,
  MessageSquare, Apple, Smartphone, Eye, Bell,
  BarChart3, ChevronDown
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

/* ─── Data ─────────────────────────────────────── */
const CATEGORIES = [
  { icon: HomeIcon,    label: 'Kitchen Remodeling',  count: '320+ pros', pop: true,
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80' },
  { icon: Bath,        label: 'Bathroom Renovation',  count: '280+ pros',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&auto=format&fit=crop&q=80' },
  { icon: Layers,      label: 'Flooring',             count: '450+ pros',
    img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&auto=format&fit=crop&q=80' },
  { icon: PaintBucket, label: 'Painting & Drywall',   count: '500+ pros',
    img: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&auto=format&fit=crop&q=80' },
  { icon: Hammer,      label: 'Basement Finishing',   count: '150+ pros', pop: true,
    img: 'https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=600&auto=format&fit=crop&q=80' },
  { icon: TreePine,    label: 'Roofing',              count: '190+ pros',
    img: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=600&auto=format&fit=crop&q=80' },
  { icon: Wind,        label: 'HVAC',                 count: '210+ pros',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80' },
  { icon: Droplets,    label: 'Plumbing',             count: '340+ pros',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80' },
  { icon: Plug,        label: 'Electrical',           count: '290+ pros',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80' },
  { icon: Trees,       label: 'Landscaping',          count: '180+ pros',
    img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d56?w=600&auto=format&fit=crop&q=80' },
  { icon: Settings,    label: 'General Contracting',  count: '420+ pros',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80' },
  { icon: Wrench,      label: 'Home Inspection',      count: '95+ pros',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80' },
]

const STEPS = [
  {
    n:'01', icon: Search, title: 'Describe Your Project',
    desc: 'Tell us what you need — or upload photos for instant AI analysis. Takes 60 seconds.',
    color: 'bg-turquoise-500',
  },
  {
    n:'02', icon: Zap, title: 'Get AI-Powered Quotes',
    desc: 'Our AI analyzes your space, detects materials, and generates a detailed itemized estimate instantly.',
    color: 'bg-blue-500',
  },
  {
    n:'03', icon: Users, title: 'Compare Top Pros',
    desc: 'Review verified contractor profiles, ratings, past work, and competitive quotes side by side.',
    color: 'bg-violet-500',
  },
  {
    n:'04', icon: CheckCircle2, title: 'Hire & Track',
    desc: 'Approve your quote, book securely, and track every milestone in real time — on web or iOS.',
    color: 'bg-emerald-500',
  },
]

const AI_FEATURES = [
  { icon: Camera,      title: 'Photo-to-Quote AI',       desc: 'Upload photos of any space. Our Vision AI detects materials, damage, and dimensions — no measuring required.' },
  { icon: BarChart3,   title: 'Live Cost Prediction',    desc: 'Real-time pricing engine pulling from 2,400+ completed local projects. Labor + materials broken down line by line.' },
  { icon: MessageSquare,title: 'GPT-4 Chat Assistant',  desc: 'Ask any renovation question, get smart follow-up clarifications, and compare material alternatives instantly.' },
  { icon: TrendingUp,  title: 'AI Revenue Forecasting', desc: 'Contractors get AI-powered business insights. Clients see AI predictions on project ROI and property value uplift.' },
  { icon: Eye,         title: 'Real-Time Tracking',      desc: 'Live project status updates pushed to your phone at every milestone — from demo day through final walkthrough.' },
  { icon: Shield,      title: 'Smart Contractor Matching',desc: 'Our AI matches you with the highest-rated, most available pros for your exact project type, timeline, and budget.' },
]

const PROS = [
  {
    name:'Mike Rodriguez', title:'Kitchen & Bath Specialist', rating:4.9, reviews:214, jobs:312,
    badge:'Top Pro', since:'2018', resp:'< 1 hr', initials:'MR', color:'bg-turquoise-500',
    imgs:[
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=200&auto=format&fit=crop&q=80',
    ],
  },
  {
    name:'Sara Chen', title:'Interior Remodeling Expert', rating:4.8, reviews:187, jobs:260,
    badge:'Top Pro', since:'2019', resp:'< 2 hr', initials:'SC', color:'bg-blue-500',
    imgs:[
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=200&auto=format&fit=crop&q=80',
    ],
  },
  {
    name:'Carlos Morales', title:'Flooring & Tile Pro', rating:4.9, reviews:156, jobs:198,
    badge:'', since:'2020', resp:'< 3 hr', initials:'CM', color:'bg-emerald-500',
    imgs:[
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop&q=80',
    ],
  },
  {
    name:'Amara Williams', title:'Full Renovation Contractor', rating:5.0, reviews:98, jobs:140,
    badge:'Top Pro', since:'2021', resp:'< 1 hr', initials:'AW', color:'bg-violet-500',
    imgs:[
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=200&auto=format&fit=crop&q=80',
    ],
  },
]

const COST_GUIDES = [
  { service:'Kitchen Remodel',   low:'$8,000',  high:'$35,000', avg:'$15,000' },
  { service:'Bathroom Renovation',low:'$4,500', high:'$18,000', avg:'$9,500'  },
  { service:'Flooring Install',  low:'$1,500',  high:'$8,000',  avg:'$4,200'  },
  { service:'Interior Paint',    low:'$900',    high:'$4,500',  avg:'$2,200'  },
  { service:'Roof Replacement',  low:'$5,500',  high:'$22,000', avg:'$11,000' },
  { service:'Basement Finishing',low:'$10,000', high:'$40,000', avg:'$22,500' },
]

const REVIEWS = [
  { name:'Sarah M.',  loc:'Los Angeles, CA', rating:5, proj:'Kitchen Remodel',    text:'Got a detailed itemized kitchen quote in 90 seconds just from photos. The AI breakdown was incredibly accurate — saved me hours of phone tag with contractors.' },
  { name:'David K.',  loc:'Glendale, CA',    rating:5, proj:'Bathroom Renovation', text:'The real-time milestone tracking kept me informed at every stage. I always knew exactly what was happening without having to call anyone.' },
  { name:'Maria L.',  loc:'Burbank, CA',     rating:5, proj:'Full Home Repaint',   text:'Best contractor experience I\'ve ever had. Transparent pricing, professional team, and the AI chat answered all my questions instantly at 11pm.' },
  { name:'James T.',  loc:'Pasadena, CA',    rating:5, proj:'Flooring Install',    text:'Compared 4 pros side by side with full quote breakdowns. Hired the best one within an hour. Project finished 2 days ahead of schedule.' },
]

const FAQS = [
  { q:'How accurate are the AI-generated quotes?', a:'Our AI quotes are typically within 8–12% of final project costs. They\'re based on 2,400+ completed local projects and updated daily with current material and labor pricing.' },
  { q:'Are the contractors licensed and insured?',  a:'Yes. Every pro on A-1 Renovations passes our multi-step verification: license check, insurance confirmation, background screening, and work history review.' },
  { q:'Is the AI quote free?', a:'100% free, with no commitment. Upload your photos, get a full breakdown, and only proceed if you\'re ready to hire.' },
  { q:'How is this different from Thumbtack or HomeAdvisor?', a:'We go much further: instant AI quotes from photos (not just lead forms), real-time project tracking, a GPT-4 chat assistant, and a dedicated iOS app — all in one platform.' },
]

/* ─── Component ─────────────────────────────────── */
export default function Home() {
  const [query, setQuery]   = useState('')
  const [zip, setZip]       = useState('')
  const [faqOpen, setFaqOpen] = useState(null)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/browse${query ? `?service=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative pt-[68px] overflow-hidden bg-hero-gradient min-h-[620px] flex items-center">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-turquoise-400/20 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-2xl" />
          {/* Grid dots */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="white"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 text-white text-sm font-semibold mb-7 animate-fade-in-up backdrop-blur-sm">
              <Zap size={14} className="fill-white text-white" />
              AI-Powered · Instant Quotes · Verified Pros
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight animate-fade-in-up animate-delay-100">
              Find trusted pros for<br />
              <span className="text-turquoise-200">any home project</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl text-turquoise-100 max-w-xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
              Upload photos, get an AI-powered quote in seconds, and hire the best local contractor — all in one place.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mt-8 animate-fade-in-up animate-delay-300">
              <div className="search-bar max-w-2xl mx-auto p-2 gap-0 rounded-2xl">
                <div className="flex items-center flex-1 min-w-0 px-3">
                  <Search size={18} className="text-slate-400 shrink-0 mr-2" />
                  <input
                    className="input-search flex-1 text-sm md:text-base py-3"
                    placeholder="What do you need? (e.g. Kitchen Remodeling)"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    list="service-suggestions"
                  />
                  <datalist id="service-suggestions">
                    {CATEGORIES.map(c => <option key={c.label} value={c.label} />)}
                  </datalist>
                </div>
                <div className="search-divider" />
                <div className="flex items-center px-3">
                  <MapPin size={16} className="text-slate-400 shrink-0 mr-2" />
                  <input
                    className="input-search w-28 md:w-36 text-sm py-3"
                    placeholder="ZIP code"
                    value={zip}
                    onChange={e => setZip(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-primary rounded-xl m-1 px-6 shrink-0 text-sm md:text-base">
                  Search
                </button>
              </div>
            </form>

            {/* Quick categories */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in-up animate-delay-400">
              {['Kitchen Remodeling','Bathroom','Flooring','Painting','Roofing'].map(s => (
                <Link key={s} to={`/browse?service=${encodeURIComponent(s)}`}
                  className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white text-sm font-medium transition-all duration-200 backdrop-blur-sm">
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none" height="60">
            <path d="M0 60L60 51.7C120 43.3 240 26.7 360 23.3C480 20 600 30 720 33.3C840 36.7 960 33.3 1080 30C1200 26.7 1320 23.3 1380 21.7L1440 20V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ─── TRUST BAR ────────────────────────────── */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-slate-100">
            {[
              { val:'2,400+',  label:'Projects Completed',    icon: CheckCircle2 },
              { val:'4.9 ★',   label:'Average Rating',         icon: Star },
              { val:'1,200+',  label:'Verified Contractors',   icon: Shield },
              { val:'< 2 min', label:'AI Quote Generation',    icon: Zap },
            ].map((s,i) => (
              <div key={i} className="flex items-center gap-3 md:justify-center md:px-8">
                <div className="w-10 h-10 rounded-xl bg-turquoise-50 flex items-center justify-center shrink-0">
                  <s.icon size={18} className="text-turquoise-500" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900 leading-none">{s.val}</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">Browse by Service</p>
              <h2 className="section-title">What do you need done?</h2>
            </div>
            <Link to="/browse" className="text-turquoise-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200 hidden md:flex">
              All services <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.label}
                to={`/browse?service=${encodeURIComponent(cat.label)}`}
                className="category-card group animate-fade-in-up"
                style={{
                  backgroundImage: `url(${cat.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {/* Gradient overlay — darker on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10 group-hover:from-black/80 group-hover:via-black/35 transition-all duration-300" />

                {/* Popular badge */}
                {cat.pop && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] font-bold bg-turquoise-500 text-white px-2 py-0.5 rounded-full">Popular</span>
                  </div>
                )}

                {/* Icon chip */}
                <div className="absolute top-3.5 left-3.5 w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20 z-10">
                  <cat.icon size={17} className="text-white" />
                </div>

                {/* Label */}
                <div className="relative z-10">
                  <p className="text-white font-bold text-sm leading-snug">{cat.label}</p>
                  <p className="text-white/70 text-xs mt-0.5">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-label mb-2">Simple Process</p>
            <h2 className="section-title">How A-1 Renovations works</h2>
            <p className="section-subtitle mx-auto max-w-xl text-center">
              From project idea to hired contractor in under 5 minutes — powered by AI.
            </p>
          </div>

          <div className="relative grid md:grid-cols-4 gap-6">
            {/* Connector line */}
            <div className="hidden md:block absolute top-[2.25rem] left-[12.5%] right-[12.5%] h-0.5 bg-turquoise-100 z-0" />

            {STEPS.map((s, i) => (
              <div key={s.n} className={`relative text-center animate-fade-in-up`} style={{ animationDelay: `${i * 0.12}s` }}>
                <div className={`w-[4.5rem] h-[4.5rem] ${s.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg relative z-10`}>
                  <s.icon size={28} className="text-white" />
                </div>
                <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-2 border-turquoise-200 rounded-full flex items-center justify-center text-[10px] font-extrabold text-turquoise-600 z-20">
                  {s.n[1]}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/quote" className="btn-primary px-10 py-4 text-base">
              Start for Free — No Account Needed <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── AI ADVANTAGE ─────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label mb-3">AI-Powered Features</p>
              <h2 className="section-title mb-5">
                Everything Thumbtack has —<br />
                <span className="gradient-text">plus AI superpowers</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8 text-lg">
                A-1 Renovations is the next generation of home services marketplaces. We combine verified pros and competitive quotes with AI-powered estimation, real-time tracking, and a GPT-4 assistant — features no other platform offers.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['AI Photo Analysis','GPT-4 Chat','Real-time Tracking','iOS App','Instant Quotes','Price Forecasting'].map(f => (
                  <span key={f} className="flex items-center gap-1.5 text-sm font-medium text-turquoise-700 bg-turquoise-50 px-3 py-1.5 rounded-full">
                    <CheckCircle2 size={13} className="text-turquoise-500" /> {f}
                  </span>
                ))}
              </div>
              <Link to="/quote" className="btn-primary py-3.5 px-8">
                Try AI Quote Free <Zap size={16} className="fill-white" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {AI_FEATURES.map((f, i) => (
                <div key={f.title} className={`card-hover p-5 animate-fade-in-up`} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="w-10 h-10 bg-turquoise-50 rounded-xl flex items-center justify-center mb-3">
                    <f.icon size={20} className="text-turquoise-500" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5">{f.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROS ────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">Top Professionals</p>
              <h2 className="section-title">Highly rated pros near you</h2>
              <p className="text-slate-500 mt-2 max-w-lg">Every contractor is licensed, insured, and background-checked.</p>
            </div>
            <Link to="/browse" className="text-turquoise-600 font-semibold text-sm hidden md:flex items-center gap-1 hover:gap-2 transition-all">
              View all pros <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROS.map((pro, i) => (
              <Link key={pro.name} to={`/pro/${pro.name.toLowerCase().replace(/\s+/g,'-')}`}
                className="pro-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>

                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`pro-avatar ${pro.color} text-base`}>{pro.initials}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm leading-tight truncate">{pro.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{pro.title}</p>
                    {pro.badge && (
                      <span className="top-pro-badge mt-1.5">
                        <Award size={10} className="fill-amber-600 text-amber-600" /> {pro.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex">
                    {[1,2,3,4,5].map(n => (
                      <Star key={n} size={13} className={n <= Math.floor(pro.rating) ? 'star-filled' : 'star-empty'} />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-900">{pro.rating}</span>
                  <span className="text-xs text-slate-400">({pro.reviews})</span>
                </div>

                {/* Portfolio thumbnails */}
                <div className="flex gap-1.5 mb-4 -mx-1">
                  {pro.imgs.map((img, j) => (
                    <div key={j} className="flex-1 aspect-video rounded-lg overflow-hidden bg-slate-100">
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4 border-t border-slate-100 pt-3">
                  <span><strong className="text-slate-800 font-bold">{pro.jobs}</strong> jobs done</span>
                  <span><strong className="text-slate-800 font-bold">{pro.resp}</strong> response</span>
                  <span>Since {pro.since}</span>
                </div>

                <div className="mt-auto flex gap-2">
                  <Link to={`/pro/${pro.name.toLowerCase().replace(/\s+/g,'-')}`}
                    className="flex-1 py-2.5 text-center text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors">
                    Profile
                  </Link>
                  <Link to="/quote" className="flex-1 py-2.5 text-center text-sm font-semibold bg-turquoise-500 hover:bg-turquoise-600 text-white rounded-xl transition-colors">
                    Get Quote
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COST GUIDES ──────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">Pricing Transparency</p>
              <h2 className="section-title">How much does it cost?</h2>
              <p className="text-slate-500 mt-2">AI-updated daily from completed local projects.</p>
            </div>
            <Link to="/cost-guides" className="text-turquoise-600 font-semibold text-sm hidden md:flex items-center gap-1 hover:gap-2 transition-all">
              Full cost guide <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COST_GUIDES.map((g, i) => (
              <Link key={g.service} to="/cost-guides"
                className="card-hover group p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-slate-900">{g.service}</h3>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-turquoise-500 transition-colors" />
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">Typical range</p>
                    <p className="text-sm text-slate-600 font-semibold">{g.low} – {g.high}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-medium mb-1">LA average</p>
                    <p className="text-xl font-extrabold text-turquoise-600">{g.avg}</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-turquoise-500 rounded-full" style={{ width: '60%' }} />
                </div>
                <p className="text-xs text-turquoise-600 font-semibold mt-2 group-hover:underline">Get AI quote for your home →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─────────────────────────── */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label text-turquoise-400 mb-2">Homeowner Reviews</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Trusted by thousands across Los Angeles
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex">
                {[1,2,3,4,5].map(n => <Star key={n} size={20} className="star-filled" />)}
              </div>
              <span className="text-white font-bold text-lg">4.9</span>
              <span className="text-slate-400">from 1,200+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={r.name} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(n => <Star key={n} size={13} className={n <= r.rating ? 'star-filled' : 'star-empty'} />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">"{r.text}"</p>
                <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-turquoise-500 flex items-center justify-center text-white font-bold text-xs">{r.name[0]}</div>
                    <div>
                      <p className="font-semibold text-white text-xs">{r.name}</p>
                      <p className="text-[10px] text-slate-500">{r.loc}</p>
                    </div>
                  </div>
                  <span className="badge-turquoise text-[10px]">{r.proj}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APP DOWNLOAD ─────────────────────────── */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-turquoise-500 to-turquoise-800 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            {/* Decorations */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <div className="badge bg-white/20 text-white border border-white/25 text-sm mb-5">iOS App Available Now</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                  Track your renovation<br />from anywhere
                </h2>
                <p className="text-turquoise-100 text-lg leading-relaxed mb-8 max-w-md">
                  Real-time project updates, contractor chat, photo uploads, and AI quote requests — all from your iPhone. Available on the App Store.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-3 bg-white text-slate-900 rounded-xl px-5 py-3 font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                    <Apple size={20} className="text-slate-900" />
                    <div className="text-left">
                      <div className="text-[10px] text-slate-500 font-normal">Download on the</div>
                      <div className="text-sm font-bold leading-none">App Store</div>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 bg-white/15 text-white border border-white/25 rounded-xl px-5 py-3 font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <Smartphone size={20} />
                    <div className="text-left">
                      <div className="text-[10px] text-turquoise-200 font-normal">Get it on</div>
                      <div className="text-sm font-bold leading-none">Google Play</div>
                    </div>
                  </button>
                </div>
                <div className="flex flex-wrap gap-4 mt-6 text-sm text-turquoise-100">
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Push notifications</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Offline caching</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Apple Calendar sync</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Dark mode</span>
                </div>
              </div>
              {/* Phone mockup */}
              <div className="hidden md:flex justify-center">
                <div className="w-56 h-[460px] bg-slate-900 rounded-[2.5rem] border-4 border-white/20 shadow-2xl relative overflow-hidden animate-float">
                  <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 flex justify-center pt-1.5">
                    <div className="w-16 h-4 bg-slate-800 rounded-full" />
                  </div>
                  <div className="pt-7 px-3 pb-3 h-full">
                    <div className="bg-turquoise-500 rounded-2xl h-full flex flex-col p-4 overflow-hidden">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-white/25 rounded-lg flex items-center justify-center">
                          <Wrench size={12} className="text-white" />
                        </div>
                        <span className="text-white text-[11px] font-bold">A-1 Renovations</span>
                        <div className="ml-auto w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                          <Bell size={10} className="text-white" />
                        </div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-3 mb-2">
                        <p className="text-white text-[10px] font-bold mb-1">Kitchen Remodel</p>
                        <div className="h-1.5 bg-white/30 rounded-full"><div className="h-full w-3/5 bg-white rounded-full" /></div>
                        <p className="text-white/70 text-[9px] mt-1">60% complete · ETA May 18</p>
                      </div>
                      {['Demolition','Cabinetry','Countertops'].map((m,j) => (
                        <div key={m} className="flex items-center gap-2 py-1.5 border-b border-white/10 last:border-0">
                          <div className={`w-3 h-3 rounded-full ${j < 2 ? 'bg-white' : 'bg-white/30'}`} />
                          <p className="text-white text-[9px] font-medium">{m}</p>
                          <span className={`ml-auto text-[8px] font-semibold ${j < 2 ? 'text-white' : 'text-white/50'}`}>{j < 2 ? 'Done' : 'Pending'}</span>
                        </div>
                      ))}
                      <div className="mt-auto bg-white/20 rounded-xl p-2.5 flex items-center gap-2">
                        <MessageSquare size={12} className="text-white shrink-0" />
                        <p className="text-white text-[9px]">Mike: Countertops arrive Thu!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-2">Got Questions?</p>
            <h2 className="section-title">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${faqOpen === i ? 'border-turquoise-200 shadow-card' : 'border-slate-100'}`}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="font-semibold text-slate-900">{f.q}</span>
                  <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform duration-300 ${faqOpen === i ? 'rotate-180 text-turquoise-500' : ''}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-3 animate-fade-in">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-4">Get Started Today</p>
          <h2 className="section-title mb-5">Ready to transform your home?</h2>
          <p className="section-subtitle mx-auto max-w-xl text-center mb-10">
            Upload photos and get an AI-powered quote in under 2 minutes. No account required. No commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote" className="btn-primary px-10 py-4 text-base">
              Get Free AI Quote <Zap size={18} className="fill-white" />
            </Link>
            <Link to="/browse" className="btn-secondary px-10 py-4 text-base">
              Browse Contractors <Users size={18} />
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-6">
            ✓ Free · ✓ No signup required · ✓ Instant results · ✓ 1,200+ verified pros
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
