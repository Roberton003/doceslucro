from .base import *
import dj_database_url

# Production settings
DEBUG = False
# Permitir override via variável de ambiente (importante para Cloud Run/GCP)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv(), default='localhost,127.0.0.1,.run.app')

# Database
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL', default='sqlite:///db.sqlite3'),
        conn_max_age=600,
        conn_health_checks=True,
    )
}

# Security settings - HTTPS ativo
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_SECONDS = 31536000  # 1 ano
SECURE_SSL_REDIRECT = config('SECURE_SSL_REDIRECT', cast=bool, default=False)  # Cloud Run handles HTTPS
SESSION_COOKIE_SECURE = config('SESSION_COOKIE_SECURE', cast=bool, default=True)
CSRF_COOKIE_SECURE = config('CSRF_COOKIE_SECURE', cast=bool, default=True)
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
SECURE_CROSS_ORIGIN_OPENER_POLICY = 'same-origin'

# Additional security headers
X_FRAME_OPTIONS = 'DENY'
X_CONTENT_TYPE_OPTIONS = 'nosniff'  # Evita MIME sniffing
SECURE_CROSS_ORIGIN_EMBEDDER_POLICY = 'require-corp'
SECURE_REDIRECT_EXEMPT = []
SECURE_SSL_HOST = None

# Session security
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SAMESITE = 'Lax'
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_COOKIE_AGE = 1209600  # 2 weeks

# CSRF security
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = 'Lax'
CSRF_TRUSTED_ORIGINS = config('CSRF_TRUSTED_ORIGINS', cast=Csv(), default='https://*.run.app,https://*.onrender.com')

# CORS settings for production
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv(), default='')
CORS_ALLOW_CREDENTIALS = True

# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = config('EMAIL_HOST', default='')
EMAIL_PORT = config('EMAIL_PORT', cast=int, default=587)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', cast=bool, default=True)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')

# Static files configuration
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATIC_URL = '/static/'
# Add React build directory to STATICFILES_DIRS so collectstatic picks it up
STATICFILES_DIRS = [
    BASE_DIR / 'react_build'
]

# WhiteNoise configuration for serving static files efficiently
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Template configuration to serve React index.html from staticfiles
TEMPLATES[0]['DIRS'] = [BASE_DIR / 'staticfiles']

# Logging - usa console ao invés de arquivo (para Render)
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
