build: python build.py
web: cd backend && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
release: cd backend && python manage.py migrate
