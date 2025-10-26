#!/bin/bash

#############################################
# 🔐 Script de Segurança - ChefLuz v2.0
# 
# Implementa:
# 1. Desabilitar CORS_ALLOW_ALL_ORIGINS
# 2. Adicionar headers de segurança
# 3. Configurar HTTPS redirect
#############################################

echo "🔐 ChefLuz - Hardening de Segurança"
echo "======================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se estamos no diretório correto
if [ ! -f "backend/config/settings/production.py" ]; then
    echo -e "${RED}❌ Erro: Não encontrado backend/config/settings/production.py${NC}"
    echo "Execute este script na raiz do projeto"
    exit 1
fi

echo -e "${YELLOW}⚠️ IMPORTANTE: Antes de continuar...${NC}"
echo ""
echo "1. Você já rotacionou a GROQ_API_KEY em console.groq.com?"
echo "2. Você já atualizou a nova chave em Render Environment?"
echo ""
read -p "Continuar? (s/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "Abortado."
    exit 1
fi

# Passo 1: Verificar e atualizar production.py
echo ""
echo -e "${YELLOW}📝 Verificando backend/config/settings/production.py...${NC}"

if grep -q "CORS_ALLOW_ALL_ORIGINS = True" backend/config/settings/production.py; then
    echo -e "${RED}❌ CORS_ALLOW_ALL_ORIGINS ainda está habilitado em production${NC}"
    echo "Atualizando..."
    
    # Backup
    cp backend/config/settings/production.py backend/config/settings/production.py.backup
    echo -e "${GREEN}✅ Backup criado: production.py.backup${NC}"
    
    # Substituir a linha perigosa
    sed -i 's/CORS_ALLOW_ALL_ORIGINS = True/# CORS_ALLOW_ALL_ORIGINS = True (desabilitado em produção)/g' backend/config/settings/production.py
    
    # Verificar se precisa adicionar CORS_ALLOWED_ORIGINS
    if ! grep -q "CORS_ALLOWED_ORIGINS" backend/config/settings/production.py; then
        echo ""
        echo "Adicionando CORS_ALLOWED_ORIGINS configuração..."
        
        # Adicionar antes de INSTALLED_APPS
        cat >> backend/config/settings/production.py << 'EOF'

# CORS Configuration - Production Only
CORS_ALLOWED_ORIGINS = [
    "https://doceslucro.onrender.com",
    # Adicionar aqui mais domínios se necessário
    # "https://www.seu-dominio.com",
]
EOF
        echo -e "${GREEN}✅ CORS_ALLOWED_ORIGINS adicionado${NC}"
    fi
else
    echo -e "${GREEN}✅ CORS parece estar configurado corretamente${NC}"
fi

# Passo 2: Adicionar Security Headers
echo ""
echo -e "${YELLOW}📝 Adicionando Security Headers...${NC}"

if ! grep -q "SECURE_HSTS_SECONDS" backend/config/settings/production.py; then
    cat >> backend/config/settings/production.py << 'EOF'

# Security Headers - HTTPS/SSL
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
X_FRAME_OPTIONS = 'DENY'

# Content Security Policy
SECURE_CONTENT_SECURITY_POLICY = {
    'default-src': ("'self'",),
    'script-src': ("'self'", "https://cdn.jsdelivr.net"),
    'style-src': ("'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"),
    'img-src': ("'self'", "data:", "https:"),
}
EOF
    echo -e "${GREEN}✅ Security Headers adicionados${NC}"
else
    echo -e "${GREEN}✅ Security Headers já estão configurados${NC}"
fi

# Passo 3: Verificar se há DEBUG = True
echo ""
echo -e "${YELLOW}📝 Verificando DEBUG setting...${NC}"

if grep -q "DEBUG = True" backend/config/settings/production.py; then
    echo -e "${RED}❌ DEBUG = True encontrado em production!${NC}"
    echo "Corrigindo..."
    sed -i 's/DEBUG = True/DEBUG = False/g' backend/config/settings/production.py
    echo -e "${GREEN}✅ DEBUG definido como False${NC}"
else
    echo -e "${GREEN}✅ DEBUG já está False${NC}"
fi

# Passo 4: Git Commit
echo ""
echo -e "${YELLOW}📝 Preparando commit de segurança...${NC}"

if git diff --quiet backend/config/settings/production.py; then
    echo -e "${YELLOW}⚠️ Nenhuma mudança detectada${NC}"
else
    echo -e "${GREEN}✅ Mudanças detectadas${NC}"
    echo ""
    echo "Resumo das mudanças:"
    git diff --no-index /dev/null backend/config/settings/production.py 2>/dev/null | grep "^+" | head -10
    echo ""
    
    read -p "Fazer commit destas mudanças? (s/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        git add backend/config/settings/production.py
        git commit -m "🔐 security: Hardening de segurança para produção

- Desabilitar CORS_ALLOW_ALL_ORIGINS
- Configurar apenas domínios autorizados
- Adicionar HSTS headers
- Habilitar HTTPS redirect
- Configurar cookies seguros
- Adicionar Content-Security-Policy
- Verificar DEBUG = False"
        
        echo ""
        echo -e "${GREEN}✅ Commit realizado${NC}"
        
        read -p "Fazer push para GitHub? (s/n): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Ss]$ ]]; then
            git push origin master
            echo -e "${GREEN}✅ Push realizado!${NC}"
            echo ""
            echo -e "${YELLOW}⏳ Aguardando rebuild do Render...${NC}"
            echo "Você pode acompanhar em: https://dashboard.render.com"
        fi
    fi
fi

echo ""
echo "======================================"
echo -e "${GREEN}✅ Hardening de Segurança Completo!${NC}"
echo "======================================"
echo ""
echo "Próximos passos:"
echo "1. Monitorar rebuild no Render (5-10 min)"
echo "2. Testar API: curl -I https://doceslucro.onrender.com"
echo "3. Verificar headers de segurança"
echo "4. Testar chat em produção"
echo ""
echo "Documentação: SECURITY_SETUP_PRODUCAO.md"
