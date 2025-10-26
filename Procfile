build: bash render-build.sh
release: bash render-init.sh
web: cd backend && DJANGO_SETTINGS_MODULE=config.settings.production exec gunicorn config.wsgi_debug:application --bind 0.0.0.0:$PORT --workers 2 --timeout 120 --log-level debug
