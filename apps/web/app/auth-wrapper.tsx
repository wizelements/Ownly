'use client'

import { DemoAuthProvider } from '@/lib/demo-auth-provider'
import { isDemoMode } from '@/lib/demo'
import { ReactNode, lazy, Suspense } from 'react'

// Only import Clerk when not in demo mode and on client side
const ClerkProviderLazy = lazy(() => 
  import('@clerk/nextjs').then((mod) => ({ default: mod.ClerkProvider }))
)

export function AuthWrapper({ children }: { children: ReactNode }) {
  // In demo mode, never load Clerk
  if (isDemoMode) {
    return <DemoAuthProvider>{children}</DemoAuthProvider>
  }

  // In production mode with Clerk, use lazy loading with suspense
  return (
    <Suspense fallback={<>{children}</>}>
      <ClerkProviderLazy>{children}</ClerkProviderLazy>
    </Suspense>
  )
}
