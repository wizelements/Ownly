import { type inferAsyncReturnType } from '@trpc/server'
import { type CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { verifyToken } from '@clerk/backend'
import { prisma } from '@ownly/database'

export async function createContext({ req, res }: CreateExpressContextOptions) {
  // Get the auth token from the request
  const authHeader = req.headers.authorization
  const token = authHeader?.replace('Bearer ', '')

  let userId: string | null = null
  let user = null

  if (token) {
    try {
      // Verify the Clerk token
      const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
        issuer: process.env.CLERK_ISSUER || null,
        authorizedParties: process.env.CLERK_AUTHORIZED_PARTIES?.split(','),
      })

      userId = payload.sub

      // Fetch user from database
      if (userId) {
        user = await prisma.user.findUnique({
          where: { clerkId: userId },
        })
      }
    } catch (error) {
      console.error('Token verification failed:', error)
    }
  }

  return {
    req,
    res,
    userId,
    user,
    prisma,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
