import { useState, useRef, useEffect } from 'react'
import ProviderLayout from '../../components/layout/ProviderLayout'
import { Send, Search, Paperclip, Image } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const THREADS = [
  {
    id:1, client:'Sarah Johnson', project:'Kitchen Remodel #P-1247', unread:2,
    avatar:'SJ', lastMsg:'Can we review the countertop samples tomorrow?', lastTime:'10:24 AM',
    msgs:[
      { from:'client', text:'Hi Mike! Excited about the cabinet installation tomorrow.',                      time:'Apr 30, 9:12 AM'  },
      { from:'pro',    text:"Good morning Sarah! We'll be there at 9am sharp. Upper row done by noon.",       time:'Apr 30, 9:20 AM'  },
      { from:'client', text:"Perfect. Also, I've been looking at countertop samples and wanted to discuss options.", time:'Apr 30, 2:14 PM'  },
      { from:'pro',    text:'Absolutely. We have Calacatta marble and Taj Mahal quartzite. Can bring samples.', time:'Apr 30, 2:31 PM'  },
      { from:'client', text:'That sounds great! Can we review the countertop samples tomorrow?',               time:'Today 10:24 AM'  },
    ],
  },
  {
    id:2, client:'Emily Rodriguez', project:'Full Renovation #P-1089', unread:1,
    avatar:'ER', lastMsg:'The drywall crew did great work today', lastTime:'Yesterday',
    msgs:[
      { from:'client', text:'Mike, milestone 4 is complete. The MEP rough-in looks solid.',   time:'Apr 28, 4:30 PM' },
      { from:'pro',    text:"Great news Emily! Inspector approved everything. We're on track for drywall this week.", time:'Apr 28, 5:00 PM' },
      { from:'client', text:'The drywall crew did great work today!',                          time:'May 2, 6:45 PM'  },
    ],
  },
  {
    id:3, client:'Christopher Wilson', project:'ADU Conversion #P-1312', unread:0,
    avatar:'CW', lastMsg:'Permits should be ready by Friday.', lastTime:'May 1',
    msgs:[
      { from:'client', text:'Hi Mike, any update on the permits?',                                            time:'May 1, 9:00 AM'  },
      { from:'pro',    text:'Hey Chris! City processing is running ~2 weeks. Permits ready by Friday.',        time:'May 1, 9:30 AM'  },
    ],
  },
  {
    id:4, client:'Barbara Anderson', project:'Bathroom Reno #P-1320', unread:0,
    avatar:'BA', lastMsg:'Looking forward to the design walkthrough!', lastTime:'Apr 30',
    msgs:[
      { from:'pro',    text:'Hi Barbara, welcome! Ready to start the design phase for your bathroom renovation.', time:'Apr 30, 10:00 AM' },
      { from:'client', text:'Looking forward to the design walkthrough!',                                          time:'Apr 30, 10:15 AM' },
    ],
  },
]

export default function ProviderMessages() {
  const { user } = useAuth()
  const [activeThread, setActiveThread] = useState(THREADS[0])
  const [threads, setThreads] = useState(THREADS)
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [activeThread, activeThread.msgs])

  const sendMsg = () => {
    if (!input.trim()) return
    const newMsg = { from:'pro', text:input, time:'Just now' }
    setThreads(ts => ts.map(t => t.id === activeThread.id
      ? { ...t, msgs:[...t.msgs, newMsg], lastMsg:input, lastTime:'Just now', unread:0 }
      : t
    ))
    setActiveThread(t => ({ ...t, msgs:[...t.msgs, newMsg] }))
    setInput('')
  }

  const filtered = threads.filter(t => !search || t.client.toLowerCase().includes(search.toLowerCase()) || t.project.toLowerCase().includes(search.toLowerCase()))

  return (
    <ProviderLayout title="Messages" subtitle="Client communications">
      <div className="flex h-[calc(100vh-61px)] overflow-hidden">

        {/* Thread list */}
        <div className="w-72 shrink-0 border-r border-slate-200 flex flex-col bg-white">
          <div className="px-3 py-3 border-b border-slate-100">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-turquoise-300" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {filtered.map(t => (
              <button key={t.id} onClick={() => { setActiveThread(t); setThreads(ts => ts.map(x => x.id===t.id ? {...x,unread:0} : x)) }}
                className={`w-full text-left px-3 py-3 transition-colors hover:bg-slate-50 ${activeThread.id===t.id ? 'bg-turquoise-50' : ''}`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-turquoise-500 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0">
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 truncate">{t.client}</p>
                      <span className="text-[10px] text-slate-400 shrink-0">{t.lastTime}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{t.project}</p>
                    <p className="text-[11px] text-slate-500 truncate">{t.lastMsg}</p>
                  </div>
                  {t.unread > 0 && (
                    <span className="w-4 h-4 bg-turquoise-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">{t.unread}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-slate-50">
          <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-turquoise-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              {activeThread.avatar}
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">{activeThread.client}</p>
              <p className="text-[11px] text-slate-400">{activeThread.project}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {activeThread.msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'pro' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs sm:max-w-sm rounded-2xl px-3.5 py-2.5 ${
                  m.from === 'pro'
                    ? 'bg-turquoise-500 text-white rounded-tr-sm'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                }`}>
                  <p className="text-sm">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.from === 'pro' ? 'text-turquoise-200' : 'text-slate-400'}`}>{m.time}</p>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="bg-white border-t border-slate-200 px-4 py-3 flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Paperclip size={16} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
              <Image size={16} />
            </button>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMsg()}
              placeholder={`Reply to ${activeThread.client}...`}
              className="flex-1 px-4 py-2 text-sm bg-slate-100 rounded-full focus:outline-none focus:ring-2 focus:ring-turquoise-300"
            />
            <button onClick={sendMsg} disabled={!input.trim()}
              className="w-8 h-8 bg-turquoise-500 hover:bg-turquoise-600 disabled:opacity-40 text-white rounded-full flex items-center justify-center transition-colors">
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </ProviderLayout>
  )
}
