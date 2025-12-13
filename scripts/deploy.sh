#!/bin/bash

# Ownly Deployment Script
# Automates deployment to GitHub and Vercel

set -e

echo "🚀 Ownly Deployment Script"
echo "=========================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d .git ]; then
    echo "${RED}Error: Git repository not initialized${NC}"
    echo "Run: git init"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "${YELLOW}⚠️  You have uncommitted changes${NC}"
    read -p "Do you want to commit them now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Commit message: " commit_msg
        git commit -m "$commit_msg

Generated with Continue (https://continue.dev)

Co-Authored-By: Continue <noreply@continue.dev>"
        echo "${GREEN}✓ Changes committed${NC}"
    else
        echo "${RED}Deployment cancelled. Please commit your changes first.${NC}"
        exit 1
    fi
fi

# Check if remote exists
if ! git remote get-url origin &> /dev/null; then
    echo "${YELLOW}⚠️  No remote repository found${NC}"
    echo ""
    echo "Please create a GitHub repository and add it as remote:"
    echo ""
    echo "  1. Go to: https://github.com/new"
    echo "  2. Repository name: ownly"
    echo "  3. Create repository"
    echo "  4. Run: git remote add origin https://github.com/YOUR_USERNAME/ownly.git"
    echo ""
    read -p "Have you created the repository and added it as remote? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Push to GitHub
echo ""
echo "${BLUE}📤 Pushing to GitHub...${NC}"
git push -u origin main --force-with-lease

if [ $? -eq 0 ]; then
    echo "${GREEN}✓ Successfully pushed to GitHub${NC}"
else
    echo "${RED}✗ Failed to push to GitHub${NC}"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo ""
    echo "${YELLOW}⚠️  Vercel CLI not found${NC}"
    read -p "Do you want to install it now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install -g vercel
    else
        echo "${RED}Please install Vercel CLI: npm install -g vercel${NC}"
        exit 1
    fi
fi

# Deploy to Vercel
echo ""
echo "${BLUE}☁️  Deploying to Vercel...${NC}"
echo ""

read -p "Is this a production deployment? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
else
    vercel
fi

if [ $? -eq 0 ]; then
    echo ""
    echo "${GREEN}✓ Successfully deployed to Vercel${NC}"
else
    echo "${RED}✗ Failed to deploy to Vercel${NC}"
    exit 1
fi

echo ""
echo "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Configure environment variables in Vercel dashboard"
echo "  2. Set up production database (Neon or Railway)"
echo "  3. Deploy API server to Railway"
echo "  4. Test the deployment"
echo ""
echo "See DEPLOYMENT_GUIDE.md for detailed instructions."
