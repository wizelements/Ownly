'use client'

import { isDemoMode, demoUser } from './demo'

export function useAppUser() {
  if (isDemoMode) {
    return {
      isLoaded: true,
      isSignedIn: true,
      user: demoUser,
    }
  }
  
  // Dynamic import only when not in demo mode
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useUser } = require('@clerk/nextjs')
  return useUser()
}

export function useAppAuth() {
  if (isDemoMode) {
    return {
      isLoaded: true,
      isSignedIn: true,
      userId: demoUser.id,
      sessionId: 'demo_session',
      getToken: async () => 'demo_token',
    }
  }
  
  // Dynamic import only when not in demo mode
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useAuth } = require('@clerk/nextjs')
  return useAuth()
}
