import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MobileAppLayout from '../../../components/layout/MobileAppLayout'
import { MessageSquare, DollarSign, Bell, Briefcase, Star } from 'lucide-react'

const INITIAL_NOTIFS = [
  { icon:Briefcase,    color:'text-turquoise-500 bg-turquoise-50', title:'New Quote Request',    sub:'Full Kitchen Renovation — Sarah Parker · $42K–$58K',     time:'Today 2h ago',   unread:true,  to:'/app/provider/quotes'       },
  { icon:MessageSquare,color:'text-turquoise-500 bg-turquoise-50', title:'New Message',           sub:'Sarah Johnson: Can we review countertop samples?',        time:'Today 10:24 AM', unread:true,  to:'/app/provider/messages'     },
  { icon:DollarSign,   color:'text-emerald-500 bg-emerald-50',     title:'Payout Processed',     sub:'$12,400 deposited to your bank account',                  time:'Yesterday',      unread:false, to:'/app/provider/earnings'     },
  { icon:Star,         color:'text-amber-500 bg-amber-50',         title:'New 5-Star Review',    sub:'David Williams left you a 5-star review',                 time:'May 1',          unread:false, to:'/app/provider/my-reviews'   },
  { icon:Bell,         color:'text-slate-500 bg-slate-100',        title:'Milestone Reminder',   sub:'Johnson Kitchen: Countertop template due May 6',          time:'Apr 30',         unread:false, to:'/app/provider/jobs'         },
  { icon:DollarSign,   color:'text-emerald-500 bg-emerald-50',     title:'Quote Accepted',       sub:'Emily Rodriguez accepted your renovation quote',          time:'Mar 1',          unread:false, to:'/app/provider/quotes'       },
]

export default function AppProviderNotifications() {
  const navigate  = useNavigate()
  const [notifs,  setNotifs]  = useState(INITIAL_NOTIFS)

  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, unread: false })))

  return (
    <MobileAppLayout role="provider">
      <div className="pt-12 pb-6">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-slate-900">Alerts</h1>
          <button onClick={markAllRead} className="text-xs text-turquoise-600 font-semibold">Mark all read</button>
        </div>

        <div className="divide-y divide-slate-100">
          {notifs.map((n, i) => (
            <button key={i} onClick={() => n.to && navigate(n.to)}
              className={`w-full text-left flex items-start gap-3 px-4 py-4 hover:bg-slate-50 transition-colors ${n.unread ? 'bg-turquoise-50/30' : ''}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                <n.icon size={16}/>
              </div>
              <div className="flex-1">
                <p className={`text-sm ${n.unread ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>{n.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{n.sub}</p>
                <p className="text-[11px] text-slate-300 mt-1">{n.time}</p>
              </div>
              {n.unread && <span className="w-2 h-2 bg-turquoise-500 rounded-full mt-1.5 shrink-0"/>}
            </button>
          ))}
        </div>
      </div>
    </MobileAppLayout>
  )
}
