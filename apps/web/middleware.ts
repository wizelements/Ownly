import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Demo mode: Skip Clerk auth when DEMO_MODE=true
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

function demoMiddleware(request: NextRequest) {
  return NextResponse.next()
}

// This middleware protects all routes except the ones specified
const clerkMiddleware = authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks(.*)',
    '/api/trpc(.*)',
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    '/api/webhooks/clerk',
    '/api/webhooks/stripe',
  ],
})

export default isDemoMode ? demoMiddleware : clerkMiddleware

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
