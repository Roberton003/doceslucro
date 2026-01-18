from django.core.management.base import BaseCommand
from apps.products.models import Recipe, RecipeIngredient
from apps.ingredients.models import Ingredient
import json

class Command(BaseCommand):
    help = 'Loads initial hardcoded recipe data into the database'

    def handle(self, *args, **options):
        self.stdout.write('Migrating legacy hardcoded data to database...')

        # Data extracted from original SinglePage.jsx
        RECEITAS_PADRAO = [
          {
            "name": 'Bolo de Cenoura',
            "rendimento": 10,
            "margemLucro": 50,
            "packaging": {
              "description": 'Caixa individual',
              "quantity_used": 1,
              "package_size": 50,
              "price_per_package": 40.00
            },
            "ingredients": [
              { "name": 'Cenoura', "quantity_used": 300, "unit": 'g', "price_per_package": 2.50, "package_size": 1000 },
              { "name": 'Farinha de trigo', "quantity_used": 300, "unit": 'g', "price_per_package": 8.00, "package_size": 1000 },
              { "name": 'Açúcar', "quantity_used": 200, "unit": 'g', "price_per_package": 3.50, "package_size": 1000 },
              { "name": 'Ovos', "quantity_used": 3, "unit": 'un', "price_per_package": 12.00, "package_size": 12 },
              { "name": 'Óleo', "quantity_used": 150, "unit": 'ml', "price_per_package": 8.50, "package_size": 1000 }
            ]
          },
          {
            "name": 'Brownie',
            "rendimento": 12,
            "margemLucro": 50,
            "packaging": {
              "description": 'Caixa pequena',
              "quantity_used": 1,
              "package_size": 100,
              "price_per_package": 75.00
            },
            "ingredients": [
              { "name": 'Chocolate 70%', "quantity_used": 200, "unit": 'g', "price_per_package": 18.00, "package_size": 500 },
              { "name": 'Manteiga', "quantity_used": 150, "unit": 'g', "price_per_package": 8.00, "package_size": 500 },
              { "name": 'Açúcar', "quantity_used": 150, "unit": 'g', "price_per_package": 3.50, "package_size": 1000 },
              { "name": 'Ovos', "quantity_used": 3, "unit": 'un', "price_per_package": 12.00, "package_size": 12 },
              { "name": 'Farinha de trigo', "quantity_used": 100, "unit": 'g', "price_per_package": 8.00, "package_size": 1000 }
            ]
          }
        ]

        for r_data in RECEITAS_PADRAO:
            # 1. Create/Check Recipe
            # Construct description with packaging hack
            description = f"Receita Clássica. PACKAGING:{json.dumps(r_data['packaging'])}"
            
            # Temporary cost calculation for initial seeding
            custo_total = 0
            
            # Create recipe object first (we'll update cost later)
            recipe, created = Recipe.objects.get_or_create(
                name=r_data['name'],
                defaults={
                    'description': description,
                    'category': 'Doce',
                    'production_cost': 0, # Placeholder
                    'sale_price': 0,     # Placeholder
                    'yield_quantity': r_data['rendimento'],
                    'yield_unit': 'unidades'
                }
            )
            
            if created:
                self.stdout.write(f"Created recipe: {recipe.name}")
            else:
                self.stdout.write(f"Recipe already exists: {recipe.name}")
                # Update description just in case
                recipe.description = description
                recipe.save()

            # 2. Process Ingredients
            for ing_data in r_data['ingredients']:
                # Calculate price per unit
                price_per_unit = ing_data['price_per_package'] / ing_data['package_size']
                
                # Check/Create Ingredient
                ingredient, ing_created = Ingredient.objects.get_or_create(
                    name=ing_data['name'],
                    defaults={
                        'category': 'Geral',
                        'unit': ing_data['unit'],
                        'price_per_unit': price_per_unit,
                        'stock_quantity': 0,
                        'min_stock': 10
                    }
                )
                
                # Link to Recipe
                RecipeIngredient.objects.get_or_create(
                    recipe=recipe,
                    ingredient=ingredient,
                    defaults={'quantity': ing_data['quantity_used']}
                )
                
                # Accumulate cost
                custo_total += (ing_data['quantity_used'] * float(price_per_unit))

            # Add packaging cost
            pkg = r_data['packaging']
            if pkg['package_size'] > 0:
                pkg_cost = (pkg['quantity_used'] / pkg['package_size']) * pkg['price_per_package']
                custo_total += pkg_cost

            # Update Recipe Financials
            recipe.production_cost = custo_total
            margem_fator = 1 + (r_data['margemLucro'] / 100)
            custo_unit = custo_total / r_data['rendimento']
            recipe.sale_price = custo_unit * margem_fator
            recipe.save()

        self.stdout.write(self.style.SUCCESS('Successfully populated database with initial data!'))
