from django.db import models


class Ingredient(models.Model):
    """Modelo para ingredientes cadastrados"""
    name = models.CharField(max_length=200, unique=True)
    category = models.CharField(max_length=100)
    unit = models.CharField(max_length=50)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.DecimalField(max_digits=10, decimal_places=2)
    min_stock = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['category', 'name']
        verbose_name_plural = "Ingredients"
    
    def __str__(self):
        return f"{self.name} ({self.category})"
