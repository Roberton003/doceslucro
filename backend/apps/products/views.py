from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Recipe, RecipeIngredient
from .serializers import RecipeSerializer, RecipeIngredientSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]  # Allow public access
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'category']
    ordering_fields = ['name', 'sale_price', 'created_at']

    @action(detail=True, methods=['post'])
    def add_ingredient(self, request, pk=None):
        recipe = self.get_object()
        ingredient_id = request.data.get('ingredient_id')
        quantity = request.data.get('quantity')
        
        if not ingredient_id or not quantity:
            return Response(
                {'error': 'ingredient_id and quantity are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            RecipeIngredient.objects.create(
                recipe=recipe,
                ingredient_id=ingredient_id,
                quantity=quantity
            )
            return Response({'status': 'ingredient added'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
