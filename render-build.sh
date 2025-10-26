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

# 3. Ajustar caminhos no index.html e nos arquivos JS/CSS para usar /static/ prefix
echo "🔧 Ajustando caminhos dos assets..."
sed -i 's|"/assets/|"/static/assets/|g' backend/staticfiles/index.html
sed -i 's|"/assets/|"/static/assets/|g' backend/staticfiles/assets/*.js
sed -i 's|"/assets/|"/static/assets/|g' backend/staticfiles/assets/*.css
sed -i 's|"/vite\.svg|"/static/vite.svg|g' backend/staticfiles/index.html
sed -i 's|"/vite\.svg|"/static/vite.svg|g' backend/staticfiles/assets/*.js
echo "✅ Caminhos ajustados"

# 4. Instalar dependências Python
echo "📚 Instalando dependências Python..."
cd backend
pip install -r requirements.txt

# 4.5 Executar migrations durante o build (crítico para Render)
echo "🔄 Executando migrations..."
export DJANGO_SETTINGS_MODULE=config.settings.production
python manage.py migrate --noinput || {
    echo "❌ Migrations falharam durante build!"
    exit 1
}

# 4.6 Carregar receitas durante o build (garantir que nunca ficam vazias)
echo "📊 Carregando receitas iniciais..."
python manage.py loaddata initial_recipes 2>/dev/null || python manage.py seed_recipes

# 5. Coletar arquivos estáticos
echo "📁 Coletando arquivos estáticos..."
python manage.py collectstatic --noinput
cd ..

echo "✅ Build concluído com sucesso!"
