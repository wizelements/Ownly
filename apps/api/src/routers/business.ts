import { router, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { USState, BusinessType, Plan } from '@ownly/database'

const createBusinessSchema = z.object({
  name: z.string().min(1).max(200),
  legalName: z.string().min(1).max(200),
  type: z.nativeEnum(BusinessType),
  state: z.nativeEnum(USState),
  businessAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
  mailingAddress: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zip: z.string(),
    })
    .optional(),
  plan: z.nativeEnum(Plan).default('FOUNDER'),
})

export const businessRouter = router({
  // Get all businesses for current user
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.business.findMany({
      where: { userId: ctx.userId },
      include: {
        members: true,
        _count: {
          select: {
            invoices: true,
            filings: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }),

  // Get single business
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const business = await ctx.prisma.business.findFirst({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
        include: {
          members: true,
          bankAccounts: true,
          filings: {
            orderBy: { dueDate: 'desc' },
            take: 5,
          },
          taxes: {
            orderBy: { year: 'desc' },
            take: 5,
          },
          invoices: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      })

      if (!business) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Business not found',
        })
      }

      return business
    }),

  // Create new business
  create: protectedProcedure
    .input(createBusinessSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.business.create({
        data: {
          userId: ctx.userId,
          ...input,
          formationStatus: 'DRAFT',
          boiStatus: 'PENDING',
          successShield: true,
          shieldExpiresAt: new Date(
            Date.now() + 365 * 24 * 60 * 60 * 1000 // 1 year from now
          ),
        },
      })
    }),

  // Update business
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: createBusinessSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify ownership
      const business = await ctx.prisma.business.findFirst({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      })

      if (!business) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Business not found',
        })
      }

      return ctx.prisma.business.update({
        where: { id: input.id },
        data: {
          ...input.data,
          updatedAt: new Date(),
        },
      })
    }),

  // Update formation status
  updateFormationStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum([
          'DRAFT',
          'SUBMITTED',
          'PROCESSING',
          'APPROVED',
          'REJECTED',
          'ACTIVE',
        ]),
        ein: z.string().optional(),
        formationDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const business = await ctx.prisma.business.findFirst({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      })

      if (!business) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Business not found',
        })
      }

      return ctx.prisma.business.update({
        where: { id: input.id },
        data: {
          formationStatus: input.status,
          ein: input.ein,
          formationDate: input.formationDate,
          updatedAt: new Date(),
        },
      })
    }),

  // Get business dashboard stats
  stats: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const business = await ctx.prisma.business.findFirst({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      })

      if (!business) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Business not found',
        })
      }

      const [
        invoiceStats,
        complianceCount,
        upcomingFilings,
        recentActivity,
      ] = await Promise.all([
        // Invoice statistics
        ctx.prisma.invoice.aggregate({
          where: { businessId: input.id },
          _sum: { total: true },
          _count: true,
        }),

        // Compliance filings count
        ctx.prisma.complianceFiling.count({
          where: {
            businessId: input.id,
            status: 'APPROVED',
          },
        }),

        // Upcoming filings
        ctx.prisma.complianceFiling.findMany({
          where: {
            businessId: input.id,
            status: { in: ['PENDING', 'SCHEDULED'] },
            dueDate: { gte: new Date() },
          },
          orderBy: { dueDate: 'asc' },
          take: 5,
        }),

        // Recent activity (invoices + filings)
        Promise.all([
          ctx.prisma.invoice.findMany({
            where: { businessId: input.id },
            orderBy: { createdAt: 'desc' },
            take: 10,
          }),
          ctx.prisma.complianceFiling.findMany({
            where: { businessId: input.id },
            orderBy: { createdAt: 'desc' },
            take: 10,
          }),
        ]),
      ])

      return {
        totalRevenue: invoiceStats._sum.total || 0,
        invoiceCount: invoiceStats._count,
        complianceFilings: complianceCount,
        upcomingFilings,
        recentActivity: [
          ...recentActivity[0].map(i => ({ type: 'invoice', data: i })),
          ...recentActivity[1].map(f => ({ type: 'filing', data: f })),
        ]
          .sort(
            (a, b) =>
              new Date(b.data.createdAt).getTime() -
              new Date(a.data.createdAt).getTime()
          )
          .slice(0, 10),
      }
    }),

  // Dissolve business
  dissolve: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const business = await ctx.prisma.business.findFirst({
        where: {
          id: input.id,
          userId: ctx.userId,
        },
      })

      if (!business) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Business not found',
        })
      }

      return ctx.prisma.business.update({
        where: { id: input.id },
        data: {
          active: false,
          dissolved: true,
          dissolvedAt: new Date(),
        },
      })
    }),
})
