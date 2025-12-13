# 🚀 Manual Deployment Instructions for Ownly

## ✅ Current Status
- Git repository initialized ✅
- All files committed (66 files) ✅
- Ready to push to GitHub ✅

---

## 📦 STEP 1: Create GitHub Repository Manually

### Option A: Via GitHub Website (Easiest)

1. **Go to**: https://github.com/new

2. **Fill in details**:
   - Repository name: `ownly`
   - Description: `Your entire business in one place — from LLC to $1M`
   - Visibility: Public (or Private)
   - ⚠️ **DO NOT** check "Initialize with README"
   - Click **"Create repository"**

3. **Copy the remote URL** shown (looks like):
   ```
   https://github.com/YOUR_USERNAME/ownly.git
   ```

---

## 📤 STEP 2: Push Code to GitHub

Run these commands in your terminal:

```bash
cd /workspaces/ownly

# Add the remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ownly.git

# Push to GitHub
git push -u origin main
```

**Expected output**:
```
Enumerating objects: 70, done.
Counting objects: 100% (70/70), done.
...
To https://github.com/YOUR_USERNAME/ownly.git
 * [new branch]      main -> main
```

✅ **Your code is now on GitHub!**

---

## ☁️ STEP 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to**: https://vercel.com/new

2. **Import Git Repository**:
   - Click "Import Git Repository"
   - Select your GitHub account
   - Find and select the `ownly` repository
   - Click "Import"

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm build --filter=web`
   - **Output Directory**: Leave default (`.next`)
   - **Install Command**: `pnpm install`
   
4. **Click "Deploy"**

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /workspaces/ownly
vercel --prod
```

**Follow the prompts**:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **ownly**
- Directory? **./apps/web**
- Want to modify settings? **No**

---

## 🔐 STEP 4: Set Environment Variables

After deployment, configure environment variables in Vercel:

1. **Go to your project**: https://vercel.com/dashboard
2. **Click on your project**: `ownly`
3. **Go to**: Settings → Environment Variables
4. **Add these variables**:

### Required Variables

```env
DATABASE_URL
Value: postgresql://user:pass@host:5432/database
```
Get from: https://neon.tech (free tier)
- Sign up → Create project: "ownly"
- Copy connection string

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Value: pk_live_...
```
Get from: https://clerk.com (free tier)
- Sign up → Create application: "Ownly"
- Copy publishable key

```env
CLERK_SECRET_KEY
Value: sk_live_...
```
Get from: https://clerk.com
- Same application
- Copy secret key

```env
NEXT_PUBLIC_APP_URL
Value: https://your-project-name.vercel.app
```
Use your actual Vercel deployment URL

### Set Variables for All Environments

Make sure to set each variable for:
- ✅ Production
- ✅ Preview
- ✅ Development

5. **Click "Save"**

6. **Redeploy** (Vercel will prompt you to redeploy with new variables)

---

## 🗄️ STEP 5: Initialize Database

After setting `DATABASE_URL`, create the database tables:

```bash
cd /workspaces/ownly

# Set DATABASE_URL locally (temporarily)
export DATABASE_URL="postgresql://your-connection-string"

# Create all tables
pnpm db:push
```

**Expected output**:
```
Environment variables loaded from .env
Prisma schema loaded from packages/database/schema.prisma
Datasource "db": PostgreSQL database "ownly"

🚀  Your database is now in sync with your Prisma schema.
```

---

## ✅ STEP 6: Verify Deployment

1. **Visit your Vercel URL**: `https://your-project.vercel.app`

2. **Check these**:
   - ✅ Landing page loads
   - ✅ Click "Get Started"
   - ✅ Sign up with Clerk (create test account)
   - ✅ Dashboard displays
   - ✅ No console errors
   - ✅ Everything looks good!

---

## 🎯 STEP 7: Configure Clerk

1. **Go to**: https://dashboard.clerk.com
2. **Select your application**: Ownly
3. **Go to**: Configure → Paths
4. **Add your Vercel URL** to allowed origins:
   - Add: `https://your-project.vercel.app`
5. **Save**

---

## 🎉 SUCCESS CHECKLIST

After completing all steps:

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Database initialized
- [ ] Clerk configured
- [ ] Landing page works
- [ ] Authentication works
- [ ] Dashboard displays

---

## 🚨 Troubleshooting

### Build Fails on Vercel

**Issue**: Build error

**Fix**:
1. Check Root Directory is `apps/web`
2. Verify build command: `cd ../.. && pnpm build --filter=web`
3. Check all dependencies are in package.json

### Database Connection Error

**Issue**: Can't connect to database

**Fix**:
1. Verify `DATABASE_URL` is set correctly
2. Check Neon database is active
3. Run `pnpm db:push` to create tables

### Clerk Authentication Error

**Issue**: Sign in doesn't work

**Fix**:
1. Add Vercel URL to Clerk allowed origins
2. Verify environment variables are set
3. Check you're using production keys (not development)

---

## 📞 Need Help?

- **Vercel Issues**: https://vercel.com/support
- **Clerk Issues**: https://clerk.com/support
- **Neon Issues**: https://neon.tech/docs
- **Project Docs**: Check `/docs` folder

---

## 💡 Quick Commands Reference

```bash
# Check git status
git status

# View deployment URL
vercel ls

# View logs
vercel logs --prod

# Redeploy
vercel --prod --force

# Check environment variables
vercel env ls
```

---

## 🎯 What's Next?

After successful deployment:

1. ✅ Test everything thoroughly
2. ✅ Add custom domain (optional)
3. ✅ Set up monitoring
4. ✅ Build Module 1 (LLC Formation)
5. ✅ Add Stripe integration
6. ✅ Get your first customer!

---

**Congratulations! Ownly is live!** 🚀

Now start building features and helping people start their businesses!

