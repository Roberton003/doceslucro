build: cd frontend && npm ci --legacy-peer-deps && npm run build && cd ../backend && pip install -r requirements.txt
web: cd backend && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
release: cd backend && python manage.py migrate
