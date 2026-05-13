import { useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Search, Filter, MoreVertical, MapPin, FolderKanban, DollarSign, Mail, Phone, X, ShieldOff, Eye } from 'lucide-react'

const USERS = [
  { id: 1,  name: 'Sarah Johnson',     email: 'sarah.j@gmail.com',      phone: '+1 (512) 555-0187', location: 'Austin, TX',       joined: 'Mar 15, 2025', projects: 2, spent: 57500,  status: 'active'   },
  { id: 2,  name: 'Michael Chen',      email: 'm.chen@email.com',        phone: '+1 (720) 555-0234', location: 'Denver, CO',       joined: 'Feb 8, 2025',  projects: 1, spent: 12500,  status: 'active'   },
  { id: 3,  name: 'Emily Rodriguez',   email: 'emily.r@email.com',       phone: '+1 (786) 555-0312', location: 'Miami, FL',        joined: 'Jan 22, 2025', projects: 3, spent: 198000, status: 'active'   },
  { id: 4,  name: 'David Williams',    email: 'd.williams@gmail.com',    phone: '+1 (615) 555-0421', location: 'Nashville, TN',    joined: 'Apr 3, 2025',  projects: 1, spent: 28000,  status: 'active'   },
  { id: 5,  name: 'Amanda Foster',     email: 'a.foster@email.com',      phone: '+1 (503) 555-0198', location: 'Portland, OR',     joined: 'Dec 10, 2024', projects: 2, spent: 77000,  status: 'active'   },
  { id: 6,  name: 'Robert Kim',        email: 'rkim@gmail.com',          phone: '+1 (206) 555-0367', location: 'Seattle, WA',      joined: 'Nov 5, 2024',  projects: 1, spent: 22000,  status: 'inactive' },
  { id: 7,  name: 'Jessica Martinez',  email: 'j.martinez@email.com',    phone: '+1 (602) 555-0154', location: 'Phoenix, AZ',      joined: 'Mar 28, 2025', projects: 0, spent: 0,      status: 'active'   },
  { id: 8,  name: 'Thomas Brown',      email: 'tbrown@gmail.com',        phone: '+1 (312) 555-0489', location: 'Chicago, IL',      joined: 'Jan 15, 2025', projects: 2, spent: 23000,  status: 'active'   },
  { id: 9,  name: 'Linda Davis',       email: 'ldavis@email.com',        phone: '+1 (617) 555-0213', location: 'Boston, MA',       joined: 'Feb 20, 2025', projects: 1, spent: 18000,  status: 'active'   },
  { id: 10, name: 'Christopher Wilson',email: 'cwilson@gmail.com',       phone: '+1 (213) 555-0342', location: 'Los Angeles, CA',  joined: 'Apr 15, 2025', projects: 1, spent: 35000,  status: 'active'   },
  { id: 11, name: 'Patricia Moore',    email: 'p.moore@email.com',       phone: '+1 (713) 555-0127', location: 'Houston, TX',      joined: 'Dec 28, 2024', projects: 2, spent: 89000,  status: 'active'   },
  { id: 12, name: 'James Taylor',      email: 'j.taylor@gmail.com',      phone: '+1 (404) 555-0298', location: 'Atlanta, GA',      joined: 'Mar 5, 2025',  projects: 1, spent: 15000,  status: 'suspended'},
  { id: 13, name: 'Barbara Anderson',  email: 'b.anderson@email.com',    phone: '+1 (415) 555-0456', location: 'San Francisco, CA',joined: 'Jan 30, 2025', projects: 3, spent: 220000, status: 'active'   },
  { id: 14, name: 'William Jackson',   email: 'w.jackson@gmail.com',     phone: '+1 (972) 555-0381', location: 'Dallas, TX',       joined: 'Feb 14, 2025', projects: 1, spent: 42000,  status: 'active'   },
  { id: 15, name: 'Susan White',       email: 's.white@email.com',       phone: '+1 (612) 555-0247', location: 'Minneapolis, MN',  joined: 'Apr 8, 2025',  projects: 0, spent: 0,      status: 'active'   },
]

const STATUS_STYLE = {
  active:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  inactive:  'bg-slate-100  text-slate-500   border border-slate-200',
  suspended: 'bg-red-50     text-red-600     border border-red-200',
}

export default function AdminUsers() {
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [selected, setSelected] = useState(null)

  const visible = USERS.filter(u => {
    const matchFilter = filter === 'all' || u.status === filter
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <AdminLayout title="Users" subtitle={`${USERS.length} registered homeowners`}>
      <div className="p-6 space-y-4">

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px] max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              placeholder="Search users…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-turquoise-300"
            />
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {['all','active','inactive','suspended'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                  filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button className="ml-auto flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-turquoise-500 hover:bg-turquoise-600 text-white rounded-lg transition-colors">
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['User','Location','Joined','Projects','Total Spent','Status',''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {visible.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-turquoise-100 text-turquoise-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {u.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 whitespace-nowrap">{u.name}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-slate-500 text-xs whitespace-nowrap">
                        <MapPin size={11} /> {u.location}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{u.joined}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-slate-700 text-xs font-medium">
                        <FolderKanban size={12} className="text-slate-400" /> {u.projects}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {u.spent > 0 ? `$${u.spent.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${STATUS_STYLE[u.status]}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelected(u)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Showing {visible.length} of {USERS.length} users</p>
            <div className="flex gap-1">
              {[1,2,3,'…',14].map((p,i) => (
                <button key={i} className={`w-7 h-7 text-xs rounded flex items-center justify-center font-medium ${
                  p === 1 ? 'bg-turquoise-500 text-white' : 'text-slate-400 hover:bg-slate-100'
                }`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <div className="relative bg-white w-full max-w-md h-full shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">User Details</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-turquoise-100 text-turquoise-700 rounded-full flex items-center justify-center text-lg font-bold">
                  {selected.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">{selected.name}</p>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${STATUS_STYLE[selected.status]}`}>
                    {selected.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  [Mail, selected.email],
                  [Phone, selected.phone],
                  [MapPin, selected.location],
                ].map(([Icon, val]) => (
                  <div key={val} className="flex items-center gap-3 text-sm text-slate-600">
                    <Icon size={15} className="text-slate-400 shrink-0" /> {val}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  ['Joined', selected.joined],
                  ['Projects', selected.projects],
                  ['Total Spent', selected.spent > 0 ? `$${selected.spent.toLocaleString()}` : '—'],
                ].map(([l, v]) => (
                  <div key={l} className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-[11px] text-slate-500 mb-1">{l}</p>
                    <p className="font-bold text-slate-900 text-sm">{v}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-semibold bg-turquoise-500 hover:bg-turquoise-600 text-white rounded-lg transition-colors justify-center">
                  <Eye size={15} /> View Full Profile
                </button>
                <button className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-semibold border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors justify-center">
                  <ShieldOff size={15} /> Suspend Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
