#!/bin/bash

echo "🚀 Iniciando ChefLuz em modo DEV..."
echo "=================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 1. Ir para raiz do projeto
cd "$(dirname "$0")" || exit
PROJECT_ROOT=$(pwd)
echo -e "${BLUE}📂 Projeto: $PROJECT_ROOT${NC}"

# 2. Garantir que dependências do frontend estão instaladas
echo -e "${YELLOW}📦 Verificando dependências do frontend...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Instalando node_modules...${NC}"
    npm install --legacy-peer-deps 2>&1 | tail -20
fi

# 3. Verificar se porta 3000 está em uso
PORT=3000
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Porta $PORT em uso, matando processo...${NC}"
    lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# 4. Iniciar Vite (Frontend) em background
echo -e "${GREEN}🎨 Iniciando Vite (Frontend) na porta $PORT...${NC}"
npm run dev > /tmp/vite.log 2>&1 &
VITE_PID=$!
echo "Vite PID: $VITE_PID"

# Aguardar Vite iniciar
sleep 5
if ! ps -p $VITE_PID > /dev/null; then
    echo -e "${RED}❌ Erro ao iniciar Vite!${NC}"
    cat /tmp/vite.log
    exit 1
fi

# 5. Verificar se porta 8000 está em uso
PORT_BACKEND=8000
if lsof -Pi :$PORT_BACKEND -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Porta $PORT_BACKEND em uso, matando processo...${NC}"
    lsof -ti:$PORT_BACKEND | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# 6. Voltar para backend e iniciar Django
cd "$PROJECT_ROOT/backend" || exit
echo -e "${GREEN}🐍 Iniciando Django (Backend) na porta $PORT_BACKEND...${NC}"

# Garantir ambiente virtual
if [ ! -d "$PROJECT_ROOT/.venv" ]; then
    echo -e "${YELLOW}Criando ambiente virtual...${NC}"
    cd "$PROJECT_ROOT" && python3 -m venv .venv
fi

# Ativar venv
source "$PROJECT_ROOT/.venv/bin/activate"

# Executar migrações (se necessário)
echo -e "${YELLOW}🔄 Verificando migrações...${NC}"
python manage.py migrate --noinput 2>&1 | tail -10

# Iniciar servidor Django
python manage.py runserver 0.0.0.0:$PORT_BACKEND > /tmp/django.log 2>&1 &
DJANGO_PID=$!
echo "Django PID: $DJANGO_PID"

# Aguardar Django iniciar
sleep 3
if ! ps -p $DJANGO_PID > /dev/null; then
    echo -e "${RED}❌ Erro ao iniciar Django!${NC}"
    cat /tmp/django.log
    exit 1
fi

# 7. Exibir status
echo ""
echo -e "${GREEN}✅ ChefLuz iniciado com sucesso!${NC}"
echo "=================================="
echo -e "${BLUE}Frontend: http://localhost:3000${NC}"
echo -e "${BLUE}Backend:  http://localhost:8000${NC}"
echo -e "${BLUE}API:      http://localhost:8000/api/chat/health/${NC}"
echo ""
echo -e "${YELLOW}📝 Logs:${NC}"
echo "  Frontend: tail -f /tmp/vite.log"
echo "  Backend:  tail -f /tmp/django.log"
echo ""
echo -e "${YELLOW}🛑 Para parar, pressione CTRL+C ou execute:${NC}"
echo "  kill $VITE_PID $DJANGO_PID"
echo ""

# Aguardar processos
wait $VITE_PID $DJANGO_PID
