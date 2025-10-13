#!/bin/bash
# DELEGAÇÃO COPILOT → QWEN: Fase 1 - Setup Backend Completo
# Executor: Qwen CLI
# Data: 2025-01-10

echo "🤖 QWEN EXECUTANDO - FASE 1: Setup Backend"
echo "================================================"

cd /media/Arquivos/DjangoPython/DocesGIamor/backend

# Ativar ambiente virtual
source venv/bin/activate

# Criar módulo apps
touch apps/__init__.py

# Criar apps Django
echo "📦 Criando apps Django..."
python manage.py startapp users apps/users
python manage.py startapp ingredients apps/ingredients
python manage.py startapp products apps/products
python manage.py startapp calculations apps/calculations
python manage.py startapp templates apps/templates
python manage.py startapp shopping apps/shopping
python manage.py startapp dashboard apps/dashboard

echo "✅ Apps criados com sucesso"

# Criar arquivo apps/urls.py
cat > apps/urls.py << 'EOF'
from django.urls import path, include

urlpatterns = [
    path('users/', include('apps.users.urls')),
    path('ingredients/', include('apps.ingredients.urls')),
    path('products/', include('apps.products.urls')),
    path('calculations/', include('apps.calculations.urls')),
    path('templates/', include('apps.templates.urls')),
    path('shopping/', include('apps.shopping.urls')),
    path('dashboard/', include('apps.dashboard.urls')),
]
EOF

echo "✅ apps/urls.py criado"

# Criar URLs vazias para cada app
for app in users ingredients products calculations templates shopping dashboard; do
    cat > "apps/${app}/urls.py" << 'URLEOF'
from django.urls import path

urlpatterns = [
    # URLs serão adicionadas conforme desenvolvimento
]
URLEOF
    echo "✅ apps/${app}/urls.py criado"
done

# Criar arquivo .env
cat > .env << 'ENVEOF'
SECRET_KEY=django-insecure-dev-key-change-in-production-abc123xyz789
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
CORS_ALLOW_ALL=True
ENVEOF

echo "✅ .env criado"

# Executar migrações
echo "🔄 Executando migrações..."
python manage.py makemigrations
python manage.py migrate

echo ""
echo "✅ FASE 1 - SETUP BACKEND COMPLETO"
echo "================================================"
echo "📊 Submissão para Copilot revisar"
