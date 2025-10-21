#!/usr/bin/env bash

# Build do Frontend
echo "🔨 Building Frontend..."
cd frontend
npm install
npm run build
cd ..

# Setup Backend
echo "🔨 Building Backend..."
cd backend
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
cd ..

echo "✅ Build concluído!"
