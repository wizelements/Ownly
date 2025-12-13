import { router, publicProcedure } from '../trpc'
import { z } from 'zod'

export const healthRouter = router({
  // Simple health check
  check: publicProcedure.query(() => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    }
  }),

  // Detailed health check (for monitoring)
  detailed: publicProcedure.query(async ({ ctx }) => {
    let dbStatus = 'unknown'
    
    try {
      await ctx.prisma.$queryRaw`SELECT 1`
      dbStatus = 'connected'
    } catch (error) {
      dbStatus = 'disconnected'
    }

    return {
      status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: dbStatus,
        api: 'running',
      },
      version: process.env.npm_package_version || '0.1.0',
    }
  }),
})
