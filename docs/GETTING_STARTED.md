# Getting Started with Ownly

Welcome to the Ownly development environment! This guide will help you set up your local development environment and start building.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **pnpm** 8.x or higher ([Install](https://pnpm.io/installation))
- **PostgreSQL** 15.x or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/))
- **Docker** (optional, for containerized database) ([Download](https://www.docker.com/))

## Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ownly.git
cd ownly
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all dependencies for all packages in the monorepo.

### 3. Set Up Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the file with your credentials
nano .env.local
```

**Minimum required variables for local development:**

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ownly"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
CLERK_SECRET_KEY="your_clerk_secret"
```

### 4. Start Database (Option A: Docker)

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify it's running
docker ps
```

### 4. Start Database (Option B: Local PostgreSQL)

```bash
# Create database
createdb ownly

# Verify connection
psql -d ownly
```

### 5. Initialize Database

```bash
# Push Prisma schema to database
pnpm db:push

# (Optional) Seed with sample data
pnpm db:seed
```

### 6. Start Development Servers

```bash
# Start all services
pnpm dev
```

This will start:
- **Web App**: http://localhost:3000
- **API Server**: http://localhost:3001
- **Admin Dashboard**: http://localhost:3002

## Project Structure

```
ownly/
├── apps/
│   ├── web/              # Main customer-facing Next.js app
│   ├── api/              # tRPC API server
│   └── admin/            # Internal admin dashboard
├── packages/
│   ├── database/         # Prisma schema & database utilities
│   ├── ui/               # Shared UI components (shadcn/ui)
│   ├── lib/              # Shared utility functions
│   ├── config/           # Shared configuration
│   └── types/            # Shared TypeScript types
├── docs/                 # Documentation
└── scripts/              # Build & deployment scripts
```

## Development Workflow

### Running Specific Apps

```bash
# Run only the web app
pnpm dev:web

# Run only the API
pnpm dev:api

# Run only the admin dashboard
pnpm dev:admin
```

### Database Operations

```bash
# Open Prisma Studio (visual database editor)
pnpm db:studio

# Create a new migration
pnpm db:migrate

# Push schema changes without migration
pnpm db:push

# Seed database with sample data
pnpm db:seed

# Reset database (⚠️ destructive)
pnpm db:reset
```

### Code Quality

```bash
# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix

# Check formatting
pnpm format:check

# Format code
pnpm format

# Run type checking
pnpm type-check

# Run all quality checks
pnpm check
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e
```

## Setting Up External Services

### Clerk (Authentication)

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the publishable and secret keys
4. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   ```

### Stripe (Payments)

1. Go to [stripe.com](https://stripe.com) and create an account
2. Get your test API keys from the Dashboard
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   ```
4. Set up webhook endpoint:
   ```bash
   # Install Stripe CLI
   brew install stripe/stripe-cli/stripe
   
   # Login
   stripe login
   
   # Forward webhooks to local
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

### OpenAI (AI Coach)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Add to `.env.local`:
   ```env
   OPENAI_API_KEY="sk-..."
   ```

### DocuSign (E-signatures)

1. Create a developer account at [developers.docusign.com](https://developers.docusign.com)
2. Create an integration key
3. Add to `.env.local`:
   ```env
   DOCUSIGN_INTEGRATION_KEY="..."
   DOCUSIGN_USER_ID="..."
   DOCUSIGN_ACCOUNT_ID="..."
   ```

## Common Tasks

### Adding a New Page

```bash
# Create a new page in apps/web/app
touch apps/web/app/my-page/page.tsx
```

```tsx
export default function MyPage() {
  return <div>My Page</div>
}
```

### Adding a New API Endpoint

```bash
# Create a new router in apps/api/routers
touch apps/api/routers/myRouter.ts
```

```typescript
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'

export const myRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { message: `Hello ${input.name}!` }
    }),
})
```

### Adding a New UI Component

```bash
# Add a new component
touch apps/web/components/MyComponent.tsx
```

```tsx
export function MyComponent() {
  return <div>My Component</div>
}
```

### Adding a New Database Model

1. Edit `packages/database/schema.prisma`
2. Add your model:
   ```prisma
   model MyModel {
     id        String   @id @default(cuid())
     name      String
     createdAt DateTime @default(now())
   }
   ```
3. Push changes:
   ```bash
   pnpm db:push
   ```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -ti:3000

# Kill the process
kill -9 $(lsof -ti:3000)
```

### Database Connection Issues

```bash
# Check if PostgreSQL is running
pg_isready

# Check connection
psql -d ownly -c "SELECT 1"

# Restart PostgreSQL
brew services restart postgresql@15
```

### Node Modules Issues

```bash
# Clean install
pnpm clean
rm -rf node_modules
pnpm install
```

### Build Issues

```bash
# Clear Next.js cache
rm -rf apps/web/.next

# Clear Turbo cache
rm -rf .turbo

# Rebuild
pnpm build
```

## Environment Variables Reference

### Required for Development

```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### Optional but Recommended

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="..."
```

### Production Only

```env
# Sentry
NEXT_PUBLIC_SENTRY_DSN="..."
SENTRY_AUTH_TOKEN="..."

# AWS
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="..."

# Redis
REDIS_URL="redis://..."
```

## Next Steps

- Read the [Architecture Documentation](./ARCHITECTURE.md)
- Check out the [API Reference](./API_REFERENCE.md)
- Learn about [Contributing](../CONTRIBUTING.md)
- Join our [Discord Community](https://discord.gg/ownly)

## Getting Help

- **Documentation**: Check `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/yourusername/ownly/issues)
- **Discord**: [Join our community](https://discord.gg/ownly)
- **Email**: dev@ownly.com

---

**Happy coding! Let's build something amazing together.**
