# Ownly Starter Kit — Onboarding Email Sequence

7-email sequence to turn buyers into successful users (and advocates).

---

## Sequence Overview

| Day | Email | Goal | Metric |
|-----|-------|------|--------|
| 0 | Welcome + Access | Get them started | Download rate |
| 1 | First Win Challenge | Run pnpm dev | Reply rate |
| 2 | Architecture Tour | Understand the codebase | Video views |
| 3 | Customization Tips | Make it theirs | Click rate |
| 5 | What Are You Building? | Engagement | Reply rate |
| 7 | Success Story Request | Social proof | Testimonial rate |
| 14 | Upsell (if Starter) | Upgrade to Pro | Conversion |

---

## Email 1: Welcome + Access (Day 0)

**Subject**: Your Ownly Starter Kit is ready 🚀

**Send**: Immediately after purchase

---

Hey {first_name},

Welcome to the Ownly community. Your download is ready.

**→ [Download Ownly Starter Kit](DOWNLOAD_LINK)**

**Quick start** (5 minutes):

```bash
cd ownly
pnpm install
cp .env.example .env.local
docker-compose up -d
pnpm db:push
pnpm dev
```

Open localhost:3000. You're running.

**What you just got:**
- 14 production UI components
- 13 database models (Prisma)
- Auth ready (Clerk + demo mode)
- CI/CD pipelines (GitHub Actions)
- Full documentation

**Your license key**: {LICENSE_KEY}
**Your referral link**: {REFERRAL_LINK} (earn 30% on every sale)

Tomorrow, I'll send you the "First Win Challenge" — a 5-minute exercise to make sure you're set up correctly.

Welcome aboard,

— The Ownly Team

P.S. Reply to this email if you have any questions. I read every one.

---

## Email 2: First Win Challenge (Day 1)

**Subject**: Your 5-minute challenge (let's make sure it works)

**Send**: 24 hours after purchase

---

Hey {first_name},

Quick question: Did you run `pnpm dev` yet?

If yes — awesome. You're ahead of most people who buy digital products and never open them.

If not — let's fix that right now. 

**The 5-Minute First Win Challenge:**

1. Open your terminal
2. Run these commands:

```bash
cd ownly
pnpm dev
```

3. Visit localhost:3000
4. Click "Try the Demo" to see the dashboard
5. Reply to this email with "Done ✓"

That's it. Five minutes. 

Why am I asking you to reply? Because developers who complete this challenge within 48 hours are **4x more likely** to ship a project with Ownly.

Don't be part of the "bought it but never used it" crowd.

**→ [Need help? Check the troubleshooting guide](DOCS_LINK)**

See you tomorrow with the architecture tour.

— The Ownly Team

---

## Email 3: Architecture Tour (Day 2)

**Subject**: How everything connects (10-min video)

**Send**: 48 hours after purchase

---

Hey {first_name},

Now that you've got it running, let me show you how everything fits together.

**→ [Watch: Ownly Architecture in 10 Minutes](VIDEO_LINK)**

In this video:
- 0:00 — Project structure overview
- 2:30 — How tRPC connects frontend and backend
- 5:00 — Database schema walkthrough
- 7:30 — Auth flow (demo mode vs Clerk)
- 9:00 — Where to add your features

**Key files to explore:**

| File | What it does |
|------|-------------|
| `apps/web/app/page.tsx` | Landing page |
| `apps/web/app/dashboard/page.tsx` | Dashboard |
| `apps/api/src/routers/` | API endpoints |
| `packages/database/schema.prisma` | Database schema |
| `apps/web/tailwind.config.ts` | Colors & styling |

**Architecture diagram**: [Download PDF](PDF_LINK)

Tomorrow: How to make it yours (branding, colors, copy).

— The Ownly Team

---

## Email 4: Customization Tips (Day 3)

**Subject**: Make it yours in 30 minutes

**Send**: 72 hours after purchase

---

Hey {first_name},

Time to stop it looking like "Ownly" and start making it yours.

**30-Minute Customization Checklist:**

### Branding (10 min)
- [ ] Replace "Ownly" in `apps/web/app/page.tsx`
- [ ] Update the logo/icon in the header
- [ ] Change the tagline

### Colors (10 min)
- [ ] Open `apps/web/tailwind.config.ts`
- [ ] Update the `primary` color to match your brand
- [ ] Check how it looks in dark mode too

### Content (10 min)
- [ ] Update meta tags in `apps/web/app/layout.tsx`
- [ ] Change the hero copy on the landing page
- [ ] Update footer links

**Pro tip**: Use [realtime colors](https://realtimecolors.com) to generate a color palette, then paste the values into Tailwind config.

That's it. 30 minutes and it's your product.

Questions? Reply to this email.

— The Ownly Team

P.S. What are you building with Ownly? Hit reply and tell me — I'd love to know.

---

## Email 5: What Are You Building? (Day 5)

**Subject**: Quick question...

**Send**: 5 days after purchase

---

Hey {first_name},

I have a quick question:

**What are you building with Ownly?**

I'm asking because:

1. I genuinely want to know what developers are creating
2. I might be able to point you to helpful resources
3. Your project might inspire others

Just hit reply and tell me:
- What's the product?
- Who's it for?
- How's the build going?

No pressure. Even "still exploring" is a valid answer.

Looking forward to hearing from you.

— The Ownly Team

P.S. If you're stuck on anything, reply with your question. I'm here to help.

---

## Email 6: Success Story Request (Day 7)

**Subject**: Would you recommend Ownly?

**Send**: 7 days after purchase

---

Hey {first_name},

You've had Ownly for a week now. Quick check-in:

**How's it going?**

If Ownly has saved you time (or you're enjoying working with it), I'd love to feature your experience.

**Here's what I'm looking for:**

A 2-3 sentence testimonial like:

> "Ownly saved me X hours on [task]. Now I'm focused on [what matters]. Would recommend for [type of developer]."

Examples from other developers:

> "Saved me at least 40 hours on the auth and database setup alone. Worth every penny." — Solo founder, B2B tool

> "We use this as our base template for all client projects now. Pays for itself every time." — Agency dev

**If you're happy with Ownly:**
→ Reply with a quick testimonial (and let me know if I can use your name/title)

**If something isn't working:**
→ Reply and tell me what's wrong — I want to fix it

Either way, I'd love to hear from you.

— The Ownly Team

P.S. Everyone who sends a testimonial gets early access to our next product release.

---

## Email 7: Upsell to Pro (Day 14) — Starter Buyers Only

**Subject**: Unlock the Pro features (special offer)

**Send**: 14 days after purchase, only if they bought Starter tier

---

Hey {first_name},

You've been using Ownly Starter for two weeks. How's the build going?

I wanted to let you know about the **Pro upgrade** — and offer you a special deal.

**What Pro adds:**

| Feature | Starter | Pro |
|---------|---------|-----|
| Video architecture walkthrough | ❌ | ✅ |
| Priority email support | ❌ | ✅ |
| Early access to updates | ❌ | ✅ |
| Discord community access | ❌ | ✅ |

**Upgrade for just $30** (normally $79 full price)

→ [Upgrade to Pro — $30](UPGRADE_LINK)

This link is valid for 7 days.

**Why upgrade?**

The video walkthrough alone saves you hours of "figuring it out." And if you ever get stuck, priority email support means you get answers fast.

If you're happy with Starter, no pressure. Keep building.

— The Ownly Team

P.S. Reply if you have questions about what's in Pro.

---

## Implementation Notes

### Email Service Recommendations
- **ConvertKit** — Best for creators, easy automation
- **Buttondown** — Simple, developer-friendly
- **Loops** — Modern, built for SaaS
- **Resend** — If you want full API control

### Automation Triggers
```
Purchase → Email 1 (immediate)
         → Email 2 (+24 hours)
         → Email 3 (+48 hours)
         → Email 4 (+72 hours)
         → Email 5 (+120 hours)
         → Email 6 (+168 hours)
         → Email 7 (+336 hours, if tier = Starter)
```

### Key Metrics to Track
- **Open rate** — Target 50%+ (transactional emails open higher)
- **Reply rate** — Target 5%+ on Emails 2 and 5
- **Download rate** — Track who actually downloads
- **Video views** — Track engagement on Email 3
- **Testimonial rate** — Target 3-5% of buyers

### A/B Testing Ideas
- Subject lines (emoji vs no emoji)
- Send time (morning vs evening)
- Call-to-action placement
- Length (shorter vs more detailed)

---

## Subject Line Alternatives

| Email | Option A | Option B | Option C |
|-------|----------|----------|----------|
| 1 | Your Ownly Starter Kit is ready 🚀 | Download your Ownly Kit | Welcome to Ownly |
| 2 | Your 5-minute challenge | Did you run pnpm dev yet? | Quick check-in |
| 3 | How everything connects | 10-min architecture video | The tour |
| 4 | Make it yours in 30 minutes | Time to rebrand | Customization tips |
| 5 | Quick question... | What are you building? | I'm curious |
| 6 | Would you recommend Ownly? | Can I feature your story? | 7 days in |
| 7 | Unlock the Pro features | Special upgrade offer | $30 to upgrade |

---

*Remember: The goal is to help customers succeed, not just sell more. Happy customers become advocates.*
