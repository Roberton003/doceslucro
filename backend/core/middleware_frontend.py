"""
Middleware para servir o React Frontend SPA
"""
from django.conf import settings
from django.http import HttpResponse
import os


class SPAFallbackMiddleware:
    """
    Para qualquer rota que retorna 404 e NÃO é uma API,
    serve o index.html do React para deixar o React Router lidar.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response
        self.index_html_path = settings.STATIC_ROOT / 'frontend' / 'index.html'
        
        # Cache o conteúdo do index.html
        if os.path.exists(self.index_html_path):
            with open(self.index_html_path, 'r', encoding='utf-8') as f:
                self.index_content = f.read()
        else:
            self.index_content = None

    def __call__(self, request):
        response = self.get_response(request)
        
        # Se é um 404 e NÃO é uma requisição de API/admin/static
        if response.status_code == 404 and not self._is_api_or_static(request.path):
            # Serve o index.html para deixar o React Router lidar
            if self.index_content:
                return HttpResponse(self.index_content, content_type='text/html')
        
        return response
    
    def _is_api_or_static(self, path):
        """Verificar se é uma rota de API, admin ou static"""
        api_prefixes = ['/api/', '/admin/', '/static/']
        return any(path.startswith(prefix) for prefix in api_prefixes)
