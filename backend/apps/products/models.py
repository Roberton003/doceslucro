from django.db import models
from apps.ingredients.models import Ingredient


class Recipe(models.Model):
    """Modelo para receitas/produtos com análise de custo e lucro"""
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, default='Doce')
    
    # Custo e Preço
    production_cost = models.DecimalField(max_digits=10, decimal_places=2, help_text="Custo total de produção")
    sale_price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Preço de venda")
    
    # Informações de produção
    yield_quantity = models.DecimalField(max_digits=10, decimal_places=2, help_text="Quantidade produzida por lote")
    yield_unit = models.CharField(max_length=50, default='unidades')
    
    # Informações nutricionais
    calories_per_unit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    protein_per_unit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fat_per_unit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    carbs_per_unit = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Status
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['category', 'name']
        verbose_name_plural = "Recipes"
    
    def __str__(self):
        return f"{self.name} - R${self.sale_price}"
    
    @property
    def profit(self):
        """Lucro por unidade"""
        return self.sale_price - self.production_cost
    
    @property
    def profit_margin(self):
        """Margem de lucro em percentual"""
        if self.sale_price == 0:
            return 0
        return ((self.profit / self.sale_price) * 100)
    
    @property
    def cost_per_unit(self):
        """Custo unitário"""
        if self.yield_quantity == 0:
            return 0
        return self.production_cost / self.yield_quantity


class RecipeIngredient(models.Model):
    """Modelo de relacionamento entre receitas e ingredientes"""
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    
    class Meta:
        unique_together = ('recipe', 'ingredient')
    
    def __str__(self):
        return f"{self.recipe.name} - {self.ingredient.name}"
    
    @property
    def cost(self):
        """Custo total deste ingrediente na receita"""
        return self.quantity * self.ingredient.price_per_unit
