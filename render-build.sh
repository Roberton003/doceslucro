#!/bin/bash
set -e

echo "📦 Iniciando build para Render..."

# 1. Build frontend
echo "🏗️  Buildando frontend..."
cd frontend
npm install --legacy-peer-deps
npm run build
cd ..

# 2. Instalar dependências Python
echo "📚 Instalando dependências Python..."
pip install --upgrade pip
pip install -r backend/requirements.txt

# 3. Coletar arquivos estáticos
echo "📂 Coletando arquivos estáticos..."
cd backend
python manage.py collectstatic --noinput --no-input
cd ..

echo "✅ Build concluído com sucesso!"
