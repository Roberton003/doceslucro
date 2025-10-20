#!/bin/bash

# Script de Setup Seguro - Doces GIamor Backend
# Configura o ambiente com medidas de segurança

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔒 Setup Seguro - Doces GIamor Backend${NC}"
echo "========================================"

# 1. Verificar se .env existe
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Criando arquivo .env a partir do exemplo...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ Arquivo .env criado${NC}"
fi

# 2. Aplicar permissões seguras (tenta com sudo se necessário)
echo -e "\n${YELLOW}Aplicando permissões seguras...${NC}"
if chmod 600 .env 2>/dev/null; then
    echo -e "${GREEN}✅ Permissões aplicadas ao .env${NC}"
else
    echo -e "${YELLOW}⚠ Não foi possível alterar permissões (execute: sudo chmod 600 .env)${NC}"
fi

if chmod 600 db.sqlite3 2>/dev/null; then
    echo -e "${GREEN}✅ Permissões aplicadas ao db.sqlite3${NC}"
else
    echo -e "${YELLOW}⚠ Não foi possível alterar permissões do banco${NC}"
fi

if chmod 600 config/settings/*.py 2>/dev/null; then
    echo -e "${GREEN}✅ Permissões aplicadas aos arquivos de configuração${NC}"
else
    echo -e "${YELLOW}⚠ Não foi possível alterar permissões dos settings${NC}"
fi

# 3. Instalar dependências seguras
echo -e "\n${YELLOW}Instalando dependências...${NC}"
python3 -m pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt
echo -e "${GREEN}✅ Dependências instaladas${NC}"

# 4. Verificar configurações
echo -e "\n${YELLOW}Verificando configurações...${NC}"
python3 manage.py check --settings=config.settings.development
echo -e "${GREEN}✅ Configurações Django OK${NC}"

# 5. Executar verificação de segurança
echo -e "\n${YELLOW}Executando verificação de segurança...${NC}"
./security_check.sh

echo -e "\n${BLUE}=======================================${NC}"
echo -e "${GREEN}✅ Setup seguro concluído!${NC}"
echo -e "${BLUE}=======================================${NC}"

echo -e "\n${YELLOW}📋 Próximos passos:${NC}"
echo -e "  1. Configure uma SECRET_KEY forte no .env"
echo -e "  2. Use PostgreSQL em produção (não SQLite)"
echo -e "  3. Configure SSL/TLS"
echo -e "  4. Execute migrações: python manage.py migrate"
echo -e "  5. Crie superusuário: python manage.py createsuperuser"