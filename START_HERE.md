# Start Here

Welcome to the Ownly Starter Kit.

You just saved yourself 40+ hours of setup work. Let's make it count.

---

## The 5-Minute Setup

### 1. Install dependencies
```bash
pnpm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
```

### 3. Start the database
```bash
docker-compose up -d
```

### 4. Push the schema
```bash
pnpm db:push
```

### 5. Run it
```bash
pnpm dev
```

Open [localhost:3000](http://localhost:3000). You're live.

---

## What's Already Done (So You Don't Have To)

| Task | Status | Time Saved |
|------|--------|------------|
| Auth system | Done | ~8 hours |
| Database schema (13 models) | Done | ~6 hours |
| Dashboard layout | Done | ~4 hours |
| UI components (14) | Done | ~8 hours |
| API layer (tRPC) | Done | ~4 hours |
| CI/CD pipeline | Done | ~3 hours |
| Docker setup | Done | ~2 hours |
| Environment config | Done | ~2 hours |
| **Total** | **Done** | **~40 hours** |

---

## Project Structure (The Important Parts)

```
ownly/
├── apps/
│   ├── web/              ← Your Next.js app
│   │   ├── app/          ← Pages and layouts
│   │   └── components/   ← UI components
│   └── api/              ← tRPC API server
├── packages/
│   ├── database/         ← Prisma schema
│   └── lib/              ← Shared utilities
└── docs/                 ← Guides and references
```

**Start exploring:**
- Landing page: `apps/web/app/page.tsx`
- Dashboard: `apps/web/app/dashboard/`
- Database models: `packages/database/prisma/schema.prisma`
- API routes: `apps/api/src/routers/`

---

## Your First Week

### Day 1: Explore
- Run the dev server
- Click through the landing page and dashboard
- Read the code — see how things connect
- Check out the Prisma schema

### Day 2: Make It Yours
- Update the branding (name, colors, logo)
- Edit the landing page copy
- Customize the dashboard layout

### Day 3-5: Build Your First Feature
- Pick the core feature that makes your product unique
- Add a new page, API route, and database model
- Wire them together

### Day 6-7: Polish and Deploy
- Clean up the UI
- Test the happy path
- Deploy to Vercel
- Share with your first user

---

## Common Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:web          # Start web app only
pnpm dev:api          # Start API only

# Database
pnpm db:push          # Push schema changes
pnpm db:studio        # Open visual database browser
pnpm db:seed          # Add sample data

# Quality
pnpm lint             # Run ESLint
pnpm typecheck        # Check TypeScript
pnpm build            # Production build
```

---

## Environment Variables

### For development (demo mode)
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ownly"
DEMO_MODE="true"
```

Demo mode bypasses Clerk auth — perfect for getting started fast.

### For production
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
```

Get Clerk keys at [clerk.com](https://clerk.com) (free tier available).

---

## When You Get Stuck

**Database won't connect?**
```bash
docker-compose up -d    # Make sure Postgres is running
```

**Type errors after schema change?**
```bash
pnpm db:push            # Regenerates the Prisma client
```

**Something really broken?**
```bash
rm -rf node_modules
pnpm install
pnpm dev
```

**Still stuck?** Check the [FAQ](./docs/FAQ.md) or open a GitHub issue.

---

## Key Files to Know

| File | What It Does |
|------|--------------|
| `apps/web/app/page.tsx` | Landing page |
| `apps/web/app/layout.tsx` | Root layout (header, providers) |
| `apps/web/app/dashboard/page.tsx` | Main dashboard |
| `packages/database/prisma/schema.prisma` | Database models |
| `apps/api/src/routers/` | API endpoints |
| `.env.local` | Your environment variables |
| `docker-compose.yml` | Local development database |

---

## Next Steps

1. **Read the [README](./README.md)** — Full overview of what's included
2. **Check [USE_CASES](./docs/USE_CASES.md)** — See what others are building
3. **Browse [FAQ](./docs/FAQ.md)** — Common questions answered
4. **Explore [ARCHITECTURE](./docs/ARCHITECTURE.md)** — Deep dive into the stack

---

## The Philosophy

This starter kit is opinionated. That's the point.

Instead of giving you infinite choices (and infinite setup time), we made the decisions for you:
- Next.js 14 with App Router
- tRPC for type-safe APIs
- Prisma for database access
- Clerk for auth
- Tailwind + shadcn/ui for styling

These are the tools the best teams use. Now they're your starting point.

**Your job isn't to configure. Your job is to build.**

---

## One More Thing

Every hour you spend on boilerplate is an hour you're not spending on:
- The feature that makes your product unique
- Talking to users
- Getting feedback
- Shipping

This starter kit exists so you can skip the boring parts and get to the good stuff.

Now go build something.

```bash
pnpm dev
```

---

*Built by [Cod3BlackAgency](https://github.com/wizelements)*
