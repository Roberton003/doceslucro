# 🚀 PLANO DE EXECUÇÃO DETALHADO - Doces GIamor

## 📋 MODELO DE TRABALHO

### GitHub Copilot (Orquestrador e Revisor)
**Responsabilidades:**
- ✅ Analisar requisitos e definir arquitetura
- ✅ Delegar 100% das tarefas para Qwen CLI
- ✅ Revisar qualidade do código entregue
- ✅ Aprovar ou solicitar correções
- ❌ **NÃO implementa código**

### Qwen CLI (Executor)
**Responsabilidades:**
- ✅ Executar 100% das tarefas de código
- ✅ Criar testes unitários
- ✅ Escrever documentação
- ✅ Fazer configurações
- ✅ Perguntar ao Copilot quando tiver dúvidas
- ✅ Corrigir baseado no feedback

---

## 📊 VISÃO GERAL DO PROJETO

**Nome:** Sistema de Controle de Custos para Confeitaria - Doces GIamor

**Tecnologias:**
- **Backend:** Django 5.0 + DRF + JWT + PostgreSQL
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Deploy:** Railway (backend) + Vercel (frontend)

**Total de Fases:** 16
**Total de Tarefas:** ~128
**Duração Estimada:** 10 semanas (full-time) ou 4-5 meses (part-time)

**Executor de Código:** Qwen CLI 100%
**Revisor:** GitHub Copilot 100%

---

## 🎯 FASE 0: PREPARAÇÃO DO AMBIENTE (2 dias - 10 tarefas)

### Objetivos
- Configurar ambiente de desenvolvimento
- Criar estrutura de diretórios
- Configurar Git e ferramentas

### Tarefas para QWEN CLI

#### ✅ Task 0.1: Verificar Pré-requisitos (10 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie um script de verificação de pré-requisitos que:

1. Verifique Python 3.10+ está instalado
2. Verifique Node.js 18+ está instalado  
3. Verifique PostgreSQL 14+ está instalado
4. Verifique Git está configurado
5. Gere relatório de status (OK ou ERRO)

Salve em: tools/scripts/check_requirements.sh
```

**Critérios de Aceitação (Copilot revisa):**
- ✅ Script verifica todas as ferramentas
- ✅ Relatório claro e informativo
- ✅ Script executável e funcional

---

#### ✅ Task 0.2: Criar Estrutura de Diretórios (15 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie um script que gere a seguinte estrutura:

DocesGIamor/
├── backend/
│   ├── config/
│   ├── apps/
│   ├── core/
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── contexts/
│   │   └── utils/
│   └── public/
├── docs/
└── tools/
    └── scripts/

Adicione um README.md em cada pasta explicando seu propósito.

Salve script em: tools/scripts/create_structure.sh
```

**Critérios de Aceitação:**
- ✅ Estrutura completa criada
- ✅ README em cada pasta
- ✅ Script reutilizável

---

#### ✅ Task 0.3: Criar .gitignore Completo (10 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie um .gitignore completo com:

Python/Django:
- venv/, .venv/
- __pycache__/
- *.pyc, *.pyo
- *.sqlite3
- db.sqlite3
- /media/
- /static/

Node.js/React:
- node_modules/
- /dist/
- /build/
- .env.local

IDEs:
- .vscode/
- .idea/
- *.swp

Environment:
- .env
- .env.local
- .env.*.local

OS:
- .DS_Store
- Thumbs.db

Salve em: .gitignore
```

**Critérios de Aceitação:**
- ✅ Cobre Python, Node.js, IDEs e OS
- ✅ Organizado por categorias
- ✅ Comentários explicativos

---

#### ✅ Task 0.4: Criar .env.example (15 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie um template de variáveis de ambiente:

# Backend Django
SECRET_KEY=django-insecure-CHANGE-THIS-IN-PRODUCTION
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Frontend React
VITE_API_URL=http://localhost:8000/api

Adicione comentários explicando:
- Como gerar SECRET_KEY
- Diferença entre dev e prod
- Formatos aceitos

Salve em: .env.example
```

**Critérios de Aceitação:**
- ✅ Todas variáveis necessárias
- ✅ Comentários explicativos
- ✅ Valores de exemplo válidos

---

#### ✅ Task 0.5: Criar requirements.txt Base (15 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie requirements.txt organizado:

# Core Framework
Django==5.0.0
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1

# Database
psycopg2-binary==2.9.9
dj-database-url==2.1.0

# Utils & Security
python-decouple==3.8
django-cors-headers==4.3.1
pillow==10.1.0

# Development & Quality
pytest==7.4.3
pytest-django==4.7.0
black==23.12.1
pylint==3.0.3
isort==5.13.2

# API Documentation
drf-spectacular==0.27.0

Salve em: backend/requirements.txt
```

**Critérios de Aceitação:**
- ✅ Versões fixas especificadas
- ✅ Organizado por categoria
- ✅ Todas dependências necessárias

---

#### ✅ Task 0.6: Setup Frontend Dependencies (20 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie script que instale dependências frontend:

npm install react-router-dom@6
npm install axios
npm install -D tailwindcss postcss autoprefixer
npm install @headlessui/react
npm install @heroicons/react
npm install react-hook-form
npm install recharts
npm install date-fns
npm install clsx

Crie também package.json scripts úteis:
- "dev": "vite"
- "build": "vite build"
- "preview": "vite preview"
- "lint": "eslint src --ext js,jsx"
- "format": "prettier --write \"src/**/*.{js,jsx}\""

Salve script em: frontend/setup_dependencies.sh
```

**Critérios de Aceitação:**
- ✅ Script instala todas deps
- ✅ package.json atualizado
- ✅ Scripts npm funcionais

---

#### ✅ Task 0.7: Configurar Tailwind CSS (20 min)
**Delegação do Copilot para Qwen:**
```
Qwen, configure Tailwind CSS completo:

1. Crie tailwind.config.js:
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',    // Rosa (doces)
        secondary: '#9C27B0',  // Roxo
        accent: '#FF9800',     // Laranja
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}

2. Crie postcss.config.js

3. Crie src/index.css:
@tailwind base;
@tailwind components;
@tailwind utilities;

4. Importe em src/main.jsx

Outputs: tailwind.config.js, postcss.config.js, src/index.css
```

**Critérios de Aceitação:**
- ✅ Tailwind configurado corretamente
- ✅ Tema customizado com cores
- ✅ Import no main.jsx

---

#### ✅ Task 0.8: Criar README.md Principal (30 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie README.md profissional com:

# 🍰 Sistema Doces GIamor

[Badges: Build Status, License MIT, Version]

## 📋 Descrição
Sistema web para controle de custos de produção de doces...

## 🚀 Tecnologias
- Backend: Django 5 + DRF + JWT
- Frontend: React 18 + Vite + Tailwind
- Database: PostgreSQL

## 📦 Pré-requisitos
- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

## 🔧 Instalação

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp ../.env.example .env
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📚 Estrutura de Pastas
...

## 📝 Licença
MIT

Salve em: README.md
```

**Critérios de Aceitação:**
- ✅ Markdown bem formatado
- ✅ Instruções claras
- ✅ Badges e emojis
- ✅ Links funcionais

---

#### ✅ Task 0.9: Script de Setup Automático (25 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie script que automatize todo setup:

#!/bin/bash
set -e

echo "🚀 Iniciando setup do projeto Doces GIamor..."

# 1. Verificar pré-requisitos
echo "📋 Verificando pré-requisitos..."
bash tools/scripts/check_requirements.sh

# 2. Criar estrutura
echo "📁 Criando estrutura de diretórios..."
bash tools/scripts/create_structure.sh

# 3. Configurar ambiente
echo "⚙️  Configurando ambiente..."
cp .env.example .env

# 4. Setup backend
echo "🐍 Configurando backend..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# 5. Setup frontend
echo "⚛️  Configurando frontend..."
cd frontend
npm install
cd ..

echo "✅ Setup concluído!"
echo "Execute: cd backend && source venv/bin/activate && python manage.py runserver"

Salve em: tools/scripts/auto_setup.sh
```

**Critérios de Aceitação:**
- ✅ Script executa sem erros
- ✅ Cobre backend e frontend
- ✅ Feedback visual claro

---

#### ✅ Task 0.10: Criar .editorconfig (10 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie .editorconfig para consistência:

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.py]
indent_style = space
indent_size = 4

[*.{js,jsx,json}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

Salve em: .editorconfig
```

**Critérios de Aceitação:**
- ✅ Configurado para Python e JS
- ✅ Regras consistentes
- ✅ Funciona em todos editores

---

### ✅ Critérios de Conclusão da Fase 0 (Copilot Valida)
- ✅ Todos os scripts criados e funcionais
- ✅ Estrutura de diretórios completa
- ✅ Configurações corretas
- ✅ Documentação clara
- ✅ Git configurado
- ✅ Primeiro commit realizado

---

## 🎯 FASE 1: SETUP BACKEND DJANGO (3 dias - 10 tarefas)

### Objetivos
- Configurar projeto Django com DRF
- Configurar JWT e CORS
- Configurar Swagger/OpenAPI
- Criar estrutura de apps

### Orientações do Copilot (Antes da Execução)

**Arquitetura de Settings:**
```
config/settings/
├── __init__.py
├── base.py          # Settings compartilhados
├── development.py   # Dev: SQLite, DEBUG=True
└── production.py    # Prod: PostgreSQL, DEBUG=False
```

**Apps a Criar:**
- users/ (autenticação)
- ingredients/ (ingredientes)
- products/ (produtos/receitas)
- calculations/ (cálculos)
- templates/ (receitas pré-configuradas)
- shopping/ (lista de compras)
- dashboard/ (dashboard e relatórios)

### Tarefas para QWEN CLI

#### ✅ Task 1.1: Criar Projeto Django (15 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie o projeto Django:

1. Ative o venv:
cd backend
source venv/bin/activate

2. Instale dependências:
pip install -r requirements.txt

3. Crie projeto:
django-admin startproject config .

4. Teste:
python manage.py runserver

Deve rodar sem erros em http://localhost:8000

Output: Projeto Django criado e funcionando
```

**Critérios de Aceitação:**
- ✅ Projeto criado sem erros
- ✅ Server roda com sucesso
- ✅ Página inicial do Django visível

---

#### ✅ Task 1.2: Refatorar Settings (Dev/Prod) (45 min)
**Delegação do Copilot para Qwen:**
```
Qwen, refatore settings para dev/prod:

1. Crie config/settings/__init__.py
2. Mova config/settings.py → config/settings/base.py
3. Crie config/settings/development.py:

from .base import *

DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

4. Crie config/settings/production.py:

from .base import *
from decouple import config, Csv
import dj_database_url

DEBUG = False
ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL')
    )
}

5. Atualize manage.py:
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')

6. Atualize config/wsgi.py:
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')

Output: Settings modular funcionando
```

**Critérios de Aceitação:**
- ✅ Settings separados (base/dev/prod)
- ✅ Server roda com development
- ✅ Sem erros de import

---

#### ✅ Task 1.3: Configurar Variáveis de Ambiente (20 min)
**Delegação do Copilot para Qwen:**
```
Qwen, configure python-decouple:

1. No settings/base.py:
from decouple import config, Csv
from pathlib import Path

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)

2. Crie backend/.env:
SECRET_KEY=django-insecure-dev-key-CHANGE-IN-PRODUCTION
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173

3. Adicione backend/.env ao .gitignore

4. Verifique que funciona:
python manage.py check

Output: Decouple configurado e funcionando
```

**Critérios de Aceitação:**
- ✅ Decouple importado
- ✅ Variáveis carregadas do .env
- ✅ Sem valores hardcoded

---

#### ✅ Task 1.4: Configurar PostgreSQL (30 min)
**Delegação do Copilot para Qwen:**
```
Qwen, configure suporte a PostgreSQL:

1. Em settings/base.py:
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///db.sqlite3',
        conn_max_age=600
    )
}

2. Em settings/production.py:
DATABASES['default'] = dj_database_url.config(
    default=config('DATABASE_URL'),
    conn_max_age=600,
    conn_health_checks=True,
)

3. Atualize .env.example:
# Development (SQLite)
DATABASE_URL=sqlite:///db.sqlite3

# Production (PostgreSQL)
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

Output: PostgreSQL configurado
```

**Critérios de Aceitação:**
- ✅ SQLite funciona em dev
- ✅ PostgreSQL configurado para prod
- ✅ dj-database-url funcionando

---

#### ✅ Task 1.5: Configurar Django REST Framework (40 min)
**Delegação do Copilot para Qwen:**
```
Qwen, configure DRF completo:

Em settings/base.py:

INSTALLED_APPS += [
    'rest_framework',
    'rest_framework_simplejwt',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

Output: DRF configurado
```

**Critérios de Aceitação:**
- ✅ DRF instalado
- ✅ JWT configurado
- ✅ Paginação ativa
- ✅ Filtros habilitados

---

#### ✅ Task 1.6: Configurar CORS (20 min)
**Delegação do Copilot para Qwen:**
```
Qwen, configure django-cors-headers:

Em settings/base.py:

INSTALLED_APPS += [
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # No topo!
    'django.middleware.security.SecurityMiddleware',
    # ... resto
]

Em settings/development.py:
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

Em settings/production.py:
from decouple import config, Csv

CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    cast=Csv()
)
CORS_ALLOW_CREDENTIALS = True

Output: CORS configurado
```

**Critérios de Aceitação:**
- ✅ CORS middleware instalado
- ✅ Dev permite todas origens
- ✅ Prod usa variável de ambiente

---

#### ✅ Task 1.7: Configurar Spectacular (Swagger) (25 min)
**Delegação do Copilot para Qwen:**
```
Qwen, configure Swagger com drf-spectacular:

Em settings/base.py:

INSTALLED_APPS += [
    'drf_spectacular',
]

SPECTACULAR_SETTINGS = {
    'TITLE': 'Doces GIamor API',
    'DESCRIPTION': 'API para controle de custos de confeitaria',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'COMPONENT_SPLIT_REQUEST': True,
}

Em config/urls.py:

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

Teste: http://localhost:8000/api/docs/

Output: Swagger acessível
```

**Critérios de Aceitação:**
- ✅ Spectacular instalado
- ✅ Schema gerado
- ✅ Swagger UI acessível
- ✅ ReDoc acessível

---

#### ✅ Task 1.8: Criar Estrutura de Apps (40 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie os 7 apps do projeto:

1. Crie diretório apps/:
mkdir -p apps
touch apps/__init__.py

2. Crie apps:
python manage.py startapp users apps/users
python manage.py startapp ingredients apps/ingredients
python manage.py startapp products apps/products
python manage.py startapp calculations apps/calculations
python manage.py startapp templates apps/templates
python manage.py startapp shopping apps/shopping
python manage.py startapp dashboard apps/dashboard

3. Em cada app, crie:
- serializers.py
- urls.py

4. Em settings/base.py:
INSTALLED_APPS += [
    'apps.users',
    'apps.ingredients',
    'apps.products',
    'apps.calculations',
    'apps.templates',
    'apps.shopping',
    'apps.dashboard',
]

5. Crie apps/urls.py:
from django.urls import path, include

urlpatterns = [
    path('users/', include('apps.users.urls')),
    path('ingredients/', include('apps.ingredients.urls')),
    path('products/', include('apps.products.urls')),
    path('calculations/', include('apps.calculations.urls')),
    path('templates/', include('apps.templates.urls')),
    path('shopping/', include('apps.shopping.urls')),
    path('dashboard/', include('apps.dashboard.urls')),
]

6. Em config/urls.py:
path('api/', include('apps.urls')),

Output: 7 apps criados e integrados
```

**Critérios de Aceitação:**
- ✅ 7 apps criados
- ✅ serializers.py em cada app
- ✅ urls.py em cada app
- ✅ Todos apps em INSTALLED_APPS
- ✅ URLs configuradas

---

#### ✅ Task 1.9: Criar Core (Models Base e Utils) (35 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie módulo core/ com código reutilizável:

1. Crie core/__init__.py

2. Crie core/models.py:
import uuid
from django.db import models

class BaseModel(models.Model):
    """
    Modelo base abstrato com campos comuns.
    Todos os models do projeto devem herdar deste.
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        verbose_name='ID'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Criado em'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Atualizado em'
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name='Ativo'
    )

    class Meta:
        abstract = True
        ordering = ['-created_at']

3. Crie core/permissions.py:
from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Permissão customizada: apenas o dono do objeto pode acessar.
    """
    message = 'Você não tem permissão para acessar este recurso.'

    def has_object_permission(self, request, view, obj):
        # obj deve ter atributo 'user'
        return hasattr(obj, 'user') and obj.user == request.user

4. Crie core/utils.py:
from decimal import Decimal

def calculate_percentage(value, percentage):
    """Calcula porcentagem de um valor"""
    return Decimal(value) * (Decimal(percentage) / Decimal(100))

def format_currency(value):
    """Formata valor para moeda brasileira"""
    return f"R$ {value:.2f}"

Output: Core completo e reutilizável
```

**Critérios de Aceitação:**
- ✅ BaseModel com UUID e timestamps
- ✅ IsOwner permission criado
- ✅ Utils com funções úteis
- ✅ Documentação em docstrings

---

#### ✅ Task 1.10: Executar Migrações Iniciais (15 min)
**Delegação do Copilot para Qwen:**
```
Qwen, execute migrações e crie superuser:

1. Migrações:
python manage.py makemigrations
python manage.py migrate

2. Crie superuser:
python manage.py createsuperuser
Email: admin@admin.com
Senha: admin123

3. Teste admin:
python manage.py runserver
Acesse: http://localhost:8000/admin/

4. Crie script de validação:
echo "✅ Verificando instalação..."
python manage.py check --deploy
python manage.py showmigrations

Output: Banco criado, admin acessível
```

**Critérios de Aceitação:**
- ✅ Migrações executadas
- ✅ Superuser criado
- ✅ Admin acessível
- ✅ python manage.py check passa

---

### ✅ Critérios de Conclusão da Fase 1 (Copilot Valida)
- ✅ Django configurado (dev/prod)
- ✅ DRF + JWT funcionando
- ✅ CORS configurado
- ✅ Swagger acessível
- ✅ 7 apps criados
- ✅ Core models e utils prontos
- ✅ Migrações executadas
- ✅ Admin funcionando

**Comando de Validação:**
```bash
python manage.py check --deploy
python manage.py test
curl http://localhost:8000/api/docs/
```

---

## 🎯 FASE 2: AUTENTICAÇÃO COM JWT (3 dias - 9 tarefas)

### Objetivos
- Criar modelo User customizado
- Implementar registro, login e perfil
- Configurar JWT completo
- Testes e documentação

### Orientações do Copilot

**Modelo User:**
- Herdar de: `AbstractBaseUser + PermissionsMixin + BaseModel`
- Login por: **EMAIL** (não username)
- Campos: `email`, `name`, `phone`, `default_margin`
- Soft delete via `is_active`

**Endpoints:**
```
POST   /api/users/register/         # Registro
POST   /api/users/login/            # Login → JWT
POST   /api/token/refresh/          # Refresh token
GET    /api/users/profile/          # Ver perfil
PUT    /api/users/profile/          # Editar perfil
POST   /api/users/change-password/  # Alterar senha
```

### Tarefas para QWEN CLI

#### ✅ Task 2.1: Criar User Model (1h)
**Delegação do Copilot para Qwen:**
```
Qwen, crie modelo User customizado em apps/users/models.py:

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from core.models import BaseModel

class UserManager(BaseUserManager):
    """Manager customizado para User"""
    
    def create_user(self, email, password=None, **extra_fields):
        """Cria e salva um usuário"""
        if not email:
            raise ValueError('Email é obrigatório')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        """Cria e salva um superusuário"""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser precisa ter is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser precisa ter is_superuser=True')
        
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    """
    Modelo de usuário customizado.
    Usa email como identificador único ao invés de username.
    """
    email = models.EmailField(
        unique=True,
        verbose_name='E-mail'
    )
    name = models.CharField(
        max_length=255,
        verbose_name='Nome completo'
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        verbose_name='Telefone'
    )
    default_margin = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=100.00,
        verbose_name='Margem padrão',
        help_text='Margem de lucro padrão em porcentagem (%)'
    )
    is_staff = models.BooleanField(
        default=False,
        verbose_name='Membro da equipe'
    )
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
    
    def __str__(self):
        return self.email

Configure em settings/base.py:
AUTH_USER_MODEL = 'users.User'

Execute:
python manage.py makemigrations users
python manage.py migrate users

Output: User model criado e migrado
```

**Critérios de Aceitação:**
- ✅ UserManager implementado
- ✅ User herda de AbstractBaseUser, PermissionsMixin, BaseModel
- ✅ EMAIL é USERNAME_FIELD
- ✅ Campos corretos
- ✅ Migração executada
- ✅ Docstrings completos

---

#### ✅ Task 2.2: Criar Serializers (45 min)
**Delegação do Copilot para Qwen:**
```
Qwen, crie serializers em apps/users/serializers.py:

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer para exibição de dados do usuário"""
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'name', 'phone',
            'default_margin', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer para registro de novos usuários"""
    
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        label='Confirmar senha'
    )
    
    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'name', 'phone']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "As senhas não coincidem"
            })
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Serializer JWT customizado que retorna dados do usuário"""
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data

class ChangePasswordSerializer(serializers.Serializer):
    """Serializer para alteração de senha"""
    
    old_password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )

Output: 4 serializers criados
```

**Critérios de Aceitação:**
- ✅ UserSerializer completo
- ✅ RegisterSerializer com validação de senha
- ✅ CustomTokenObtainPairSerializer retorna user
- ✅ ChangePasswordSerializer funcional
- ✅ Docstrings presentes

---

#### ✅ Task 2.3: Criar Views (1h)
**Delegação do Copilot para Qwen:**
```
Qwen, crie views em apps/users/views.py:

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema
from .serializers import (
    UserSerializer,
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """
    Endpoint para registro de novos usuários.
    Não requer autenticação.
    """
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer
    
    @extend_schema(
        summary='Registrar novo usuário',
        description='Cria uma nova conta de usuário',
        tags=['Autenticação']
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Endpoint customizado de login.
    Retorna JWT tokens + dados do usuário.
    """
    serializer_class = CustomTokenObtainPairSerializer
    
    @extend_schema(
        summary='Login',
        description='Autentica usuário e retorna JWT tokens',
        tags=['Autenticação']
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

class ProfileView(generics.RetrieveUpdateAPIView):
    """
    Endpoint para ver e atualizar perfil do usuário logado.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    @extend_schema(
        summary='Ver perfil',
        description='Retorna dados do usuário autenticado',
        tags=['Usuário']
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    @extend_schema(
        summary='Atualizar perfil',
        description='Atualiza dados do usuário autenticado',
        tags=['Usuário']
    )
    def put(self, request, *args, **kwargs):
        return super().put(request, *args, **kwargs)

class ChangePasswordView(generics.UpdateAPIView):
    """
    Endpoint para alteração de senha.
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        summary='Alterar senha',
        description='Altera a senha do usuário autenticado',
        tags=['Usuário']
    )
    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        
        # Verifica senha antiga
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {'old_password': ['Senha atual incorreta']},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Define nova senha
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        
        return Response(
            {'message': 'Senha alterada com sucesso'},
            status=status.HTTP_200_OK
        )

Output: Views completas com Swagger docs
```

**Critérios de Aceitação:**
- ✅ RegisterView funciona
- ✅ Login retorna JWT + user
- ✅ ProfileView GET/PUT funciona
- ✅ ChangePasswordView funciona
- ✅ Swagger tags configurados
- ✅ Docstrings completos

---

[CONTINUA COM TASKS 2.4 a 2.9...]

## 📝 RESUMO DAS PRÓXIMAS FASES

### Fase 3: Ingredientes (5 dias - 8 tarefas)
### Fase 4: Produtos (7 dias - 10 tarefas)
### Fase 5: Cálculos (5 dias - 8 tarefas)
### Fase 6: Receitas Pré-configuradas (3 dias - 6 tarefas)
### Fase 7: Dashboard (4 dias - 7 tarefas)
### Fase 8: Lista de Compras (3 dias - 6 tarefas)
### Fases 9-14: Frontend (20 dias - 42 tarefas)
### Fases 15-16: Testes e Deploy (6 dias - 16 tarefas)

---

## 🔄 FLUXO DE TRABALHO

### 1. Copilot Analisa Fase
- Lê requisitos da fase
- Define arquitetura
- Prepara orientações

### 2. Copilot Delega para Qwen
- Cria prompt detalhado
- Especifica critérios de aceitação
- Define outputs esperados

### 3. Qwen Executa
- Lê especificação
- Pergunta se tiver dúvidas
- Implementa código
- Cria testes
- Documenta
- Auto-valida
- Submete para revisão

### 4. Copilot Revisa
- Verifica código
- Executa testes
- Valida documentação
- **APROVAR** ou **SOLICITAR CORREÇÕES**

### 5. Loop de Feedback
- Se aprovado: próxima tarefa
- Se precisa correção: volta para Qwen

---

## ✅ CHECKLIST DE PROGRESSO GERAL

### ✅ Fase 0: Preparação (0/10)
- [ ] 0.1 - Verificar pré-requisitos
- [ ] 0.2 - Estrutura de diretórios
- [ ] 0.3 - .gitignore
- [ ] 0.4 - .env.example
- [ ] 0.5 - requirements.txt
- [ ] 0.6 - Frontend deps
- [ ] 0.7 - Tailwind CSS
- [ ] 0.8 - README.md
- [ ] 0.9 - Script setup
- [ ] 0.10 - .editorconfig

### ✅ Fase 1: Setup Backend (0/10)
- [ ] 1.1 - Criar projeto Django
- [ ] 1.2 - Refatorar settings
- [ ] 1.3 - Variáveis env
- [ ] 1.4 - PostgreSQL
- [ ] 1.5 - DRF
- [ ] 1.6 - CORS
- [ ] 1.7 - Swagger
- [ ] 1.8 - Criar apps
- [ ] 1.9 - Core
- [ ] 1.10 - Migrações

### ✅ Fase 2: Autenticação (0/9)
- [ ] 2.1 - User model
- [ ] 2.2 - Serializers
- [ ] 2.3 - Views
- [ ] 2.4 - URLs
- [ ] 2.5 - Admin
- [ ] 2.6 - Migrações
- [ ] 2.7 - Testes
- [ ] 2.8 - Documentação
- [ ] 2.9 - Script teste

**Progresso Total: 0/29 (0%)**

---

## 🚀 COMANDOS DE INÍCIO

```bash
# 1. Clonar/Acessar projeto
cd /media/Arquivos/DjangoPython/DocesGIamor

# 2. Iniciar Fase 0 com Qwen CLI
# Copilot delega → Qwen executa → Copilot revisa

# 3. Validar progresso
git log --oneline
python manage.py check
npm run build
```

---

**Status:** ✅ PRONTO PARA EXECUÇÃO  
**Modelo:** Copilot (Orquestrador) + Qwen (Executor 100%)  
**Data:** 2025-01-10  
**Versão:** 1.0.0
