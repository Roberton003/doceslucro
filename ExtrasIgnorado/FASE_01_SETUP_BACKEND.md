# 🔧 FASE 1: Setup do Backend Django

**Duração:** 5 dias  
**Prioridade:** P0 (Crítico)  
**Responsável:** Copilot (decisões) + Qwen (execução)

---

## 🎯 Objetivos

- [ ] Criar projeto Django com estrutura modular
- [ ] Configurar settings para dev/production
- [ ] Configurar PostgreSQL
- [ ] Instalar e configurar DRF
- [ ] Configurar CORS
- [ ] Preparar estrutura de apps

---

## 📋 Checklist de Tarefas

### 1️⃣ Criar Projeto Django

**Tarefa para: DESENVOLVEDOR**

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt

# Criar projeto Django
django-admin startproject config .

# Testar
python manage.py runserver
```

**Checklist:**
- [ ] Django instalado
- [ ] Projeto 'config' criado
- [ ] manage.py presente
- [ ] Servidor de desenvolvimento funciona

---

### 2️⃣ Reestruturar Settings para Dev/Prod

**Tarefa para: COPILOT (decisão arquitetural) → QWEN (implementação)**

**Decisão Copilot:**
```
Estrutura de settings:
config/
├── settings/
│   ├── __init__.py
│   ├── base.py       # Settings compartilhados
│   ├── development.py # Settings de desenvolvimento
│   └── production.py  # Settings de produção
```

**Prompt para Qwen:**
```
Refatore a estrutura de settings do Django:

1. Crie a pasta config/settings/

2. Mova settings.py para settings/base.py

3. Crie settings/__init__.py importando base

4. Crie settings/development.py herdando de base com:
   - DEBUG = True
   - ALLOWED_HOSTS = ['localhost', '127.0.0.1']
   - SQLite database
   - Configurações de dev

5. Crie settings/production.py herdando de base com:
   - DEBUG = False
   - ALLOWED_HOSTS via env
   - PostgreSQL via DATABASE_URL
   - Security settings

6. Atualize manage.py e wsgi.py para usar o novo caminho

Implemente todas as mudanças necessárias.
```

**Arquivos esperados:**
- `config/settings/__init__.py`
- `config/settings/base.py`
- `config/settings/development.py`
- `config/settings/production.py`

**Checklist:**
- [ ] Pasta settings criada
- [ ] base.py com settings compartilhados
- [ ] development.py configurado
- [ ] production.py configurado
- [ ] manage.py atualizado
- [ ] Teste: `python manage.py runserver` funciona

---

### 3️⃣ Configurar Variáveis de Ambiente

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Configure python-decouple para gerenciar variáveis de ambiente:

1. No base.py, importe decouple:
   from decouple import config, Csv

2. Substitua valores hardcoded por:
   SECRET_KEY = config('SECRET_KEY')
   DEBUG = config('DEBUG', default=False, cast=bool)
   ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

3. Crie arquivo .env na raiz do backend/:
   SECRET_KEY=sua-chave-secreta-aqui
   DEBUG=True
   DATABASE_URL=sqlite:///db.sqlite3
   ALLOWED_HOSTS=localhost,127.0.0.1

4. Atualize .env.example com exemplos

Implemente todas as mudanças.
```

**Checklist:**
- [ ] decouple configurado em base.py
- [ ] SECRET_KEY via env
- [ ] DEBUG via env
- [ ] Arquivo .env criado
- [ ] .env.example atualizado
- [ ] .env no .gitignore

**Validação:**
```bash
python -c "from config.settings import base; print(base.SECRET_KEY)"
```

---

### 4️⃣ Configurar PostgreSQL

**Tarefa para: DESENVOLVEDOR + QWEN**

**Parte 1 - DESENVOLVEDOR: Criar banco**
```bash
# Acessar PostgreSQL
sudo -u postgres psql

# Criar banco e usuário
CREATE DATABASE docesglamor_dev;
CREATE USER docesglamor_user WITH PASSWORD 'sua_senha_aqui';
ALTER ROLE docesglamor_user SET client_encoding TO 'utf8';
ALTER ROLE docesglamor_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE docesglamor_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE docesglamor_dev TO docesglamor_user;
\q
```

**Parte 2 - QWEN: Configurar Django**

**Prompt para Qwen:**
```
Configure PostgreSQL no Django:

1. No settings/base.py, adicione:
   import dj_database_url
   
   DATABASES = {
       'default': dj_database_url.config(
           default='sqlite:///db.sqlite3',
           conn_max_age=600
       )
   }

2. No settings/development.py, sobrescreva se necessário:
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'docesglamor_dev',
           'USER': 'docesglamor_user',
           'PASSWORD': config('DB_PASSWORD'),
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }

3. No settings/production.py, use DATABASE_URL:
   DATABASES = {
       'default': dj_database_url.config(
           conn_max_age=600,
           conn_health_checks=True,
       )
   }

4. Atualize .env com DATABASE_URL

Implemente as configurações.
```

**Checklist:**
- [ ] PostgreSQL instalado e rodando
- [ ] Banco de dados criado
- [ ] Usuário criado
- [ ] dj-database-url configurado
- [ ] Settings configurados
- [ ] .env atualizado

**Validação:**
```bash
python manage.py dbshell  # Deve conectar no PostgreSQL
```

---

### 5️⃣ Configurar Django REST Framework

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Configure Django REST Framework:

1. No settings/base.py, adicione DRF em INSTALLED_APPS:
   INSTALLED_APPS = [
       ...
       'rest_framework',
       'rest_framework_simplejwt',
   ]

2. Adicione configurações DRF:
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

3. Configure SimpleJWT:
   from datetime import timedelta
   
   SIMPLE_JWT = {
       'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
       'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
       'ROTATE_REFRESH_TOKENS': True,
       'BLACKLIST_AFTER_ROTATION': True,
   }

4. No urls.py, adicione:
   from rest_framework_simplejwt.views import (
       TokenObtainPairView,
       TokenRefreshView,
   )
   
   urlpatterns = [
       path('admin/', admin.site.urls),
       path('api/token/', TokenObtainPairView.as_view()),
       path('api/token/refresh/', TokenRefreshView.as_view()),
   ]

Implemente todas as configurações.
```

**Checklist:**
- [ ] DRF em INSTALLED_APPS
- [ ] REST_FRAMEWORK configurado
- [ ] JWT configurado
- [ ] URLs básicas criadas
- [ ] Migrações executadas

**Validação:**
```bash
python manage.py migrate
python manage.py runserver
# Acessar: http://localhost:8000/api/token/
```

---

### 6️⃣ Configurar CORS

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Configure CORS para permitir requisições do frontend:

1. Adicione em INSTALLED_APPS:
   'corsheaders',

2. Adicione em MIDDLEWARE (no topo):
   'corsheaders.middleware.CorsMiddleware',

3. Configure CORS:
   # Development
   CORS_ALLOW_ALL_ORIGINS = config('CORS_ALLOW_ALL', default=False, cast=bool)
   
   # Production
   CORS_ALLOWED_ORIGINS = config(
       'CORS_ALLOWED_ORIGINS',
       default='http://localhost:5173',
       cast=Csv()
   )
   
   CORS_ALLOW_CREDENTIALS = True

4. No development.py:
   CORS_ALLOW_ALL_ORIGINS = True

5. No production.py:
   CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', cast=Csv())

Implemente as configurações.
```

**Checklist:**
- [ ] corsheaders instalado
- [ ] MIDDLEWARE atualizado
- [ ] CORS configurado
- [ ] Settings dev/prod corretos

---

### 7️⃣ Configurar Spectacular (Swagger)

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Configure drf-spectacular para documentação automática da API:

1. Adicione em INSTALLED_APPS:
   'drf_spectacular',

2. Configure:
   SPECTACULAR_SETTINGS = {
       'TITLE': 'Doces GIamor API',
       'DESCRIPTION': 'API para controle de custos de confeitaria',
       'VERSION': '1.0.0',
       'SERVE_INCLUDE_SCHEMA': False,
   }

3. No urls.py, adicione:
   from drf_spectacular.views import (
       SpectacularAPIView,
       SpectacularSwaggerView,
   )
   
   urlpatterns = [
       ...
       path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
       path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema')),
   ]

Implemente a documentação.
```

**Checklist:**
- [ ] drf-spectacular configurado
- [ ] URLs de documentação criadas
- [ ] Swagger acessível em /api/docs/

**Validação:**
```bash
python manage.py runserver
# Acessar: http://localhost:8000/api/docs/
```

---

### 8️⃣ Criar Estrutura de Apps

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Crie a estrutura de apps Django:

1. Na pasta backend/apps/, crie um __init__.py vazio

2. Crie os seguintes apps:
   python manage.py startapp users apps/users
   python manage.py startapp ingredients apps/ingredients
   python manage.py startapp products apps/products
   python manage.py startapp calculations apps/calculations
   python manage.py startapp templates apps/templates
   python manage.py startapp shopping apps/shopping
   python manage.py startapp dashboard apps/dashboard

3. Em cada app, crie estrutura:
   apps/NOME_APP/
   ├── __init__.py
   ├── models.py
   ├── serializers.py
   ├── views.py
   ├── urls.py
   ├── admin.py
   ├── tests.py
   └── migrations/

4. Atualize settings/base.py INSTALLED_APPS:
   INSTALLED_APPS = [
       ...
       'apps.users',
       'apps.ingredients',
       'apps.products',
       'apps.calculations',
       'apps.templates',
       'apps.shopping',
       'apps.dashboard',
   ]

5. Crie apps/urls.py para roteamento:
   from django.urls import path, include
   
   urlpatterns = [
       path('users/', include('apps.users.urls')),
       path('ingredients/', include('apps.ingredients.urls')),
       # ... outros apps
   ]

6. Inclua em config/urls.py:
   path('api/', include('apps.urls')),

Execute todos os comandos e crie arquivos necessários.
```

**Checklist:**
- [ ] Pasta apps/ criada
- [ ] 7 apps criados
- [ ] Estrutura de arquivos em cada app
- [ ] INSTALLED_APPS atualizado
- [ ] Sistema de URLs configurado

**Validação:**
```bash
python manage.py check  # Deve passar sem erros
```

---

### 9️⃣ Configurar Core (Utils Compartilhados)

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Crie módulo core para funcionalidades compartilhadas:

1. Em backend/core/, crie:
   core/
   ├── __init__.py
   ├── models.py          # Base models
   ├── permissions.py     # Permissões customizadas
   ├── utils.py          # Funções utilitárias
   ├── validators.py     # Validadores customizados
   └── mixins.py         # Mixins reutilizáveis

2. Em core/models.py:
   from django.db import models
   import uuid
   
   class BaseModel(models.Model):
       id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
       created_at = models.DateTimeField(auto_now_add=True)
       updated_at = models.DateTimeField(auto_now=True)
       is_active = models.BooleanField(default=True)
       
       class Meta:
           abstract = True

3. Em core/permissions.py:
   from rest_framework import permissions
   
   class IsOwner(permissions.BasePermission):
       def has_object_permission(self, request, view, obj):
           return obj.user == request.user

4. Em core/utils.py, adicione funções úteis

Crie todos os arquivos base.
```

**Checklist:**
- [ ] Pasta core/ criada
- [ ] BaseModel criado
- [ ] Permissões customizadas criadas
- [ ] Utils básicos criados

---

### 🔟 Executar Migrações Iniciais

**Tarefa para: DESENVOLVEDOR**

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

**Checklist:**
- [ ] Migrações criadas
- [ ] Migrações aplicadas
- [ ] Superusuário criado
- [ ] Admin acessível

**Validação:**
```bash
python manage.py runserver
# Acessar: http://localhost:8000/admin/
```

---

## ✅ Critérios de Aceitação

Fase 1 completa quando:

- [ ] Projeto Django criado e rodando
- [ ] Settings divididos (dev/prod)
- [ ] Variáveis de ambiente configuradas
- [ ] PostgreSQL configurado e conectado
- [ ] DRF instalado e configurado
- [ ] JWT configurado
- [ ] CORS configurado
- [ ] Swagger documentação funcionando
- [ ] 7 apps criados
- [ ] Core models criados
- [ ] Migrações executadas
- [ ] Admin acessível

**Comando de validação final:**
```bash
python manage.py check
python manage.py test
python manage.py runserver
# Acessar:
# - http://localhost:8000/admin/ ✅
# - http://localhost:8000/api/docs/ ✅
# - http://localhost:8000/api/token/ ✅
```

---

## 🚀 Próximos Passos

Após completar Fase 1:
→ **Avançar para FASE_02_AUTENTICACAO.md**

---

## 📝 Notas

- **Tempo estimado:** 1-2 dias (com agentes)
- **Dificuldade:** Média
- **Pode ser automatizado:** 70%
- **Depende de:** Fase 0
- **Requerido para:** Todas as fases seguintes

---

**Status:** ⏸️ Aguardando execução  
**Última atualização:** 2025-01-10
