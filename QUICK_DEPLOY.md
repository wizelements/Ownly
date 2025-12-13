# ⚡ Quick Deploy - Ownly to GitHub & Vercel

**Deploy Ownly in under 10 minutes!**

---

## 🎯 Prerequisites

- GitHub account
- Vercel account (sign up free at vercel.com)
- Git installed

---

## 🚀 Option 1: Automated Script (Easiest)

```bash
cd /workspaces/ownly

# Run the deployment script
./scripts/deploy.sh
```

Follow the prompts - it will:
1. ✅ Commit your changes
2. ✅ Push to GitHub
3. ✅ Deploy to Vercel

---

## 📝 Option 2: Manual Steps (5 minutes)

### Step 1: Commit to Git

```bash
cd /workspaces/ownly

# Add all files
git add .

# Commit
git commit -m "feat: initial Ownly deployment

Complete MVP foundation with:
- Next.js 15 web app
- tRPC API server
- Prisma database (13 models)
- Landing page + Dashboard
- CI/CD pipelines
- Comprehensive documentation"

# Create main branch
git branch -M main
```

### Step 2: Push to GitHub

#### A. Using GitHub CLI (Easiest)

```bash
# Install GitHub CLI if needed
# Visit: https://cli.github.com/

# Authenticate
gh auth login

# Create repo and push
gh repo create ownly --public --source=. --remote=origin --push
```

#### B. Using Git (Manual)

1. Go to https://github.com/new
2. Create repository named: `ownly`
3. **Don't initialize** with README
4. Copy the remote URL, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ownly.git
git push -u origin main
```

### Step 3: Deploy to Vercel

#### A. Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Link to new project
# - Project name: ownly
# - Deploy
```

#### B. Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import Git Repository
3. Select your `ownly` repo
4. Configure:
   - **Root Directory**: `apps/web`
   - **Framework**: Next.js (auto-detected)
   - Click **Deploy**

---

## 🔐 Step 4: Set Environment Variables

### Required Variables

In Vercel Dashboard → Settings → Environment Variables:

```env
# Database (create at neon.tech)
DATABASE_URL=postgresql://...

# Clerk (get from clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# URLs
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

### Get Free Database

**Option A: Neon (Recommended)**
1. Go to https://neon.tech
2. Sign up (free tier)
3. Create project: `ownly`
4. Copy connection string
5. Add to Vercel as `DATABASE_URL`

**Option B: Railway**
1. Go to https://railway.app
2. New Project → Add PostgreSQL
3. Copy connection string
4. Add to Vercel

### Get Clerk Keys

1. Go to https://clerk.com
2. Sign up and create application
3. Copy publishable and secret keys
4. Add to Vercel environment variables
5. In Clerk dashboard, add your Vercel URL to allowed origins

---

## 🗄️ Step 5: Initialize Database

```bash
# Set DATABASE_URL locally (temporary)
export DATABASE_URL="postgresql://..."

# Push schema to database
pnpm db:push
```

Or from Vercel dashboard:
1. Go to project → Settings → Functions
2. Run: `pnpm db:push`

---

## ✅ Step 6: Verify Deployment

1. Visit your Vercel URL
2. Check landing page loads ✅
3. Try signing in with Clerk ✅
4. View dashboard ✅

---

## 🎉 You're Live!

**Web App**: `https://your-project.vercel.app`

### What's Working Now

✅ Landing page  
✅ User authentication  
✅ Dashboard (basic)  
✅ Database connected  
✅ Type-safe API (tRPC)  

### What's Next

1. **Add features**: Build Module 1 (LLC Formation)
2. **Custom domain**: Add in Vercel settings
3. **API server**: Deploy to Railway (see DEPLOYMENT_GUIDE.md)
4. **Integrations**: Add Stripe, OpenAI, etc.

---

## 🚨 Common Issues

### Build Fails

**Error**: Can't find module

**Fix**:
```bash
# Ensure build command is correct
# In vercel.json, should be:
# "buildCommand": "cd ../.. && pnpm install && pnpm build --filter=web"
```

### Database Connection Error

**Error**: Can't connect to database

**Fix**:
1. Verify `DATABASE_URL` is set in Vercel
2. Check database is accessible
3. Run `pnpm db:push` to create tables

### Clerk Error

**Error**: Clerk authentication fails

**Fix**:
1. Add Vercel URL to Clerk allowed origins
2. Verify environment variables are set
3. Check keys are from production instance

---

## 📞 Need Help?

- **Full Guide**: See `DEPLOYMENT_GUIDE.md`
- **Vercel Docs**: https://vercel.com/docs
- **Clerk Docs**: https://clerk.com/docs
- **Open Issue**: On GitHub

---

## 🎯 Next Steps After Deployment

1. **Test everything** - Click around, test features
2. **Set up monitoring** - Add Sentry for errors
3. **Add analytics** - Add PostHog/Google Analytics
4. **Deploy API** - Follow Railway deployment guide
5. **Build features** - Start with Module 1!

---

## 💡 Pro Tips

- **Preview deployments**: Every push to non-main branch creates preview
- **Environment variables**: Different for production/preview/development
- **Custom domains**: Add in Vercel dashboard → Domains
- **Roll back**: Vercel keeps all deployments, easy to roll back
- **Logs**: View real-time logs in Vercel dashboard

---

**Congratulations! Ownly is live!** 🚀

Now go help people start their businesses!

---

**Quick Commands Reference**

```bash
# Deploy
./scripts/deploy.sh

# Or manually
git push origin main        # Auto-deploys to Vercel
vercel --prod               # Or deploy via CLI

# Check deployment
vercel logs --prod          # View logs
vercel env ls               # List env vars

# Local development
pnpm dev                    # Test locally first
```
