from rest_framework import serializers
from .models import Recipe, RecipeIngredient
from apps.ingredients.models import Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'unit', 'price_per_unit', 'stock_quantity']

class RecipeIngredientSerializer(serializers.ModelSerializer):
    ingredient_name = serializers.ReadOnlyField(source='ingredient.name')
    unit = serializers.ReadOnlyField(source='ingredient.unit')
    price_per_unit = serializers.DecimalField(source='ingredient.price_per_unit', max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = RecipeIngredient
        fields = ['id', 'ingredient', 'ingredient_name', 'quantity', 'unit', 'price_per_unit', 'cost']

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = RecipeIngredientSerializer(many=True, read_only=True)
    profit = serializers.ReadOnlyField()
    profit_margin = serializers.ReadOnlyField()
    cost_per_unit = serializers.ReadOnlyField()
    
    class Meta:
        model = Recipe
        fields = [
            'id', 'name', 'description', 'category',
            'production_cost', 'sale_price', 
            'yield_quantity', 'yield_unit', 
            'profit', 'profit_margin', 'cost_per_unit',
            'ingredients', 'created_at', 'updated_at'
        ]
