'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Code2, Calculator, ArrowRight, CheckCircle2 } from 'lucide-react'
import { GUMROAD_URL } from '@/lib/seo-config'

export default function SaaSCostCalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState(50)
  const [authHours, setAuthHours] = useState(20)
  const [dbHours, setDbHours] = useState(15)
  const [uiHours, setUiHours] = useState(25)
  const [apiHours, setApiHours] = useState(15)

  const totalHours = authHours + dbHours + uiHours + apiHours
  const totalCost = totalHours * hourlyRate
  const ownlyPrice = 49
  const savings = totalCost - ownlyPrice
  const roi = Math.round(totalCost / ownlyPrice)

  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SaaS Development Cost Calculator',
    description: 'Calculate how much time and money you waste on SaaS boilerplate vs using a starter kit',
    url: 'https://ownly-kit.vercel.app/saas-cost-calculator',
    applicationCategory: 'DeveloperApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />

      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold">Ownly</span>
          </Link>
          <Link href={GUMROAD_URL} target="_blank">
            <Button>Get Starter Kit — $49</Button>
          </Link>
        </div>
      </header>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-primary/10 mb-4">
              <Calculator className="mr-2 h-4 w-4" />
              Free Tool
            </div>
            <h1 className="text-4xl font-bold mb-4">
              SaaS Development Cost Calculator
            </h1>
            <p className="text-xl text-muted-foreground">
              Calculate how much time (and money) you&apos;re wasting on boilerplate code
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="rounded-lg border p-6 space-y-6">
              <h2 className="text-xl font-bold">Your Setup Time</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your hourly rate: ${hourlyRate}
                </label>
                <input
                  type="range"
                  min="25"
                  max="200"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Auth setup: {authHours} hours
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={authHours}
                  onChange={(e) => setAuthHours(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Database schema: {dbHours} hours
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={dbHours}
                  onChange={(e) => setDbHours(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Dashboard UI: {uiHours} hours
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={uiHours}
                  onChange={(e) => setUiHours(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  API structure: {apiHours} hours
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={apiHours}
                  onChange={(e) => setApiHours(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="rounded-lg border p-6 bg-red-50 dark:bg-red-950">
                <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-4">
                  ❌ Building From Scratch
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total hours:</span>
                    <span className="font-mono font-bold">{totalHours} hrs</span>
                  </div>
                  <div className="flex justify-between text-xl">
                    <span>Total cost:</span>
                    <span className="font-mono font-bold text-red-600">${totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-6 bg-green-50 dark:bg-green-950">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4">
                  ✅ Using Ownly Starter Kit
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Setup time:</span>
                    <span className="font-mono font-bold">5 minutes</span>
                  </div>
                  <div className="flex justify-between text-xl">
                    <span>Total cost:</span>
                    <span className="font-mono font-bold text-green-600">${ownlyPrice}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border-2 border-primary p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {roi}x ROI
                </div>
                <p className="text-muted-foreground mb-4">
                  You save <strong>${savings.toLocaleString()}</strong> and {totalHours} hours
                </p>
                <Link href={GUMROAD_URL} target="_blank">
                  <Button size="lg" className="w-full">
                    Get Ownly — $49
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">
              What&apos;s Included in Ownly (So You Don&apos;t Build It)
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Next.js 14 with App Router configured',
                'TypeScript in strict mode',
                'tRPC end-to-end type-safe APIs',
                '13 Prisma database models',
                '14 shadcn/ui components',
                'Authentication with Clerk',
                'Demo mode for instant testing',
                'Dashboard layout with sidebar',
                'Data tables with sorting/filtering',
                'Form validation with Zod',
                'Toast notifications',
                'Dark mode support',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Free tool by <Link href="/" className="underline">Ownly Starter Kit</Link></p>
        </div>
      </footer>
    </div>
  )
}
