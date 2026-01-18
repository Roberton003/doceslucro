#!/usr/bin/env bash
# scripts/stop_app.sh
# Para a aplicação (backend + frontend) de forma segura com confirmação.

set -euo pipefail

BASEDIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="/tmp"
DJANGO_LOG="$LOG_DIR/django.log"
VITE_LOG="$LOG_DIR/vite.log"

# Padrões de busca (ajuste se seu projeto usar outros comandos)
DJANGO_PATTERN="manage.py runserver"
NPM_PATTERN="npm run dev"
VITE_PATTERN="vite"

echo "Procurando processos relacionados à aplicação..."

found_any=false

echo "--- Backend (procura por: '$DJANGO_PATTERN') ---"
DJANGO_LIST=$(pgrep -af "$DJANGO_PATTERN" || true)
if [ -n "$DJANGO_LIST" ]; then
  echo "$DJANGO_LIST"
  found_any=true
else
  echo "Nenhum processo de backend encontrado."
fi

echo "\n--- Frontend (procura por: '$NPM_PATTERN' e '$VITE_PATTERN') ---"
NPM_LIST=$(pgrep -af "$NPM_PATTERN" || true)
VITE_LIST=$(pgrep -af "$VITE_PATTERN" || true)
if [ -n "$NPM_LIST" ]; then
  echo "$NPM_LIST"
  found_any=true
fi
if [ -n "$VITE_LIST" ]; then
  # Se Vite estiver rodando independente do npm
  echo "$VITE_LIST"
  found_any=true
fi
if [ "$found_any" = false ]; then
  echo "\nNenhum processo detectado para parar. Saindo.";
  exit 0
fi

# Pergunta de confirmação
read -r -p $'\nDeseja encerrar os processos listados acima? (y/N): ' CONFIRMATION
CONFIRMATION=${CONFIRMATION:-N}
if [[ ! "$CONFIRMATION" =~ ^[Yy]$ ]]; then
  echo "Cancelado pelo usuário. Nenhum processo foi encerrado."
  exit 0
fi

# Função para finalizar PIDs de forma segura
terminate_pids() {
  local pattern="$1"
  local list
  list=$(pgrep -f "$pattern" || true)
  if [ -n "$list" ]; then
    echo "Encerrando processos para padrão: $pattern"
    # Primeiro tenta TERM, depois KILL se necessário
    for pid in $list; do
      echo " - Enviando TERM para PID $pid"
      kill -TERM "$pid" 2>/dev/null || true
    done
    sleep 1
    # Verifica quem ainda está vivo
    local still
    still=$(pgrep -f "$pattern" || true)
    if [ -n "$still" ]; then
      echo "Alguns PIDs não responderam a TERM. Enviando KILL..."
      for pid in $still; do
        echo " - Enviando KILL para PID $pid"
        kill -KILL "$pid" 2>/dev/null || true
      done
    fi
  else
    echo "Nenhum PID encontrado para: $pattern"
  fi
}

# Encerra processos na ordem: frontend, vite, backend
terminate_pids "$NPM_PATTERN"
terminate_pids "$VITE_PATTERN"
terminate_pids "$DJANGO_PATTERN"

sleep 0.5

echo "\nVerificando se ainda restam processos..."
pgrep -af "$DJANGO_PATTERN" || true
pgrep -af "$NPM_PATTERN" || true
pgrep -af "$VITE_PATTERN" || true

echo "\nParada solicitada concluída."

# Mostra últimos trechos dos logs para diagnóstico rápido
if [ -f "$DJANGO_LOG" ]; then
  echo "\n--- Últimas 40 linhas do backend log ($DJANGO_LOG) ---"
  tail -n 40 "$DJANGO_LOG" || true
else
  echo "\nBackend log não encontrado em $DJANGO_LOG"
fi

if [ -f "$VITE_LOG" ]; then
  echo "\n--- Últimas 40 linhas do frontend log ($VITE_LOG) ---"
  tail -n 40 "$VITE_LOG" || true
else
  echo "\nFrontend log não encontrado em $VITE_LOG"
fi

echo "\nSe quiser remover logs antigos, use: rm -f $DJANGO_LOG $VITE_LOG"
