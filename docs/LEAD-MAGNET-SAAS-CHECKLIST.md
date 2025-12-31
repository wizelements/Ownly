# The SaaS Foundation Checklist
## 47 Things Every Developer Forgets (Until It's Too Late)

*The complete checklist for shipping production-ready SaaS — from someone who learned the hard way.*

---

**How to use this checklist**: Go through each item before you consider your SaaS "ready to ship." Check the ones you've completed. The items you haven't done? Those are the ones that will bite you at 2 AM on a Saturday.

---

## 🔐 Authentication & Authorization (8 items)

- [ ] **Session management** — How do you handle expired sessions?
- [ ] **Password reset flow** — Email sent, token validated, secure reset
- [ ] **Social login fallback** — What if GitHub OAuth is down?
- [ ] **MFA/2FA support** — At minimum for admin accounts
- [ ] **Role-based access control** — Not just "logged in" vs "logged out"
- [ ] **API key authentication** — For programmatic access
- [ ] **Rate limiting on auth endpoints** — Prevent brute force attacks
- [ ] **Secure session cookies** — HttpOnly, Secure, SameSite flags

---

## 🗄️ Database & Data (9 items)

- [ ] **Database migrations** — Not just `db:push` in production
- [ ] **Backup strategy** — Automated daily backups with tested restores
- [ ] **Soft delete vs hard delete** — Define your data retention policy
- [ ] **Audit logging** — Who changed what, when?
- [ ] **Data validation** — Server-side, not just client-side
- [ ] **Unique constraints** — On emails, slugs, external IDs
- [ ] **Indexes on query columns** — Check your slow queries
- [ ] **Seed data for testing** — Reproducible development environment
- [ ] **Database connection pooling** — Essential for serverless

---

## 💰 Payments & Billing (7 items)

- [ ] **Webhook handler** — For Stripe/payment events
- [ ] **Idempotency keys** — Prevent duplicate charges
- [ ] **Failed payment handling** — Dunning emails, grace periods
- [ ] **Invoice generation** — PDF or at least email receipts
- [ ] **Subscription state machine** — Active, past_due, canceled, etc.
- [ ] **Proration logic** — What happens on mid-cycle upgrades?
- [ ] **Tax handling** — VAT, sales tax, or at least awareness

---

## 📧 Email & Notifications (6 items)

- [ ] **Transactional email service** — SendGrid, Resend, Postmark
- [ ] **Email templates** — Welcome, reset, invoice, alerts
- [ ] **Unsubscribe mechanism** — Required by law (CAN-SPAM, GDPR)
- [ ] **Email delivery monitoring** — Bounce rates, spam complaints
- [ ] **In-app notifications** — Not everything needs an email
- [ ] **Notification preferences** — Let users control what they receive

---

## 🔒 Security (8 items)

- [ ] **Environment variables** — Never commit secrets to git
- [ ] **CSP headers** — Content Security Policy configured
- [ ] **CORS configuration** — Not just `*` in production
- [ ] **Input sanitization** — SQL injection, XSS prevention
- [ ] **Dependency auditing** — `npm audit` in CI pipeline
- [ ] **Secrets rotation plan** — What's your process for compromised keys?
- [ ] **HTTPS everywhere** — Including redirects from HTTP
- [ ] **Security.txt file** — How do researchers report vulnerabilities?

---

## 📊 Monitoring & Observability (5 items)

- [ ] **Error tracking** — Sentry, Bugsnag, or similar
- [ ] **Uptime monitoring** — External service pinging your endpoints
- [ ] **Logging strategy** — Structured logs, log levels
- [ ] **Performance monitoring** — Response times, database query times
- [ ] **Alerting** — PagerDuty, Slack, email for critical issues

---

## 📱 User Experience (4 items)

- [ ] **Loading states** — Skeleton loaders, not just spinners
- [ ] **Error states** — Helpful messages, not stack traces
- [ ] **Empty states** — Guide users when there's no data
- [ ] **Mobile responsiveness** — Tested on actual devices

---

## 🚀 Deployment & DevOps (6 items)

- [ ] **CI/CD pipeline** — Automated linting, testing, building
- [ ] **Environment parity** — Dev matches prod as closely as possible
- [ ] **Rollback strategy** — How do you undo a bad deploy?
- [ ] **Database migration safety** — Can you deploy without downtime?
- [ ] **Preview deployments** — Test PRs before merging
- [ ] **Health check endpoints** — For load balancers and monitoring

---

## 📋 Legal & Compliance (4 items)

- [ ] **Privacy policy** — Required by law in most jurisdictions
- [ ] **Terms of service** — Your contract with users
- [ ] **Cookie consent** — Required in EU/UK
- [ ] **Data export** — GDPR right to data portability

---

## Score Yourself

**Count your checkmarks:**

| Score | Status |
|-------|--------|
| 0-15 | 🔴 **Critical** — You're not ready. Keep building. |
| 16-30 | 🟡 **Getting there** — Fix the security and payment items first. |
| 31-40 | 🟢 **Almost ready** — Polish the UX items. |
| 41-47 | ✅ **Ship it!** — You've done the work. Time to launch. |

---

## The Shortcut

Don't want to build all this yourself?

**Ownly Starter Kit** includes:
- ✅ 8/8 Authentication items (Clerk integration + demo mode)
- ✅ 9/9 Database items (Prisma + 13 models + migrations)
- ✅ 5/7 Payment items (Stripe patterns included)
- ✅ 6/6 Deployment items (CI/CD + Docker + Vercel)

**→ [Get the Ownly Starter Kit](https://ownly.gumroad.com/l/starter-kit) — Start with 28 items already checked off.**

---

## Why This Matters

Every unchecked item is a 2 AM wake-up call waiting to happen.

The developers who ship fast aren't cutting corners — they're starting with a foundation that already handles the boring stuff.

Your job is to build what makes your product unique. Not to reinvent session management for the 47th time.

---

*Created by the team behind [Ownly Starter Kit](https://ownly.gumroad.com/l/starter-kit)*

**Want more checklists?**
- Join our newsletter for weekly dev tips
- Follow [@ownlykit](https://twitter.com) for updates

---

© 2025 Cod3BlackAgency. Share freely with attribution.
