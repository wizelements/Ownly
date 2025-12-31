'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { isDemoMode, demoUser } from './demo'

export function useAppUser() {
  const clerkUser = useUser()
  
  if (isDemoMode) {
    return {
      isLoaded: true,
      isSignedIn: true,
      user: demoUser,
    }
  }
  
  return clerkUser
}

export function useAppAuth() {
  const clerkAuth = useAuth()
  
  if (isDemoMode) {
    return {
      isLoaded: true,
      isSignedIn: true,
      userId: demoUser.id,
      sessionId: 'demo_session',
      getToken: async () => 'demo_token',
    }
  }
  
  return clerkAuth
}
