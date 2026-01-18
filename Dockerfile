# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# Ensure VITE_API_URL is relative or set correctly for production
# For same-domain hosting (frontend served by django), base URL is /api
ENV VITE_API_URL=/api
RUN npm run build

# Stage 2: Setup Python Backend
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=config.settings.production

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
# Add groq explicitly if missing from requirements (as seen in context)
RUN pip install --no-cache-dir -r requirements.txt && pip install groq

# Copy backend code
COPY backend/ /app/backend/

# Copy frontend build to a directory Django knows about (STATICFILES_DIRS)
# We configured settings.py to look in BASE_DIR / 'react_build'
COPY --from=frontend-builder /app/frontend/dist /app/backend/react_build

# Copy scripts
COPY scripts/ /app/scripts/
RUN chmod +x /app/scripts/entrypoint.sh

# Change to backend directory
WORKDIR /app/backend

# Run entrypoint
ENTRYPOINT ["/app/scripts/entrypoint.sh"]
