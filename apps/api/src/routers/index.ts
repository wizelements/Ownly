import { router } from '../trpc'
import { healthRouter } from './health'
import { userRouter } from './user'
import { businessRouter } from './business'

export const appRouter = router({
  health: healthRouter,
  user: userRouter,
  business: businessRouter,
})

export type AppRouter = typeof appRouter
