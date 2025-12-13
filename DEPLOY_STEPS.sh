#!/bin/bash

# Ownly - GitHub CLI Deployment Steps
# Run each command one at a time

set -e

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║           🚀 OWNLY DEPLOYMENT - GITHUB CLI METHOD            ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "📍 Current Directory: $(pwd)"
echo "📦 Files Ready: $(git ls-files | wc -l) files"
echo ""

# Check if authenticated
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔹 STEP 1: Check GitHub CLI Authentication"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if gh auth status &>/dev/null; then
    echo "✅ Already authenticated with GitHub!"
    gh auth status
    echo ""
else
    echo "⚠️  Not authenticated. Please run:"
    echo ""
    echo "    gh auth login"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔹 STEP 2: Create GitHub Repository and Push"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Creating repository 'ownly' and pushing code..."
echo ""

read -p "Make repository public or private? (public/private): " visibility

if [ "$visibility" = "private" ]; then
    gh repo create ownly --private --source=. --remote=origin --push
else
    gh repo create ownly --public --source=. --remote=origin --push
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Repository created and code pushed!"
    echo ""
    REPO_URL=$(gh repo view --json url -q .url)
    echo "🔗 Repository URL: $REPO_URL"
    echo ""
else
    echo "❌ Failed to create repository. It may already exist."
    echo ""
    echo "If repository already exists, push manually:"
    echo "    git push origin main"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔹 STEP 3: Deploy to Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo ""
echo "1. Install Vercel CLI (if not installed):"
echo "   npm install -g vercel"
echo ""
echo "2. Login to Vercel:"
echo "   vercel login"
echo ""
echo "3. Deploy to production:"
echo "   vercel --prod"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔹 STEP 4: Set Environment Variables"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "After deployment, add these in Vercel Dashboard:"
echo ""
echo "  DATABASE_URL=postgresql://..."
echo "  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_..."
echo "  CLERK_SECRET_KEY=sk_..."
echo "  NEXT_PUBLIC_APP_URL=https://your-project.vercel.app"
echo ""
echo "Get free services:"
echo "  • Database: https://neon.tech"
echo "  • Auth: https://clerk.com"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 GitHub deployment complete!"
echo ""
echo "Continue with Vercel deployment using the commands above."
echo ""
