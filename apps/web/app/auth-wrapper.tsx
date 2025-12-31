'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { DemoAuthProvider } from '@/lib/demo-auth-provider'
import { isDemoMode } from '@/lib/demo'
import { ReactNode } from 'react'

export function AuthWrapper({ children }: { children: ReactNode }) {
  if (isDemoMode) {
    return <DemoAuthProvider>{children}</DemoAuthProvider>
  }

  return <ClerkProvider>{children}</ClerkProvider>
}
