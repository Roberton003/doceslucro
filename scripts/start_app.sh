#!/usr/bin/env bash
# scripts/start_app.sh
# Script de inicialização da aplicação (backend + frontend)
# - ativa o virtualenv se existir
# - aplica migrações
# - inicia backend (Django) e frontend (Vite/NPM) em background, com logs

set -euo pipefail

BASEDIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="/tmp"
DJANGO_LOG="$LOG_DIR/django.log"
VITE_LOG="$LOG_DIR/vite.log"

echo "Base dir: $BASEDIR"

# Ativa venv se existir
if [ -f "$BASEDIR/.venv/bin/activate" ]; then
  echo "Ativando virtualenv..."
  # shellcheck disable=SC1091
  source "$BASEDIR/.venv/bin/activate"
else
  echo "Aviso: virtualenv não encontrada em $BASEDIR/.venv. Certifique-se de ativar seu ambiente Python manualmente se necessário."
fi

# Backend: aplicar migrações e iniciar
if [ -f "$BASEDIR/backend/manage.py" ]; then
  echo "Entrando no backend..."
  cd "$BASEDIR/backend"
  echo "Aplicando migrations..."
  python manage.py migrate --noinput

  echo "Iniciando backend (Django) em background..."
  nohup python manage.py runserver 0.0.0.0:8000 > "$DJANGO_LOG" 2>&1 &
  DJANGO_PID=$!
  echo "Backend pid: $DJANGO_PID (logs: $DJANGO_LOG)"
  cd "$BASEDIR"
else
  echo "Backend não encontrado em $BASEDIR/backend. Pulando inicialização do backend."
fi

# Frontend: iniciar (assume npm/yarn presente)
if [ -d "$BASEDIR/frontend" ]; then
  echo "Entrando no frontend..."
  cd "$BASEDIR/frontend"

  # Se node_modules não existir, apenas avise (não auto-instala para evitar surpresas)
  if [ ! -d "node_modules" ]; then
    echo "Aviso: node_modules não encontrada. Rode 'npm install' em $BASEDIR/frontend se necessário."
  fi

  # Inicia npm (usa npm run dev por convenção)
  if command -v npm >/dev/null 2>&1; then
    echo "Iniciando frontend (npm run dev) em background..."
    nohup npm run dev > "$VITE_LOG" 2>&1 &
    VITE_PID=$!
    echo "Frontend pid: $VITE_PID (logs: $VITE_LOG)"
  else
    echo "npm não encontrado na PATH. Não foi possível iniciar o frontend automaticamente."
  fi
  cd "$BASEDIR"
else
  echo "Frontend não encontrado em $BASEDIR/frontend. Pulando inicialização do frontend."
fi

cat <<EOF
Iniciado.
- Backend logs: $DJANGO_LOG
- Frontend logs: $VITE_LOG
Para parar os processos: scripts/stop_app.sh ou use 'pkill -f "python manage.py runserver"' e 'pkill -f npm'.
EOF
