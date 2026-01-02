# Ownly Starter Kit

![CI](https://github.com/wizelements/Ownly/actions/workflows/ci.yml/badge.svg)
![CodeQL](https://github.com/wizelements/Ownly/actions/workflows/codeql.yml/badge.svg)

> **Ship your SaaS in days, not months.**

---

## The Problem We Solve

You've got the idea. The vision. Maybe even the first paying customer in your head.

But then reality hits:

- Setting up auth takes a week
- Database schemas become a rabbit hole
- "Just one more config file" turns into three
- That beautiful dashboard you imagined? Still a Figma mockup

**You're a builder, not a boilerplate wrangler.**

That's where Ownly comes in.

---

## What If You Could Start Building Features on Day One?

Ownly is a production-ready SaaS foundation that handles the boring stuff so you can focus on what matters: **your product**.

```bash
git clone && pnpm install && pnpm dev
```

That's it. You're building.

---

## The Stack (Battle-Tested)

| Layer | Technology | Why It's Here |
|-------|------------|---------------|
| **Framework** | Next.js 14 (App Router) | The industry standard |
| **API** | tRPC | End-to-end TypeScript, zero codegen |
| **Database** | Prisma + PostgreSQL | Type-safe queries, easy migrations |
| **Auth** | Clerk | Social login, MFA, passkeys—out of the box |
| **Styling** | Tailwind + shadcn/ui | Beautiful, accessible, customizable |
| **Payments** | Stripe-ready | Webhook handlers included |
| **Monorepo** | Turborepo | Fast builds, shared packages |

---

## What's Inside the Box

### 🎨 24 Production UI Components
Not just buttons and inputs. Real components:
- Data tables with sorting and filtering
- Multi-step forms with validation
- Dashboard layouts with responsive sidebars
- Modal dialogs, dropdowns, command palettes
- Accordions, tooltips, sheets, and more

### 🗄️ 15 Database Models
The schema you'd build anyway—already done:
- Users with profiles and preferences
- Teams and memberships
- Subscriptions and billing
- Invoices and payments
- Audit logs

### 🔐 Authentication That Just Works
Demo mode for development. Clerk for production. Switch with one env variable.

### 📦 Monorepo Structure
```
ownly/
├── apps/
│   ├── web/          # Your Next.js app
│   └── api/          # tRPC server
├── packages/
│   ├── database/     # Prisma schema & client
│   └── lib/          # Shared utilities
└── docs/             # You're reading them
```

---

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- PostgreSQL (or Docker)

### Get Running in 5 Minutes

```bash
# Clone it
git clone https://github.com/yourusername/ownly.git
cd ownly

# Install dependencies
pnpm install

# Set up environment (demo mode works out of the box)
cp .env.example .env.local

# Start the database
docker-compose up -d

# Push schema & seed data
pnpm db:push
pnpm db:seed

# Launch
pnpm dev
```

Open [localhost:3000](http://localhost:3000). You're in business.

---

## Who Is This For?

### ✅ Perfect If You're...
- A solo developer launching your first SaaS
- An agency that needs a reusable client template
- A team that wants to skip the setup phase
- Someone learning modern full-stack patterns

### ❌ Not For You If...
- You need a no-code solution (this is for developers)
- You want a finished, hosted product (this is source code)
- You've never touched React (you'll struggle)

---

## What Developers Are Building

> "Saved me at least 40 hours on the auth and database setup alone."
> — *Solo founder shipping a B2B tool*

> "We use this as our base template for all client projects now."
> — *Agency with 3 devs*

> "Finally, a starter that doesn't feel like it was abandoned in 2021."
> — *Developer on Indie Hackers*

---

## Development Workflow

```bash
# Run everything
pnpm dev

# Run specific apps
pnpm dev:web
pnpm dev:api

# Database operations
pnpm db:push      # Push schema changes
pnpm db:studio    # Visual database browser
pnpm db:seed      # Add sample data

# Quality checks
pnpm lint         # ESLint
pnpm type-check   # TypeScript
pnpm build        # Production build
```

---

## Frequently Asked Questions

**Do I need Clerk to run this?**  
No. Set `DEMO_MODE=true` and you're good. Add Clerk when you're ready for production.

**Can I use a different database?**  
Yes. Prisma supports MySQL, SQLite, SQL Server, and more. PostgreSQL is recommended.

**What about payments?**  
Stripe integration patterns are included. Add your keys and you're processing payments.

**Is there a refund policy?**  
72 hours, no questions asked. See [LICENSE](./LICENSE) for details.

---

## What's Next?

1. **Explore the codebase** — Start with `apps/web/app/page.tsx`
2. **Read the docs** — Check out `/docs` for architecture and guides
3. **Make it yours** — Update colors, copy, and branding
4. **Ship it** — Deploy to Vercel in one click

---

## License

Commercial license — see [LICENSE](./LICENSE) for full terms.

**You can:**
- ✅ Use for personal projects
- ✅ Use for commercial products
- ✅ Modify and customize everything
- ✅ Create unlimited projects

---

## Support

- **Docs**: See the `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/wizelements/Ownly/issues)
- **Updates**: Star the repo to stay current

---

<p align="center">
  <strong>Stop setting up. Start shipping.</strong>
  <br><br>
  <a href="https://silverstream265.gumroad.com/l/ymzzb"><strong>→ Get Ownly Starter Kit — $49</strong></a>
  <br><br>
  Built by <a href="https://github.com/wizelements">Cod3BlackAgency</a>
</p>

# Force rebuild Fri Jan  2 10:16:42 EST 2026
