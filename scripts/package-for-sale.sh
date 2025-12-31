#!/bin/bash
# Package Ownly for Gumroad/LemonSqueezy sale

set -e

VERSION="${1:-1.0.0}"
OUTPUT_DIR="./dist"
PACKAGE_NAME="ownly-starter-kit-v${VERSION}"

echo "📦 Packaging Ownly Starter Kit v${VERSION}..."

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Create a clean export (exclude node_modules, .git, etc.)
echo "🗂️  Creating archive..."

zip -r "$OUTPUT_DIR/${PACKAGE_NAME}.zip" . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x ".next/*" \
  -x "dist/*" \
  -x ".turbo/*" \
  -x "*.log" \
  -x ".env.local" \
  -x ".vercel/*" \
  -x "apps/*/node_modules/*" \
  -x "apps/*/.next/*" \
  -x "packages/*/node_modules/*" \
  -x "*.zip"

# Get file size
SIZE=$(du -h "$OUTPUT_DIR/${PACKAGE_NAME}.zip" | cut -f1)

echo ""
echo "✅ Package created successfully!"
echo "📁 Location: $OUTPUT_DIR/${PACKAGE_NAME}.zip"
echo "📊 Size: $SIZE"
echo ""
echo "📋 Next steps:"
echo "   1. Upload to Gumroad/LemonSqueezy"
echo "   2. Add screenshots (see GUMROAD_LISTING.md)"
echo "   3. Set pricing tiers"
echo "   4. Publish!"
