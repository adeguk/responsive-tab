#!/bin/bash

# Script to publish to GitHub Packages
echo "🚀 Publishing to GitHub Packages..."

# Check if we're logged in to GitHub Packages
if ! npm whoami --registry=https://npm.pkg.github.com > /dev/null 2>&1; then
    echo "❌ Not logged in to GitHub Packages"
    echo "Please run: npm login --scope=@localwebcafe --registry=https://npm.pkg.github.com"
    exit 1
fi

# Build the package
echo "📦 Building package..."
npm run build

# Publish to GitHub Packages
echo "📤 Publishing to GitHub Packages..."
npm publish

echo "✅ Published successfully to GitHub Packages!"
echo "📋 Package URL: https://github.com/localwebcafe/responsive-tab/packages"
