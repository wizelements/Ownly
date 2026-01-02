import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Code2, Zap, Database, Lock, Rocket, Layout, Star } from 'lucide-react'
import { SEO_PAGES, FAQ_ITEMS, GUMROAD_URL, SITE_URL, FEATURES } from '@/lib/seo-config'

type Props = {
  params: { slug: string }
}

function getPageData(slug: string) {
  return SEO_PAGES.find(p => p.slug === slug)
}

export async function generateStaticParams() {
  return SEO_PAGES.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPageData(params.slug)
  if (!page) return {}

  const title = `${page.title} — Ownly | Ship SaaS in Days`
  const description = `${page.h1}. Production-ready Next.js 14 + tRPC + Prisma foundation with 24 UI components. Only $49. Try the live demo.`

  return {
    title,
    description,
    keywords: [page.keyword, 'nextjs', 'saas', 'boilerplate', 'starter kit', 'typescript', 'trpc', 'prisma'],
    alternates: {
      canonical: `${SITE_URL}/${page.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${page.slug}`,
      siteName: 'Ownly Starter Kit',
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export default function SEOPage({ params }: Props) {
  const page = getPageData(params.slug)
  if (!page) notFound()

  const isComparison = 'isComparison' in page && page.isComparison

  // FAQ Schema for this page
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.slice(0, 5).map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  // Product Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Ownly Starter Kit',
    description: page.h1,
    brand: { '@type': 'Brand', name: 'Cod3BlackAgency' },
    offers: {
      '@type': 'Offer',
      price: '49',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: GUMROAD_URL,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Ownly</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Live Demo</Button>
            </Link>
            <Link href={GUMROAD_URL} target="_blank">
              <Button>Get It — $49</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-primary/10 mb-6">
              <Star className="mr-2 h-4 w-4 fill-yellow-500 text-yellow-500" />
              4.9/5 from 47 developers
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {page.h1}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {isComparison 
                ? `Looking for a ${page.keyword}? Ownly delivers the same features at a fraction of the cost. Next.js 14 + tRPC + Prisma, only $49.`
                : `The production-ready ${page.keyword} with Next.js 14, tRPC, Prisma, and 24 shadcn/ui components. Ship your SaaS in days, not months.`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href={GUMROAD_URL} target="_blank">
                <Button size="lg" className="w-full sm:w-auto">
                  Download Now — $49
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Try Live Demo
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Full source code
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Commercial license
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                72-hour refund
              </span>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-y bg-muted/30 py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Everything You Need to Ship Fast
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {FEATURES.map((feature, i) => (
                <div key={i} className="rounded-lg border bg-card p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon === 'layout' && <Layout className="h-5 w-5 text-primary" />}
                    {feature.icon === 'database' && <Database className="h-5 w-5 text-primary" />}
                    {feature.icon === 'lock' && <Lock className="h-5 w-5 text-primary" />}
                    {feature.icon === 'zap' && <Zap className="h-5 w-5 text-primary" />}
                    {feature.icon === 'code' && <Code2 className="h-5 w-5 text-primary" />}
                    {feature.icon === 'rocket' && <Rocket className="h-5 w-5 text-primary" />}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section (for competitor pages) */}
        {isComparison && (
          <section className="container py-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Developers Switch to Ownly
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-4 text-left">Feature</th>
                      <th className="p-4 text-center">Ownly</th>
                      <th className="p-4 text-center">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Price', '$49 one-time', '$150-300+'],
                      ['Type-safe APIs (tRPC)', '✅', '❌ Most use REST'],
                      ['Demo Mode', '✅ Works instantly', '❌ Requires setup'],
                      ['Database Models', '13 production-ready', '5-8 basic'],
                      ['UI Components', '24 shadcn/ui', 'Varies'],
                      ['Refund Policy', '72 hours', '14-30 days'],
                    ].map(([feature, ownly, others], i) => (
                      <tr key={i} className="border-t">
                        <td className="p-4 font-medium">{feature}</td>
                        <td className="p-4 text-center text-green-600">{ownly}</td>
                        <td className="p-4 text-center text-muted-foreground">{others}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="container py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="group rounded-lg border p-4">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t bg-muted/30 py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stop Configuring. Start Shipping.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join 500+ developers who are building products while others are still setting up boilerplate.
            </p>
            <Link href={GUMROAD_URL} target="_blank">
              <Button size="lg">
                Get Ownly Starter Kit — $49
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-bold">Ownly Starter Kit</span>
            </div>
            <nav className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/">Home</Link>
              <Link href="/dashboard">Demo</Link>
              <Link href="/nextjs-starter-kit">Next.js Starter</Link>
              <Link href="/saas-boilerplate">SaaS Boilerplate</Link>
            </nav>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            © 2024 Cod3BlackAgency. Built for developers who ship.
          </p>
        </div>
      </footer>
    </div>
  )
}
