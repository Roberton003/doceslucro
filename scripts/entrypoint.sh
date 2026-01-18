#!/bin/sh

set -e

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Load initial data (idempotent due to get_or_create)
echo "Loading initial/legacy data..."
python manage.py load_initial_data

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
