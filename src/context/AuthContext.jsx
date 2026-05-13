import { createContext, useContext, useState } from 'react'

const AuthCtx = createContext(null)

const PROFILES = {
  admin: {
    name: 'Sarah Mitchell', email: 'admin@a1renovations.com',
    role: 'admin', initials: 'SM', title: 'Platform Administrator',
  },
  user: {
    name: 'James Carter', email: 'james.carter@email.com',
    role: 'user', initials: 'JC', title: 'Homeowner',
    phone: '+1 (512) 555-0187', location: 'Austin, TX',
  },
  provider: {
    name: 'Mike Rodriguez', email: 'mike.rodriguez@pros.com',
    role: 'provider', initials: 'MR', title: 'Licensed General Contractor',
    phone: '+1 (512) 555-0142', location: 'Austin, TX',
    rating: 4.9, jobs: 127, verified: true,
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login  = (role) => setUser(PROFILES[role])
  const logout = () => setUser(null)
  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
