'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Code2, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  Copy, 
  Terminal, 
  Database, 
  Key, 
  Rocket,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Clone & Install',
    description: 'Get the code and install dependencies',
    commands: [
      'git clone https://github.com/yourusername/ownly.git',
      'cd ownly',
      'pnpm install',
    ],
    tip: 'Make sure you have Node.js 20+ and pnpm 8+ installed.',
    duration: '2 min',
  },
  {
    id: 2,
    title: 'Configure Environment',
    description: 'Set up your environment variables',
    commands: [
      'cp .env.example .env.local',
    ],
    tip: 'Demo mode is enabled by default. You can explore everything without external services.',
    duration: '1 min',
  },
  {
    id: 3,
    title: 'Start Database',
    description: 'Launch PostgreSQL with Docker',
    commands: [
      'docker-compose up -d',
    ],
    tip: 'No Docker? Use a hosted PostgreSQL like Neon, Supabase, or Railway.',
    duration: '1 min',
  },
  {
    id: 4,
    title: 'Push Database Schema',
    description: 'Create tables from Prisma schema',
    commands: [
      'pnpm db:push',
      'pnpm db:seed  # Optional: add sample data',
    ],
    tip: 'Use `pnpm db:studio` to visually browse your database.',
    duration: '1 min',
  },
  {
    id: 5,
    title: 'Start Development',
    description: 'Launch the development servers',
    commands: [
      'pnpm dev',
    ],
    tip: 'Open http://localhost:3000 and you\'re ready to build!',
    duration: '30 sec',
  },
]

const nextSteps = [
  {
    title: 'Explore the Dashboard',
    description: 'Check out the demo dashboard with sample data',
    href: '/dashboard',
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    title: 'Read the Architecture',
    description: 'Understand how the codebase is structured',
    href: 'https://github.com/wizelements/Ownly/blob/main/docs/ARCHITECTURE.md',
    icon: <Code2 className="h-5 w-5" />,
    external: true,
  },
  {
    title: 'Set Up Clerk Auth',
    description: 'Add real authentication for production',
    href: 'https://clerk.com',
    icon: <Key className="h-5 w-5" />,
    external: true,
  },
  {
    title: 'Deploy to Vercel',
    description: 'Go live in minutes with one-click deploy',
    href: 'https://vercel.com/new',
    icon: <ExternalLink className="h-5 w-5" />,
    external: true,
  },
]

export default function SetupPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [expandedStep, setExpandedStep] = useState<number | null>(1)

  const toggleStep = (stepId: number) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const markComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
      if (stepId < steps.length) {
        setExpandedStep(stepId + 1)
      }
    }
  }

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
  }

  const progress = Math.round((completedSteps.length / steps.length) * 100)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b py-4">
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold">Ownly</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              Setup Guide
            </span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Skip to Demo</Button>
          </Link>
        </div>
      </header>

      <main className="container py-12 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Get Running in 5 Minutes
          </h1>
          <p className="text-xl text-muted-foreground">
            Follow these steps to set up your development environment
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{completedSteps.length} of {steps.length} complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id)
            const isExpanded = expandedStep === step.id

            return (
              <div
                key={step.id}
                className={`rounded-lg border transition-all ${
                  isCompleted ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'bg-card'
                }`}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-4">
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                    <div className="text-left">
                      <h3 className="font-semibold">
                        Step {step.id}: {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">{step.duration}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="ml-10 space-y-4">
                      {/* Commands */}
                      <div className="rounded-lg bg-zinc-900 p-4 font-mono text-sm">
                        {step.commands.map((cmd, i) => (
                          <div key={i} className="flex items-center justify-between gap-4 group">
                            <div className="flex items-center gap-2 text-green-400">
                              <span className="text-zinc-500">$</span>
                              <span className="text-zinc-100">{cmd}</span>
                            </div>
                            <button
                              onClick={() => copyCommand(cmd)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-800 rounded"
                              title="Copy command"
                            >
                              <Copy className="h-4 w-4 text-zinc-400" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Tip */}
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Terminal className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{step.tip}</span>
                      </div>

                      {/* Mark Complete Button */}
                      {!isCompleted && (
                        <Button
                          onClick={() => markComplete(step.id)}
                          className="w-full"
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Mark as Complete
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Success State */}
        {completedSteps.length === steps.length && (
          <div className="rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 p-8 text-center mb-12">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">You&apos;re All Set! 🎉</h2>
            <p className="text-muted-foreground mb-6">
              Your development environment is ready. Time to start building!
            </p>
            <Link href="/dashboard">
              <Button size="lg">
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Next Steps */}
        <div>
          <h2 className="text-2xl font-bold mb-6">What&apos;s Next?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {nextSteps.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                className="rounded-lg border bg-card p-4 hover:border-primary transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold flex items-center gap-1">
                      {item.title}
                      {item.external && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Commands Reference */}
        <div className="mt-12 rounded-lg border p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5" />
            Quick Commands Reference
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-2">Development</h3>
              <div className="space-y-1 font-mono text-muted-foreground">
                <div><code>pnpm dev</code> — Start dev servers</div>
                <div><code>pnpm build</code> — Production build</div>
                <div><code>pnpm lint</code> — Check linting</div>
                <div><code>pnpm type-check</code> — Check types</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Database</h3>
              <div className="space-y-1 font-mono text-muted-foreground">
                <div><code>pnpm db:push</code> — Push schema</div>
                <div><code>pnpm db:studio</code> — Visual browser</div>
                <div><code>pnpm db:seed</code> — Add sample data</div>
                <div><code>pnpm db:reset</code> — Reset database</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>
            Need help? Check the{' '}
            <Link href="https://github.com/wizelements/Ownly" className="underline hover:text-primary">
              documentation
            </Link>{' '}
            or{' '}
            <Link href="https://github.com/wizelements/Ownly/issues" className="underline hover:text-primary">
              open an issue
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
