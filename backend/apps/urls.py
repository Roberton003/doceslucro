from django.urls import path, include

urlpatterns = [
    path('users/', include('apps.users.urls')),
    path('ingredients/', include('apps.ingredients.urls')),
    path('products/', include('apps.products.urls')),
    path('calculations/', include('apps.calculations.urls')),
    path('templates/', include('apps.templates.urls')),
    path('shopping/', include('apps.shopping.urls')),
    path('dashboard/', include('apps.dashboard.urls')),
]