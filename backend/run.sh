#!/bin/bash

# Script para iniciar o servidor Django
# Uso: ./run.sh [porta]

set -e  # Sai se houver erro

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Diretório do script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Porta padrão
PORT=${1:-8000}

echo -e "${YELLOW}🚀 Iniciando servidor Django...${NC}"

# Verificar se Django está instalado
if ! PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 -c "import django" 2>/dev/null; then
    echo -e "${RED}❌ Django não encontrado!${NC}"
    echo -e "${YELLOW}Execute: pip install django${NC}"
    exit 1
fi

# Verificar migrações pendentes
echo -e "${GREEN}✓ Verificando migrações...${NC}"
PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 manage.py migrate --check 2>/dev/null || {
    echo -e "${YELLOW}⚠ Há migrações pendentes. Aplicando...${NC}"
    PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 manage.py migrate
}

# Inicia o servidor
echo -e "${GREEN}✓ Iniciando servidor na porta ${PORT}...${NC}"
echo -e "${GREEN}✓ Acesse: http://127.0.0.1:${PORT}${NC}"
echo -e "${GREEN}✓ Admin: http://127.0.0.1:${PORT}/admin${NC}"
echo -e "${GREEN}✓ API Docs: http://127.0.0.1:${PORT}/api/docs${NC}"
echo ""

PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 manage.py runserver "$PORT"