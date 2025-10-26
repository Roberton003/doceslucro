"""
Simple WSGI application for debugging
"""
import os
import sys

def simple_app(environ, start_response):
    """Simple test app"""
    status = '200 OK'
    response_headers = [('Content-type', 'text/plain')]
    start_response(status, response_headers)
    return [b'Django app is running!\n']

def application(environ, start_response):
    """Main WSGI application"""
    try:
        # Tentando setup Django
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.production")
        import django
        from django.core.wsgi import get_wsgi_application
        django.setup()
        django_app = get_wsgi_application()
        return django_app(environ, start_response)
    except Exception as e:
        # Se Django falhar, retornar erro amigável
        status = '500 Internal Server Error'
        response_headers = [('Content-type', 'text/plain')]
        start_response(status, response_headers)
        error_msg = f"Django initialization error: {str(e)}\n\n{repr(e)}\n"
        return [error_msg.encode()]
