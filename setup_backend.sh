#!/bin/bash

# Script de Setup do Projeto DoceLucro
# Facilita a inicialização do ambiente de desenvolvimento

set -e

echo "🚀 Iniciando setup do Projeto DoceLucro..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log
log() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se estamos no diretório correto
if [ ! -f "backend/manage.py" ]; then
    error "Este script deve ser executado na raiz do projeto DoceLucro"
    exit 1
fi

cd backend

log "Verificando ambiente virtual..."
if [ ! -d "venv" ]; then
    warning "Virtualenv não encontrado. Criando..."
    python3 -m venv venv
    success "Virtualenv criado"
fi

log "Ativando virtualenv..."
source venv/bin/activate

log "Instalando dependências..."
pip install -q django djangorestframework djangorestframework-simplejwt python-decouple dj-database-url psycopg2-binary django-cors-headers drf-spectacular

log "Verificando configurações do Django..."
python manage.py check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    success "Configurações do Django OK"
else
    error "Problemas nas configurações do Django"
    exit 1
fi

log "Executando migrações..."
python manage.py migrate > /dev/null 2>&1
success "Migrações executadas"

log "Verificando se existe superusuário..."
SUPERUSER_EXISTS=$(python manage.py shell -c "from django.contrib.auth.models import User; print(User.objects.filter(is_superuser=True).exists())" 2>/dev/null)

if [ "$SUPERUSER_EXISTS" = "False" ]; then
    warning "Superusuário não encontrado. Criando..."
    echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'admin123')" | python manage.py shell
    success "Superusuário criado (admin/admin123)"
else
    success "Superusuário já existe"
fi

echo ""
success "Setup concluído! 🎉"
echo ""
echo "Para iniciar o servidor:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "URLs importantes:"
echo "  🌐 Django Admin: http://localhost:8000/admin/"
echo "  📚 API Docs: http://localhost:8000/api/docs/"
echo "  🔑 API Token: http://localhost:8000/api/token/"
echo ""
echo "Credenciais admin:"
echo "  👤 Usuário: admin"
echo "  🔒 Senha: admin123"