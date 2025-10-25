from django.urls import path
from .views import NutritionChatView

app_name = 'chat'

urlpatterns = [
    path('nutrition/', NutritionChatView.as_view(), name='nutrition-chat'),
]
