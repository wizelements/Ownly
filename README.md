# Ownly

![CI](https://github.com/wizelements/Ownly/actions/workflows/ci.yml/badge.svg)
![CodeQL](https://github.com/wizelements/Ownly/actions/workflows/codeql.yml/badge.svg)

**Your entire business in one place - from LLC to $1M.**

---

## Overview

Ownly is the only product normal people will ever need to start, run, and scale a profitable U.S. business. One product. One login. One flat price to start.

## Key Value Proposition

- **Zero to LLC**: Full formation in all 50 states in 1-9 days
- **First $100k Playbook**: Proven path to revenue
- **Lifetime Compliance**: Never worry about state filings again
- **Complete Business OS**: Banking, taxes, insurance, growth tools in one place

## Pricing

| Plan | Price | What's Included |
|------|-------|-----------------|
| **Founder** | $399 one-time | Full LLC formation (all 50 states) + 1st year registered agent + Lifetime Success Suite |
| **Team** | $699 one-time | Everything in Founder + multi-member docs + team seats (2-10 members) |
| **Success Shield** | $149/yr | Registered agent + compliance filings + insurance renewal + priority support + all future features |

**No hidden fees. Ever.**

## The 10 Core Modules

1. **Form** - 8-minute quiz → LLC live in 1-9 days
2. **Bank & Money** - One-click banking setup + bookkeeping
3. **Tax Engine** - Quarterly estimates + S-Corp election
4. **Get Paid** - Invoices, payments, contracts
5. **$100k Playbook** - 90-day roadmap to revenue
6. **Compliance Shield** - Auto-filed annual reports & taxes
7. **Insurance Marketplace** - GL, Cyber, E&O coverage
8. **Growth Suite** - KPIs, hiring, payroll, cap table
9. **AI Success Coach** - 24/7 expert guidance
10. **Community** - Private network + live Q&A

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Language**: TypeScript
- **State**: React Query + Zustand

### Backend
- **API**: tRPC (type-safe end-to-end)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Auth**: Clerk (social + passkeys)

### Infrastructure
- **Hosting**: Vercel (frontend) + Railway (backend)
- **CDN**: Cloudflare
- **Payments**: Stripe + Stripe Tax
- **Documents**: Docmosis + React-PDF
- **E-signature**: DocuSign
- **AI**: GPT-4o + custom fine-tuning

### Integrations
- **Banking**: Mercury, Relay, Brex, Found, NorthOne
- **Accounting**: Wave, QuickBooks
- **Payroll**: Gusto, Rippling
- **Filing**: Lob + Ironclad + state APIs
- **Registered Agent**: Own entities + Northwest fallback

## Project Structure

```
ownly/
├── apps/
│   ├── web/              # Main Next.js application
│   ├── api/              # tRPC API server
│   └── admin/            # Internal admin dashboard
├── packages/
│   ├── ui/               # Shared UI components
│   ├── database/         # Prisma schema & migrations
│   ├── lib/              # Shared utilities
│   ├── config/           # Shared configuration
│   └── types/            # Shared TypeScript types
├── docs/                 # Documentation
└── scripts/              # Build & deployment scripts
```

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- PostgreSQL 15+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ownly.git
cd ownly

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Set up database
pnpm db:push

# Start development servers
pnpm dev
```

### Environment Variables

Create `.env.local` with:

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# OpenAI
OPENAI_API_KEY="sk-..."

# DocuSign
DOCUSIGN_INTEGRATION_KEY="..."
DOCUSIGN_USER_ID="..."
```

## Development Workflow

```bash
# Run all apps in development mode
pnpm dev

# Run specific app
pnpm dev:web
pnpm dev:api
pnpm dev:admin

# Build for production
pnpm build

# Run tests
pnpm test

# Lint & format
pnpm lint
pnpm format

# Database operations
pnpm db:push          # Push schema changes
pnpm db:migrate       # Create migration
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database
```

## Roadmap

### Q1-Q2 2025 (MVP Launch)
- ✅ Core infrastructure setup
- ⏳ Modules 1-6 (Form, Bank, Tax, Get Paid, Playbook, Compliance)
- ⏳ Top 15 states support
- 🎯 Target: $2M ARR

### Q3-Q4 2025
- ⏳ All 50 states support
- ⏳ Insurance marketplace
- ⏳ AI Success Coach
- ⏳ Community platform
- 🎯 Target: $12M ARR

### 2026
- ⏳ International expansion (UK, Canada, Estonia)
- ⏳ Advanced growth tools
- 🎯 Target: $100M ARR, 250,000 customers

### 2027+
- ⏳ C-Corp, Nonprofit, DAO formations
- ⏳ Full payroll & tax filing
- 🎯 Target: $300M+ ARR

## Success Metrics

| Metric | 12-Month Target | Long-Term (2028) |
|--------|----------------|------------------|
| Customers earning first $1k | 92% | 95% |
| Customers profitable at 12mo | 75% | 85% |
| Avg 3-year revenue | $340k | $1.2M |
| Customer LTV | $1,400 | $4,000+ |
| Annual churn | <9% | <5% |
| NPS | 78 | 85+ |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Legal & Compliance

- **E&O Insurance**: $5M coverage
- **Legal Partner**: Top-5 corporate law firm
- **Compliance**: SOC 2 Type II (planned)
- **Privacy**: GDPR, CCPA compliant

## License

Proprietary - All rights reserved

## Support

- **Documentation**: https://docs.ownly.com
- **Community**: https://community.ownly.com
- **Email**: support@ownly.com
- **Emergency**: emergency@ownly.com

---

Built by [Cod3BlackAgency](https://github.com/wizelements)
