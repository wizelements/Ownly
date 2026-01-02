import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Code2,
  Database,
  Layout,
  Lock,
  Rocket,
  Clock,
  Terminal,
  Sparkles,
  Quote,
  Gift,
  Download,
  DollarSign
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Ownly</span>
            <span className="hidden sm:inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Starter Kit
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#problem" className="text-sm font-medium hover:text-primary">
              The Problem
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              What&apos;s Inside
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/setup" className="text-sm font-medium hover:text-primary">
              Setup Guide
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Demo</Button>
            </Link>
            <Link href="https://silverstream265.gumroad.com/l/ymzzb" target="_blank">
              <Button>Get the Kit</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-20 md:py-28">
          <div className="mx-auto flex max-w-[900px] flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-muted/50">
              <Rocket className="mr-2 h-4 w-4 text-primary" />
              <span>For developers who ship</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Ship your SaaS in days,<br />
              <span className="text-primary">not months</span>
            </h1>
            
            <p className="max-w-[650px] text-lg text-muted-foreground sm:text-xl">
              The production-ready Next.js + tRPC + Prisma foundation that handles 
              auth, database, and UI — so you can focus on building what matters.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="https://silverstream265.gumroad.com/l/ymzzb" target="_blank">
                <Button size="lg" className="w-full sm:w-auto">
                  Get the Starter Kit — $49
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Terminal className="mr-2 h-4 w-4" />
                  Try the Demo
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Full source code</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Commercial license</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>72-hour refund</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Magnet Section */}
        <section className="container py-16 border-b">
          <div className="mx-auto max-w-[600px] text-center">
            <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-8">
              <Gift className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Free: The SaaS Foundation Checklist</h2>
              <p className="text-muted-foreground mb-6">
                47 things every developer forgets — until it&apos;s too late.<br />
                Don&apos;t ship with missing pieces.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button type="submit">
                  <Download className="mr-2 h-4 w-4" />
                  Get the Checklist
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-3">
                No spam. Unsubscribe anytime. Join 500+ developers.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section id="problem" className="border-y bg-muted/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-[700px] text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                You know the feeling
              </h2>
              <p className="text-lg text-muted-foreground">
                It&apos;s 2 AM. You&apos;re excited about your new SaaS idea.
              </p>
            </div>

            <div className="mx-auto max-w-[800px] space-y-6">
              <ProblemCard
                icon={<Clock className="h-6 w-6 text-orange-500" />}
                title="Week 1: Auth setup"
                description="You&apos;re debugging middleware, reading docs, and wondering why session management is so complicated."
              />
              <ProblemCard
                icon={<Database className="h-6 w-6 text-orange-500" />}
                title="Week 2: Database schema"
                description="Users, subscriptions, teams, audit logs... You&apos;ve designed this same schema five times before."
              />
              <ProblemCard
                icon={<Layout className="h-6 w-6 text-orange-500" />}
                title="Week 3: Dashboard UI"
                description="That beautiful sidebar layout in your head? Still just a wireframe. You&apos;re fighting CSS."
              />
              
              <div className="text-center pt-8">
                <p className="text-lg font-medium text-muted-foreground">
                  Three weeks in. Zero lines of <em>your</em> product.
                </p>
                <p className="text-xl font-bold mt-4">
                  The graveyard of unshipped products isn&apos;t filled with bad ideas.<br />
                  It&apos;s filled with good ideas that died in setup purgatory.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="container py-20">
          <div className="mx-auto max-w-[700px] text-center mb-16">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-primary/10 text-primary mb-6">
              <Sparkles className="mr-2 h-4 w-4" />
              The solution
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What if you could skip to the good part?
            </h2>
            <p className="text-lg text-muted-foreground">
              Clone it. Run it. Start building features on day one.
            </p>
          </div>

          <div className="mx-auto max-w-[900px]">
            <div className="rounded-lg border bg-card p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2">terminal</span>
              </div>
              <div className="space-y-2">
                <p><span className="text-green-500">$</span> git clone https://github.com/you/ownly.git</p>
                <p><span className="text-green-500">$</span> pnpm install</p>
                <p><span className="text-green-500">$</span> pnpm dev</p>
                <p className="text-muted-foreground mt-4"># Open localhost:3000</p>
                <p className="text-primary"># You&apos;re building.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What's Inside Section */}
        <section id="features" className="border-y bg-muted/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-[700px] text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                What&apos;s inside the box
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to launch — nothing you don&apos;t
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Layout className="h-8 w-8 text-primary" />}
                title="24 UI Components"
                description="Data tables, forms, modals, sidebars, command palettes. Real components for real apps."
                items={['Responsive dashboard layout', 'Multi-step form wizard', 'Command menu (Cmd+K)']}
              />
              <FeatureCard
                icon={<Database className="h-8 w-8 text-primary" />}
                title="15 Database Models"
                description="The schema you&apos;d build anyway. Users, teams, subscriptions, invoices, audit logs."
                items={['Prisma ORM', 'PostgreSQL ready', 'Seed data included']}
              />
              <FeatureCard
                icon={<Lock className="h-8 w-8 text-primary" />}
                title="Auth That Works"
                description="Demo mode for development. Clerk for production. Switch with one env variable."
                items={['Social login ready', 'Protected routes', 'Session management']}
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-primary" />}
                title="Type-Safe APIs"
                description="tRPC from frontend to backend. No codegen. No runtime errors. Just TypeScript."
                items={['End-to-end types', 'React Query integration', 'Zod validation']}
              />
              <FeatureCard
                icon={<Code2 className="h-8 w-8 text-primary" />}
                title="Modern Stack"
                description="Next.js 14, App Router, Tailwind CSS, shadcn/ui. The tools the best teams use."
                items={['Turborepo monorepo', 'pnpm workspaces', 'GitHub Actions CI']}
              />
              <FeatureCard
                icon={<Rocket className="h-8 w-8 text-primary" />}
                title="Deploy Ready"
                description="Docker Compose for local dev. One-click deploy to Vercel. Documentation included."
                items={['Environment templates', 'Deployment guides', 'Docker setup']}
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container py-20">
          <div className="mx-auto max-w-[700px] text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              What developers are saying
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialCard
              quote="Saved me at least 40 hours on the auth and database setup alone. Worth every penny."
              author="Solo founder"
              role="Building a B2B tool"
            />
            <TestimonialCard
              quote="We use this as our base template for all client projects now. Pays for itself every time."
              author="Agency dev"
              role="3-person team"
            />
            <TestimonialCard
              quote="Finally, a starter that doesn't feel like it was abandoned in 2021. Modern stack, clean code."
              author="Indie hacker"
              role="Shipping side projects"
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="border-y bg-muted/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-[700px] text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Simple pricing
              </h2>
              <p className="text-lg text-muted-foreground">
                One purchase. Full source code. Build unlimited projects.
              </p>
            </div>

            {/* ROI Calculator */}
            <div className="mx-auto max-w-[600px] mb-16 rounded-lg border bg-card p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span className="font-semibold">The Math</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-right text-muted-foreground">Your hourly rate:</div>
                <div className="font-mono">$50/hr</div>
                <div className="text-right text-muted-foreground">Time saved:</div>
                <div className="font-mono">40+ hours</div>
                <div className="text-right text-muted-foreground">Value delivered:</div>
                <div className="font-mono text-green-600">$2,000+</div>
                <div className="text-right text-muted-foreground">Your investment:</div>
                <div className="font-mono">$49</div>
                <div className="col-span-2 border-t pt-3 mt-2">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-green-600">40x ROI</span>
                    <span className="text-muted-foreground ml-2">on your first project</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 max-w-[1000px] mx-auto">
              <PricingCard
                name="Starter"
                price="$49"
                description="Everything you need to launch"
                features={[
                  'Full source code',
                  '24 UI components',
                  '15 database models',
                  'Demo mode included',
                  'Setup documentation',
                  'Commercial license',
                  'Community support'
                ]}
              />
              <PricingCard
                name="Pro"
                price="$79"
                description="For serious builders"
                features={[
                  'Everything in Starter',
                  'Video walkthrough',
                  'Priority email support',
                  'Early access to updates',
                  'Discord access'
                ]}
                popular
              />
              <PricingCard
                name="Team"
                price="$149"
                description="For teams and agencies"
                features={[
                  'Everything in Pro',
                  'Team license (5 devs)',
                  '1 year of updates',
                  '30-min consultation',
                  'Company invoice'
                ]}
              />
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground">
                72-hour refund policy. No questions asked.
              </p>
            </div>
          </div>
        </section>

        {/* Who Is This For */}
        <section className="container py-20">
          <div className="grid md:grid-cols-2 gap-12 max-w-[900px] mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Perfect for you if...
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>You&apos;re a solo developer launching a SaaS</li>
                <li>You&apos;re an agency building client projects</li>
                <li>You&apos;re tired of reinventing wheels</li>
                <li>You want to learn modern patterns from working code</li>
                <li>You need something better than create-next-app</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="h-5 w-5 text-red-500">✗</span>
                Not for you if...
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>You need a no-code solution</li>
                <li>You&apos;ve never used React</li>
                <li>You want a hosted, finished product</li>
                <li>You&apos;re looking for a tutorial</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t bg-muted/30 py-20">
          <div className="container">
            <div className="mx-auto max-w-[600px] text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Stop configuring.<br />Start shipping.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join developers who are building products while others are still setting up auth.
              </p>
              <Link href="https://silverstream265.gumroad.com/l/ymzzb" target="_blank">
                <Button size="lg">
                  Get Ownly Starter Kit — $49
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <span className="font-bold">Ownly Starter Kit</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/dashboard">Demo</Link>
              <Link href="https://github.com/wizelements/Ownly">GitHub</Link>
              <Link href="#">Docs</Link>
              <Link href="#">Support</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Built by <a href="https://github.com/wizelements" className="underline hover:text-primary">Cod3BlackAgency</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProblemCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="flex gap-4 rounded-lg border bg-card p-6">
      <div className="shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, items }: { 
  icon: React.ReactNode
  title: string
  description: string
  items: string[]
}) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: {
  quote: string
  author: string
  role: string
}) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <Quote className="h-6 w-6 text-primary/30 mb-4" />
      <p className="text-sm mb-4">&quot;{quote}&quot;</p>
      <div className="text-sm">
        <p className="font-medium">{author}</p>
        <p className="text-muted-foreground">{role}</p>
      </div>
    </div>
  )
}

function PricingCard({ 
  name, 
  price, 
  description, 
  features,
  popular = false 
}: {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
}) {
  return (
    <div className={`relative rounded-lg border bg-card p-8 ${popular ? 'border-primary shadow-lg ring-1 ring-primary' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground"> one-time</span>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="https://silverstream265.gumroad.com/l/ymzzb" target="_blank">
        <Button className="w-full" variant={popular ? 'default' : 'outline'}>
          Get {name}
        </Button>
      </Link>
    </div>
  )
}
