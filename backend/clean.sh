#!/bin/bash

# Script para limpar arquivos temporários
# Uso: ./clean.sh

set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}🧹 Limpando arquivos temporários...${NC}"

# Remove __pycache__
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
echo -e "${GREEN}✓ __pycache__ removidos${NC}"

# Remove .pyc
find . -type f -name "*.pyc" -delete 2>/dev/null || true
echo -e "${GREEN}✓ arquivos .pyc removidos${NC}"

# Remove .pyo
find . -type f -name "*.pyo" -delete 2>/dev/null || true
echo -e "${GREEN}✓ arquivos .pyo removidos${NC}"

echo -e "${GREEN}✅ Limpeza concluída!${NC}"