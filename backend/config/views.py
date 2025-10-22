from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache
from django.utils.decorators import method_decorator
from django.views.static import serve
from django.conf import settings
from django.http import HttpResponseNotFound
import os


@method_decorator(never_cache, name='dispatch')
class IndexView(TemplateView):
    """
    Serve the React frontend index.html for all non-API routes.
    This allows React Router to handle client-side routing.
    """
    template_name = 'index.html'


def serve_frontend_file(request, path):
    """
    Serve arquivos estáticos do frontend (assets, vite.svg, etc)
    """
    file_path = os.path.join(settings.STATIC_ROOT, 'frontend', path)
    if os.path.exists(file_path):
        return serve(request, path, document_root=os.path.join(settings.STATIC_ROOT, 'frontend'))
    return HttpResponseNotFound()
