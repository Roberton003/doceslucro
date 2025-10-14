#!/bin/bash

# Script de configuração completa do backend Django (não interativo)
# Uso: ./setup_noninteractive.sh

set -e

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Diretório do script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  🍰 DocesGIamor - Setup Backend (Auto)${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# 1. Verificar Python
echo -e "${YELLOW}[1/6] Verificando Python...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 não encontrado!${NC}"
    exit 1
fi
PYTHON_VERSION=$(python3 --version)
echo -e "${GREEN}✓ $PYTHON_VERSION encontrado${NC}"
echo ""

# 2. Criar ambiente virtual (sempre recria)
echo -e "${YELLOW}[2/6] Criando ambiente virtual...${NC}"
rm -rf venv
python3 -m venv venv
echo -e "${GREEN}✓ Ambiente virtual criado${NC}"
echo ""

# 3. Instalar dependências
echo -e "${YELLOW}[3/6] Instalando dependências...${NC}"
source venv/bin/activate
pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt
echo -e "${GREEN}✓ Dependências instaladas${NC}"
echo ""

# 4. Verificar Django
echo -e "${YELLOW}[4/6] Verificando configuração Django...${NC}"
python manage.py check
echo -e "${GREEN}✓ Configuração Django OK${NC}"
echo ""

# 5. Aplicar migrações
echo -e "${YELLOW}[5/6] Aplicando migrações...${NC}"
python manage.py migrate
echo -e "${GREEN}✓ Migrações aplicadas${NC}"
echo ""

# 6. Criar superusuário (dados padrão)
echo -e "${YELLOW}[6/6] Configurando superusuário...${NC}"
# Verifica se já existe
python manage.py shell -c "
from django.contrib.auth.models import User
if User.objects.filter(username='admin').exists():
    print('EXISTE')
else:
    print('NAO_EXISTE')
" | grep -q "EXISTE" && {
    echo -e "${YELLOW}⚠ Superusuário 'admin' já existe${NC}"
} || {
    python manage.py createsuperuser --username admin --email admin@example.com --noinput
    python manage.py shell -c "from django.contrib.auth.models import User; u = User.objects.get(username='admin'); u.set_password('admin123'); u.save()"
    echo -e "${GREEN}✓ Superusuário criado:${NC}"
    echo -e "   Username: ${BLUE}admin${NC}"
    echo -e "   Password: ${BLUE}admin123${NC}"
}
echo ""

# Resumo final
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Setup concluído com sucesso!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Para iniciar o servidor, execute:${NC}"
echo -e "  ${GREEN}./run.sh${NC}"
echo ""
echo -e "${YELLOW}Credenciais padrão:${NC}"
echo -e "  Username: ${BLUE}admin${NC}"
echo -e "  Password: ${BLUE}admin123${NC}"
echo ""