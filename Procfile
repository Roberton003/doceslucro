build: bash render-build.sh
release: cd backend && python manage.py migrate --noinput
web: cd backend && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 4
