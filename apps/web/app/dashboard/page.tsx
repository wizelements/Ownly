'use client'

import { useUser } from '@clerk/nextjs'
import { trpc } from '@/lib/trpc'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  FileText, 
  DollarSign, 
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  
  // Fetch user data with tRPC
  const { data: userData, isLoading } = trpc.user.me.useQuery(undefined, {
    enabled: isLoaded && !!user,
  })

  // Fetch user stats
  const { data: stats } = trpc.user.stats.useQuery(undefined, {
    enabled: isLoaded && !!user,
  })

  if (!isLoaded || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  const hasBusinesses = (userData?.businesses?.length ?? 0) > 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Ownly</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.firstName || user.emailAddresses[0].emailAddress}
            </span>
            <Button variant="ghost" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.firstName || 'there'}!
          </h1>
          <p className="text-muted-foreground">
            {hasBusinesses
              ? "Here's what's happening with your businesses"
              : "Let's get started with your first business"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <StatsCard
            title="Active Businesses"
            value={stats?.businessCount ?? 0}
            icon={<Building2 className="h-4 w-4" />}
          />
          <StatsCard
            title="Paid Invoices"
            value={stats?.invoiceCount ?? 0}
            icon={<FileText className="h-4 w-4" />}
          />
          <StatsCard
            title="Total Revenue"
            value={`$${((stats?.totalRevenue ?? 0) / 100).toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4" />}
          />
        </div>

        {hasBusinesses ? (
          <>
            {/* Businesses List */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Your Businesses</h2>
                <Link href="/dashboard/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Business
                  </Button>
                </Link>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {userData?.businesses?.map(business => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid gap-4 md:grid-cols-4">
                <QuickAction
                  title="Create Invoice"
                  href="/dashboard/invoices/new"
                  icon={<FileText className="h-6 w-6" />}
                />
                <QuickAction
                  title="View Analytics"
                  href="/dashboard/analytics"
                  icon={<TrendingUp className="h-6 w-6" />}
                />
                <QuickAction
                  title="Tax Calculator"
                  href="/dashboard/tax"
                  icon={<DollarSign className="h-6 w-6" />}
                />
                <QuickAction
                  title="AI Coach"
                  href="/dashboard/coach"
                  icon={<Building2 className="h-6 w-6" />}
                />
              </div>
            </div>
          </>
        ) : (
          /* Empty State - No Businesses */
          <div className="rounded-lg border bg-card p-12 text-center">
            <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Start Your First Business</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Form your LLC in minutes. We'll handle the paperwork, filings, and compliance
              so you can focus on building your dream.
            </p>
            <Link href="/dashboard/form">
              <Button size="lg">
                Form Your LLC
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

function StatsCard({ 
  title, 
  value, 
  icon 
}: { 
  title: string
  value: string | number
  icon: React.ReactNode 
}) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}

function BusinessCard({ business }: { business: any }) {
  return (
    <Link href={`/dashboard/business/${business.id}`}>
      <div className="rounded-lg border bg-card p-6 hover:border-primary transition-colors cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">{business.name}</h3>
            <p className="text-sm text-muted-foreground">{business.state} LLC</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            business.formationStatus === 'ACTIVE' 
              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
          }`}>
            {business.formationStatus}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>EIN: {business.ein || 'Pending'}</span>
        </div>
      </div>
    </Link>
  )
}

function QuickAction({ 
  title, 
  href, 
  icon 
}: { 
  title: string
  href: string
  icon: React.ReactNode 
}) {
  return (
    <Link href={href}>
      <div className="rounded-lg border bg-card p-6 hover:border-primary transition-colors cursor-pointer text-center">
        <div className="flex justify-center mb-3">{icon}</div>
        <h3 className="font-semibold">{title}</h3>
      </div>
    </Link>
  )
}
