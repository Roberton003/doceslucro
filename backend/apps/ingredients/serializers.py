from rest_framework import serializers
from .models import Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'category', 'unit', 'price_per_unit', 'stock_quantity', 'min_stock', 'created_at', 'updated_at']
