#!/bin/bash

# Script de Verificação de Segurança - Doces GIamor Backend
# Verifica vulnerabilidades críticas de segurança

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔒 Verificação de Segurança - Doces GIamor Backend${NC}"
echo "=============================================="

# 1. Verificar SECRET_KEY
echo -e "\n${YELLOW}[1/5] Verificando SECRET_KEY...${NC}"
if grep -q "SECRET_KEY.*=.*\"" config/settings/base.py; then
    echo -e "${RED}❌ SECRET_KEY ainda está hardcoded!${NC}"
    exit 1
elif grep -q "config('SECRET_KEY'" config/settings/base.py; then
    echo -e "${GREEN}✅ SECRET_KEY configurada via variável de ambiente${NC}"
else
    echo -e "${RED}❌ SECRET_KEY não encontrada ou mal configurada!${NC}"
    exit 1
fi

# 2. Verificar permissões de arquivos
echo -e "\n${YELLOW}[2/5] Verificando permissões de arquivos...${NC}"
check_permission() {
    file=$1
    expected=$2
    if [ -f "$file" ]; then
        perms=$(stat -c "%a" "$file")
        if [ "$perms" != "$expected" ]; then
            echo -e "${RED}❌ $file tem permissões $perms (esperado: $expected)${NC}"
            return 1
        else
            echo -e "${GREEN}✅ $file tem permissões corretas ($perms)${NC}"
            return 0
        fi
    else
        echo -e "${YELLOW}⚠ $file não encontrado${NC}"
        return 1
    fi
}

check_permission ".env" "600"
check_permission "db.sqlite3" "600"
check_permission "config/settings/base.py" "600"

# 3. Verificar dependências
echo -e "\n${YELLOW}[3/5] Verificando dependências...${NC}"
if [ ! -s "requirements.txt" ]; then
    echo -e "${RED}❌ requirements.txt está vazio!${NC}"
    exit 1
else
    echo -e "${GREEN}✅ requirements.txt contém dependências${NC}"
fi

# 4. Verificar configurações de produção
echo -e "\n${YELLOW}[4/5] Verificando configurações de produção...${NC}"
if grep -q "SECURE_SSL_REDIRECT.*=.*True" config/settings/production.py; then
    echo -e "${GREEN}✅ SSL redirect habilitado${NC}"
else
    echo -e "${YELLOW}⚠ SSL redirect não encontrado${NC}"
fi

if grep -q "SECURE_HSTS_SECONDS.*=.*31536000" config/settings/production.py; then
    echo -e "${GREEN}✅ HSTS configurado${NC}"
else
    echo -e "${YELLOW}⚠ HSTS não encontrado${NC}"
fi

# 5. Verificar configurações de throttling
echo -e "\n${YELLOW}[5/5] Verificando rate limiting...${NC}"
if grep -q "DEFAULT_THROTTLE_CLASSES" config/settings/base.py; then
    echo -e "${GREEN}✅ Rate limiting configurado${NC}"
else
    echo -e "${RED}❌ Rate limiting não encontrado!${NC}"
fi

echo -e "\n${BLUE}==============================================${NC}"
echo -e "${GREEN}✅ Verificação de segurança concluída!${NC}"
echo -e "${BLUE}==============================================${NC}"