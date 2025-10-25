#!/usr/bin/env python
"""Teste de imports da aplicação"""

import sys
import os

# Adicionar backend ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

# Configurar Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')

try:
    print("🔍 Testando imports...")
    
    # Test 1: Import Django
    print("✓ Importando Django...")
    import django
    print(f"  Django versão: {django.VERSION}")
    
    # Test 2: Setup Django
    print("✓ Configurando Django...")
    django.setup()
    
    # Test 3: Import apps
    print("✓ Importando apps...")
    from apps.chat.views import NutritionChatView
    from apps.products.models import Recipe
    from apps.ingredients.models import Ingredient
    print("  Apps importadas com sucesso!")
    
    # Test 4: Import Groq
    print("✓ Importando Groq...")
    from groq import Groq
    print("  Groq importada com sucesso!")
    
    # Test 5: Database connection
    print("✓ Testando conexão com banco de dados...")
    recipe_count = Recipe.objects.count()
    print(f"  Total de receitas: {recipe_count}")
    
    print("\n✅ TODOS OS IMPORTS OK!")
    print("✅ A aplicação pode iniciar normalmente!")
    
except Exception as e:
    print(f"\n❌ ERRO: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
