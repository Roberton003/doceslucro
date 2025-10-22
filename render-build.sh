#!/bin/bash
set -e

echo "📦 Iniciando build para Render..."

# 1. Build frontend
echo "🏗️ Buildando frontend..."
cd frontend
npm ci --legacy-peer-deps
npm run build
cd ..

# 2. Instalar dependências Python
echo "📚 Instalando dependências Python..."
cd backend
pip install -r requirements.txt

# 3. Coletar arquivos estáticos
echo "📁 Coletando arquivos estáticos..."
python manage.py collectstatic --noinput
cd ..

echo "✅ Build concluído com sucesso!"
