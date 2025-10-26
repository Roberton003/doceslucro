#!/bin/bash

# Script para rodar ChefLuz em modo desenvolvimento
# Com Hot-reload do Vite + Django

echo "🚀 Iniciando ChefLuz em modo DESENVOLVIMENTO..."

# Criar janelas de terminal e rodar cada coisa em uma
# Backend (Django)
echo "📦 Backend iniciando em http://localhost:8000..."
cd backend
export DJANGO_SETTINGS_MODULE=config.settings.development
/media/Arquivos/DjangoPython/DocesGIamor/.venv/bin/python manage.py runserver 0.0.0.0:8000 &
BACKEND_PID=$!
sleep 3

# Frontend (Vite)
echo "🎨 Frontend iniciando em http://localhost:3000..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "=================================================="
echo "✅ ChefLuz RUNNING!"
echo "=================================================="
echo "🌐 Frontend: http://localhost:3000"
echo "📡 Backend:  http://localhost:8000"
echo "🤖 Chat:     http://localhost:3000 (clique no bot)"
echo ""
echo "PIDS: Backend=$BACKEND_PID Frontend=$FRONTEND_PID"
echo "Para parar: Ctrl+C ou kill $BACKEND_PID $FRONTEND_PID"
echo "=================================================="

# Aguardar
wait
