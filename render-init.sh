#!/bin/bash
set -e

echo "🔍 Iniciando script de configuração pós-build para Render..."

cd backend

# Set Django settings module
export DJANGO_SETTINGS_MODULE=config.settings.production

# 1. Executar migrations
echo "🔄 Executando migrations..."
python manage.py migrate --noinput || echo "⚠️ Migrations falharam - continuando..."

# 2. Coletar estaticos
echo "📁 Coletando arquivos estáticos..."
python manage.py collectstatic --noinput --clear || echo "⚠️ Collectstatic falhou - continuando..."

# 3. Verificar se recipes existem, se não, carregar dados iniciais
echo "📊 Verificando dados iniciais..."
python manage.py shell << EOF
from apps.products.models import Recipe
recipe_count = Recipe.objects.count()
print(f"Total de receitas no banco: {recipe_count}")

if recipe_count == 0:
    print("⚠️ Nenhuma receita encontrada! Você precisa carregar dados iniciais.")
    print("Considere criar um fixture ou um management command para carregar receitas automaticamente.")
else:
    print(f"✅ {recipe_count} receitas encontradas no banco!")
EOF

echo "✅ Inicialização concluída!"
