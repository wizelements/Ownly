# Frequently Asked Questions

Straight answers to common questions about the Ownly Starter Kit.

---

## Before You Buy

### What exactly am I getting?

You're getting the complete source code for a production-ready SaaS foundation:

- **Frontend**: Next.js 14 app with landing page, dashboard, and 14 UI components
- **Backend**: tRPC API server with type-safe endpoints
- **Database**: 13 Prisma models (User, Team, Subscription, Invoice, etc.)
- **Auth**: Clerk integration + demo mode for development
- **CI/CD**: GitHub Actions workflows
- **Docker**: Local development environment
- **Documentation**: Architecture guides, deployment instructions

This is not a hosted service. It's source code you download, customize, and deploy yourself.

### Who is this for?

**Good fit:**
- Solo developers launching a SaaS product
- Agencies building client projects
- Teams that want to skip the setup phase
- Developers learning modern full-stack patterns

**Not a good fit:**
- Non-developers looking for a no-code solution
- Complete beginners who've never used React
- Anyone expecting a finished, hosted product

### How is this different from create-next-app?

`create-next-app` gives you an empty canvas. You still need to:
- Set up authentication
- Design your database schema
- Build dashboard layouts
- Configure CI/CD
- Create reusable components

Ownly gives you all of that, already wired up and working together.

### Can I see a demo before buying?

Yes. The landing page at [your-demo-url] shows the UI, and you can explore the dashboard in demo mode. The full source code is only available after purchase.

---

## Technical Questions

### What's the tech stack?

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| API | tRPC |
| Database | PostgreSQL + Prisma ORM |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | Clerk |
| Payments | Stripe (patterns included) |
| State | React Query + Zustand |
| Monorepo | Turborepo |
| Package Manager | pnpm |

### Do I need Clerk to run this?

No. Set `DEMO_MODE=true` in your environment and everything works without Clerk. This is great for:
- Initial exploration
- UI development
- Testing features
- Demos and presentations

When you're ready for production, create a free Clerk account and add your keys.

### Can I use a different database?

Yes. Prisma supports:
- PostgreSQL (recommended)
- MySQL
- SQLite
- SQL Server
- MongoDB
- CockroachDB

PostgreSQL is recommended because that's what the schema is optimized for. Free hosting options: Neon, Supabase, Railway.

### Can I swap out Clerk for another auth provider?

Yes, but it requires some work. The auth logic is centralized, so you'd need to:
1. Replace the Clerk SDK with your preferred provider
2. Update the middleware and protected routes
3. Adjust the user model if needed

Popular alternatives: NextAuth.js, Auth0, Supabase Auth, Firebase Auth.

### Is Stripe integration included?

Stripe patterns and webhook handlers are included. You'll need to:
1. Create a Stripe account
2. Add your API keys to `.env.local`
3. Set up products/prices in Stripe Dashboard
4. Customize the checkout flow for your product

---

## Setup & Deployment

### How do I run this locally?

```bash
# Clone and install
git clone https://github.com/yourusername/ownly.git
cd ownly
pnpm install

# Set up environment (demo mode works out of the box)
cp .env.example .env.local

# Start database
docker-compose up -d

# Push schema and seed data
pnpm db:push
pnpm db:seed

# Launch
pnpm dev
```

Visit `http://localhost:3000` — you're running.

### What environment variables are required?

**For development (demo mode):**
```env
DATABASE_URL="postgresql://..."
DEMO_MODE="true"
```

**For production:**
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### How do I deploy to production?

**Recommended stack:**
- **Frontend**: Vercel (zero-config Next.js hosting)
- **Database**: Neon, Supabase, or Railway
- **Redis**: Upstash (if needed)

**Quick deploy:**
1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables
4. Deploy

Detailed instructions in `docs/DEPLOYMENT_GUIDE.md`.

---

## Customization

### How do I change the branding?

1. **Colors**: Edit `apps/web/tailwind.config.ts`
2. **Logo**: Replace the icon in the header component
3. **Copy**: Update text in `apps/web/app/page.tsx`
4. **Name**: Find-and-replace "Ownly" with your product name

### How do I add new pages?

Create a new file in `apps/web/app/`:

```
apps/web/app/
├── page.tsx           # Landing page (/)
├── dashboard/
│   └── page.tsx       # Dashboard (/dashboard)
├── settings/
│   └── page.tsx       # Settings (/settings)  ← add this
```

### How do I add new API routes?

1. Create a router in `apps/api/src/routers/`:

```typescript
// apps/api/src/routers/products.ts
import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const productsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany();
  }),
  
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({ data: input });
    }),
});
```

2. Add to the main router in `apps/api/src/routers/index.ts`

3. Use in your frontend:

```typescript
const { data } = trpc.products.list.useQuery();
```

### How do I modify the database schema?

1. Edit `packages/database/prisma/schema.prisma`
2. Run `pnpm db:push` (development) or `pnpm db:migrate` (production)
3. The Prisma client regenerates automatically

---

## Licensing & Support

### What's the license?

Commercial license. You can:
- ✅ Use for personal projects
- ✅ Use for commercial SaaS products
- ✅ Modify and customize the code
- ✅ Create unlimited projects
- ✅ Use in client work (with Team license)

You cannot:
- ❌ Resell the source code as-is
- ❌ Share your license with others
- ❌ Remove the license file

Full terms in [LICENSE](../LICENSE).

### Is there a refund policy?

**72 hours, no questions asked.**

If Ownly doesn't meet your expectations, email within 72 hours for a full refund. After 72 hours, refunds aren't available — it's source code, and once you have it, you have it.

### How do I get support?

- **Starter tier**: Community support (GitHub Discussions)
- **Pro tier**: Priority email support
- **Team tier**: Private Discord + 30-min consultation

### Will there be updates?

Yes. Updates include:
- Bug fixes
- Dependency updates
- New components and features

Pro and Team tiers get early access. Star the GitHub repo for notifications.

---

## Troubleshooting

### "Cannot connect to database"

1. Check that Docker is running: `docker ps`
2. Verify `DATABASE_URL` in `.env.local`
3. Run `docker-compose up -d` to start containers

### "Clerk authentication error"

1. Verify your Clerk keys are correct (check for typos)
2. Make sure keys match your Clerk application
3. Try `DEMO_MODE=true` to bypass auth for development

### "Module not found" errors

1. Run `pnpm install` from the root directory
2. If that fails: `rm -rf node_modules && pnpm install`
3. Make sure you're using pnpm, not npm or yarn

### "Prisma client not generated"

1. Run `pnpm db:push` to regenerate the client
2. Or run `pnpm prisma generate` directly
3. Restart your dev server after regenerating

---

## Still Have Questions?

- Check the `/docs` folder for detailed guides
- Open an issue on GitHub
- Email support (Pro/Team tiers)

---

*The best question is the one you ask after you've tried running the code.*
