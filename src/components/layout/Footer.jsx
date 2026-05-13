import { Link } from 'react-router-dom'
import { Wrench, Phone, Mail, MapPin, Instagram, Facebook, Twitter, Linkedin, Zap } from 'lucide-react'

const SERVICES = ['Kitchen Remodeling','Bathroom Renovation','Flooring','Painting & Drywall','Roofing','Basement Finishing','HVAC & Plumbing','Electrical Work','Landscaping','General Contracting']
const COMPANY  = ['About Us','How It Works','For Contractors','Cost Guides','Blog','Careers','Press']
const SUPPORT  = ['Help Center','Contact Us','Safety','Privacy Policy','Terms of Service','Accessibility']

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Top CTA strip */}
      <div className="bg-turquoise-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-white font-extrabold text-lg">Ready to get started?</p>
            <p className="text-turquoise-100 text-sm mt-0.5">Upload photos · Get AI quote · Hire the best pro — all free</p>
          </div>
          <div className="flex gap-3">
            <Link to="/quote" className="inline-flex items-center gap-2 bg-white text-turquoise-600 font-bold px-6 py-3 rounded-xl hover:bg-turquoise-50 transition-colors text-sm shadow-sm">
              <Zap size={16} /> Get Free AI Quote
            </Link>
            <Link to="/browse" className="inline-flex items-center gap-2 bg-turquoise-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-turquoise-700 transition-colors text-sm border border-turquoise-400">
              Browse Pros
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-turquoise-500 rounded-xl flex items-center justify-center shadow-glow-sm">
                <Wrench size={17} className="text-white" />
              </div>
              <div className="leading-none">
                <span className="block text-white font-extrabold text-base tracking-tight">A-1 Renovations</span>
                <span className="block text-[10px] font-bold text-turquoise-400 tracking-widest uppercase mt-0.5">AI-Powered Platform</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
              The most advanced home renovation marketplace. AI-powered quotes, verified contractors, real-time tracking — all in one platform.
            </p>
            <div className="space-y-2.5 text-sm">
              <a href="tel:+15551234567" className="flex items-center gap-2.5 hover:text-turquoise-400 transition-colors">
                <Phone size={14} className="text-turquoise-500 shrink-0" /> (555) 123-4567
              </a>
              <a href="mailto:hello@a1renovations.com" className="flex items-center gap-2.5 hover:text-turquoise-400 transition-colors">
                <Mail size={14} className="text-turquoise-500 shrink-0" /> hello@a1renovations.com
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin size={14} className="text-turquoise-500 shrink-0" /> Los Angeles, CA 90001
              </span>
            </div>
            <div className="flex gap-2.5 mt-6">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-turquoise-500 flex items-center justify-center transition-all duration-200 border border-slate-700 hover:border-turquoise-500">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-4 text-sm">Services</h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
              {SERVICES.map(s => (
                <li key={s}>
                  <Link to={`/browse?service=${encodeURIComponent(s)}`} className="text-sm hover:text-turquoise-400 transition-colors leading-tight block">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Company</h3>
            <ul className="space-y-2.5">
              {COMPANY.map(c => (
                <li key={c}><a href="#" className="text-sm hover:text-turquoise-400 transition-colors">{c}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm">Support</h3>
            <ul className="space-y-2.5">
              {SUPPORT.map(s => (
                <li key={s}><a href="#" className="text-sm hover:text-turquoise-400 transition-colors">{s}</a></li>
              ))}
            </ul>
            {/* App badges */}
            <div className="mt-6 space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Get the iOS App</p>
              <button className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-3.5 py-2.5 transition-colors w-full">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <div className="text-left">
                  <div className="text-[9px] text-slate-500 font-normal">Download on the</div>
                  <div className="text-xs text-white font-bold leading-none">App Store</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-600">© 2026 A-1 Renovations LLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-slate-600 hover:text-turquoise-400 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-turquoise-400 transition-colors">Terms</a>
            <a href="#" className="text-xs text-slate-600 hover:text-turquoise-400 transition-colors">Cookies</a>
            <span className="text-xs text-slate-700">Built by <span className="text-turquoise-500 font-semibold">Devoan</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
