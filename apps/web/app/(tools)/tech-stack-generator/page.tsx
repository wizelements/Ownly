'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Code2, Wand2, ArrowRight, Copy, Check } from 'lucide-react'
import { GUMROAD_URL } from '@/lib/seo-config'

const STACKS = {
  'Speed Demon': {
    frontend: 'Next.js 14',
    styling: 'Tailwind CSS',
    ui: 'shadcn/ui',
    backend: 'tRPC',
    database: 'Prisma + PostgreSQL',
    auth: 'Clerk',
    hosting: 'Vercel',
    why: 'Optimized for rapid development with type safety',
  },
  'Enterprise Ready': {
    frontend: 'Next.js 14',
    styling: 'Tailwind CSS',
    ui: 'Radix UI',
    backend: 'tRPC + REST API',
    database: 'Prisma + PostgreSQL',
    auth: 'Auth.js',
    hosting: 'AWS/GCP',
    why: 'Battle-tested stack for scale',
  },
  'Indie Hacker': {
    frontend: 'Next.js 14',
    styling: 'Tailwind CSS',
    ui: 'shadcn/ui',
    backend: 'Server Actions',
    database: 'Prisma + SQLite/Turso',
    auth: 'Clerk',
    hosting: 'Vercel',
    why: 'Minimal cost, maximum velocity',
  },
  'Full-Stack TypeScript': {
    frontend: 'Next.js 14',
    styling: 'Tailwind CSS',
    ui: 'shadcn/ui',
    backend: 'tRPC',
    database: 'Drizzle + PostgreSQL',
    auth: 'Lucia',
    hosting: 'Railway',
    why: 'End-to-end type safety',
  },
}

export default function TechStackGeneratorPage() {
  const [selected, setSelected] = useState<keyof typeof STACKS>('Speed Demon')
  const [copied, setCopied] = useState(false)

  const stack = STACKS[selected]

  const copyStack = () => {
    const text = Object.entries(stack)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SaaS Tech Stack Generator',
    description: 'Generate the perfect tech stack for your next SaaS project',
    url: 'https://ownly-kit.vercel.app/tech-stack-generator',
    applicationCategory: 'DeveloperApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
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
              <Wand2 className="mr-2 h-4 w-4" />
              Free Tool
            </div>
            <h1 className="text-4xl font-bold mb-4">
              SaaS Tech Stack Generator
            </h1>
            <p className="text-xl text-muted-foreground">
              Pick your vibe, get your stack. Stop researching, start building.
            </p>
          </div>

          {/* Stack Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {Object.keys(STACKS).map((name) => (
              <button
                key={name}
                onClick={() => setSelected(name as keyof typeof STACKS)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selected === name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Stack Display */}
          <div className="rounded-lg border p-6 bg-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{selected} Stack</h2>
              <Button variant="outline" size="sm" onClick={copyStack}>
                {copied ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {Object.entries(stack).filter(([k]) => k !== 'why').map(([key, value]) => (
                <div key={key} className="flex justify-between p-3 rounded-lg bg-muted">
                  <span className="text-muted-foreground capitalize">{key}</span>
                  <span className="font-mono font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm">
                <strong>Why this stack:</strong> {stack.why}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <div className="rounded-lg border-2 border-primary p-8">
              <h2 className="text-2xl font-bold mb-4">
                Skip the Setup — Get a Pre-Built Stack
              </h2>
              <p className="text-muted-foreground mb-6">
                Ownly Starter Kit uses the <strong>Speed Demon</strong> stack, 
                pre-configured and production-ready. Just clone and build.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={GUMROAD_URL} target="_blank">
                  <Button size="lg">
                    Get Ownly — $49
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline">
                    Try Live Demo
                  </Button>
                </Link>
              </div>
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
