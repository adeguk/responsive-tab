#!/bin/bash

# Build the package
echo "Building package..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# Check if user is logged in to npm
npm whoami
if [ $? -ne 0 ]; then
    echo "Please login to npm first: npm login"
    exit 1
fi

# Publish the package
echo "Publishing package..."
npm publish

echo "Package published successfully!"
