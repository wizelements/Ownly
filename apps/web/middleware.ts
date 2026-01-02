import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

function demoMiddleware(request: NextRequest) {
  return NextResponse.next()
}

const clerkMiddleware = authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks(.*)',
    '/api/trpc(.*)',
    '/api/indexnow',
    
    // SEO pages - all dynamic slug routes
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

export default isDemoMode ? demoMiddleware : clerkMiddleware

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
