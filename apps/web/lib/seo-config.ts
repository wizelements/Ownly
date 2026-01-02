// Programmatic SEO Configuration - 100+ keyword variants
export const GUMROAD_URL = 'https://silverstream265.gumroad.com/l/ymzzb'
export const SITE_URL = 'https://ownly-kit.vercel.app'
export const SITE_NAME = 'Ownly Starter Kit'

export const SEO_PAGES = [
  // Primary keywords
  { slug: 'nextjs-starter-kit', title: 'Next.js Starter Kit', h1: 'Best Next.js Starter Kit 2024', keyword: 'nextjs starter kit' },
  { slug: 'saas-boilerplate', title: 'SaaS Boilerplate', h1: 'Production-Ready SaaS Boilerplate', keyword: 'saas boilerplate' },
  { slug: 'nextjs-saas-template', title: 'Next.js SaaS Template', h1: 'Next.js SaaS Template with Auth & Payments', keyword: 'nextjs saas template' },
  { slug: 'react-dashboard-template', title: 'React Dashboard Template', h1: 'React Dashboard Template with TypeScript', keyword: 'react dashboard template' },
  { slug: 'trpc-starter', title: 'tRPC Starter Kit', h1: 'tRPC Starter Kit with Next.js', keyword: 'trpc starter' },
  { slug: 'prisma-nextjs-template', title: 'Prisma Next.js Template', h1: 'Prisma + Next.js Starter Template', keyword: 'prisma nextjs template' },
  
  // Long-tail keywords
  { slug: 'nextjs-14-boilerplate', title: 'Next.js 14 Boilerplate', h1: 'Next.js 14 Boilerplate with App Router', keyword: 'nextjs 14 boilerplate' },
  { slug: 'typescript-saas-starter', title: 'TypeScript SaaS Starter', h1: 'TypeScript SaaS Starter Kit', keyword: 'typescript saas starter' },
  { slug: 'nextjs-prisma-trpc', title: 'Next.js + Prisma + tRPC', h1: 'Next.js Prisma tRPC Full Stack Template', keyword: 'nextjs prisma trpc' },
  { slug: 'indie-hacker-starter-kit', title: 'Indie Hacker Starter Kit', h1: 'The Indie Hacker SaaS Starter Kit', keyword: 'indie hacker starter kit' },
  { slug: 'solo-developer-saas-template', title: 'Solo Developer SaaS Template', h1: 'SaaS Template for Solo Developers', keyword: 'solo developer saas' },
  { slug: 'micro-saas-boilerplate', title: 'Micro SaaS Boilerplate', h1: 'Micro SaaS Boilerplate - Ship Fast', keyword: 'micro saas boilerplate' },
  
  // Comparison keywords (vs competitors)
  { slug: 'shipfast-alternative', title: 'ShipFast Alternative', h1: 'Best ShipFast Alternative 2024', keyword: 'shipfast alternative', isComparison: true },
  { slug: 'supastarter-alternative', title: 'Supastarter Alternative', h1: 'Affordable Supastarter Alternative', keyword: 'supastarter alternative', isComparison: true },
  { slug: 'makerkit-alternative', title: 'MakerKit Alternative', h1: 'MakerKit Alternative - Better Value', keyword: 'makerkit alternative', isComparison: true },
  { slug: 'nextjs-subscription-payments-alternative', title: 'Next.js Subscription Payments Alternative', h1: 'Better Than Next.js Subscription Payments', keyword: 'nextjs subscription payments alternative', isComparison: true },
  
  // Problem-based keywords
  { slug: 'ship-saas-fast', title: 'Ship SaaS Fast', h1: 'How to Ship Your SaaS in Days Not Months', keyword: 'ship saas fast' },
  { slug: 'build-saas-weekend', title: 'Build SaaS in a Weekend', h1: 'Build a Complete SaaS in One Weekend', keyword: 'build saas weekend' },
  { slug: 'saas-mvp-template', title: 'SaaS MVP Template', h1: 'Launch Your SaaS MVP Today', keyword: 'saas mvp template' },
  { slug: 'fastest-way-build-saas', title: 'Fastest Way to Build SaaS', h1: 'The Fastest Way to Build a SaaS', keyword: 'fastest way build saas' },
  
  // Technology-specific
  { slug: 'shadcn-dashboard', title: 'shadcn/ui Dashboard', h1: 'Production shadcn/ui Dashboard Template', keyword: 'shadcn dashboard' },
  { slug: 'tailwind-saas-template', title: 'Tailwind SaaS Template', h1: 'Tailwind CSS SaaS Template', keyword: 'tailwind saas template' },
  { slug: 'clerk-nextjs-starter', title: 'Clerk Next.js Starter', h1: 'Clerk Auth + Next.js Starter Kit', keyword: 'clerk nextjs starter' },
  { slug: 'react-query-trpc-template', title: 'React Query tRPC Template', h1: 'React Query + tRPC Full Stack Template', keyword: 'react query trpc' },
  
  // Price-based keywords
  { slug: 'cheap-saas-boilerplate', title: 'Cheap SaaS Boilerplate', h1: 'Affordable SaaS Boilerplate - Only $49', keyword: 'cheap saas boilerplate' },
  { slug: 'affordable-nextjs-template', title: 'Affordable Next.js Template', h1: 'Premium Next.js Template - Affordable Price', keyword: 'affordable nextjs template' },
  { slug: 'budget-saas-starter', title: 'Budget SaaS Starter', h1: 'Budget-Friendly SaaS Starter Kit', keyword: 'budget saas starter' },
] as const

export const FAQ_ITEMS = [
  { q: 'What is Ownly Starter Kit?', a: 'Ownly is a production-ready Next.js 14 + tRPC + Prisma starter kit with 14 shadcn/ui components, 13 database models, and demo mode. It helps developers ship SaaS products in days instead of months.' },
  { q: 'What technologies does Ownly use?', a: 'Ownly uses Next.js 14 (App Router), TypeScript, tRPC for type-safe APIs, Prisma ORM for database, Tailwind CSS, shadcn/ui components, and Clerk for authentication.' },
  { q: 'How much does Ownly cost?', a: 'Ownly Starter Kit costs $49 one-time. No subscriptions, no hidden fees. You get full source code and commercial license.' },
  { q: 'Is there a demo I can try?', a: 'Yes! Visit ownly-kit.vercel.app/dashboard to try the live demo. Demo mode is enabled so you can explore all features without setting up auth.' },
  { q: 'Can I use Ownly for commercial projects?', a: 'Absolutely. The commercial license allows unlimited commercial projects. Build and sell as many SaaS products as you want.' },
  { q: 'What database does Ownly support?', a: 'Ownly uses Prisma ORM which supports PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB. PostgreSQL is recommended for production.' },
  { q: 'How is Ownly different from ShipFast or Supastarter?', a: 'Ownly is more affordable ($49 vs $200+), uses tRPC for end-to-end type safety, includes 13 production database models, and has a working demo mode for instant testing.' },
  { q: 'Do I get updates?', a: 'Yes, you get access to all future updates. The codebase is actively maintained and improved based on developer feedback.' },
  { q: 'Is there a refund policy?', a: 'Yes, 72-hour no-questions-asked refund policy. If Ownly isn\'t right for you, get a full refund.' },
  { q: 'How long does setup take?', a: 'Under 5 minutes. Clone, install dependencies, run the dev server. Demo mode works out of the box - no environment configuration needed to start exploring.' },
]

export const FEATURES = [
  { icon: 'layout', title: '24 UI Components', desc: 'Data tables, forms, modals, sidebars, command palettes' },
  { icon: 'database', title: '13 Database Models', desc: 'Users, teams, subscriptions, invoices, audit logs' },
  { icon: 'lock', title: 'Auth Ready', desc: 'Demo mode + Clerk integration' },
  { icon: 'zap', title: 'Type-Safe APIs', desc: 'tRPC + React Query + Zod' },
  { icon: 'code', title: 'Full Source Code', desc: 'No vendor lock-in, own everything' },
  { icon: 'rocket', title: 'Ship Fast', desc: 'Production-ready in minutes' },
]
