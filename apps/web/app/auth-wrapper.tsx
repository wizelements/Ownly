'use client'

import dynamic from 'next/dynamic'
import { DemoAuthProvider } from '@/lib/demo-auth-provider'
import { isDemoMode } from '@/lib/demo'
import { ReactNode } from 'react'

const ClerkProvider = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.ClerkProvider),
  { ssr: false }
)

export function AuthWrapper({ children }: { children: ReactNode }) {
  if (isDemoMode) {
    return <DemoAuthProvider>{children}</DemoAuthProvider>
  }

  return <ClerkProvider>{children}</ClerkProvider>
}
