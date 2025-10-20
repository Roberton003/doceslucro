# 🔧 Plano de Resolução - Backend Django

**Data:** 14 de outubro de 2025  
**Status:** Aguardando Execução  
**Objetivo:** Resolver problemas de inicialização e padronizar ambiente de desenvolvimento

---

## 📊 Diagnóstico Completo

### ✅ Problemas Identificados

1. **Shell Incompatibility (zsh)**
   - O comando `source venv/bin/activate` falha no zsh quando usado com `cd &&`
   - Funciona perfeitamente com bash
   - Causa: Configuração oh-my-zsh ou comportamento específico do zsh

2. **Falta de Scripts Padronizados**
   - Sem scripts de inicialização rápida
   - Processos manuais propensos a erros
   - Dificuldade para novos desenvolvedores

3. **Documentação Incompleta**
   - README sem instruções de setup
   - Sem guia de troubleshooting
   - Falta documentação de scripts

4. **Controle de Versão Desorganizado**
   - .gitignore incompleto
   - Arquivos temporários sendo versionados

### ✅ Estado Atual Validado

- ✅ Python 3.12.3 instalado e funcionando
- ✅ Virtual environment criado corretamente em `backend/venv/`
- ✅ Django 5.2.7 instalado e configurado
- ✅ Migrações aplicadas com sucesso
- ✅ Superusuário criado (admin/admin123)
- ✅ Servidor funciona com: `bash -c "cd backend && source venv/bin/activate && python manage.py runserver"`

---

## 📋 Tarefas Detalhadas

### 🎯 TAREFA 1: Criar Script run.sh

**Objetivo:** Script principal para iniciar o servidor Django

**Arquivo:** `/media/Arquivos/DjangoPython/DocesGIamor/backend/run.sh`

**Conteúdo:**
```bash
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

# Verifica se venv existe
if [ ! -d "venv" ]; then
    echo -e "${RED}❌ Ambiente virtual não encontrado!${NC}"
    echo -e "${YELLOW}Execute primeiro: ./setup.sh${NC}"
    exit 1
fi

# Ativa o ambiente virtual
echo -e "${GREEN}✓ Ativando ambiente virtual...${NC}"
source venv/bin/activate

# Verifica se Django está instalado
if ! python -c "import django" 2>/dev/null; then
    echo -e "${RED}❌ Django não encontrado!${NC}"
    echo -e "${YELLOW}Execute: pip install -r requirements.txt${NC}"
    exit 1
fi

# Verifica migrações pendentes
echo -e "${GREEN}✓ Verificando migrações...${NC}"
python manage.py migrate --check 2>/dev/null || {
    echo -e "${YELLOW}⚠ Há migrações pendentes. Aplicando...${NC}"
    python manage.py migrate
}

# Inicia o servidor
echo -e "${GREEN}✓ Iniciando servidor na porta ${PORT}...${NC}"
echo -e "${GREEN}✓ Acesse: http://127.0.0.1:${PORT}${NC}"
echo -e "${GREEN}✓ Admin: http://127.0.0.1:${PORT}/admin${NC}"
echo -e "${GREEN}✓ API Docs: http://127.0.0.1:${PORT}/api/docs${NC}"
echo ""

python manage.py runserver "$PORT"
```

**Testes:**
```bash
# Teste 1: Executar sem argumentos (porta padrão 8000)
cd /media/Arquivos/DjangoPython/DocesGIamor/backend
chmod +x run.sh
./run.sh

# Teste 2: Executar com porta personalizada
./run.sh 8080

# Teste 3: Verificar mensagens de erro (sem venv)
mv venv venv_backup
./run.sh  # Deve mostrar erro e instruções
mv venv_backup venv

# Teste 4: Acessar URLs
curl http://127.0.0.1:8000/admin/
curl http://127.0.0.1:8000/api/docs/
```

**Critérios de Sucesso:**
- [ ] Script executa sem erros
- [ ] Servidor inicia na porta correta
- [ ] Mensagens coloridas aparecem corretamente
- [ ] Erros são tratados com mensagens claras
- [ ] URLs de acesso são exibidas

---

### 🎯 TAREFA 2: Atualizar setup_backend.sh

**Objetivo:** Garantir setup completo e robusto do ambiente

**Arquivo:** `/media/Arquivos/DjangoPython/DocesGIamor/backend/setup.sh`

**Conteúdo:**
```bash
#!/bin/bash

# Script de configuração completa do backend Django
# Uso: ./setup.sh

set -e

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  🍰 DocesGIamor - Setup Backend${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Diretório do script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# 1. Verificar Python
echo -e "${YELLOW}[1/6] Verificando Python...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 não encontrado!${NC}"
    exit 1
fi
PYTHON_VERSION=$(python3 --version)
echo -e "${GREEN}✓ $PYTHON_VERSION encontrado${NC}"
echo ""

# 2. Criar ambiente virtual
echo -e "${YELLOW}[2/6] Criando ambiente virtual...${NC}"
if [ -d "venv" ]; then
    echo -e "${YELLOW}⚠ Ambiente virtual já existe. Deseja recriar? (s/N)${NC}"
    read -r response
    if [[ "$response" =~ ^([sS][iI][mM]|[sS])$ ]]; then
        rm -rf venv
        python3 -m venv venv
        echo -e "${GREEN}✓ Ambiente virtual recriado${NC}"
    else
        echo -e "${GREEN}✓ Usando ambiente virtual existente${NC}"
    fi
else
    python3 -m venv venv
    echo -e "${GREEN}✓ Ambiente virtual criado${NC}"
fi
echo ""

# 3. Ativar e instalar dependências
echo -e "${YELLOW}[3/6] Instalando dependências...${NC}"
source venv/bin/activate

if [ -f "requirements.txt" ]; then
    pip install --upgrade pip > /dev/null 2>&1
    pip install -r requirements.txt
    echo -e "${GREEN}✓ Dependências instaladas${NC}"
else
    echo -e "${RED}❌ requirements.txt não encontrado!${NC}"
    exit 1
fi
echo ""

# 4. Verificar Django
echo -e "${YELLOW}[4/6] Verificando configuração Django...${NC}"
python manage.py check
echo -e "${GREEN}✓ Configuração Django OK${NC}"
echo ""

# 5. Executar migrações
echo -e "${YELLOW}[5/6] Aplicando migrações...${NC}"
python manage.py migrate
echo -e "${GREEN}✓ Migrações aplicadas${NC}"
echo ""

# 6. Criar superusuário
echo -e "${YELLOW}[6/6] Configurando superusuário...${NC}"
echo -e "${BLUE}Deseja criar um superusuário? (S/n)${NC}"
read -r create_super

if [[ ! "$create_super" =~ ^([nN][aA][oO]|[nN])$ ]]; then
    echo -e "${BLUE}Escolha uma opção:${NC}"
    echo -e "  ${GREEN}1)${NC} Criar com dados padrão (admin/admin123)"
    echo -e "  ${GREEN}2)${NC} Criar com dados personalizados"
    read -r option
    
    if [ "$option" == "1" ]; then
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
    else
        python manage.py createsuperuser
    fi
else
    echo -e "${YELLOW}⚠ Pulando criação de superusuário${NC}"
fi
echo ""

# Resumo final
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Setup concluído com sucesso!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Para iniciar o servidor, execute:${NC}"
echo -e "  ${GREEN}./run.sh${NC}"
echo ""
echo -e "${YELLOW}Outros comandos úteis:${NC}"
echo -e "  ${GREEN}./test.sh${NC}      - Executar testes"
echo -e "  ${GREEN}./migrate.sh${NC}   - Aplicar migrações"
echo -e "  ${GREEN}./shell.sh${NC}     - Abrir Django shell"
echo ""
```

**Testes:**
```bash
# Teste 1: Setup completo do zero
cd /media/Arquivos/DjangoPython/DocesGIamor/backend
rm -rf venv db.sqlite3
chmod +x setup.sh
./setup.sh

# Teste 2: Setup com venv existente
./setup.sh  # Deve perguntar se quer recriar

# Teste 3: Verificar superusuário criado
./shell.sh
>>> from django.contrib.auth.models import User
>>> User.objects.filter(username='admin').exists()
True
>>> exit()

# Teste 4: Verificar todas as migrações
./venv/bin/python manage.py showmigrations
```

**Critérios de Sucesso:**
- [ ] Setup executa sem erros
- [ ] Venv criado corretamente
- [ ] Dependências instaladas
- [ ] Migrações aplicadas
- [ ] Superusuário criado
- [ ] Mensagens claras e coloridas

---

### 🎯 TAREFA 3: Criar Scripts Auxiliares

#### 3.1. Script de Testes (test.sh)

**Arquivo:** `/media/Arquivos/DjangoPython/DocesGIamor/backend/test.sh`

```bash
#!/bin/bash

# Script para executar testes
# Uso: ./test.sh [app_name]

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

source venv/bin/activate

if [ -z "$1" ]; then
    echo -e "${YELLOW}🧪 Executando todos os testes...${NC}"
    python manage.py test --verbosity=2
else
    echo -e "${YELLOW}🧪 Executando testes de: $1${NC}"
    python manage.py test apps.$1 --verbosity=2
fi

echo -e "${GREEN}✅ Testes concluídos!${NC}"
```

**Testes:**
```bash
chmod +x test.sh
./test.sh                    # Todos os testes
./test.sh products          # Testes de uma app
./test.sh ingredients       # Testes de outra app
```

#### 3.2. Script de Migrações (migrate.sh)

**Arquivo:** `/media/Arquivos/DjangoPython/DocesGIamor/backend/migrate.sh`

```bash
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

source venv/bin/activate

ACTION=${1:-apply}

case $ACTION in
    make)
        echo -e "${YELLOW}📝 Criando migrações...${NC}"
        python manage.py makemigrations
        echo -e "${GREEN}✓ Migrações criadas${NC}"
        ;;
    apply)
        echo -e "${YELLOW}⚙️  Aplicando migrações...${NC}"
        python manage.py migrate
        echo -e "${GREEN}✓ Migrações aplicadas${NC}"
        ;;
    show)
        echo -e "${BLUE}📋 Status das migrações:${NC}"
        python manage.py showmigrations
        ;;
    *)
        echo -e "${YELLOW}Uso: ./migrate.sh [make|apply|show]${NC}"
        exit 1
        ;;
esac
```

**Testes:**
```bash
chmod +x migrate.sh
./migrate.sh show           # Ver status
./migrate.sh make           # Criar migrações
./migrate.sh apply          # Aplicar migrações
./migrate.sh                # Padrão: apply
```

#### 3.3. Script Django Shell (shell.sh)

**Arquivo:** `/media/Arquivos/DjangoPython/DocesGIamor/backend/shell.sh`

```bash
#!/bin/bash

# Script para abrir Django shell
# Uso: ./shell.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}🐍 Abrindo Django shell...${NC}"

source venv/bin/activate
python manage.py shell
```

**Testes:**
```bash
chmod +x shell.sh
./shell.sh
>>> from django.contrib.auth.models import User
>>> User.objects.count()
>>> exit()
```

#### 3.4. Script de Limpeza (clean.sh)

**Arquivo:** `/media/Arquivos/DjangoPython/DocesGIamor/backend/clean.sh`

```bash
#!/bin/bash

# Script para limpar arquivos temporários
# Uso: ./clean.sh

set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
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
```

**Testes:**
```bash
chmod +x clean.sh
./clean.sh
find . -name "*.pyc" | wc -l  # Deve retornar 0
```

---

### 🎯 TAREFA 4: Configurar .gitignore

**Arquivo:** `/media/Arquivos/DjangoPython/DocesGIamor/backend/.gitignore`

```gitignore
# Python
*.py[cod]
*$py.class
*.so
.Python

# Virtual Environment
venv/
env/
ENV/
.venv

# Django
*.log
db.sqlite3
db.sqlite3-journal
media/
staticfiles/

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store

# Environment variables
.env
.env.local
.env.*.local

# Testing
.coverage
htmlcov/
.pytest_cache/
.tox/

# Cache
__pycache__/
*.pyc
*.pyo

# Backup files
*.bak
*.backup
```

**Testes:**
```bash
cd /media/Arquivos/DjangoPython/DocesGIamor/backend
git status  # Verificar o que está sendo ignorado
git check-ignore -v venv/  # Deve mostrar que está ignorado
git check-ignore -v db.sqlite3  # Deve mostrar que está ignorado
```

**Critérios de Sucesso:**
- [ ] Arquivos temporários ignorados
- [ ] venv/ não aparece no git status
- [ ] db.sqlite3 ignorado
- [ ] .env ignorado

---

### 🎯 TAREFA 5: Criar README do Backend

**Arquivo:** `/media/Arquivos/DjangoPython/DocesGIamor/backend/README.md`

```markdown
# 🍰 DocesGIamor - Backend API

Sistema de gerenciamento para confeitaria com cálculo de custos, precificação e controle de estoque.

## 🚀 Quick Start

### Instalação

```bash
# 1. Clone o repositório
cd backend/

# 2. Execute o script de setup
chmod +x setup.sh
./setup.sh
```

### Iniciar Servidor

```bash
# Porta padrão (8000)
./run.sh

# Porta personalizada
./run.sh 8080
```

### Acessar a Aplicação

- **Admin:** http://127.0.0.1:8000/admin
- **API Docs:** http://127.0.0.1:8000/api/docs
- **API Schema:** http://127.0.0.1:8000/api/schema

**Credenciais padrão:**
- Username: `admin`
- Password: `admin123`

## 📋 Scripts Disponíveis

| Script | Descrição | Uso |
|--------|-----------|-----|
| `./run.sh` | Inicia o servidor | `./run.sh [porta]` |
| `./setup.sh` | Configuração inicial | `./setup.sh` |
| `./test.sh` | Executa testes | `./test.sh [app]` |
| `./migrate.sh` | Gerencia migrações | `./migrate.sh [make\|apply\|show]` |
| `./shell.sh` | Abre Django shell | `./shell.sh` |
| `./clean.sh` | Limpa arquivos temporários | `./clean.sh` |

## 🏗️ Estrutura do Projeto

```
backend/
├── apps/                    # Aplicações Django
│   ├── users/              # Autenticação e usuários
│   ├── ingredients/        # Ingredientes
│   ├── products/           # Produtos
│   ├── calculations/       # Cálculos de custo
│   ├── templates/          # Templates de produtos
│   ├── shopping/           # Lista de compras
│   └── dashboard/          # Dashboard
├── config/                 # Configurações Django
│   └── settings/          # Settings modulares
│       ├── base.py        # Configurações base
│       ├── development.py # Desenvolvimento
│       └── production.py  # Produção
├── manage.py
└── requirements.txt

```

## 🔧 Comandos Úteis

### Desenvolvimento

```bash
# Criar nova migração
./migrate.sh make

# Aplicar migrações
./migrate.sh apply

# Ver status das migrações
./migrate.sh show

# Executar testes
./test.sh

# Executar testes de uma app específica
./test.sh products

# Abrir shell Django
./shell.sh

# Limpar arquivos temporários
./clean.sh
```

### Criar Superusuário

```bash
source venv/bin/activate
python manage.py createsuperuser
```

## 🧪 Testes

```bash
# Todos os testes
./test.sh

# Testes de uma app
./test.sh products

# Testes com cobertura
source venv/bin/activate
coverage run --source='.' manage.py test
coverage report
```

## 🐛 Troubleshooting

### Problema: "source: arquivo ou diretório inexistente"

**Solução:** Use bash em vez de zsh:
```bash
bash ./run.sh
```

Ou configure o shell padrão:
```bash
# No seu .zshrc
alias activate-venv="source venv/bin/activate"
```

### Problema: Porta já em uso

**Solução:** Use outra porta:
```bash
./run.sh 8080
```

Ou mate o processo:
```bash
lsof -ti:8000 | xargs kill -9
```

### Problema: Migrações não aplicadas

**Solução:**
```bash
./migrate.sh apply
```

### Problema: Dependências desatualizadas

**Solução:**
```bash
source venv/bin/activate
pip install --upgrade -r requirements.txt
```

## 📦 Dependências Principais

- Django 5.2.7
- Django REST Framework
- djangorestframework-simplejwt
- django-cors-headers
- drf-spectacular
- python-decouple
- dj-database-url

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend:

```env
# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (produção)
DATABASE_URL=postgresql://user:password@localhost/dbname

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## 🌐 API Endpoints

### Autenticação
- `POST /api/token/` - Obter token JWT
- `POST /api/token/refresh/` - Renovar token

### Ingredientes
- `GET /api/ingredients/` - Listar ingredientes
- `POST /api/ingredients/` - Criar ingrediente
- `GET /api/ingredients/{id}/` - Detalhes do ingrediente
- `PUT /api/ingredients/{id}/` - Atualizar ingrediente
- `DELETE /api/ingredients/{id}/` - Deletar ingrediente

### Produtos
- `GET /api/products/` - Listar produtos
- `POST /api/products/` - Criar produto
- `GET /api/products/{id}/` - Detalhes do produto
- `PUT /api/products/{id}/` - Atualizar produto
- `DELETE /api/products/{id}/` - Deletar produto

### Cálculos
- `POST /api/calculations/cost/` - Calcular custo
- `POST /api/calculations/price/` - Calcular preço

## 📝 Licença

Este projeto é privado e confidencial.
```

**Testes:**
```bash
# Verificar se README é renderizado corretamente
cat backend/README.md

# Testar todos os comandos listados
./run.sh
./setup.sh
./test.sh
./migrate.sh show
./shell.sh
./clean.sh
```

---

### 🎯 TAREFA 6: Criar Script de Validação Completa

**Arquivo:** `/media/Arquivos/DjangoPython/DocesGIamor/backend/validate.sh`

```bash
#!/bin/bash

# Script de validação completa do ambiente
# Uso: ./validate.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  🔍 Validação Completa do Backend${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

ERRORS=0

# 1. Verificar Python
echo -e "${YELLOW}[1/8] Verificando Python...${NC}"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓ $PYTHON_VERSION${NC}"
else
    echo -e "${RED}✗ Python 3 não encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 2. Verificar Virtual Environment
echo -e "${YELLOW}[2/8] Verificando ambiente virtual...${NC}"
if [ -d "venv" ]; then
    echo -e "${GREEN}✓ venv/ existe${NC}"
    if [ -f "venv/bin/python" ]; then
        echo -e "${GREEN}✓ venv/bin/python existe${NC}"
    else
        echo -e "${RED}✗ venv/bin/python não encontrado${NC}"
        ((ERRORS++))
    fi
else
    echo -e "${RED}✗ venv/ não encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 3. Verificar Django
echo -e "${YELLOW}[3/8] Verificando Django...${NC}"
source venv/bin/activate
if python -c "import django" 2>/dev/null; then
    DJANGO_VERSION=$(python -c "import django; print(django.__version__)")
    echo -e "${GREEN}✓ Django $DJANGO_VERSION instalado${NC}"
    
    # Django check
    if python manage.py check > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Django check passou${NC}"
    else
        echo -e "${RED}✗ Django check falhou${NC}"
        ((ERRORS++))
    fi
else
    echo -e "${RED}✗ Django não encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 4. Verificar Migrações
echo -e "${YELLOW}[4/8] Verificando migrações...${NC}"
if python manage.py showmigrations | grep -q "\[ \]"; then
    echo -e "${RED}✗ Há migrações não aplicadas${NC}"
    ((ERRORS++))
else
    echo -e "${GREEN}✓ Todas as migrações aplicadas${NC}"
fi
echo ""

# 5. Verificar Banco de Dados
echo -e "${YELLOW}[5/8] Verificando banco de dados...${NC}"
if [ -f "db.sqlite3" ]; then
    echo -e "${GREEN}✓ db.sqlite3 existe${NC}"
    
    # Verificar superusuário
    if python manage.py shell -c "from django.contrib.auth.models import User; print('OK' if User.objects.filter(is_superuser=True).exists() else 'NO')" 2>/dev/null | grep -q "OK"; then
        echo -e "${GREEN}✓ Superusuário existe${NC}"
    else
        echo -e "${RED}✗ Nenhum superusuário encontrado${NC}"
        ((ERRORS++))
    fi
else
    echo -e "${RED}✗ db.sqlite3 não encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 6. Verificar Scripts
echo -e "${YELLOW}[6/8] Verificando scripts...${NC}"
SCRIPTS=("run.sh" "setup.sh" "test.sh" "migrate.sh" "shell.sh" "clean.sh")
for script in "${SCRIPTS[@]}"; do
    if [ -f "$script" ] && [ -x "$script" ]; then
        echo -e "${GREEN}✓ $script OK${NC}"
    else
        echo -e "${RED}✗ $script não encontrado ou sem permissão${NC}"
        ((ERRORS++))
    fi
done
echo ""

# 7. Verificar .gitignore
echo -e "${YELLOW}[7/8] Verificando .gitignore...${NC}"
if [ -f ".gitignore" ]; then
    if grep -q "venv/" .gitignore && grep -q "db.sqlite3" .gitignore; then
        echo -e "${GREEN}✓ .gitignore configurado${NC}"
    else
        echo -e "${RED}✗ .gitignore incompleto${NC}"
        ((ERRORS++))
    fi
else
    echo -e "${RED}✗ .gitignore não encontrado${NC}"
    ((ERRORS++))
fi
echo ""

# 8. Verificar Servidor
echo -e "${YELLOW}[8/8] Verificando servidor (porta 8000)...${NC}"
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠ Servidor já está rodando na porta 8000${NC}"
else
    echo -e "${GREEN}✓ Porta 8000 disponível${NC}"
fi
echo ""

# Resumo
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Validação concluída: TUDO OK!${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}Ambiente pronto para uso!${NC}"
    echo -e "${YELLOW}Execute: ./run.sh${NC}"
else
    echo -e "${RED}❌ Validação falhou: $ERRORS erro(s) encontrado(s)${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}Execute: ./setup.sh${NC}"
    exit 1
fi
```

**Testes:**
```bash
chmod +x validate.sh
./validate.sh  # Deve passar todas as validações
```

---

## 🧪 Checklist de Testes Completo

### ✅ Pré-requisitos
- [ ] Python 3.12+ instalado
- [ ] Git configurado
- [ ] Acesso ao diretório do projeto

### ✅ Teste de Setup
```bash
cd /media/Arquivos/DjangoPython/DocesGIamor/backend

# 1. Limpar ambiente
rm -rf venv db.sqlite3

# 2. Executar setup
chmod +x setup.sh
./setup.sh

# 3. Validar
./validate.sh
```

### ✅ Teste de Scripts
```bash
# 1. Todos os scripts executáveis
chmod +x *.sh
ls -la *.sh  # Todos devem ter 'x'

# 2. Testar run.sh
./run.sh &
sleep 5
curl -I http://127.0.0.1:8000/admin/
kill %1

# 3. Testar migrate.sh
./migrate.sh show
./migrate.sh apply

# 4. Testar shell.sh
echo "from django.contrib.auth.models import User; print(User.objects.count())" | ./shell.sh

# 5. Testar test.sh
./test.sh

# 6. Testar clean.sh
touch test.pyc
./clean.sh
[ ! -f test.pyc ] && echo "✓ Limpeza OK"
```

### ✅ Teste de Servidor
```bash
# 1. Iniciar servidor
./run.sh 8000 &
PID=$!

# 2. Aguardar inicialização
sleep 5

# 3. Testar endpoints
curl -I http://127.0.0.1:8000/admin/ | grep "200 OK"
curl -I http://127.0.0.1:8000/api/docs/ | grep "200 OK"

# 4. Parar servidor
kill $PID
```

### ✅ Teste de Autenticação
```bash
source venv/bin/activate

# 1. Criar token
curl -X POST http://127.0.0.1:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 2. Usar token (substituir TOKEN)
TOKEN="seu_token_aqui"
curl -H "Authorization: Bearer $TOKEN" \
  http://127.0.0.1:8000/api/ingredients/
```

### ✅ Teste de Git
```bash
# 1. Verificar .gitignore
git status | grep -v "venv/"
git status | grep -v "db.sqlite3"

# 2. Commit de scripts
git add *.sh .gitignore README.md
git commit -m "feat: adicionar scripts de automação e documentação"
git push
```

---

## 📊 Métricas de Sucesso

### Critérios de Aceitação

1. **Setup Automatizado**
   - [ ] `./setup.sh` executa sem erros
   - [ ] Ambiente configurado em < 2 minutos
   - [ ] Superusuário criado automaticamente

2. **Servidor**
   - [ ] `./run.sh` inicia servidor
   - [ ] Admin acessível
   - [ ] API Docs acessível
   - [ ] Endpoints respondem corretamente

3. **Scripts**
   - [ ] Todos os scripts são executáveis
   - [ ] Mensagens claras e coloridas
   - [ ] Tratamento de erros adequado

4. **Documentação**
   - [ ] README completo e claro
   - [ ] Troubleshooting documentado
   - [ ] Exemplos de uso presentes

5. **Git**
   - [ ] .gitignore configurado
   - [ ] Arquivos temporários ignorados
   - [ ] Commits organizados

---

## 🚀 Ordem de Execução

Execute as tarefas nesta ordem:

1. **TAREFA 1:** Criar `run.sh`
2. **TAREFA 2:** Atualizar `setup.sh`
3. **TAREFA 3:** Criar scripts auxiliares (test.sh, migrate.sh, shell.sh, clean.sh)
4. **TAREFA 4:** Configurar `.gitignore`
5. **TAREFA 5:** Criar `README.md`
6. **TAREFA 6:** Criar `validate.sh`
7. **Executar checklist de testes completo**
8. **Commit e push das alterações**

---

## 📝 Notas Finais

- Todos os scripts usam `#!/bin/bash` para compatibilidade
- Mensagens coloridas para melhor UX
- Tratamento de erros robusto
- Documentação completa
- Testes abrangentes

**Estimativa de tempo:** 30-45 minutos para execução completa

**Última atualização:** 14 de outubro de 2025
