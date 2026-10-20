'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'

export interface UserSession {
  id?: string
  code?: string
  fullName?: string
  email?: string
  phone?: string
  role?: string
  roleName?: string
  department?: string
  country?: string
  languages?: string
  status?: string
  imageUrl?: string | null
  permissions?: string[]
  createdAt?: string
}

interface UserSessionContextValue {
  user: UserSession | null
  authenticated: boolean
  loading: boolean
  refreshUser: () => Promise<UserSession | null>
  updateUser: (patch: Partial<UserSession>) => void
}

const UserSessionContext = createContext<UserSessionContextValue>({
  user: null,
  authenticated: false,
  loading: true,
  refreshUser: async () => null,
  updateUser: () => {}
})

// Inactivity timeout: 5 minutes matching server token-store IDLE_TIMEOUT_MS
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000

export const UserSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const lastActivityRef = useRef<number>(Date.now())
  const isRedirectingRef = useRef<boolean>(false)

  const redirectToLogin = useCallback((reason: string = 'inactivity') => {
    if (isRedirectingRef.current) return
    if (typeof window === 'undefined') return
    if (window.location.pathname === '/login') return

    isRedirectingRef.current = true
    // Hard redirect to login page (not soft router.push) to cleanly reset all state
    window.location.href = `/login?reason=${encodeURIComponent(reason)}`
  }, [])

  const refreshUser = useCallback(async (): Promise<UserSession | null> => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' })
      if (res.status === 401) {
        redirectToLogin('session_expired')
        return null
      }
      const data = await res.json()
      if (data.authenticated && data.user) {
        setUser(data.user)
        setAuthenticated(true)
        return data.user
      } else {
        // Session token was removed / expired because of inactivity
        setUser(null)
        setAuthenticated(false)
        redirectToLogin('inactivity')
        return null
      }
    } catch {
      return null
    } finally {
      setLoading(false)
    }
  }, [redirectToLogin])

  const updateUser = useCallback((patch: Partial<UserSession>) => {
    setUser(prev => {
      const next = prev ? { ...prev, ...patch } : (patch as UserSession)
      return next
    })
    // Broadcast event so any decoupled component in the app syncs without a page refresh
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('croip:user-updated', { detail: patch }))
    }
  }, [])

  // Initial load
  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  // Listen to external custom events (from forms, avatar uploads, etc.)
  useEffect(() => {
    const handleUserUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<Partial<UserSession>>
      if (customEvent.detail) {
        setUser(prev => (prev ? { ...prev, ...customEvent.detail } : null))
      }
    }

    const handleSessionExpired = () => {
      redirectToLogin('session_expired')
    }

    window.addEventListener('croip:user-updated', handleUserUpdated)
    window.addEventListener('croip:session-expired', handleSessionExpired)

    return () => {
      window.removeEventListener('croip:user-updated', handleUserUpdated)
      window.removeEventListener('croip:session-expired', handleSessionExpired)
    }
  }, [redirectToLogin])

  // Global fetch response interceptor for 401 Unauthenticated
  useEffect(() => {
    if (typeof window === 'undefined') return

    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const response = await originalFetch(...args)
      if (response.status === 401 && window.location.pathname !== '/login') {
        const urlStr = typeof args[0] === 'string' ? args[0] : (args[0] as Request)?.url || ''
        if (!urlStr.includes('/api/auth/oauth/zitadel/login') && !urlStr.includes('/api/auth/logout')) {
          redirectToLogin('session_expired')
        }
      }
      return response
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [redirectToLogin])

  // Track user activity & enforce client-side inactivity redirect
  useEffect(() => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now()
    }

    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']
    events.forEach(event => window.addEventListener(event, updateActivity, { passive: true }))

    // Periodic check every 15 seconds
    const interval = setInterval(() => {
      const idleTime = Date.now() - lastActivityRef.current

      // If user has been inactive for >= 5 minutes, call refreshUser
      // The server will evict the tokenSession in touchTokenSession because now - lastActivityAt > 5 min,
      // and refreshUser will immediately redirect to /login!
      if (idleTime >= INACTIVITY_TIMEOUT_MS) {
        refreshUser()
      } else {
        // Also check server session status periodically
        fetch('/api/auth/me', { cache: 'no-store' })
          .then(res => res.json())
          .then(data => {
            if (!data.authenticated) {
              redirectToLogin('inactivity')
            }
          })
          .catch(() => {})
      }
    }, 15000)

    return () => {
      events.forEach(event => window.removeEventListener(event, updateActivity))
      clearInterval(interval)
    }
  }, [refreshUser, redirectToLogin])

  return (
    <UserSessionContext.Provider value={{ user, authenticated, loading, refreshUser, updateUser }}>
      {children}
    </UserSessionContext.Provider>
  )
}

export function useUserSession() {
  return useContext(UserSessionContext)
}
