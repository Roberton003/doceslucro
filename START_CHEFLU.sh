#!/bin/bash

echo "🚀 INICIANDO CHEFLU ASSISTANT v1.0"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para matar processos antigos
cleanup() {
    echo "🧹 Limpando processos antigos..."
    pkill -9 -f "python manage.py runserver" 2>/dev/null
    pkill -9 -f "npm run dev" 2>/dev/null
    pkill -9 -f "vite" 2>/dev/null
    sleep 2
}

# Função para iniciar backend
start_backend() {
    echo -e "${YELLOW}📦 Iniciando Backend (Django)...${NC}"
    cd /media/Arquivos/DjangoPython/DocesGIamor/backend
    source venv/bin/activate
    nohup python manage.py runserver 0.0.0.0:8000 > /tmp/django.log 2>&1 &
    echo $! > /tmp/django.pid
    sleep 3
    
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/chat/nutrition/ -X POST -d '{"user_message":"test"}' -H "Content-Type: application/json" | grep -q "200\|400"; then
        echo -e "${GREEN}✅ Backend rodando (porta 8000)${NC}"
        return 0
    else
        echo -e "${RED}❌ Backend falhou${NC}"
        return 1
    fi
}

# Função para iniciar frontend
start_frontend() {
    echo -e "${YELLOW}🎨 Iniciando Frontend (Vite)...${NC}"
    cd /media/Arquivos/DjangoPython/DocesGIamor/frontend
    nohup npm run dev > /tmp/vite.log 2>&1 &
    echo $! > /tmp/vite.pid
    sleep 5
    
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:5173 | grep -q "200"; then
        echo -e "${GREEN}✅ Frontend rodando (porta 5173)${NC}"
        return 0
    else
        echo -e "${RED}❌ Frontend falhou${NC}"
        return 1
    fi
}

# Main
cleanup
start_backend
start_frontend

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ CHEFLU ASSISTANT PRONTO!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "🌐 Acesse em: http://localhost:5173"
echo "📊 Admin Django: http://localhost:8000/admin"
echo "🔌 API: http://localhost:8000/api/chat/nutrition/"
echo ""
echo "📝 Logs:"
echo "  Django: tail -f /tmp/django.log"
echo "  Vite: tail -f /tmp/vite.log"
echo ""
echo "🛑 Para parar: pkill -9 -f 'python manage.py\|npm run dev'"
echo ""
