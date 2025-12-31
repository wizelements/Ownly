'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { demoUser } from './demo'

interface DemoAuthContextType {
  isLoaded: boolean
  isSignedIn: boolean
  user: typeof demoUser | null
  userId: string | null
}

const DemoAuthContext = createContext<DemoAuthContextType>({
  isLoaded: true,
  isSignedIn: true,
  user: demoUser,
  userId: demoUser.id,
})

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  return (
    <DemoAuthContext.Provider
      value={{
        isLoaded: true,
        isSignedIn: true,
        user: demoUser,
        userId: demoUser.id,
      }}
    >
      {children}
    </DemoAuthContext.Provider>
  )
}

export function useDemoUser() {
  const context = useContext(DemoAuthContext)
  return {
    isLoaded: context.isLoaded,
    isSignedIn: context.isSignedIn,
    user: context.user,
  }
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext)
  return {
    isLoaded: context.isLoaded,
    isSignedIn: context.isSignedIn,
    userId: context.userId,
    sessionId: 'demo_session',
    getToken: async () => 'demo_token',
  }
}
