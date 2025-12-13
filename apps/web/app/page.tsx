import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Shield, 
  TrendingUp,
  Users,
  DollarSign,
  FileText
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Ownly</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-8 text-center">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm">
              <Zap className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Launch your LLC in 1-9 days, not 30-60</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your entire business <br />
              <span className="text-primary">in one place</span>
            </h1>
            
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              From LLC to $1M. The only product normal people need to start, run, 
              and scale a profitable U.S. business. One login. One flat price. Zero guesswork.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Business
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo (2 min)
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>All 50 states</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>92% earn $1k in 30 days</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/50 py-12">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold">1-9</div>
                <div className="text-sm text-muted-foreground">Days to LLC</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">$399</div>
                <div className="text-sm text-muted-foreground">One-time price</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">92%</div>
                <div className="text-sm text-muted-foreground">Earn $1k in 30 days</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">10</div>
                <div className="text-sm text-muted-foreground">Core modules</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24">
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              10 powerful modules that take you from zero to profitable business
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Form Your LLC"
              description="8-minute quiz → Articles, EIN, BOI filed automatically in all 50 states"
            />
            <FeatureCard
              icon={<DollarSign className="h-10 w-10 text-primary" />}
              title="Bank & Money"
              description="One-click banking setup + $200-$1,000 real bonuses + bookkeeping"
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-primary" />}
              title="Tax Engine"
              description="Quarterly estimates + S-Corp election saves you $9,400/yr on average"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Get Paid"
              description="Beautiful invoices, payment links, contracts, auto-late fees"
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="$100k Playbook"
              description="90-day roadmap with templates, scripts, and proven strategies"
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Compliance Shield"
              description="Auto-files annual reports, taxes, BOI updates — never get dissolved"
            />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="border-y bg-muted/50 py-24">
          <div className="container">
            <div className="mx-auto max-w-[980px] text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simple, honest pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                No hidden fees. No surprises. Pay once and own your business.
              </p>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              <PricingCard
                name="Founder"
                price="$399"
                period="one-time"
                description="Perfect for solo entrepreneurs"
                features={[
                  'Full LLC formation (all 50 states)',
                  '1st year registered agent',
                  'EIN + BOI filing',
                  'Banking setup with bonuses',
                  'Tax engine + S-Corp election',
                  'Invoice & payment tools',
                  '$100k Playbook',
                  'AI Success Coach',
                  'Community access',
                  'Lifetime Success Suite'
                ]}
              />
              <PricingCard
                name="Team"
                price="$699"
                period="one-time"
                description="For teams of 2-10 members"
                features={[
                  'Everything in Founder',
                  'Multi-member LLC docs',
                  'Team seats (2-10 people)',
                  'Cap table management',
                  'Advanced collaboration',
                  'Priority support'
                ]}
                popular
              />
              <PricingCard
                name="Success Shield"
                price="$149"
                period="per year"
                description="Optional after Year 1"
                features={[
                  'Registered agent renewal',
                  'All compliance filings',
                  'Annual reports auto-filed',
                  'Franchise tax handling',
                  'BOI updates',
                  'Insurance renewal',
                  'Priority support',
                  'All future features'
                ]}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24">
          <div className="mx-auto max-w-[700px] text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to become your own boss?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of entrepreneurs who are building profitable businesses with Ownly
            </p>
            <div className="mt-8">
              <Link href="/sign-up">
                <Button size="lg">
                  Get Started Now
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-bold">Ownly</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your entire business in one place — from LLC to $1M.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="#">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#">About</Link></li>
                <li><Link href="#">Blog</Link></li>
                <li><Link href="#">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#">Privacy</Link></li>
                <li><Link href="#">Terms</Link></li>
                <li><Link href="#">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Ownly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  features,
  popular = false 
}: {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
}) {
  return (
    <div className={`relative rounded-lg border bg-card p-8 shadow-sm ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
            Most Popular
          </span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-muted-foreground"> {period}</span>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/sign-up">
        <Button className="w-full" variant={popular ? 'default' : 'outline'}>
          Get Started
        </Button>
      </Link>
    </div>
  )
}
