from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import os

@require_http_methods(["GET"])
def health_check(request):
    """Endpoint simples para diagnosticar estado da aplicação"""
    try:
        # Test 1: Environment
        debug = os.getenv('DEBUG', 'Not set')
        database_url = os.getenv('DATABASE_URL', 'Not set')
        groq_key = os.getenv('GROQ_API_KEY', 'Not set')
        
        # Test 2: Database
        try:
            from django.db import connection
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
            db_status = "✅ Connected"
        except Exception as e:
            db_status = f"❌ Error: {str(e)}"
        
        # Test 3: Recipes
        try:
            from apps.products.models import Recipe
            recipe_count = Recipe.objects.count()
            recipes_status = f"✅ {recipe_count} recipes"
        except Exception as e:
            recipes_status = f"❌ Error: {str(e)}"
        
        return JsonResponse({
            'status': 'OK',
            'environment': {
                'DEBUG': debug,
                'DATABASE_URL': 'configured' if database_url != 'Not set' else 'NOT SET',
                'GROQ_API_KEY': 'configured' if groq_key != 'Not set' else 'NOT SET',
            },
            'database': db_status,
            'recipes': recipes_status,
        })
    except Exception as e:
        return JsonResponse({
            'status': 'ERROR',
            'error': str(e)
        }, status=500)
