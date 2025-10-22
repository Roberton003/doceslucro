#!/usr/bin/env bash
set -e

# Build do Frontend
echo "🔨 Building Frontend..."
cd frontend
npm ci --legacy-peer-deps
npm run build
cd ..

# Setup Backend
echo "🔨 Building Backend..."
cd backend
pip install -r requirements.txt
cd ..

echo "✅ Build concluído!"
