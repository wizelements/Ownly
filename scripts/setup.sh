#!/bin/bash

# Ownly Setup Script
# This script sets up your local development environment

set -e

echo "🚀 Welcome to Ownly Setup"
echo "=========================="
echo ""

# Check for required tools
echo "📋 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js version must be 20 or higher. Current: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm@8
fi
echo "✅ pnpm $(pnpm -v)"

# Check Docker (optional)
if command -v docker &> /dev/null; then
    echo "✅ Docker $(docker -v | cut -d' ' -f3 | tr -d ',')"
    DOCKER_AVAILABLE=true
else
    echo "⚠️  Docker not found (optional)"
    DOCKER_AVAILABLE=false
fi

# Check PostgreSQL
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL $(psql --version | cut -d' ' -f3)"
    POSTGRES_AVAILABLE=true
else
    echo "⚠️  PostgreSQL not found"
    POSTGRES_AVAILABLE=false
fi

echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"
echo ""

# Setup environment variables
if [ ! -f .env.local ]; then
    echo "🔧 Setting up environment variables..."
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "⚠️  Please edit .env.local with your credentials"
    echo ""
else
    echo "✅ .env.local already exists"
    echo ""
fi

# Start database
echo "🗄️  Setting up database..."

if [ "$DOCKER_AVAILABLE" = true ]; then
    read -p "Do you want to start the database with Docker? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Starting Docker containers..."
        docker-compose up -d postgres redis
        echo "✅ Database containers started"
        echo "   - PostgreSQL: localhost:5432"
        echo "   - Redis: localhost:6379"
        
        # Wait for database to be ready
        echo "⏳ Waiting for PostgreSQL to be ready..."
        sleep 5
        
        # Push database schema
        echo "📊 Setting up database schema..."
        pnpm db:push
        echo "✅ Database schema created"
    fi
elif [ "$POSTGRES_AVAILABLE" = true ]; then
    read -p "Do you want to create the database? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        createdb ownly 2>/dev/null || echo "Database 'ownly' already exists"
        pnpm db:push
        echo "✅ Database schema created"
    fi
else
    echo "⚠️  No database available. Please install PostgreSQL or Docker."
fi

echo ""

# Optional: Seed database
read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    pnpm db:seed
    echo "✅ Database seeded"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your API keys"
echo "2. Run 'pnpm dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Useful commands:"
echo "  pnpm dev          - Start all development servers"
echo "  pnpm dev:web      - Start web app only"
echo "  pnpm db:studio    - Open database GUI"
echo "  pnpm test         - Run tests"
echo "  pnpm lint         - Run linter"
echo ""
echo "Need help? Check out:"
echo "  - docs/GETTING_STARTED.md"
echo "  - https://discord.gg/ownly"
echo ""
echo "Happy coding! 🎉"
