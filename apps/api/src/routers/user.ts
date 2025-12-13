import { router, protectedProcedure, publicProcedure } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const userRouter = router({
  // Get current user
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { clerkId: ctx.userId },
      include: {
        businesses: {
          where: { active: true },
          include: {
            members: true,
          },
        },
      },
    })

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      })
    }

    return user
  }),

  // Update user profile
  updateProfile: protectedProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        phone: z.string().optional(),
        avatar: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { clerkId: ctx.userId },
        data: {
          ...input,
          updatedAt: new Date(),
        },
      })
    }),

  // Mark onboarding as complete
  completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.prisma.user.update({
      where: { clerkId: ctx.userId },
      data: {
        onboarded: true,
        updatedAt: new Date(),
      },
    })
  }),

  // Create or sync user from Clerk
  syncFromClerk: publicProcedure
    .input(
      z.object({
        clerkId: z.string(),
        email: z.string().email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        avatar: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.upsert({
        where: { clerkId: input.clerkId },
        update: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          avatar: input.avatar,
          lastActiveAt: new Date(),
        },
        create: {
          clerkId: input.clerkId,
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          avatar: input.avatar,
        },
      })
    }),

  // Get user stats
  stats: protectedProcedure.query(async ({ ctx }) => {
    const [businessCount, invoiceCount, totalRevenue] = await Promise.all([
      ctx.prisma.business.count({
        where: { userId: ctx.userId, active: true },
      }),
      ctx.prisma.invoice.count({
        where: {
          business: { userId: ctx.userId },
          status: 'PAID',
        },
      }),
      ctx.prisma.invoice.aggregate({
        where: {
          business: { userId: ctx.userId },
          status: 'PAID',
        },
        _sum: {
          total: true,
        },
      }),
    ])

    return {
      businessCount,
      invoiceCount,
      totalRevenue: totalRevenue._sum.total || 0,
    }
  }),
})
