#!/bin/bash
set -e

echo "📦 Iniciando build para Render..."

# 1. Build frontend
echo "🏗️ Buildando frontend..."
cd frontend
npm ci --legacy-peer-deps
npm run build
cd ..

# 2. Copiar frontend buildado para dentro do backend
echo "📋 Copiando frontend para backend..."
rm -rf backend/staticfiles/frontend 2>/dev/null || true
mkdir -p backend/staticfiles/frontend
cp -r frontend/dist/* backend/staticfiles/frontend/
echo "✅ Frontend copiado: $(ls -la backend/staticfiles/frontend/ | wc -l) arquivos"

# 3. Instalar dependências Python
echo "📚 Instalando dependências Python..."
cd backend
pip install -r requirements.txt

# 4. Coletar arquivos estáticos (vai incluir o frontend copiado)
echo "📁 Coletando arquivos estáticos..."
python manage.py collectstatic --noinput
cd ..

echo "✅ Build concluído com sucesso!"
