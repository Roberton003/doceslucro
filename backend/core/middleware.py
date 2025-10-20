"""
Middleware de Segurança para Doces GIamor
Fornece logging adicional e proteção contra ataques comuns
"""

import logging
import re
import time
from django.conf import settings
from django.http import HttpResponseForbidden
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger('security')

# Padrões suspeitos para detectar possíveis ataques
SUSPICIOUS_PATTERNS = [
    r'<script[^>]*>.*?</script>',  # XSS attempts
    r'union.*select.*--',          # SQL injection attempts
    r'../../../',                  # Path traversal
    r'eval\(',                     # Code injection
    r'base64_decode',              # Base64 injection
]

class SecurityMiddleware(MiddlewareMixin):
    """
    Middleware que adiciona camadas extras de segurança:
    - Logging de atividades suspeitas
    - Detecção básica de ataques
    - Headers de segurança adicionais
    """

    def process_request(self, request):
        """Processa a requisição antes de chegar às views"""
        client_ip = self._get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown')

        # Log de acesso básico
        ua_short = user_agent[:100] if len(user_agent) > 100 else user_agent
        logger.info(f"Access: {client_ip} - {request.method} {request.path} "
                   f"- UA: {ua_short}...")

        # Verificar padrões suspeitos
        suspicious_content = self._check_suspicious_patterns(request)
        if suspicious_content:
            logger.warning(f"Suspicious activity detected from {client_ip}: "
                          f"{suspicious_content}")
            # Em produção, poderia bloquear ou rate limit aqui

        return None

    def process_response(self, request, response):
        """Adiciona headers de segurança à resposta"""
        # Headers de segurança adicionais
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'

        # Content Security Policy básica
        csp = ("default-src 'self'; script-src 'self'; "
               "style-src 'self' 'unsafe-inline';")
        response['Content-Security-Policy'] = csp

        return response

    def process_exception(self, request, exception):
        """Log de exceções para análise de segurança"""
        client_ip = self._get_client_ip(request)
        logger.error(f"Exception from {client_ip}: {request.path} - "
                    f"{str(exception)}")
        return None

    def _get_client_ip(self, request):
        """Obtém o IP real do cliente considerando proxies"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def _check_suspicious_patterns(self, request):
        """Verifica se a requisição contém padrões suspeitos"""
        # Verificar query parameters
        for key, values in request.GET.lists():
            for value in values:
                for pattern in SUSPICIOUS_PATTERNS:
                    if re.search(pattern, str(value), re.IGNORECASE):
                        return f"Query param '{key}': {value[:100]}"

        # Verificar POST data (se for form)
        if request.method == 'POST' and request.POST:
            for key, values in request.POST.lists():
                for value in values:
                    for pattern in SUSPICIOUS_PATTERNS:
                        if re.search(pattern, str(value), re.IGNORECASE):
                            return f"POST param '{key}': {value[:100]}"

        return None


class RateLimitMiddleware(MiddlewareMixin):
    """
    Middleware simples de rate limiting baseado em IP
    (Complementa o throttling do DRF)
    """

    def __init__(self, get_response=None):
        super().__init__(get_response)
        self.requests = {}  # Em produção, use Redis ou cache

    def process_request(self, request):
        """Verifica rate limiting básico"""
        if settings.DEBUG:
            return None  # Desabilitar em desenvolvimento

        client_ip = self._get_client_ip(request)
        current_time = int(time.time())

        # Limpar requests antigos (mais de 1 hora)
        if client_ip in self.requests:
            self.requests[client_ip] = [
                timestamp for timestamp in self.requests[client_ip]
                if current_time - timestamp < 3600
            ]

            # Verificar limite (100 requests por hora)
            if len(self.requests[client_ip]) >= 100:
                logger.warning(f"Rate limit exceeded for IP: {client_ip}")
                return HttpResponseForbidden("Rate limit exceeded")

        # Registrar request
        if client_ip not in self.requests:
            self.requests[client_ip] = []
        self.requests[client_ip].append(current_time)

        return None

    def _get_client_ip(self, request):
        """Obtém IP do cliente"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0].strip()
        return request.META.get('REMOTE_ADDR')