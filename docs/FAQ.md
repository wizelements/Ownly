# Frequently Asked Questions

Straight answers to common questions about the Ownly Starter Kit.

---

## Getting Started

### Do I need Clerk to run this?

**No.** Set `DEMO_MODE=true` in your `.env.local` and everything works without Clerk. This is perfect for:

- Initial exploration and testing
- UI development and prototyping
- Demos and client presentations
- Learning the codebase

When you're ready for production, create a free Clerk account and add your keys.

### What are the system requirements?

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | 18.x | 20.x LTS |
| pnpm | 8.x | Latest |
| RAM | 4GB | 8GB+ |
| Disk | 500MB | 2GB+ |
| PostgreSQL | 14+ | 15+ |

**Also needed:**
- Docker (for local database)
- Git

**Operating systems:** macOS, Linux, Windows (WSL2 recommended)

### How long does setup take?

**5 minutes if you follow the quick start.**

```bash
git clone https://github.com/yourusername/ownly.git
cd ownly
pnpm install          # ~2 minutes
cp .env.example .env.local
docker-compose up -d  # ~30 seconds
pnpm db:push && pnpm db:seed  # ~30 seconds
pnpm dev              # Running
```

First-time `pnpm install` takes longest due to dependency downloads. Subsequent installs are cached.

---

## Technical

### Can I use a different database?

**Yes.** Prisma supports multiple databases:

| Database | Status | Notes |
|----------|--------|-------|
| PostgreSQL | ✅ Recommended | Schema optimized for this |
| MySQL | ✅ Supported | Minor schema adjustments needed |
| SQLite | ✅ Supported | Good for prototyping |
| SQL Server | ✅ Supported | Enterprise environments |
| MongoDB | ⚠️ Possible | Requires schema rewrite |
| CockroachDB | ✅ Supported | Distributed PostgreSQL |

**To switch:** Update the `provider` in `packages/database/prisma/schema.prisma` and your `DATABASE_URL`.

**Free PostgreSQL hosting:** Neon, Supabase, Railway, Render.

### How do I add new pages?

Create a new folder with `page.tsx` in `apps/web/app/`:

```
apps/web/app/
├── page.tsx              # / (landing)
├── dashboard/
│   └── page.tsx          # /dashboard
├── pricing/              # ← Create this folder
│   └── page.tsx          # /pricing
└── blog/
    ├── page.tsx          # /blog
    └── [slug]/
        └── page.tsx      # /blog/:slug
```

**Protected pages:** Wrap with the auth check from `lib/auth`:

```tsx
import { requireAuth } from '@/lib/auth';

export default async function SettingsPage() {
  await requireAuth();
  return <div>Settings content</div>;
}
```

### How do I add new API endpoints?

**1. Create a router** in `apps/api/src/routers/`:

```typescript
// apps/api/src/routers/products.ts
import { router, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';

export const productsRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany();
  }),
  
  create: protectedProcedure
    .input(z.object({ 
      name: z.string().min(1),
      price: z.number().positive() 
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({ data: input });
    }),
});
```

**2. Register it** in `apps/api/src/routers/index.ts`:

```typescript
import { productsRouter } from './products';

export const appRouter = router({
  // ...existing routers
  products: productsRouter,
});
```

**3. Use in your frontend:**

```typescript
// Query
const { data, isLoading } = trpc.products.list.useQuery();

// Mutation
const createProduct = trpc.products.create.useMutation();
await createProduct.mutateAsync({ name: 'Widget', price: 29.99 });
```

### What testing framework is used?

| Type | Framework | Location |
|------|-----------|----------|
| Unit | Vitest | `*.test.ts` files |
| Integration | Vitest | `*.test.ts` files |
| E2E | Playwright | `e2e/` directory |

**Running tests:**

```bash
pnpm test           # Run all unit/integration tests
pnpm test:watch     # Watch mode
pnpm test:e2e       # Run Playwright E2E tests
pnpm test:coverage  # Generate coverage report
```

**Example test:**

```typescript
import { describe, it, expect } from 'vitest';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(29.99)).toBe('$29.99');
  });
});
```

---

## Payments

### Is Stripe integration included?

**Yes, patterns and infrastructure are included.** You get:

- ✅ Webhook handler setup
- ✅ Checkout session creation
- ✅ Subscription management logic
- ✅ Invoice tracking models
- ✅ Customer portal integration pattern

**To activate:**

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Add your keys to `.env.local`:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

3. Create products/prices in Stripe Dashboard
4. Update the price IDs in your checkout code

### Can I use a different payment provider?

**Yes.** The payment logic is modular. To swap providers:

1. Replace the Stripe SDK with your provider (Paddle, LemonSqueezy, PayPal, etc.)
2. Update the webhook handler in `apps/api/src/webhooks/`
3. Adjust the checkout flow in `apps/web/`

The database models (Subscription, Invoice, Payment) are provider-agnostic.

---

## Deployment

### How do I deploy to Vercel?

**One-click deploy:**

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables:

```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

5. Click Deploy

**That's it.** Vercel auto-detects Next.js and configures everything.

See `docs/DEPLOYMENT_GUIDE.md` for detailed instructions.

### Can I deploy elsewhere?

**Yes.** Ownly works anywhere Node.js runs:

| Platform | Complexity | Notes |
|----------|-----------|-------|
| Vercel | ⭐ Easiest | Zero-config Next.js hosting |
| Netlify | ⭐ Easy | Good alternative to Vercel |
| Railway | ⭐ Easy | App + database in one place |
| Render | ⭐ Easy | Free tier available |
| Fly.io | ⭐⭐ Medium | Edge deployment |
| AWS (Amplify) | ⭐⭐ Medium | Enterprise scale |
| DigitalOcean | ⭐⭐ Medium | App Platform or Droplets |
| Self-hosted | ⭐⭐⭐ Advanced | Docker + reverse proxy |

**Docker deployment:**

```bash
docker build -t ownly .
docker run -p 3000:3000 ownly
```

---

## License & Usage

### Can I use this for client projects?

**Yes.** You can build unlimited applications for clients. Each project you build is yours (or your client's) to own and operate.

What you're licensed to do:
- ✅ Build SaaS products for clients
- ✅ Charge clients for the apps you build
- ✅ Modify all source code
- ✅ Deploy anywhere
- ✅ Create unlimited projects

### Can I resell the template?

**No.** You cannot:

- ❌ Resell Ownly as a template/starter kit
- ❌ Redistribute the source code
- ❌ Create competing boilerplate products
- ❌ Share your license with others
- ❌ Publish under an open-source license

**The distinction:** You can sell *products built with* Ownly. You cannot sell *Ownly itself*.

### What's included in updates?

Updates are pushed to the GitHub repository and include:

| Update Type | Frequency | Example |
|-------------|-----------|---------|
| Security patches | As needed | Dependency vulnerabilities |
| Bug fixes | Weekly | Edge case fixes |
| Dependency updates | Monthly | Next.js, Prisma versions |
| New features | Quarterly | New components, patterns |

**To get updates:**

```bash
git remote add upstream https://github.com/wizelements/Ownly.git
git fetch upstream
git merge upstream/main
```

Pro and Team tiers get early access to new features.

---

## Support

### Where do I get help?

| Tier | Support Channel | Response Time |
|------|-----------------|---------------|
| Starter | GitHub Issues | Community-based |
| Pro | Priority email | 24-48 hours |
| Team | Private Discord + call | Same day |

**Self-service resources:**
- `/docs` folder in the codebase
- GitHub Discussions
- README and inline code comments

### How do I report bugs?

1. Check existing [GitHub Issues](https://github.com/wizelements/Ownly/issues)
2. If new, create an issue with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment (OS, Node version, etc.)
   - Error messages/screenshots

**Template:**

```markdown
**Bug:** [Brief description]
**Steps:** 1. ... 2. ... 3. ...
**Expected:** ...
**Actual:** ...
**Environment:** Node 20.x, macOS 14, pnpm 8.x
```

### Is there a community?

**Yes:**

- **GitHub Discussions** — Q&A and feature requests
- **Discord** (Team tier) — Private channel with direct access
- **Twitter/X** — Follow [@wizelements](https://twitter.com/wizelements) for updates

---

## Refund Policy

### What's the refund policy?

**72 hours, no questions asked.**

If Ownly doesn't meet your expectations, email within 72 hours of purchase for a full refund.

**The fine print:**
- Refunds processed within 5 business days
- After 72 hours, refunds aren't available (it's source code — once downloaded, you have it)
- Chargebacks without contacting us first may result in license termination

**We're confident you'll find value**, but we understand if it's not the right fit.

---

## Quick Reference

| Question | Short Answer |
|----------|--------------|
| Need Clerk? | No, use `DEMO_MODE=true` |
| Different database? | Yes, Prisma supports MySQL, SQLite, etc. |
| Stripe required? | No, patterns included — add your keys |
| Deploy to Vercel? | Yes, one-click deploy |
| Client projects? | Yes, unlimited |
| Resell template? | No |
| Refund window? | 72 hours |
| Support? | GitHub Issues, email (Pro), Discord (Team) |

---

## Still Have Questions?

- **Docs:** Check the `/docs` folder
- **Issues:** [GitHub Issues](https://github.com/wizelements/Ownly/issues)
- **Email:** support@ownly.dev

---

*The best question is the one you ask after you've tried running the code.*
