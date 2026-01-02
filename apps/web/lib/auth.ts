'use client'

import { isDemoMode, demoUser } from './demo'

// Demo mode auth - no Clerk dependency
const demoUserResult = {
  isLoaded: true,
  isSignedIn: true,
  user: demoUser,
}

const demoAuthResult = {
  isLoaded: true,
  isSignedIn: true,
  userId: demoUser.id,
  sessionId: 'demo_session',
  getToken: async () => 'demo_token',
}

export function useAppUser() {
  // In demo mode, return demo user without importing Clerk
  if (isDemoMode) {
    return demoUserResult
  }
  
  // Only import Clerk hooks when not in demo mode
  // This is safe because isDemoMode is a compile-time constant
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, react-hooks/rules-of-hooks
  const { useUser } = require('@clerk/nextjs')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useUser()
}

export function useAppAuth() {
  // In demo mode, return demo auth without importing Clerk
  if (isDemoMode) {
    return demoAuthResult
  }
  
  // Only import Clerk hooks when not in demo mode
  // This is safe because isDemoMode is a compile-time constant
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires, react-hooks/rules-of-hooks
  const { useAuth } = require('@clerk/nextjs')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useAuth()
}
