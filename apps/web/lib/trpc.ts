import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../api/src/routers'
import superjson from 'superjson'

export const trpc = createTRPCReact<AppRouter>()

export function getTRPCUrl() {
  if (typeof window !== 'undefined') {
    // Browser: use relative URL
    return '/api/trpc'
  }

  // Server: use absolute URL
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/trpc'
}

export function getTRPCClient() {
  return trpc.createClient({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: getTRPCUrl(),
        headers: () => {
          // Get Clerk session token
          const token = (globalThis as unknown as { __clerk_session_token?: string }).__clerk_session_token
          return {
            authorization: token ? `Bearer ${token}` : '',
          }
        },
      }),
    ],
  })
}
