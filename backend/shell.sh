#!/bin/bash

# Script para abrir Django shell
# Uso: ./shell.sh

set -e

GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}🐍 Abrindo Django shell...${NC}"

PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages python3 manage.py shell