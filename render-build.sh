#!/bin/bash
set -e

echo "📦 Iniciando build para Render..."

# 1. Build frontend
echo "🏗️ Buildando frontend..."
cd frontend
npm ci --legacy-peer-deps
npm run build
cd ..

# 2. Copiar frontend buildado para dentro do backend como arquivos estáticos
echo "📋 Copiando frontend para backend como arquivos estáticos..."
rm -rf backend/staticfiles 2>/dev/null || true
mkdir -p backend/staticfiles
cp -r frontend/dist/* backend/staticfiles/
echo "✅ Frontend copiado para staticfiles"

# 3. Ajustar caminhos no index.html para usar /static/ prefix
echo "🔧 Ajustando caminhos dos assets no index.html..."
sed -i 's|href="/|href="/static/|g; s|src="/|src="/static/|g' backend/staticfiles/index.html
echo "✅ Caminhos ajustados"

# 4. Instalar dependências Python
echo "📚 Instalando dependências Python..."
cd backend
pip install -r requirements.txt

# 5. Coletar arquivos estáticos
echo "📁 Coletando arquivos estáticos..."
python manage.py collectstatic --noinput
cd ..

echo "✅ Build concluído com sucesso!"
