# Vercel Deployment Fix Guide

## The Problem
Your new code is not deploying. The site shows old content because builds are failing.

## Diagnose: Check Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click on your **ownly-kit** project
3. Click **Deployments** tab
4. Look for the latest deployment - it likely shows **Failed** (red)
5. Click on the failed deployment → **View Build Logs**

## Common Issues & Fixes

### Issue 1: Root Directory Mismatch

**If your Vercel Root Directory is set to `apps/web`:**

Go to Project Settings → General → Root Directory:
- If it says `apps/web`, you need **different** vercel.json

Delete the root `vercel.json` and keep only `apps/web/vercel.json`:
```json
{
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

**If your Vercel Root Directory is empty (repo root):**

Keep the root `vercel.json`:
```json
{
  "installCommand": "pnpm install",
  "buildCommand": "pnpm build --filter=web",
  "framework": "nextjs",
  "outputDirectory": "apps/web/.next",
  "regions": ["iad1"]
}
```

### Issue 2: pnpm Not Detected

In Vercel Project Settings → General:
- Set **Package Manager** to `pnpm`
- Or add to root `package.json`:
```json
{
  "packageManager": "pnpm@8.15.0"
}
```

### Issue 3: Node Version

In Vercel Project Settings → General:
- Set **Node.js Version** to `20.x`

### Issue 4: Build Cache Corruption

1. Go to Project Settings → Deployment → Build Cache
2. Click **Clear Cache**
3. Trigger a new deployment

## Quick Fix: Redeploy from Vercel Dashboard

1. Go to Deployments
2. Find a deployment that succeeded (green checkmark)
3. Click the 3-dot menu → **Redeploy**
4. Check **Clear Cache** option
5. Deploy

## Manual Deploy via CLI

If you have Vercel CLI:
```bash
cd ~/Ownly
vercel --prod
```

## Verify Fix

After successful deployment, test:
```bash
curl -s https://ownly-kit.vercel.app | grep "<title>"
# Should show: Ownly Starter Kit — Ship Your SaaS in Days, Not Months

curl -I https://ownly-kit.vercel.app/sitemap.xml
# Should return: 200 OK
```

## Current Configuration

**Root vercel.json:**
```json
{
  "installCommand": "pnpm install",
  "buildCommand": "pnpm build --filter=web",
  "framework": "nextjs",
  "outputDirectory": "apps/web/.next",
  "regions": ["iad1"]
}
```

**apps/web/vercel.json:**
```json
{
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## Expected File Structure on Vercel

```
Ownly/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── (seo)/[slug]/page.tsx     # SEO landing pages
│       │   ├── (tools)/                   # Free tools
│       │   ├── api/indexnow/route.ts     # IndexNow API
│       │   ├── feed.xml/route.ts         # RSS feed
│       │   ├── sitemap.ts                # Sitemap
│       │   ├── robots.ts                 # Robots.txt
│       │   └── ...
│       └── vercel.json
├── packages/
├── vercel.json
└── package.json
```

## Contact

If builds still fail after trying these fixes:
1. Copy the full build log error
2. Check if it's a TypeScript error, dependency issue, or config problem
