# 🚀 Ownly Deployment Guide

Complete guide to deploy Ownly to GitHub and Vercel.

---

## 📋 Prerequisites

Before deploying, ensure you have:

- [ ] GitHub account
- [ ] Vercel account (sign up at vercel.com)
- [ ] Git installed locally
- [ ] Environment variables ready (Clerk, Stripe, etc.)

---

## 🔧 Step 1: Prepare for Deployment

### Update Configuration Files

The project is already configured for deployment, but let's verify:

1. **Vercel Configuration** - Already exists at root
2. **Environment Variables** - Copy from `.env.example`
3. **Build Scripts** - Already configured in `package.json`

### Create .gitignore Updates

Ensure sensitive files are not committed:

```bash
# Check .gitignore
cat .gitignore
```

---

## 📦 Step 2: Initialize Git Repository

### Option A: Create New Repository

```bash
# Initialize git (if not already done)
cd /workspaces/ownly
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial Ownly project setup

- Complete database schema with 13 models
- tRPC API server with 3 routers
- Next.js 15 web app with landing + dashboard
- Comprehensive documentation
- CI/CD pipelines
- Docker development environment

Generated with Continue (https://continue.dev)

Co-Authored-By: Continue <noreply@continue.dev>"

# Create main branch
git branch -M main
```

### Option B: Connect to Existing Repository

If you already have a GitHub repo:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ownly.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 3: Create GitHub Repository

### Via GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not installed
# On Ubuntu/Debian:
# curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
# echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
# sudo apt update && sudo apt install gh

# Authenticate
gh auth login

# Create repository
gh repo create ownly --public --source=. --remote=origin --push

# Or for private repository
gh repo create ownly --private --source=. --remote=origin --push
```

### Via GitHub Web Interface

1. Go to https://github.com/new
2. Repository name: `ownly`
3. Description: "Your entire business in one place — from LLC to $1M"
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

Then push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ownly.git
git push -u origin main
```

---

## ☁️ Step 4: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
cd /workspaces/ownly
vercel

# Follow the prompts:
# ? Set up and deploy "~/ownly"? [Y/n] Y
# ? Which scope? [Your account]
# ? Link to existing project? [y/N] N
# ? What's your project's name? ownly
# ? In which directory is your code located? ./
# Auto-detected Project Settings (Next.js)
# ? Want to modify these settings? [y/N] N
```

### Method 2: Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select "Import Git Repository"
4. Choose your GitHub account
5. Find and select the `ownly` repository
6. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm build --filter=web`
   - **Output Directory**: `apps/web/.next`
   - **Install Command**: `pnpm install`

---

## 🔐 Step 5: Configure Environment Variables

### In Vercel Dashboard

1. Go to your project settings
2. Click "Environment Variables"
3. Add the following variables:

#### Required Variables

```env
# Database (Use Neon, Railway, or other PostgreSQL service)
DATABASE_URL=postgresql://...

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# App URLs
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://your-api.railway.app
```

#### Optional Variables (Add as you integrate)

```env
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# OpenAI
OPENAI_API_KEY=sk-...

# Sentry
NEXT_PUBLIC_SENTRY_DSN=...

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=...
```

### Set Environment Variables via CLI

```bash
# Set production environment variables
vercel env add DATABASE_URL production
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
vercel env add CLERK_SECRET_KEY production

# Set for preview and development too
vercel env add DATABASE_URL preview
vercel env add DATABASE_URL development
```

---

## 🗄️ Step 6: Set Up Production Database

### Option A: Neon (Recommended - Serverless PostgreSQL)

1. Go to https://neon.tech
2. Sign up and create a new project
3. Create database: `ownly-production`
4. Copy connection string
5. Add to Vercel environment variables as `DATABASE_URL`

### Option B: Railway

1. Go to https://railway.app
2. Create new project
3. Add PostgreSQL service
4. Copy connection string
5. Add to Vercel environment variables

### Run Database Migration

```bash
# Set production DATABASE_URL locally (temporarily)
export DATABASE_URL="postgresql://..."

# Push schema to production database
pnpm db:push

# Or run migrations
pnpm db:migrate deploy
```

---

## 🚂 Step 7: Deploy API Server (Railway)

The API server needs to be deployed separately.

### Deploy to Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `ownly` repository
5. Configure:
   - **Root Directory**: `apps/api`
   - **Build Command**: `cd ../.. && pnpm install && pnpm build --filter=api`
   - **Start Command**: `cd apps/api && node dist/index.js`

### Set Railway Environment Variables

```env
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_...
NODE_ENV=production
PORT=3001
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Get Railway API URL

After deployment, copy your Railway API URL (e.g., `https://ownly-api.railway.app`)

Update Vercel environment variable:
```
NEXT_PUBLIC_API_URL=https://ownly-api.railway.app
```

---

## 🔄 Step 8: Configure CI/CD

GitHub Actions is already configured! Just need to add secrets.

### Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

```
VERCEL_TOKEN          # Get from vercel.com/account/tokens
VERCEL_ORG_ID         # Get from vercel project settings
VERCEL_PROJECT_ID     # Get from vercel project settings
RAILWAY_TOKEN         # Get from railway.app settings
DATABASE_URL          # Production database
CLERK_SECRET_KEY      # Clerk secret
```

### Get Vercel Tokens

```bash
# Get Vercel token
vercel whoami
# Then go to: vercel.com/account/tokens

# Get project IDs
cat .vercel/project.json
```

---

## ✅ Step 9: Verify Deployment

### Check Web App

1. Visit your Vercel URL: `https://ownly.vercel.app`
2. Verify landing page loads
3. Test dashboard (may need to sign in with Clerk)

### Check API Server

```bash
# Test health endpoint
curl https://your-api.railway.app/health

# Should return:
# {"status":"ok","timestamp":"2025-01-..."}
```

### Check Database

```bash
# Connect to production database
psql $DATABASE_URL

# Check tables
\dt

# Should see all Prisma tables
```

---

## 🔧 Step 10: Post-Deployment Setup

### 1. Configure Custom Domain (Optional)

In Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `ownly.com`)
3. Update DNS records as instructed
4. Update environment variables with new domain

### 2. Set Up Clerk Production

1. Go to clerk.com dashboard
2. Switch to production instance
3. Update allowed domains:
   - Add your Vercel URL
   - Add custom domain if applicable
4. Configure OAuth providers
5. Update webhook URLs

### 3. Set Up Stripe Webhooks

1. Go to stripe.com dashboard
2. Developers → Webhooks
3. Add endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
4. Select events to listen to
5. Copy webhook secret to Vercel env vars

### 4. Configure Monitoring

```bash
# Add Sentry for error tracking
pnpm add @sentry/nextjs

# Add PostHog for analytics
pnpm add posthog-js
```

---

## 📊 Step 11: Monitor Deployment

### Vercel Dashboard

- View deployment logs
- Monitor build times
- Check bandwidth usage
- View analytics

### Railway Dashboard

- Monitor API server health
- View logs
- Check resource usage
- Set up alerts

### Database Monitoring

- Monitor connection count
- Track query performance
- Set up backups

---

## 🚨 Troubleshooting

### Build Fails on Vercel

**Problem**: Build command fails

**Solution**:
```bash
# Verify root directory is correct
# Should be: apps/web

# Check build command
cd ../.. && pnpm build --filter=web

# Test locally
pnpm build
```

### Environment Variables Not Working

**Problem**: App can't read env vars

**Solution**:
1. Ensure vars are prefixed with `NEXT_PUBLIC_` for client-side
2. Redeploy after adding new variables
3. Check variable scope (production/preview/development)

### Database Connection Issues

**Problem**: Can't connect to database

**Solution**:
```bash
# Check connection string format
# Should be: postgresql://user:password@host:port/database

# Verify database is accessible
psql $DATABASE_URL

# Check if Prisma schema is pushed
pnpm db:push
```

### API Server Not Responding

**Problem**: API calls fail

**Solution**:
1. Check Railway logs for errors
2. Verify environment variables are set
3. Ensure DATABASE_URL is correct
4. Check CORS configuration in `apps/api/src/index.ts`

---

## 🎉 Deployment Complete!

Your Ownly application is now live!

### URLs

- **Web App**: https://ownly.vercel.app
- **API**: https://ownly-api.railway.app
- **GitHub**: https://github.com/YOUR_USERNAME/ownly

### Next Steps

1. ✅ Test all functionality
2. ✅ Set up monitoring alerts
3. ✅ Configure backups
4. ✅ Add custom domain
5. ✅ Enable SSL/HTTPS (automatic with Vercel)
6. ✅ Set up status page

---

## 📝 Continuous Deployment

Now that CI/CD is configured:

```bash
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin main

# Automatic deployment will trigger:
# 1. GitHub Actions runs tests
# 2. Vercel builds and deploys web app
# 3. Railway deploys API server
```

---

## 🔐 Security Checklist

- [ ] All environment variables secured
- [ ] Database has strong password
- [ ] API endpoints have rate limiting
- [ ] CORS configured correctly
- [ ] SSL/HTTPS enabled
- [ ] Webhook secrets verified
- [ ] No secrets in code
- [ ] .env files in .gitignore

---

## 📞 Need Help?

- **Vercel Issues**: https://vercel.com/support
- **Railway Issues**: https://railway.app/help
- **Ownly Issues**: Open a GitHub issue

---

**Congratulations! Your app is live!** 🚀

Time to help people start their businesses!
