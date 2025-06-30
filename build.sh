#!/bin/bash

echo "🔨 Building Aura Interior"
cd frontend/aurainterior
npm install
npm run build

echo "🔨 Building Admin App"
cd ../adminapp
npm install
npm run build

echo "🔨 Building Vendor App"
cd ../vendorapp
npm install
npm run build

# Optional: go back to root and install backend
echo "🔧 Installing backend dependencies"
cd ../../backend
npm install  # or pip install -r requirements.txt for Django
