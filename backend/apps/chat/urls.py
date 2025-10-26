from django.urls import path
from .views import NutritionChatView
from .views_health import health_check

app_name = 'chat'

urlpatterns = [
    path('nutrition/', NutritionChatView.as_view(), name='nutrition-chat'),
    path('health/', health_check, name='health-check'),
]
