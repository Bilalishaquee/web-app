import { useState } from 'react'
import ProviderLayout from '../../components/layout/ProviderLayout'
import { Sparkles, Clock, CheckCircle2, XCircle, ChevronDown, MapPin, DollarSign, Send } from 'lucide-react'

const QUOTES = [
  { id:'Q-1294', service:'Full Kitchen Renovation',    client:'Sarah Parker',   location:'Austin, TX',     sqft:320,  budget:'$40K–$60K',  received:'2h ago',  ai:'$42,000 – $58,000', confidence:91, scope:'Custom cabinetry, quartz countertops, full appliance package, backsplash tile.', status:'new'       },
  { id:'Q-1295', service:'Master Bathroom Remodel',    client:'Jason Kim',      location:'Denver, CO',     sqft:120,  budget:'$15K–$30K',  received:'5h ago',  ai:'$18,000 – $26,000', confidence:94, scope:'Tile shower enclosure, double vanity, heated floors, soaking tub.',             status:'new'       },
  { id:'Q-1296', service:'Basement Finishing',         client:'Maria Torres',   location:'Seattle, WA',    sqft:900,  budget:'$30K–$60K',  received:'1d ago',  ai:'$35,000 – $55,000', confidence:87, scope:'Egress window, bedroom, full bath, wet bar, entertainment zone.',               status:'new'       },
  { id:'Q-1291', service:'Home Addition (500 sq ft)',  client:'Rachel Turner',  location:'Phoenix, AZ',    sqft:500,  budget:'$100K–$200K',received:'2d ago',  ai:'$120,000 – $180,000', confidence:78, scope:'Two-story addition above garage. Requires structural review.',              status:'submitted'  },
  { id:'Q-1289', service:'Deck Construction',          client:'Daniel Ross',    location:'Nashville, TN',  sqft:400,  budget:'$20K–$40K',  received:'3d ago',  ai:'$22,000 – $35,000', confidence:92, scope:'Composite decking, built-in seating, pergola, landscape lighting.',            status:'accepted'  },
  { id:'Q-1282', service:'Whole-Home Painting',        client:'Carlos Vega',    location:'Miami, FL',      sqft:2800, budget:'$6K–$14K',   received:'5d ago',  ai:'$8,200 – $12,000',  confidence:96, scope:'Interior 4 bed / 3 bath, 9ft ceilings, trim and doors.',                       status:'declined'  },
]

const STATUS_STYLE = {
  new:       { cls:'bg-amber-50    text-amber-700   border border-amber-200',   label:'New Request'  },
  submitted: { cls:'bg-blue-50     text-blue-700    border border-blue-200',    label:'Submitted'    },
  accepted:  { cls:'bg-emerald-50  text-emerald-700 border border-emerald-200', label:'Accepted'     },
  declined:  { cls:'bg-slate-100   text-slate-500   border border-slate-200',   label:'Passed'       },
}

export default function ProviderQuotes() {
  const [expanded, setExpanded] = useState('Q-1294')
  const [filter, setFilter]     = useState('all')
  const [myPrice, setMyPrice]   = useState({})

  const visible = filter === 'all' ? QUOTES : QUOTES.filter(q => q.status === filter)

  return (
    <ProviderLayout title="Quote Requests" subtitle="AI-suggested pricing · accept, counter, or pass">
      <div className="p-6 space-y-4">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            ['New Requests', QUOTES.filter(q=>q.status==='new').length, 'text-amber-600'],
            ['Submitted',    QUOTES.filter(q=>q.status==='submitted').length, 'text-blue-600'],
            ['Acceptance Rate', '72%', 'text-emerald-600'],
          ].map(([l,v,cls]) => (
            <div key={l} className="bg-white rounded-xl border border-slate-200 px-4 py-3">
              <p className="text-xs text-slate-500">{l}</p>
              <p className={`text-xl font-extrabold ${cls}`}>{v}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
          {['all','new','submitted','accepted','declined'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>
          ))}
        </div>

        {/* Quote cards */}
        <div className="space-y-3">
          {visible.map(q => {
            const s = STATUS_STYLE[q.status]
            const isOpen = expanded === q.id
            return (
              <div key={q.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpanded(isOpen ? null : q.id)}>
                  <div className="w-9 h-9 bg-turquoise-50 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles size={15} className="text-turquoise-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm">{q.service}</p>
                    <p className="text-xs text-slate-400">{q.client} · {q.location} · {q.received}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-900 text-sm">{q.budget}</p>
                    <p className="text-[11px] text-slate-400">Client budget</p>
                  </div>
                  <span className={`hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${s.cls}`}>{s.label}</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {isOpen && (
                  <div className="border-t border-slate-50 px-4 py-4 space-y-4">
                    {/* AI suggestion */}
                    <div className="bg-turquoise-50 border border-turquoise-200 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={13} className="text-turquoise-600" />
                        <span className="text-xs font-bold text-turquoise-700">AI Suggested Price</span>
                        <span className="text-[11px] text-turquoise-500 ml-auto">{q.confidence}% confidence</span>
                      </div>
                      <p className="text-lg font-extrabold text-turquoise-800">{q.ai}</p>
                      <p className="text-[11px] text-turquoise-600 mt-0.5">Based on {q.sqft.toLocaleString()} sq ft · {q.location} market rates</p>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">{q.scope}</p>

                    {q.status === 'new' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-600 mb-1 block">Your quote amount</label>
                          <div className="relative">
                            <DollarSign size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              placeholder="e.g. 49,500"
                              value={myPrice[q.id] || ''}
                              onChange={e => setMyPrice(p => ({ ...p, [q.id]: e.target.value }))}
                              className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise-300"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-turquoise-500 hover:bg-turquoise-600 text-white text-sm font-semibold rounded-lg transition-colors">
                            <Send size={13}/> Submit Quote
                          </button>
                          <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 border border-slate-200 text-slate-500 hover:bg-slate-50 text-sm font-semibold rounded-lg transition-colors">
                            <XCircle size={13}/> Pass
                          </button>
                        </div>
                      </div>
                    )}

                    {q.status === 'submitted' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700 font-medium">
                        Quote submitted · Awaiting client decision
                      </div>
                    )}
                    {q.status === 'accepted' && (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                        <CheckCircle2 size={14}/> Client accepted your quote · Project in progress
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </ProviderLayout>
  )
}
