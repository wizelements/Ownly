# Ownly Starter Kit — Setup Video Script

## Video Overview

| Attribute | Value |
|-----------|-------|
| Target Length | 10 minutes |
| Audience | Developers purchasing the starter kit |
| Goal | Get them from clone to running dashboard |
| Tone | Friendly, efficient, developer-focused |

---

## Script Outline

### 0:00-0:30 — Intro

**On Screen:** Ownly logo, then dashboard preview

**Script:**
> "Hey, welcome! You just grabbed the Ownly Starter Kit — great choice. In the next 10 minutes, I'll walk you through everything you need to go from zero to a fully running SaaS dashboard. No fluff, just the essentials. Let's dive in."

**Key Points:**
- Brief welcome
- Set expectations (10 min, practical walkthrough)
- Tease the end result (working dashboard)

---

### 0:30-2:00 — Prerequisites & Clone

**On Screen:** Terminal, GitHub repo

**Script:**
> "First, let's make sure you have the prerequisites installed..."

**Prerequisites Checklist:**
- [ ] Node.js 18+ (`node --version`)
- [ ] pnpm (`pnpm --version`)
- [ ] Docker Desktop running
- [ ] Code editor (VS Code recommended)

**Commands to Show:**
```bash
# Clone the repo (replace with your purchased repo URL)
git clone https://github.com/YOUR_USERNAME/ownly-starter.git
cd ownly-starter

# Quick look at project structure
ls -la
```

**Project Structure Highlights:**
```
ownly-starter/
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # UI components
│   ├── server/        # tRPC routers
│   └── lib/           # Utilities
├── prisma/            # Database schema
├── docker-compose.yml # Local Postgres
└── .env.example       # Environment template
```

---

### 2:00-3:30 — Environment Setup

**On Screen:** Code editor with .env file

**Script:**
> "Environment setup is where most people get stuck. Let me make this painless for you..."

**Commands:**
```bash
# Copy the example environment file
cp .env.example .env
```

**Key Variables to Explain:**

| Variable | Purpose | Quick Start Value |
|----------|---------|-------------------|
| `DATABASE_URL` | Postgres connection | Use Docker default |
| `DEMO_MODE` | Skip auth for testing | `true` |
| `NEXT_PUBLIC_APP_URL` | Your app URL | `http://localhost:3000` |

**Script:**
> "The magic variable here is `DEMO_MODE=true`. This bypasses authentication so you can explore the dashboard immediately. We'll set up real auth later."

---

### 3:30-5:00 — Database Setup

**On Screen:** Terminal with Docker

**Script:**
> "Time to spin up your database. This is a one-liner thanks to Docker..."

**Commands:**
```bash
# Start Postgres container
docker compose up -d

# Wait a few seconds, then push the schema
pnpm db:push

# Seed with sample data
pnpm db:seed
```

**What to Show:**
- Docker container starting
- Prisma schema being applied
- Seed data confirmation message

**Troubleshooting Note:**
> "If you see a connection error, make sure Docker Desktop is running and wait 10 seconds for Postgres to initialize."

---

### 5:00-7:00 — Running the App

**On Screen:** Browser with app running

**Script:**
> "The moment of truth. Let's start the dev server..."

**Commands:**
```bash
pnpm install  # If not done already
pnpm dev
```

**Tour Stops:**

1. **Landing Page** (`/`)
   - Hero section
   - Features grid
   - Pricing cards
   - Footer

2. **Dashboard** (`/dashboard`)
   - Sidebar navigation
   - Stats cards
   - Data tables
   - Settings page

**Script:**
> "Look at that — a complete SaaS interface, ready to customize. Let me show you what's under the hood..."

---

### 7:00-8:30 — Key Features Demo

**On Screen:** Code editor, split with browser

#### tRPC Routes (1 min)
```typescript
// src/server/routers/example.ts
export const exampleRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.example.findMany();
  }),
});
```
> "Type-safe API routes. Change the backend, TypeScript catches frontend errors instantly."

#### Prisma Schema (30 sec)
```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  projects  Project[]
}
```
> "Your database schema lives here. Modify it, run db:push, done."

#### UI Components (30 sec)
```tsx
// Using shadcn/ui components
<Card>
  <CardHeader>
    <CardTitle>Revenue</CardTitle>
  </CardHeader>
  <CardContent>$12,450</CardContent>
</Card>
```
> "Pre-built components from shadcn/ui. Fully customizable, no lock-in."

---

### 8:30-9:30 — Next Steps

**On Screen:** Documentation pages, deployment dashboards

#### Adding Clerk for Production Auth
```bash
# Install Clerk
pnpm add @clerk/nextjs

# Update .env
DEMO_MODE=false
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```
> "When you're ready for real users, flip DEMO_MODE to false and add your Clerk keys."

#### Customizing Branding
- Update `src/config/site.ts` for app name, logo
- Modify `tailwind.config.ts` for colors
- Replace images in `public/`

#### Deployment Options
| Platform | Difficulty | Cost |
|----------|------------|------|
| Vercel | Easy | Free tier |
| Railway | Easy | ~$5/mo |
| Docker/VPS | Medium | Varies |

---

### 9:30-10:00 — Wrap Up

**On Screen:** Resources list, then outro

**Script:**
> "That's it! You now have a running SaaS starter kit. Here's where to go next..."

**Resources:**
- 📚 Full docs: `/docs` folder or online
- ❓ FAQ: Check `FAQ.md`
- 💬 Support: [your support channel]
- 🐛 Issues: GitHub Issues

**Call to Action:**
> "Start building your SaaS today. Customize the dashboard, add your features, and ship something great. If you found this helpful, leave a star on the repo. See you in the next one!"

**End Card:** Logo + links

---

## B-Roll Suggestions

| Timestamp | B-Roll Content |
|-----------|----------------|
| 0:00-0:30 | Dashboard animation, logo reveal |
| 0:30-2:00 | Terminal typing, folder structure |
| 2:00-3:30 | Code editor, env file highlights |
| 3:30-5:00 | Docker whale icon, database tables |
| 5:00-7:00 | Browser scrolling through app |
| 7:00-8:30 | Code snippets with syntax highlighting |
| 8:30-9:30 | Deployment platform logos |
| 9:30-10:00 | Resource icons, social links |

---

## Notes for Recording

### Technical Setup
- Resolution: 1920x1080 minimum (4K preferred)
- Frame rate: 30fps
- Audio: External mic recommended
- Screen recording: OBS or ScreenFlow

### Preparation Checklist
- [ ] Fresh clone of the repo (no leftover files)
- [ ] Docker Desktop running and updated
- [ ] Terminal with clean history
- [ ] Browser with no bookmarks bar (cleaner look)
- [ ] VS Code with minimal extensions visible

### Delivery Tips
- Speak at a moderate pace — developers will pause/rewind
- Pause briefly after each command before showing output
- Keep terminal font size large (16pt+)
- Use keyboard shortcuts visibly (show keystrokes if possible)

### Common Mistakes to Avoid
- Don't rush the database setup section
- Always show the full command before pressing Enter
- If something fails, show the fix — it's valuable content
- Avoid filler words ("um", "uh", "so basically")

### Post-Production
- Add chapter markers for YouTube
- Include timestamps in video description
- Consider captions for accessibility
