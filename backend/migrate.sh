#!/bin/bash

# Script para gerenciar migrações
# Uso: ./migrate.sh [make|apply|show]

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

ACTION=${1:-apply}

case $ACTION in
    make)
        echo -e "${YELLOW}📝 Criando migrações...${NC}"
        PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 manage.py makemigrations
        echo -e "${GREEN}✓ Migrações criadas${NC}"
        ;;
    apply)
        echo -e "${YELLOW}⚙️  Aplicando migrações...${NC}"
        PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 manage.py migrate
        echo -e "${GREEN}✓ Migrações aplicadas${NC}"
        ;;
    show)
        echo -e "${BLUE}📋 Status das migrações:${NC}"
        PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 manage.py showmigrations
        ;;
    *)
        echo -e "${YELLOW}Uso: ./migrate.sh [make|apply|show]${NC}"
        exit 1
        ;;
esac