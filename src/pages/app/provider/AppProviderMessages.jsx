import { useState, useRef, useEffect } from 'react'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { ChevronLeft, Send, Paperclip } from 'lucide-react'

const THREADS = [
  {
    id:1, name:'Sarah Johnson', project:'Kitchen Remodel #P-1247', unread:2,
    avatar:'SJ',
    msgs:[
      { from:'client', text:'Hi Mike! Cabinet installation looking great.',          time:'9:00 AM'  },
      { from:'pro',    text:"Thanks Sarah! We're making great progress.",             time:'9:20 AM'  },
      { from:'client', text:'Can we talk about countertop options this afternoon?',   time:'10:00 AM' },
      { from:'client', text:'Also, will the backsplash tile be delivered tomorrow?',  time:'10:24 AM' },
    ],
  },
  {
    id:2, name:'Emily Rodriguez', project:'Full Renovation #P-1089', unread:0,
    avatar:'ER',
    msgs:[
      { from:'client', text:'Drywall looks great today!',      time:'Yesterday 5:00 PM' },
      { from:'pro',    text:'Thanks! Moving to painting next week.', time:'Yesterday 5:15 PM' },
    ],
  },
  {
    id:3, name:'Christopher Wilson', project:'ADU Conversion #P-1312', unread:0,
    avatar:'CW',
    msgs:[
      { from:'client', text:'Any permit update?',              time:'May 1 9:00 AM' },
      { from:'pro',    text:'Should be ready by Friday.',      time:'May 1 9:30 AM' },
    ],
  },
]

export default function AppProviderMessages() {
  const [active, setActive] = useState(null)
  const [threads, setThreads] = useState(THREADS)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [active])

  const send = () => {
    if (!input.trim() || !active) return
    const msg = { from:'pro', text:input, time:'Just now' }
    setThreads(ts => ts.map(t => t.id===active.id ? {...t, msgs:[...t.msgs, msg]} : t))
    setActive(a => ({ ...a, msgs:[...a.msgs, msg] }))
    setInput('')
  }

  if (active) {
    return (
      <MobileAppLayout role="provider">
        <div className="flex flex-col h-screen bg-slate-50">
          <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 pt-10">
            <button onClick={() => setActive(null)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
              <ChevronLeft size={18}/>
            </button>
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-xs font-bold text-white">
              {active.avatar}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{active.name}</p>
              <p className="text-[11px] text-slate-400">{active.project}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {active.msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'pro' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
                  m.from === 'pro'
                    ? 'bg-turquoise-500 text-white rounded-tr-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                }`}>
                  <p className="text-sm">{m.text}</p>
                  <p className={`text-[10px] mt-0.5 ${m.from==='pro' ? 'text-turquoise-200' : 'text-slate-400'}`}>{m.time}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="bg-white border-t border-slate-200 px-3 py-3 pb-20 flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><Paperclip size={16}/></button>
            <input value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && send()}
              placeholder={`Reply to ${active.name}...`}
              className="flex-1 px-4 py-2 text-sm bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-turquoise-300" />
            <button onClick={send} disabled={!input.trim()}
              className="w-8 h-8 bg-turquoise-500 disabled:opacity-40 text-white rounded-full flex items-center justify-center">
              <Send size={14}/>
            </button>
          </div>
        </div>
      </MobileAppLayout>
    )
  }

  return (
    <MobileAppLayout role="provider">
      <div className="pt-12 pb-6">
        <h1 className="text-xl font-extrabold text-slate-900 px-4 mb-4">Messages</h1>
        <div className="divide-y divide-slate-100">
          {threads.map(t => (
            <button key={t.id} onClick={() => { setActive(t); setThreads(ts => ts.map(x => x.id===t.id ? {...x,unread:0} : x)) }}
              className="w-full text-left px-4 py-4 hover:bg-slate-50 flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 relative">
                {t.avatar}
                {t.unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{t.unread}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-[11px] text-slate-400">{t.msgs[t.msgs.length-1].time}</p>
                </div>
                <p className="text-[11px] text-slate-400">{t.project}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{t.msgs[t.msgs.length-1].text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </MobileAppLayout>
  )
}

