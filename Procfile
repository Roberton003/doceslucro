build: bash render-build.sh
release: bash render-init.sh
web: cd backend && DJANGO_SETTINGS_MODULE=config.settings.production python manage.py check && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 4 --timeout 120
