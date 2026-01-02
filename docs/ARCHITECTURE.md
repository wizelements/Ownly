# Ownly Architecture Documentation

## System Overview

Ownly is built as a modern monorepo using **Turborepo** with Next.js 14, tRPC, and Prisma for a fully type-safe full-stack application.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
│  (Next.js 14 App Router + React + Tailwind + shadcn/ui)    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ tRPC (Type-safe API)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                       API Layer                              │
│         (tRPC Server + Business Logic + Services)           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Prisma ORM
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                    Database Layer                            │
│              (PostgreSQL on Neon/Railway)                   │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack Details

### Frontend (`apps/web`)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Query (via tRPC) + Zustand
- **Forms**: React Hook Form + Zod validation
- **Auth**: Clerk (social login + passkeys)
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend (`apps/api`)
- **API**: tRPC for end-to-end type safety
- **Database**: PostgreSQL via Neon (serverless)
- **ORM**: Prisma
- **Validation**: Zod schemas
- **File Storage**: AWS S3
- **Caching**: Redis (Upstash)
- **Queue**: BullMQ for background jobs

### Database (`packages/database`)
- **Primary**: PostgreSQL 15+
- **Migrations**: Prisma Migrate
- **Schema**: See `schema.prisma`

## Module Architecture

### 1. Form Module (LLC Formation)
```
User fills quiz → Validation → State-specific docs generated → 
DocuSign signing → Auto-submit to state → Track status → 
EIN application → BOI filing
```

**Key Components:**
- Quiz engine with conditional logic
- Document generation (Docmosis)
- State API integrations (50 states)
- E-signature flow (DocuSign)

### 2. Bank & Money Module
```
User selects bank → OAuth connection → Account linking → 
Bonus claim → Bookkeeping sync (Wave/QuickBooks)
```

**Integrations:**
- Mercury API
- Relay API
- Brex API
- Stripe for payment processing

### 3. Tax Engine
```
Income/expense tracking → Quarterly tax calculation → 
S-Corp election analysis → Payment voucher generation → 
IRS e-filing
```

**Features:**
- Real-time tax estimates
- S-Corp vs LLC comparison calculator
- Automated quarterly reminders
- Integration with tax filing services

### 4. Get Paid Module
```
Create invoice/contract → Send to client → 
Track views → Accept payment → 
Auto-follow-up for late payments
```

**Components:**
- Invoice generator (React-PDF)
- Payment links (Stripe)
- Contract templates
- E-signature (DocuSign)

### 5. $100k Playbook
```
Onboarding assessment → Personalized roadmap → 
Step-by-step tasks → Templates & scripts → 
Progress tracking → Accountability
```

**Content:**
- Industry-specific playbooks
- Template library (proposals, pricing, etc.)
- Video tutorials
- Live coaching integration

### 6. Compliance Shield
```
Monitor state requirements → Auto-generate filings → 
Submit on behalf of user → Track confirmations → 
Alert user of any issues
```

**Automation:**
- Annual report filing (all 50 states)
- Franchise tax payments
- BOI updates
- Registered agent services

### 7. Insurance Marketplace
```
User profile → Risk assessment → Quote gathering → 
Policy comparison → Purchase → 
Certificate generation → Renewal management
```

**Partners:**
- General Liability: Next, Hiscox
- Cyber Liability: Coalition, At-Bay
- E&O: Embroker

### 8. Growth Suite
```
KPI tracking → Financial dashboard → 
Hiring templates → Cap table management → 
Payroll integration
```

**Integrations:**
- Gusto/Rippling for payroll
- Carta for cap table
- Analytics dashboard

### 9. AI Success Coach
```
User asks question → GPT-4o with RAG → 
Retrieve relevant business context → 
Generate personalized advice → 
Track conversation history
```

**Technology:**
- OpenAI GPT-4o
- Vector DB for RAG (Pinecone)
- Fine-tuned on 20k+ business scenarios

### 10. Community Module
```
User joins → Matched to accountability pod → 
Weekly Q&A sessions → Expert AMAs → 
Peer networking
```

**Features:**
- Private forum
- Video chat (Daily.co)
- Event scheduling
- Success stories

## Security Architecture

### Authentication & Authorization
- **Provider**: Clerk
- **Methods**: Email/password, Google, GitHub, passkeys
- **Session Management**: JWT tokens
- **MFA**: Optional 2FA/passkeys

### Data Protection
- **Encryption at Rest**: AES-256
- **Encryption in Transit**: TLS 1.3
- **PII Handling**: Encrypted columns in DB
- **Secret Management**: Environment variables + Vault

### Compliance
- **SOC 2 Type II**: Planned Q3 2025
- **GDPR**: Full compliance
- **CCPA**: Full compliance
- **Data Retention**: 7 years for financial records

## Infrastructure

### Hosting
- **Frontend**: Vercel (Edge Network)
- **Backend**: Railway (containerized)
- **Database**: Neon (serverless PostgreSQL)
- **CDN**: Cloudflare
- **File Storage**: AWS S3
- **Cache**: Upstash Redis

### Monitoring
- **APM**: Sentry
- **Analytics**: PostHog
- **Uptime**: BetterUptime
- **Logs**: Axiom

### CI/CD
```
Git Push → GitHub Actions → 
Lint & Test → Build → 
Deploy to Preview → 
Automated Tests → 
Deploy to Production
```

## Scalability Considerations

### Database
- **Connection Pooling**: Prisma + PgBouncer
- **Read Replicas**: For analytics queries
- **Partitioning**: By business_id for large tables
- **Indexing**: Strategic indexes on queries

### Caching Strategy
- **L1**: React Query client-side cache
- **L2**: Redis for API responses
- **L3**: CDN edge caching for static assets

### Background Jobs
- **Queue**: BullMQ with Redis
- **Workers**: Separate containers for heavy tasks
- **Retry Logic**: Exponential backoff
- **Dead Letter Queue**: For failed jobs

## Development Workflow

### Local Development
```bash
# Install dependencies
pnpm install

# Start database (Docker)
docker-compose up -d

# Push schema
pnpm db:push

# Start all services
pnpm dev
```

### Code Organization
```
ownly/
├── apps/
│   ├── web/              # Main Next.js app
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities
│   └── api/              # tRPC API server
├── packages/
│   ├── database/         # Prisma schema
│   ├── ui/               # Shared components
│   ├── lib/              # Shared utilities
│   └── types/            # Shared types
└── docs/                 # Documentation
```

### Testing Strategy
- **Unit Tests**: Vitest
- **Integration Tests**: Playwright
- **E2E Tests**: Playwright
- **API Tests**: Supertest
- **Load Tests**: k6

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Page Load | < 1s | TBD |
| API Response | < 200ms | TBD |
| Database Query | < 50ms | TBD |
| Uptime | 99.9% | TBD |
| Error Rate | < 0.1% | TBD |

## Future Architecture Considerations

### Phase 2 (2026)
- Microservices for heavy modules (document generation, filing automation)
- Event-driven architecture with Kafka
- GraphQL federation for partners
- Multi-region deployment

### Phase 3 (2027+)
- Edge computing for instant responses
- Machine learning for predictive analytics
- Blockchain for immutable audit trails
- International expansion (UK, Canada, EU)
