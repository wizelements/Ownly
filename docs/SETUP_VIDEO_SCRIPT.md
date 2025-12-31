# Ownly Setup Video Script

**Total Runtime: ~10 minutes**

---

## 1. Introduction (0:00 - 0:30)

### On Screen
- Ownly logo/landing page
- GitHub repository

### Script

> "Hey everyone! In this video, I'll walk you through setting up Ownly — a production-ready SaaS starter kit built with Next.js 14, tRPC, Prisma, and Tailwind CSS.
>
> Ownly gives you everything you need to launch a SaaS product: authentication, database models, type-safe APIs, a beautiful UI, and CI/CD pipelines — all in a Turborepo monorepo.
>
> Let's get started!"

---

## 2. Prerequisites (0:30 - 1:30)

### On Screen
- Terminal showing version checks
- Links to download pages

### Script

> "Before we begin, make sure you have these installed:"

### Commands to Show

```bash
# Check Node.js version (need 20+)
node --version

# Check pnpm version (need 8+)
pnpm --version

# Check Docker
docker --version

# Check PostgreSQL (or use Docker)
psql --version
```

### Key Points
- **Node.js 20+**: Required for Next.js 14 features
- **pnpm 8+**: Our package manager of choice (faster, disk-efficient)
- **Docker**: For running PostgreSQL and Redis locally
- **PostgreSQL 15+**: Can run via Docker or install locally

> "If you don't have PostgreSQL installed, don't worry — we'll use Docker to spin it up in a minute."

---

## 3. Clone & Install (1:30 - 3:30)

### On Screen
- Terminal with commands
- VS Code opening project

### Script

> "Let's clone the repository and install dependencies."

### Commands

```bash
# Clone the repository
git clone https://github.com/yourusername/ownly.git

# Navigate into the project
cd ownly

# Install all dependencies with pnpm
pnpm install
```

### Key Points to Mention
- Turborepo structure: `apps/` and `packages/`
- Monorepo benefits: shared code, single install
- Takes 1-2 minutes depending on network

> "Notice how pnpm installs dependencies for all workspaces at once. This is one of the benefits of a monorepo setup."

### Show Project Structure

```
ownly/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # tRPC API server
├── packages/
│   ├── database/     # Prisma schema & client
│   └── lib/          # Shared utilities
├── docs/             # Documentation
└── scripts/          # Build scripts
```

---

## 4. Environment Setup (3:30 - 5:30)

### On Screen
- .env.example file
- Editing .env.local

### Script

> "Now let's set up our environment variables."

### Commands

```bash
# Copy the example environment file
cp .env.example .env.local

# Open in your editor
code .env.local
```

### Key Variables to Explain

```env
# Database (required)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ownly"

# Demo Mode - set to "true" to bypass auth
DEMO_MODE="true"

# Clerk Auth (optional in demo mode)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Stripe (optional for initial setup)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
```

### Key Points
- **DATABASE_URL**: Points to your PostgreSQL instance
- **DEMO_MODE**: Set to `true` to skip authentication setup initially
- **Clerk keys**: Get from clerk.com dashboard (free tier available)
- **Stripe keys**: Get from stripe.com dashboard (test mode)

> "Pro tip: Start with DEMO_MODE=true to explore the app without setting up Clerk. You can add authentication later."

---

## 5. Database Setup (5:30 - 7:30)

### On Screen
- Docker Compose running
- Prisma commands
- Prisma Studio

### Script

> "Let's spin up our database with Docker and set up the schema."

### Commands

```bash
# Start PostgreSQL and Redis with Docker
docker-compose up -d

# Verify containers are running
docker ps

# Push the Prisma schema to the database
pnpm db:push

# Seed the database with sample data
pnpm db:seed

# (Optional) Open Prisma Studio to view data
pnpm db:studio
```

### Key Points to Mention
- Docker Compose starts PostgreSQL on port 5432, Redis on 6379
- `db:push` creates all 13 database models
- `db:seed` populates sample users, businesses, invoices
- Prisma Studio provides a visual database browser

### Show Schema Highlights

> "Ownly comes with 13 pre-built models including User, Business, Invoice, Client, and more. All relationships are already configured."

---

## 6. Running the App (7:30 - 9:30)

### On Screen
- Terminal with dev server
- Browser showing landing page
- Browser showing dashboard

### Script

> "Everything is ready! Let's start the development server."

### Commands

```bash
# Start all apps in development mode
pnpm dev
```

### Key Points
- Turborepo runs both `web` and `api` apps concurrently
- Web app runs on `http://localhost:3000`
- API runs on `http://localhost:3001`
- Hot reload enabled for fast development

### Demo Walkthrough

1. **Landing Page** (`localhost:3000`)
   - Hero section with CTA
   - Features grid
   - Pricing section
   - Footer with links

2. **Dashboard** (`localhost:3000/dashboard`)
   - Sidebar navigation
   - Stats cards
   - Recent activity
   - Quick actions

> "As you can see, you get a complete landing page and dashboard out of the box. All components are built with shadcn/ui and fully customizable."

---

## 7. Closing (9:30 - 10:00)

### On Screen
- Documentation links
- GitHub repository
- Social links

### Script

> "That's it! You now have a fully functional SaaS starter kit running locally.
>
> Here's what to explore next:"

### Next Steps
- **Customize the UI**: Edit components in `apps/web/src/components`
- **Add tRPC routes**: Check `apps/api/src/routers`
- **Modify the schema**: Update `packages/database/prisma/schema.prisma`
- **Read the docs**: Check the `/docs` folder for architecture and guides

### Links to Show
- GitHub: `github.com/yourusername/ownly`
- Documentation: `/docs` folder
- Deployment Guide: `DEPLOYMENT_GUIDE.md`

> "If you found this helpful, give the repo a star on GitHub. Drop any questions in the comments below. Happy building!"

---

## B-Roll Suggestions

- Terminal commands running
- Code editor with syntax highlighting
- Browser with smooth scrolling through pages
- Split screen: code on left, result on right
- Prisma Studio with data

## Thumbnail Ideas

- "SaaS Starter Kit Setup"
- Next.js + tRPC + Prisma logos
- 10-minute badge
- Terminal/code background

---

*Script version 1.0 — Last updated: December 2024*
