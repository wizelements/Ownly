import { NextResponse } from 'next/server'
import type { NextRequest, NextMiddleware } from 'next/server'

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

function demoMiddleware(_request: NextRequest) {
  return NextResponse.next()
}

// Only create Clerk middleware if not in demo mode
let clerkMiddleware: NextMiddleware | null = null

if (!isDemoMode) {
  // Dynamic import would be ideal but middleware doesn't support async
  // Instead, we conditionally require only when needed
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { authMiddleware } = require('@clerk/nextjs')
    clerkMiddleware = authMiddleware({
      publicRoutes: [
        '/',
        '/setup',
        '/sign-in(.*)',
        '/sign-up(.*)',
        '/api/webhooks(.*)',
        '/api/trpc(.*)',
        '/api/indexnow',
        
        // SEO pages
        '/nextjs-starter-kit',
        '/saas-boilerplate',
        '/nextjs-saas-template',
        '/react-dashboard-template',
        '/trpc-starter',
        '/prisma-nextjs-template',
        '/nextjs-14-boilerplate',
        '/typescript-saas-starter',
        '/nextjs-prisma-trpc',
        '/indie-hacker-starter-kit',
        '/solo-developer-saas-template',
        '/micro-saas-boilerplate',
        '/shipfast-alternative',
        '/supastarter-alternative',
        '/makerkit-alternative',
        '/nextjs-subscription-payments-alternative',
        '/ship-saas-fast',
        '/build-saas-weekend',
        '/saas-mvp-template',
        '/fastest-way-build-saas',
        '/shadcn-dashboard',
        '/tailwind-saas-template',
        '/clerk-nextjs-starter',
        '/react-query-trpc-template',
        '/cheap-saas-boilerplate',
        '/affordable-nextjs-template',
        '/budget-saas-starter',
        
        // Free tools
        '/saas-cost-calculator',
        '/tech-stack-generator',
        
        // SEO infrastructure
        '/sitemap.xml',
        '/robots.txt',
        '/feed.xml',
      ],
      ignoredRoutes: [
        '/api/webhooks/clerk',
        '/api/webhooks/stripe',
        '/sitemap.xml',
        '/robots.txt',
        '/feed.xml',
        '/api/indexnow',
      ],
    })
  } catch {
    // Clerk not available, fall back to demo middleware
    clerkMiddleware = demoMiddleware
  }
}

export default isDemoMode ? demoMiddleware : (clerkMiddleware || demoMiddleware)

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
