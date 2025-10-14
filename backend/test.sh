#!/bin/bash

# Script para executar testes
# Uso: ./test.sh [app_name]

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

if [ -z "$1" ]; then
    echo -e "${YELLOW}🧪 Executando todos os testes...${NC}"
    PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 manage.py test --verbosity=2
else
    echo -e "${YELLOW}🧪 Executando testes de: $1${NC}"
    PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 manage.py test apps.$1 --verbosity=2
fi

echo -e "${GREEN}✅ Testes concluídos!${NC}"