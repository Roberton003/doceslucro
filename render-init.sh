#!/bin/bash
set -e

echo "🔍 Iniciando script de configuração pós-build para Render..."

cd backend

# Set Django settings module
export DJANGO_SETTINGS_MODULE=config.settings.production

# 1. Executar migrations
echo "🔄 Executando migrations..."
python manage.py migrate --noinput || {
    echo "❌ Migrations falharam!"
    exit 1
}

# 2. Coletar estaticos
echo "📁 Coletando arquivos estáticos..."
python manage.py collectstatic --noinput --clear || {
    echo "⚠️ Collectstatic falhou - continuando..."
}

# 3. Carregar dados iniciais (receitas)
echo "📊 Carregando receitas iniciais..."
python manage.py seed_recipes

# 4. Verificar se recipes foram criadas
echo "✅ Verificando dados no banco..."
python manage.py shell << EOF
from apps.products.models import Recipe
recipe_count = Recipe.objects.count()
print(f"Total de receitas no banco: {recipe_count}")

if recipe_count == 0:
    print("⚠️ AVISO: Nenhuma receita encontrada!")
else:
    print(f"✅ {recipe_count} receitas carregadas com sucesso!")
EOF

echo "✅ Inicialização concluída!"
