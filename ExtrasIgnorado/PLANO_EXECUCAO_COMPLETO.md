# 🚀 PLANO DE EXECUÇÃO COMPLETO - Sistema Doces GIamor

## 📋 Índice
1. [Modelo de Trabalho](#modelo-de-trabalho)
2. [Estrutura Geral](#estrutura-geral)
3. [Fases Detalhadas](#fases-detalhadas)
4. [Comandos e Fluxos](#comandos-e-fluxos)
5. [Checklist de Progresso](#checklist-de-progresso)

---

## 🎯 MODELO DE TRABALHO

### COPILOT (GitHub Copilot CLI)
**Papel:** Orquestrador e Revisor de Qualidade

**Responsabilidades:**
- ✅ Analisar requisitos e definir arquitetura
- ✅ Criar especificações detalhadas para cada tarefa
- ✅ Delegar 100% das tarefas de código para Qwen CLI
- ✅ Revisar qualidade do código entregue
- ✅ Aprovar ou solicitar correções
- ✅ Manter visão estratégica do projeto

**NÃO faz:**
- ❌ Implementar código
- ❌ Escrever testes
- ❌ Criar documentação técnica
- ❌ Fazer configurações

### QWEN CLI
**Papel:** Executor Total

**Responsabilidades:**
- ✅ Implementar 100% do código (simples e complexo)
- ✅ Criar 100% dos testes unitários
- ✅ Escrever 100% da documentação
- ✅ Fazer 100% das configurações
- ✅ Formatar código (black, prettier)
- ✅ Perguntar ao Copilot quando tiver dúvidas
- ✅ Corrigir baseado no feedback

---

## 📊 ESTRUTURA GERAL

### Stack Tecnológico
**Backend:**
- Django 5.0.0 + Django REST Framework 3.14.0
- PostgreSQL (produção) / SQLite (desenvolvimento)
- JWT Authentication (SimpleJWT 5.3.1)
- Swagger Documentation (drf-spectacular 0.27.0)

**Frontend:**
- React 18 + Vite 5
- Tailwind CSS 3
- React Router v6
- Axios
- Recharts (gráficos)

**DevOps:**
- Backend: Railway/Render
- Frontend: Vercel
- PostgreSQL: Supabase/Railway

### Total de Tarefas: 128
- Copilot: 0 tarefas de código (100% orquestração/revisão)
- Qwen CLI: 128 tarefas (100% execução)

---

## 🚀 FASES DETALHADAS

## FASE 0: Preparação (10 tarefas - 2 dias)

### Objetivo
Configurar ambiente de desenvolvimento completo

### Tarefas para QWEN CLI

#### Task 0.1: Verificar Pré-requisitos
```bash
Executor: QWEN CLI
Tempo: 10 min
Complexidade: Baixa

Criar script de verificação:
1. Verificar Python 3.10+
2. Verificar Node.js 18+
3. Verificar PostgreSQL 14+
4. Verificar Git
5. Gerar relatório de status

Output: tools/scripts/check_requirements.sh
```

#### Task 0.2: Criar Estrutura de Diretórios
```bash
Executor: QWEN CLI
Tempo: 15 min
Complexidade: Baixa

Criar estrutura completa:
DocesGIamor/
├── backend/
│   ├── config/
│   ├── apps/
│   ├── core/
│   ├── tests/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── docs/
└── tools/

Output: Estrutura completa + README em cada pasta
```

#### Task 0.3: Criar .gitignore Completo
```bash
Executor: QWEN CLI
Tempo: 10 min
Complexidade: Baixa

Criar .gitignore com:
- Python (venv, __pycache__, *.pyc, etc)
- Node.js (node_modules, build, dist)
- IDEs (VS Code, PyCharm)
- Database (*.sqlite3, dumps)
- Environment (.env, .env.local)
- OS (macOS, Windows, Linux)

Output: .gitignore
```

#### Task 0.4: Criar .env.example
```bash
Executor: QWEN CLI
Tempo: 15 min
Complexidade: Baixa

Template de variáveis:
# Backend
SECRET_KEY=django-insecure-CHANGE-THIS
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Frontend
VITE_API_URL=http://localhost:8000/api

Output: .env.example com comentários explicativos
```

#### Task 0.5: Criar requirements.txt Base
```bash
Executor: QWEN CLI
Tempo: 15 min
Complexidade: Baixa

Dependências organizadas:
# Core
Django==5.0.0
djangorestframework==3.14.0
djangorestframework-simplejwt==5.3.1

# Database
psycopg2-binary==2.9.9
dj-database-url==2.1.0

# Utils
python-decouple==3.8
django-cors-headers==4.3.1
pillow==10.1.0

# Dev/Quality
pytest==7.4.3
pytest-django==4.7.0
black==23.12.1
pylint==3.0.3
isort==5.13.2

# Docs
drf-spectacular==0.27.0

Output: backend/requirements.txt
```

#### Task 0.6: Setup Frontend Dependencies
```bash
Executor: QWEN CLI
Tempo: 20 min
Complexidade: Baixa

Script para instalar:
# Roteamento
react-router-dom@6

# HTTP
axios

# UI/Estilo
tailwindcss postcss autoprefixer
@headlessui/react
@heroicons/react

# Forms
react-hook-form

# Charts
recharts

# Utils
date-fns
clsx

Output: frontend/setup_dependencies.sh
```

#### Task 0.7: Configurar Tailwind CSS
```bash
Executor: QWEN CLI
Tempo: 20 min
Complexidade: Média

1. Criar tailwind.config.js:
   - Content paths corretos
   - Tema customizado (cores do projeto)
   - Plugins necessários

2. Criar postcss.config.js

3. Criar src/index.css:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

4. Importar em main.jsx

Output: Tailwind completamente configurado
```

#### Task 0.8: Criar README.md Principal
```bash
Executor: QWEN CLI
Tempo: 30 min
Complexidade: Baixa

Seções:
1. Título e descrição
2. Badges (Build, License, Version)
3. Tecnologias utilizadas
4. Pré-requisitos
5. Instalação (Backend + Frontend)
6. Como rodar
7. Estrutura de pastas
8. API Documentation
9. Contribuição
10. Licença

Output: README.md formatado com emojis
```

#### Task 0.9: Criar Script de Setup Automático
```bash
Executor: QWEN CLI
Tempo: 25 min
Complexidade: Média

Script que:
1. Verifica pré-requisitos
2. Cria estrutura de diretórios
3. Copia .env.example para .env
4. Cria venv Python
5. Instala dependências backend
6. Instala dependências frontend
7. Configura Git

Output: tools/scripts/auto_setup.sh
```

#### Task 0.10: Criar .editorconfig
```bash
Executor: QWEN CLI
Tempo: 10 min
Complexidade: Baixa

Configurar:
- indent_style = space
- indent_size = 4 (Python) / 2 (JS/JSX)
- end_of_line = lf
- charset = utf-8
- trim_trailing_whitespace = true
- insert_final_newline = true

Output: .editorconfig
```

### Critérios de Aprovação (COPILOT revisa)
- ✅ Estrutura completa criada
- ✅ Todos scripts funcionam
- ✅ Documentação clara
- ✅ Configurações corretas

---

## FASE 1: Setup Backend (10 tarefas - 3 dias)

### Objetivo
Configurar projeto Django com DRF, JWT, CORS e Swagger

### Orientações COPILOT (antes da execução)

**Arquitetura de Settings:**
```
config/settings/
├── __init__.py
├── base.py          # Settings compartilhados
├── development.py   # Dev (SQLite, DEBUG=True)
└── production.py    # Prod (PostgreSQL, DEBUG=False)
```

**Apps a criar:**
```
apps/
├── users/          # Autenticação
├── ingredients/    # Ingredientes
├── products/       # Produtos/Receitas
├── calculations/   # Cálculos de custo
├── templates/      # Receitas pré-configuradas
├── shopping/       # Lista de compras
└── dashboard/      # Dashboard e relatórios
```

### Tarefas para QWEN CLI

#### Task 1.1: Criar Projeto Django
```bash
Executor: QWEN CLI
Tempo: 15 min
Complexidade: Baixa

Comandos:
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
django-admin startproject config .

Validar:
python manage.py runserver

Output: Projeto Django criado e funcionando
```

#### Task 1.2: Refatorar Settings (Dev/Prod)
```bash
Executor: QWEN CLI
Tempo: 45 min
Complexidade: Média

1. Criar config/settings/__init__.py
2. Mover settings.py → settings/base.py
3. Criar development.py:
   from .base import *
   DEBUG = True
   ALLOWED_HOSTS = ['localhost', '127.0.0.1']
   DATABASES = {'default': {'ENGINE': 'django.db.backends.sqlite3', ...}}

4. Criar production.py:
   from .base import *
   DEBUG = False
   ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())
   DATABASES = {'default': dj_database_url.config(...)}

5. Atualizar manage.py e wsgi.py

Output: Settings modular funcionando
```

#### Task 1.3: Configurar Variáveis de Ambiente
```bash
Executor: QWEN CLI
Tempo: 20 min
Complexidade: Baixa

No settings/base.py:
from decouple import config, Csv

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='', cast=Csv())

Criar .env:
SECRET_KEY=django-insecure-dev-key-CHANGE-IN-PROD
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1

Output: Decouple configurado
```

#### Task 1.4: Configurar PostgreSQL
```bash
Executor: QWEN CLI
Tempo: 30 min
Complexidade: Média

1. No settings/base.py:
   import dj_database_url
   DATABASES = {
       'default': dj_database_url.config(
           default='sqlite:///db.sqlite3',
           conn_max_age=600
       )
   }

2. No settings/production.py:
   DATABASES['default'] = dj_database_url.config(
       conn_max_age=600,
       conn_health_checks=True,
   )

3. Atualizar .env.example:
   DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

Output: PostgreSQL configurado
```

#### Task 1.5: Configurar Django REST Framework
```bash
Executor: QWEN CLI
Tempo: 40 min
Complexidade: Média

No settings/base.py:

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
}

Output: DRF configurado
```

#### Task 1.6: Configurar CORS
```bash
Executor: QWEN CLI
Tempo: 20 min
Complexidade: Baixa

INSTALLED_APPS += ['corsheaders']

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # No topo
    ...
]

# development.py
CORS_ALLOW_ALL_ORIGINS = True

# production.py
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv())
CORS_ALLOW_CREDENTIALS = True

Output: CORS configurado
```

#### Task 1.7: Configurar Spectacular (Swagger)
```bash
Executor: QWEN CLI
Tempo: 25 min
Complexidade: Baixa

INSTALLED_APPS += ['drf_spectacular']

SPECTACULAR_SETTINGS = {
    'TITLE': 'Doces GIamor API',
    'DESCRIPTION': 'API para controle de custos de confeitaria',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
}

No config/urls.py:
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),
]

Output: Swagger acessível em /api/docs/
```

#### Task 1.8: Criar Estrutura de Apps
```bash
Executor: QWEN CLI
Tempo: 40 min
Complexidade: Média

1. Criar apps/__init__.py

2. Criar apps:
   python manage.py startapp users apps/users
   python manage.py startapp ingredients apps/ingredients
   python manage.py startapp products apps/products
   python manage.py startapp calculations apps/calculations
   python manage.py startapp templates apps/templates
   python manage.py startapp shopping apps/shopping
   python manage.py startapp dashboard apps/dashboard

3. Em cada app, criar:
   - serializers.py
   - urls.py

4. Atualizar INSTALLED_APPS:
   'apps.users',
   'apps.ingredients',
   'apps.products',
   'apps.calculations',
   'apps.templates',
   'apps.shopping',
   'apps.dashboard',

5. Criar apps/urls.py:
   urlpatterns = [
       path('users/', include('apps.users.urls')),
       path('ingredients/', include('apps.ingredients.urls')),
       ...
   ]

6. Em config/urls.py:
   path('api/', include('apps.urls')),

Output: 7 apps criados e configurados
```

#### Task 1.9: Criar Core (BaseModel e Utils)
```bash
Executor: QWEN CLI
Tempo: 35 min
Complexidade: Média

Criar core/models.py:
import uuid
from django.db import models

class BaseModel(models.Model):
    """
    Modelo base com campos comuns a todos os models
    """
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        abstract = True

Criar core/permissions.py:
from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """Permissão para verificar se usuário é dono do objeto"""
    def has_object_permission(self, request, view, obj):
        return hasattr(obj, 'user') and obj.user == request.user

Criar core/utils.py:
# Funções utilitárias compartilhadas

Output: Core completo
```

#### Task 1.10: Executar Migrações e Criar Superuser
```bash
Executor: QWEN CLI
Tempo: 15 min
Complexidade: Baixa

Comandos:
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

Script para popular dados de teste (opcional):
python manage.py loaddata fixtures/initial_data.json

Output: Banco criado, admin acessível
```

### Critérios de Aprovação (COPILOT revisa)
- ✅ Server roda sem erros
- ✅ Settings seguros (secrets via env)
- ✅ PostgreSQL conectado
- ✅ Swagger acessível em /api/docs/
- ✅ CORS funcionando
- ✅ 7 apps criados
- ✅ Admin acessível

---

## FASE 2: Autenticação (9 tarefas - 3 dias)

### Objetivo
Sistema completo de autenticação com JWT

### Orientações COPILOT

**Modelo User:**
```python
- Herdar de: AbstractBaseUser + PermissionsMixin + BaseModel
- Campo de login: EMAIL (não username)
- Campos: email, name, phone, default_margin
- UserManager customizado
- UUID como primary key
- Soft delete (is_active)
```

**Endpoints:**
```
POST   /api/users/register/        # Registro
POST   /api/users/login/           # Login (retorna JWT)
POST   /api/token/refresh/         # Refresh token
GET    /api/users/profile/         # Perfil do usuário logado
PUT    /api/users/profile/         # Atualizar perfil
POST   /api/users/change-password/ # Alterar senha
```

### Tarefas para QWEN CLI

#### Task 2.1: Criar User Model
```bash
Executor: QWEN CLI
Tempo: 1h
Complexidade: Alta

Criar apps/users/models.py:

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from core.models import BaseModel

class UserManager(BaseUserManager):
    """Manager customizado para User"""
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email é obrigatório')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    """
    Modelo de usuário customizado usando email como login
    """
    email = models.EmailField(unique=True, verbose_name='E-mail')
    name = models.CharField(max_length=255, verbose_name='Nome completo')
    phone = models.CharField(max_length=20, blank=True, null=True)
    default_margin = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=100.00,
        help_text='Margem de lucro padrão em %'
    )
    is_staff = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
    
    def __str__(self):
        return self.email

Em settings/base.py:
AUTH_USER_MODEL = 'users.User'

Output: User model completo
```

#### Task 2.2: Criar Serializers de User
```bash
Executor: QWEN CLI
Tempo: 45 min
Complexidade: Média

Criar apps/users/serializers.py:

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer para exibir dados do usuário"""
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'phone', 'default_margin', 'created_at']
        read_only_fields = ['id', 'created_at']

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer para registro de novos usuários"""
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'name', 'phone']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "As senhas não coincidem"})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Serializer customizado para JWT com dados do usuário"""
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data

class ChangePasswordSerializer(serializers.Serializer):
    """Serializer para alteração de senha"""
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

Output: Serializers completos
```

#### Task 2.3: Criar Views de Autenticação
```bash
Executor: QWEN CLI
Tempo: 1h
Complexidade: Alta

Criar apps/users/views.py:

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer, RegisterSerializer, 
    CustomTokenObtainPairSerializer, ChangePasswordSerializer
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """Registro de novos usuários"""
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    """Login customizado com dados do usuário"""
    serializer_class = CustomTokenObtainPairSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    """Perfil do usuário logado"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class ChangePasswordView(generics.UpdateAPIView):
    """Alteração de senha"""
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {'old_password': 'Senha atual incorreta'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'message': 'Senha alterada com sucesso'})

Output: Views completas
```

#### Task 2.4: Configurar URLs de Autenticação
```bash
Executor: QWEN CLI
Tempo: 15 min
Complexidade: Baixa

Criar apps/users/urls.py:

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView, CustomTokenObtainPairView, 
    ProfileView, ChangePasswordView
)

app_name = 'users'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
]

Output: URLs configuradas
```

#### Task 2.5: Configurar Admin de User
```bash
Executor: QWEN CLI
Tempo: 20 min
Complexidade: Baixa

Criar apps/users/admin.py:

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'name', 'is_staff', 'is_active', 'created_at']
    list_filter = ['is_staff', 'is_active', 'created_at']
    search_fields = ['email', 'name']
    ordering = ['-created_at']
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Informações Pessoais', {'fields': ('name', 'phone', 'default_margin')}),
        ('Permissões', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Datas', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'last_login']

Output: Admin configurado
```

#### Task 2.6: Criar Migrações de User
```bash
Executor: QWEN CLI
Tempo: 15 min
Complexidade: Baixa

Comandos:
python manage.py makemigrations users
python manage.py migrate users

Validar:
python manage.py shell
>>> from django.contrib.auth import get_user_model
>>> User = get_user_model()
>>> User.objects.create_user(email='test@test.com', password='test123', name='Test')

Output: Migrações executadas, User funciona
```

#### Task 2.7: Criar Testes de Autenticação
```bash
Executor: QWEN CLI
Tempo: 1.5h
Complexidade: Alta

Criar apps/users/tests.py:

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()

class UserModelTests(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(
            email='test@test.com',
            password='testpass123',
            name='Test User'
        )
        self.assertEqual(user.email, 'test@test.com')
        self.assertTrue(user.check_password('testpass123'))
        self.assertFalse(user.is_staff)
    
    def test_create_superuser(self):
        user = User.objects.create_superuser(
            email='admin@test.com',
            password='admin123',
            name='Admin'
        )
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

class AuthAPITests(APITestCase):
    def test_register_user(self):
        data = {
            'email': 'newuser@test.com',
            'password': 'SecurePass123!',
            'password2': 'SecurePass123!',
            'name': 'New User'
        }
        response = self.client.post('/api/users/register/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_login_user(self):
        User.objects.create_user(
            email='user@test.com',
            password='pass123',
            name='User'
        )
        data = {'email': 'user@test.com', 'password': 'pass123'}
        response = self.client.post('/api/users/login/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def test_profile_authenticated(self):
        user = User.objects.create_user(
            email='user@test.com',
            password='pass123',
            name='User'
        )
        self.client.force_authenticate(user=user)
        response = self.client.get('/api/users/profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'user@test.com')

Output: Testes completos (cobertura >80%)
```

#### Task 2.8: Documentar API de Autenticação
```bash
Executor: QWEN CLI
Tempo: 30 min
Complexidade: Baixa

Criar docs/API_AUTH.md:

# API de Autenticação

## Endpoints

### Registro
POST /api/users/register/
Body: {
  "email": "user@example.com",
  "password": "SecurePass123!",
  "password2": "SecurePass123!",
  "name": "João Silva",
  "phone": "(11) 99999-9999"
}
Response 201: { "id": "uuid", "email": "...", ... }

### Login
POST /api/users/login/
Body: {"email": "user@example.com", "password": "SecurePass123!"}
Response 200: {
  "access": "eyJ...",
  "refresh": "eyJ...",
  "user": {...}
}

### Refresh Token
POST /api/token/refresh/
Body: {"refresh": "eyJ..."}
Response 200: {"access": "eyJ..."}

### Perfil
GET /api/users/profile/
Headers: Authorization: Bearer {access_token}
Response 200: {"id": "...", "email": "...", ...}

PUT /api/users/profile/
Headers: Authorization: Bearer {access_token}
Body: {"name": "Novo Nome", "phone": "..."}
Response 200: {...}

### Alterar Senha
POST /api/users/change-password/
Headers: Authorization: Bearer {access_token}
Body: {
  "old_password": "OldPass123!",
  "new_password": "NewPass123!"
}
Response 200: {"message": "Senha alterada com sucesso"}

## Exemplos cURL

### Registro
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!","password2":"Test123!","name":"Test User"}'

### Login
curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}'

Output: Documentação completa
```

#### Task 2.9: Criar Script de Teste Manual
```bash
Executor: QWEN CLI
Tempo: 20 min
Complexidade: Baixa

Criar tools/scripts/test_auth.sh:

#!/bin/bash

BASE_URL="http://localhost:8000/api"

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "=== Testando API de Autenticação ==="

# 1. Registro
echo -e "\n${GREEN}1. Testando Registro...${NC}"
REGISTER=$(curl -s -X POST $BASE_URL/users/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!","password2":"Test123!","name":"Test User"}')
echo $REGISTER | jq

# 2. Login
echo -e "\n${GREEN}2. Testando Login...${NC}"
LOGIN=$(curl -s -X POST $BASE_URL/users/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}')
echo $LOGIN | jq

TOKEN=$(echo $LOGIN | jq -r '.access')

# 3. Perfil
echo -e "\n${GREEN}3. Testando Perfil...${NC}"
curl -s -X GET $BASE_URL/users/profile/ \
  -H "Authorization: Bearer $TOKEN" | jq

echo -e "\n${GREEN}Testes concluídos!${NC}"

Output: Script de teste funcionando
```

### Critérios de Aprovação (COPILOT revisa)
- ✅ User model criado e funciona
- ✅ Registro funciona
- ✅ Login retorna JWT e dados do user
- ✅ Perfil acessível com token
- ✅ Alteração de senha funciona
- ✅ Testes passam (cobertura >80%)
- ✅ Admin funciona
- ✅ Documentação completa

---

## 🔄 FLUXO DE EXECUÇÃO

### Passo a Passo

1. **COPILOT ANALISA FASE**
   ```
   - Lê documentação da fase
   - Identifica dependências
   - Define arquitetura
   - Prepara especificações
   ```

2. **COPILOT DELEGA PARA QWEN**
   ```
   - Envia especificação detalhada
   - Define critérios de aceitação
   - Especifica outputs esperados
   ```

3. **QWEN EXECUTA**
   ```
   - Lê especificação
   - Pergunta se tiver dúvidas
   - Implementa código
   - Cria testes
   - Documenta
   - Auto-valida
   - Submete para revisão
   ```

4. **COPILOT REVISA**
   ```
   - Verifica código
   - Executa testes
   - Valida documentação
   - Decide: APROVAR ou CORRIGIR
   ```

5. **SE APROVADO**
   ```
   - Marca tarefa como completa
   - Atualiza progresso
   - Avança para próxima tarefa
   ```

6. **SE PRECISA CORREÇÃO**
   ```
   - Lista problemas específicos
   - Sugere soluções
   - Re-delega para Qwen
   - (volta para passo 3)
   ```

---

## ✅ CHECKLIST DE PROGRESSO

### Fase 0: Preparação (0/10 - 0%)
- [ ] Task 0.1: Verificar pré-requisitos
- [ ] Task 0.2: Criar estrutura de diretórios
- [ ] Task 0.3: Criar .gitignore
- [ ] Task 0.4: Criar .env.example
- [ ] Task 0.5: Criar requirements.txt
- [ ] Task 0.6: Setup frontend dependencies
- [ ] Task 0.7: Configurar Tailwind CSS
- [ ] Task 0.8: Criar README.md
- [ ] Task 0.9: Script de setup automático
- [ ] Task 0.10: Criar .editorconfig

### Fase 1: Setup Backend (0/10 - 0%)
- [ ] Task 1.1: Criar projeto Django
- [ ] Task 1.2: Refatorar settings
- [ ] Task 1.3: Configurar variáveis env
- [ ] Task 1.4: Configurar PostgreSQL
- [ ] Task 1.5: Configurar DRF
- [ ] Task 1.6: Configurar CORS
- [ ] Task 1.7: Configurar Swagger
- [ ] Task 1.8: Criar apps
- [ ] Task 1.9: Criar Core
- [ ] Task 1.10: Migrações

### Fase 2: Autenticação (0/9 - 0%)
- [ ] Task 2.1: User model
- [ ] Task 2.2: Serializers
- [ ] Task 2.3: Views
- [ ] Task 2.4: URLs
- [ ] Task 2.5: Admin
- [ ] Task 2.6: Migrações
- [ ] Task 2.7: Testes
- [ ] Task 2.8: Documentação
- [ ] Task 2.9: Script de teste

### Progresso Total: 0/29 (0%)

---

## 📝 PRÓXIMAS FASES (Resumo)

### Fase 3: Ingredientes (8 tarefas)
- CRUD completo de ingredientes
- Filtros e busca
- Testes e documentação

### Fase 4: Produtos (10 tarefas)
- CRUD de produtos com ingredientes aninhados
- Upload de imagens
- Duplicação de produtos

### Fase 5: Cálculos (8 tarefas)
- Motor de cálculo de custos
- Simulador de preços
- API de cálculos

### Fase 6: Templates (6 tarefas)
- 10 receitas pré-configuradas
- Sistema de clonagem
- Fixtures

### Fase 7: Dashboard (7 tarefas)
- Estatísticas agregadas
- Métricas
- Gráficos

### Fase 8: Lista de Compras (6 tarefas)
- Consolidação de ingredientes
- Exportação

### Fases 9-14: Frontend (42 tarefas)
- Setup React + Vite
- Autenticação
- CRUD completo
- Dashboard visual
- Responsividade

### Fases 15-16: Testes e Deploy (16 tarefas)
- Testes E2E
- Deploy backend/frontend
- CI/CD

---

## 🚀 COMANDOS RÁPIDOS

### Para iniciar Fase 0:
```bash
cd /media/Arquivos/DjangoPython/DocesGIamor
# Copilot analisa e delega para Qwen
# Qwen executa todas as 10 tarefas
# Copilot revisa e aprova
```

### Para validar progresso:
```bash
git log --oneline --graph
pytest --cov
python manage.py check
npm run build
```

---

**Status:** ✅ PRONTO PARA EXECUÇÃO  
**Última atualização:** 2025-01-10  
**Versão:** 1.0.0
