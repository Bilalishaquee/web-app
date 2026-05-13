import { useState, useRef, useEffect } from 'react'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { ChevronLeft, Send, Paperclip } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const THREADS = [
  {
    id:1, name:'Mike Rodriguez', role:'General Contractor', project:'Kitchen Remodel', unread:2,
    avatar:'MR',
    msgs:[
      { from:'pro',  text:"Good morning! Cabinet installation going well. Upper row is done.", time:'9:00 AM' },
      { from:'user', text:'Great! Looking forward to seeing it today.',                        time:'9:15 AM' },
      { from:'pro',  text:"We'll have the lower row done by end of day as well.",              time:'9:30 AM' },
      { from:'user', text:'Can we also discuss countertop options?',                           time:'10:00 AM' },
      { from:'pro',  text:"Absolutely! I'll bring samples this afternoon. We have quartz and quartzite options.", time:'10:24 AM'},
    ],
  },
  {
    id:2, name:'Carlos Morales', role:'General Contractor', project:'ADU Conversion', unread:0,
    avatar:'CM',
    msgs:[
      { from:'user', text:'Any update on the permits?',                              time:'May 1 9:00 AM' },
      { from:'pro',  text:'City processing is at 1 week. Should be done Friday.',   time:'May 1 9:30 AM' },
    ],
  },
]

export default function AppUserMessages() {
  const { user } = useAuth()
  const [active, setActive] = useState(null)
  const [threads, setThreads] = useState(THREADS)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [active])

  const send = () => {
    if (!input.trim() || !active) return
    const msg = { from:'user', text:input, time:'Just now' }
    setThreads(ts => ts.map(t => t.id===active.id ? {...t, msgs:[...t.msgs, msg], unread:0} : t))
    setActive(a => ({ ...a, msgs:[...a.msgs, msg] }))
    setInput('')
  }

  if (active) {
    return (
      <MobileAppLayout role="user">
        <div className="flex flex-col h-screen bg-slate-50">
          <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 pt-10">
            <button onClick={() => setActive(null)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500">
              <ChevronLeft size={18} />
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
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
                  m.from === 'user'
                    ? 'bg-turquoise-500 text-white rounded-tr-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                }`}>
                  <p className="text-sm">{m.text}</p>
                  <p className={`text-[10px] mt-0.5 ${m.from === 'user' ? 'text-turquoise-200' : 'text-slate-400'}`}>{m.time}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="bg-white border-t border-slate-200 px-3 py-3 pb-20 flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
              <Paperclip size={16}/>
            </button>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==='Enter' && send()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 text-sm bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-turquoise-300"
            />
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
    <MobileAppLayout role="user">
      <div className="pt-12 pb-6">
        <h1 className="text-xl font-extrabold text-slate-900 px-4 mb-4">Messages</h1>
        <div className="divide-y divide-slate-100">
          {threads.map(t => (
            <button key={t.id} onClick={() => { setActive(t); setThreads(ts => ts.map(x => x.id===t.id ? {...x,unread:0} : x)) }}
              className="w-full text-left px-4 py-4 hover:bg-slate-50 transition-colors flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 relative">
                {t.avatar}
                {t.unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{t.unread}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-[11px] text-slate-400">{t.msgs[t.msgs.length-1].time}</p>
                </div>
                <p className="text-[11px] text-slate-400">{t.role} &middot; {t.project}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{t.msgs[t.msgs.length-1].text}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </MobileAppLayout>
  )
}
