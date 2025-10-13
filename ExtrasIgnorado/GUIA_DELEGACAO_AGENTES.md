# 🤖 GUIA DE DELEGAÇÃO PARA AGENTES

## 📋 Como Usar Este Guia

Este arquivo contém **todas as tarefas** organizadas para serem executadas pelo Qwen CLI sob supervisão do Copilot.

### 🎯 Papéis dos Agentes

**COPILOT (Orquestrador & Revisor):**
- ✅ Analisa requisitos e define estratégia
- ✅ Delega TODAS as tarefas para Qwen
- ✅ Revisa qualidade do código entregue
- ✅ Valida se atende aos requisitos
- ✅ Aprova ou solicita correções
- ❌ NÃO implementa código diretamente

**QWEN (Executor Total):**
- ✅ Executa 100% das tarefas de código
- ✅ Implementação de toda lógica (simples e complexa)
- ✅ Criação de testes unitários
- ✅ Documentação e docstrings
- ✅ Formatação de código
- ✅ Configurações e boilerplate
- ✅ Pergunta ao Copilot quando tiver dúvidas

---

## 🚀 TAREFAS POR FASE

### ✅ FASE 0: Preparação (2 dias)

**Total de tarefas: 10 | Executor: QWEN 100% | Revisor: COPILOT**

#### 🤖 Tarefas para QWEN

**Task 0.1: Criar Estrutura de Diretórios**
📋 **Delegado por:** Copilot  
🎯 **Executor:** Qwen  
✅ **Revisor:** Copilot
```bash
Prioridade: Alta
Tempo: 10 min
Complexidade: Baixa

Criar script shell que gere toda estrutura:
- backend/ (com subpastas)
- frontend/ (com subpastas)
- docs/
- tools/

Output: tools/scripts/create_structure.sh
```

**Task 0.2: Criar .gitignore Completo**
```bash
Prioridade: Alta
Tempo: 5 min
Complexidade: Baixa

Criar .gitignore para:
- Python/Django
- Node.js/React
- IDEs
- Variáveis de ambiente
- Arquivos temporários

Output: .gitignore
```

**Task 0.3: Criar .env.example**
```bash
Prioridade: Alta
Tempo: 10 min
Complexidade: Baixa

Criar template de variáveis de ambiente com:
- SECRET_KEY (explicar como gerar)
- DEBUG
- DATABASE_URL
- CORS_ALLOWED_ORIGINS
- VITE_API_URL

Output: .env.example
```

**Task 0.4: Criar requirements.txt Base**
```bash
Prioridade: Alta
Tempo: 10 min
Complexidade: Baixa

Criar requirements.txt organizado por categorias:
- Core (Django, DRF)
- Database (psycopg2)
- Auth (simplejwt)
- Utils (decouple, cors)
- Dev (pytest, black)
- Docs (spectacular)

Output: backend/requirements.txt
```

**Task 0.5: Setup Frontend Dependencies**
```bash
Prioridade: Alta
Tempo: 15 min
Complexidade: Baixa

Criar script que instale:
- react-router-dom
- axios
- tailwindcss
- recharts
- react-hook-form
- headlessui
- heroicons

Output: frontend/setup_dependencies.sh
```

**Task 0.6: Configurar Tailwind CSS**
```bash
Prioridade: Alta
Tempo: 15 min
Complexidade: Baixa

1. Criar tailwind.config.js com tema customizado
2. Criar postcss.config.js
3. Criar src/index.css com diretivas
4. Atualizar main.jsx

Output: Arquivos de configuração Tailwind
```

**Task 0.7: Criar README.md Principal**
```bash
Prioridade: Média
Tempo: 20 min
Complexidade: Baixa

README completo com:
- Badges
- Descrição do projeto
- Tecnologias
- Instalação
- Uso
- Estrutura de pastas
- Contribuição

Output: README.md
```

---

### ✅ FASE 1: Setup Backend (5 dias)

**Total de tarefas: 10 | Executor: QWEN 100% | Revisor: COPILOT**

#### 🎯 Decisão COPILOT (Apenas Orientação - NÃO implementa)

**Orientação 1.1: Estrutura de Settings**
```bash
🎯 Copilot define estratégia:
- Usar settings separados (dev/prod/base)
- PostgreSQL em prod, SQLite em dev
- Variáveis via python-decouple
- Security best practices

⚠️ COPILOT DELEGA para QWEN implementar
```

**Orientação 1.2: Configuração DRF e JWT**
```bash
🎯 Copilot define requisitos:
- JWT como autenticação padrão
- Paginação em 20 itens
- Filtros e busca habilitados
- Token válido por 24h

⚠️ COPILOT DELEGA para QWEN implementar
```

#### 🤖 Tarefas para QWEN (Implementa TUDO)

**Task 1.3: Refatorar Settings**
```bash
Prioridade: Alta
Tempo: 30 min
Complexidade: Média

Implementar estrutura decidida por Copilot:
- Mover settings.py para settings/base.py
- Criar development.py
- Criar production.py
- Atualizar imports

Output: config/settings/ completo
```

**Task 1.4: Configurar Variáveis de Ambiente**
```bash
Prioridade: Alta
Tempo: 20 min
Complexidade: Baixa

Substituir valores hardcoded por decouple:
- SECRET_KEY
- DEBUG
- DATABASE_URL
- ALLOWED_HOSTS
- CORS_ALLOWED_ORIGINS

Output: Settings com decouple configurado
```

**Task 1.5: Configurar CORS**
```bash
Prioridade: Alta
Tempo: 15 min
Complexidade: Baixa

Adicionar e configurar django-cors-headers:
- Middleware
- Settings dev/prod diferentes
- CORS_ALLOW_CREDENTIALS

Output: CORS configurado
```

**Task 1.6: Configurar Spectacular (Swagger)**
```bash
Prioridade: Média
Tempo: 20 min
Complexidade: Baixa

Configurar documentação automática:
- SPECTACULAR_SETTINGS
- URLs de schema e docs
- Customizações básicas

Output: Swagger acessível em /api/docs/
```

**Task 1.7: Criar Estrutura de Apps**
```bash
Prioridade: Alta
Tempo: 30 min
Complexidade: Média

Criar 7 apps Django:
- users
- ingredients
- products
- calculations
- templates
- shopping
- dashboard

Output: apps/ com estrutura completa
```

**Task 1.8: Criar Core Models**
```bash
Prioridade: Alta
Tempo: 25 min
Complexidade: Média

Criar em core/:
- BaseModel (UUID, timestamps, soft delete)
- Permissions customizadas
- Utils básicos
- Validators

Output: core/ completo
```

---

### ✅ FASE 2: Autenticação (5 dias)

**Total de tarefas: 9 | Executor: QWEN 100% | Revisor: COPILOT**

#### 🎯 Orientação COPILOT (Define requisitos, NÃO implementa)

**Orientação 2.1: Modelo User**
```bash
🎯 Copilot define especificação:
- Herdar de AbstractBaseUser
- EMAIL como campo de login (não username)
- Campos: name, phone, default_margin
- Soft delete (is_active)
- UUID como primary key

⚠️ COPILOT DELEGA para QWEN implementar
```

**Orientação 2.2: Sistema de Auth Completo**
```bash
🎯 Copilot define arquitetura:
- Register com validação de senha
- Login retorna JWT + dados do user
- Profile com GET/PUT
- Change password com validação
- Recuperação de senha (opcional fase 1)

⚠️ COPILOT DELEGA para QWEN implementar
```

#### 🤖 Tarefas para QWEN (Implementa TUDO)

**Task 2.3: Criar Serializers**
```bash
Prioridade: Alta
Tempo: 45 min
Complexidade: Média

Criar serializers:
- UserSerializer
- RegisterSerializer (com validação)
- CustomTokenObtainPairSerializer
- ChangePasswordSerializer

Output: apps/users/serializers.py
```

**Task 2.4: Configurar URLs**
```bash
Prioridade: Alta
Tempo: 15 min
Complexidade: Baixa

Criar URLs:
- /register/
- /login/
- /token/refresh/
- /profile/
- /change-password/

Output: apps/users/urls.py
```

**Task 2.5: Configurar Admin**
```bash
Prioridade: Média
Tempo: 20 min
Complexidade: Baixa

Criar UserAdmin com:
- list_display
- list_filter
- search_fields
- fieldsets
- readonly_fields

Output: apps/users/admin.py
```

**Task 2.6: Criar Testes de Auth**
```bash
Prioridade: Alta
Tempo: 1 hora
Complexidade: Média

Criar testes completos:
- UserRegistrationTestCase
- UserLoginTestCase
- UserProfileTestCase
- ChangePasswordTestCase

Cobertura: >80%

Output: apps/users/tests.py
```

**Task 2.7: Documentar API Auth**
```bash
Prioridade: Média
Tempo: 30 min
Complexidade: Baixa

Criar documentação:
- Docstrings em views
- Arquivo docs/API_AUTH.md
- Exemplos curl
- Exemplos de respostas

Output: Documentação completa
```

---

### ✅ FASE 3: Ingredientes (5 dias)

**Total de tarefas: 8 | Executor: QWEN 100% | Revisor: COPILOT**

#### 🎯 Orientação COPILOT (Define modelo, NÃO implementa)

**Orientação 3.1: Modelo Ingredient**
```bash
🎯 Copilot define estrutura:
- Campos: name, unit (choices), cost_per_unit, category
- ForeignKey para User (cada user tem seus ingredientes)
- Validação: custo sempre positivo
- Unique together: (user, name)

⚠️ COPILOT DELEGA para QWEN implementar
```

**Orientação 3.2: API RESTful Completa**
```bash
🎯 Copilot define API:
- CRUD completo via ViewSet
- Filtros: category, busca por name
- Ordenação: name, cost_per_unit, created_at
- Permissão: usuário só vê seus ingredientes

⚠️ COPILOT DELEGA para QWEN implementar
```

#### 🤖 Tarefas para QWEN (Implementa TUDO)

**Task 3.3: Criar Serializers**
```bash
Prioridade: Alta
Tempo: 30 min
Complexidade: Baixa

Criar:
- IngredientSerializer
- Validações customizadas
- Campos calculados

Output: apps/ingredients/serializers.py
```

**Task 3.4: Configurar URLs**
```bash
Prioridade: Alta
Tempo: 10 min
Complexidade: Baixa

Criar router DRF:
- ViewSet registration
- URLs configuradas

Output: apps/ingredients/urls.py
```

**Task 3.5: Configurar Admin**
```bash
Prioridade: Média
Tempo: 15 min
Complexidade: Baixa

IngredientAdmin com:
- list_display
- list_filter
- search_fields
- Filtros por user

Output: apps/ingredients/admin.py
```

**Task 3.6: Criar Testes CRUD**
```bash
Prioridade: Alta
Tempo: 1 hora
Complexidade: Média

Testar:
- Listagem
- Criação
- Edição
- Exclusão
- Filtros
- Busca
- Permissões

Output: apps/ingredients/tests.py
```

**Task 3.7: Adicionar Docstrings**
```bash
Prioridade: Média
Tempo: 20 min
Complexidade: Baixa

Documentar:
- Model
- Serializer
- ViewSet
- Atualizar Swagger

Output: Código documentado
```

---

### ✅ FASE 4: Produtos (10 dias)

**Total de tarefas: 10 | Executor: QWEN 100% | Revisor: COPILOT**

#### 🎯 Orientação COPILOT (Define arquitetura, NÃO implementa)

**Orientação 4.1: Modelo de Produtos Complexo**
```bash
🎯 Copilot define estrutura:
- Product: name, yield_quantity, image, category, user
- ProductIngredient (many-to-many through): product, ingredient, quantity
- Campos calculados: total_cost, unit_cost (via property)
- Relacionamento cascata com soft delete

⚠️ COPILOT DELEGA para QWEN implementar
```

**Orientação 4.2: Serializers Aninhados**
```bash
🎯 Copilot define estratégia:
- Serializer aninhado para ingredientes
- Create: aceitar lista de ingredientes
- Update: substituir ingredientes
- Retornar custos calculados
- Validar: ingredientes do mesmo user

⚠️ COPILOT DELEGA para QWEN implementar
```

**Orientação 4.3: Features Avançados**
```bash
🎯 Copilot define requisitos:
- Upload de imagem (Pillow)
- Action customizada: duplicate (copia produto)
- Filtros: category, price_range
- Busca: name, ingredients__name

⚠️ COPILOT DELEGA para QWEN implementar
```

#### 🤖 Tarefas para QWEN (Implementa TUDO)

**Task 4.4: Configurar URLs**
```bash
Prioridade: Alta
Tempo: 15 min
Complexidade: Baixa

Router com:
- ViewSet products
- Custom actions
- Nested routes

Output: apps/products/urls.py
```

**Task 4.5: Configurar Admin**
```bash
Prioridade: Média
Tempo: 30 min
Complexidade: Média

ProductAdmin com:
- Inline ProductIngredient
- list_display
- Filtros complexos
- Readonly fields

Output: apps/products/admin.py
```

**Task 4.6: Criar Testes Completos**
```bash
Prioridade: Alta
Tempo: 2 horas
Complexidade: Alta

Testar:
- CRUD completo
- Relacionamentos
- Upload de imagens
- Duplicação
- Validações
- Permissões

Output: apps/products/tests.py
```

**Task 4.7: Documentar API**
```bash
Prioridade: Média
Tempo: 45 min
Complexidade: Média

Criar:
- Docstrings detalhadas
- docs/API_PRODUCTS.md
- Exemplos complexos
- Diagramas ER

Output: Documentação completa
```

---

## 📊 RESUMO DE DELEGAÇÃO

### Estatísticas Gerais - NOVA ESTRATÉGIA

**Total de Tarefas: ~128**

**Distribuição REVISADA:**
- 🎯 COPILOT (Orquestração + Revisão): 0 tarefas de código (0%)
- 🤖 QWEN (Execução Total): 128 tarefas (100%)

**Papel do Copilot:**
- ✅ Análise de requisitos
- ✅ Definição de arquitetura
- ✅ Orientação técnica
- ✅ Revisão de qualidade
- ✅ Aprovação/Rejeição de código
- ❌ NÃO implementa código

**Papel do Qwen:**
- ✅ Implementa TODO o código
- ✅ Cria TODOS os testes
- ✅ Escreve TODA a documentação
- ✅ Faz TODAS as configurações
- ✅ Pergunta ao Copilot quando tiver dúvidas
- ✅ Corrige baseado no feedback do Copilot

**Por Tipo (TODOS executados pelo Qwen):**
- 🏗️ Arquitetura e Design: 15 tarefas → QWEN (com orientação Copilot)
- 💻 Implementação Core: 40 tarefas → QWEN
- 🤖 Boilerplate e Config: 35 tarefas → QWEN
- 🧪 Testes: 25 tarefas → QWEN
- 📝 Documentação: 13 tarefas → QWEN

---

## 🎯 FLUXO DE TRABALHO - COPILOT ORQUESTRADOR + QWEN EXECUTOR

### 🔄 Fluxo Principal (Recomendado)

```
┌─────────────────────────────────────────────────────────────┐
│                    COPILOT (Orquestrador)                    │
│                                                              │
│  1. 📋 Analisa fase/tarefa                                  │
│  2. 🎯 Define requisitos e arquitetura                      │
│  3. 📝 Cria prompt detalhado para Qwen                      │
│  4. 🚀 DELEGA 100% para Qwen                                │
│  5. ⏳ Aguarda execução                                      │
│  6. 🔍 REVISA código entregue                               │
│  7. ✅ Aprova OU 🔄 Solicita correções                      │
│  8. ➡️  Próxima tarefa                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Delegação
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      QWEN (Executor)                         │
│                                                              │
│  1. 📥 Recebe tarefa com especificações                     │
│  2. 💭 Analisa requisitos                                   │
│  3. ❓ Pergunta ao Copilot se tiver dúvidas                 │
│  4. 💻 Implementa TODO o código                             │
│  5. 🧪 Cria TODOS os testes                                 │
│  6. 📝 Documenta TUDO                                       │
│  7. ✨ Formata código (black, isort)                        │
│  8. 📤 Retorna para revisão do Copilot                      │
│  9. 🔧 Corrige se necessário                                │
└─────────────────────────────────────────────────────────────┘
```

### 📋 Exemplo Prático: Task 2.1 (Criar User Model)

**PASSO 1: Copilot Analisa e Define**
```yaml
Tarefa: Criar modelo User customizado
Requisitos:
  - Herdar de AbstractBaseUser e PermissionsMixin
  - EMAIL como USERNAME_FIELD (não username)
  - Campos: email, name, phone, default_margin
  - UserManager customizado
  - UUID como primary key
  - Soft delete (is_active)
  - Configurar como AUTH_USER_MODEL

Arquitetura:
  - Usar core.BaseModel para UUID e timestamps
  - Validações no model
  - Meta class bem configurado
```

**PASSO 2: Copilot Cria Prompt para Qwen**
```
Qwen, implemente o modelo User customizado em apps/users/models.py:

1. Crie UserManager herdando de BaseUserManager:
   - create_user(email, password, **extra_fields)
   - create_superuser(email, password, **extra_fields)
   - Validar email obrigatório

2. Crie User herdando de AbstractBaseUser, PermissionsMixin, BaseModel:
   - email: EmailField, unique, verbose_name='E-mail'
   - name: CharField(255), verbose_name='Nome'
   - phone: CharField(20), blank=True, null=True
   - default_margin: DecimalField(5,2), default=100.00
   - is_staff: BooleanField, default=False
   - is_active: BooleanField, default=True
   
3. Configure:
   - USERNAME_FIELD = 'email'
   - REQUIRED_FIELDS = ['name']
   - Meta: verbose_name, verbose_name_plural
   
4. Retorne o código completo e bem documentado.

Se tiver dúvidas, PERGUNTE antes de implementar!
```

**PASSO 3: Qwen Executa**
```python
# Qwen implementa tudo...
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from core.models import BaseModel

class UserManager(BaseUserManager):
    """Manager customizado para o modelo User"""
    
    def create_user(self, email, password=None, **extra_fields):
        """Cria e retorna um usuário com email e senha"""
        if not email:
            raise ValueError('O email é obrigatório')
        # ... implementação completa
    
    # ... resto do código

class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    """
    Modelo de usuário customizado usando email ao invés de username.
    
    Campos principais:
    - email: Email único do usuário (usado para login)
    - name: Nome completo do usuário
    - phone: Telefone opcional
    - default_margin: Margem de lucro padrão para cálculos
    """
    
    email = models.EmailField(unique=True, verbose_name='E-mail')
    # ... implementação completa
```

**PASSO 4: Copilot Revisa**
```yaml
Revisão do código:

✅ Verificações:
  - [x] UserManager implementado corretamente
  - [x] Modelo User com todos os campos
  - [x] Herança correta (AbstractBaseUser, PermissionsMixin, BaseModel)
  - [x] USERNAME_FIELD configurado
  - [x] Docstrings presentes
  - [x] Meta class configurado

⚠️ Ajustes necessários:
  - [ ] Adicionar validação de email no manager
  - [ ] Melhorar docstring do campo default_margin
  - [ ] Adicionar __str__ method

Feedback para Qwen:
"Código bom! Por favor, adicione:
1. Validação de formato de email no manager
2. Melhorar docstring explicando que default_margin é em %
3. Adicionar __str__ retornando self.email"
```

**PASSO 5: Qwen Corrige**
```python
# Qwen aplica correções...
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('O email é obrigatório')
        email = self.normalize_email(email)  # ✅ Validação adicionada
        # ...

class User(AbstractBaseUser, PermissionsMixin, BaseModel):
    default_margin = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        default=100.00,
        help_text='Margem de lucro padrão em porcentagem (%)'  # ✅ Melhorado
    )
    
    def __str__(self):  # ✅ Adicionado
        return self.email
```

**PASSO 6: Copilot Aprova**
```yaml
✅ APROVADO!
- Todas as correções aplicadas
- Código segue padrões
- Documentação adequada
- Pronto para próxima tarefa

Status: Task 2.1 COMPLETA ✅
```

---

### 🔄 Modo de Operação Detalhado

#### Para COPILOT:

**1. Início de Fase**
```bash
# Copilot analisa fase completa
1. Ler requisitos da fase
2. Dividir em tarefas menores
3. Definir ordem de execução
4. Preparar critérios de qualidade
```

**2. Para Cada Tarefa**
```bash
# Copilot prepara delegação
1. Analisar complexidade
2. Definir requisitos claros
3. Criar prompt detalhado para Qwen
4. Especificar critérios de aceitação
5. DELEGAR para Qwen
```

**3. Revisão de Qualidade**
```bash
# Copilot revisa código do Qwen
1. Verificar se atende requisitos
2. Validar padrões de código
3. Checar testes (cobertura >80%)
4. Verificar documentação
5. Aprovar OU solicitar correções
```

**4. Feedback Loop**
```bash
# Se código precisa ajustes
1. Listar problemas específicos
2. Sugerir soluções
3. Re-delegar para Qwen
4. Revisar novamente
5. Repetir até aprovação
```

#### Para QWEN:

**1. Recebimento de Tarefa**
```bash
# Qwen analisa delegação
1. Ler especificação completa
2. Entender requisitos
3. Identificar dúvidas
4. PERGUNTAR ao Copilot se necessário
```

**2. Execução**
```bash
# Qwen implementa
1. Escrever código conforme spec
2. Seguir padrões definidos
3. Adicionar docstrings
4. Criar testes
5. Formatar código (black, isort)
```

**3. Entrega**
```bash
# Qwen prepara entrega
1. Validar que atende requisitos
2. Executar testes localmente
3. Gerar documentação
4. Submeter para Copilot
```

**4. Correções**
```bash
# Se Copilot solicitar ajustes
1. Ler feedback detalhado
2. Entender problemas
3. Aplicar correções
4. Re-testar
5. Re-submeter
```

---

### 💬 Comunicação Copilot ↔ Qwen

**Qwen pergunta ao Copilot:**
```
Situação: Qwen está implementando e tem dúvida

Qwen: "Copilot, estou implementando o serializer de Product.
Para o campo 'ingredients', devo usar:
A) ListSerializer aninhado
B) PrimaryKeyRelatedField com many=True
C) Serializer aninhado customizado

Qual abordagem você recomenda considerando que precisamos
retornar os dados completos dos ingredientes?"

Copilot responde: "Use opção C - serializer aninhado customizado.
Isso permite retornar dados completos e manter flexibilidade.
Implemente ProductIngredientSerializer com campos: ingredient,
quantity. No ProductSerializer, use este serializer aninhado."

Qwen: "Entendido! Implementando conforme orientação."
```

**Copilot solicita correção:**
```
Copilot: "Qwen, revisei seu código do ProductViewSet.
Encontrei 2 ajustes necessários:

1. Filtros: Adicionar filtro por faixa de preço (min_price, max_price)
2. Permissões: Garantir que user só vê seus próprios produtos

Por favor, aplique estas correções e resubmeta."

Qwen: "Recebido! Aplicando correções:
1. ✅ Adicionando filterset_fields com min_price/max_price
2. ✅ Sobrescrevendo get_queryset() para filtrar por request.user

Correções aplicadas, código atualizado."
```

---

## 🚀 COMANDOS PARA AGENTES

### Para Executar Fase Completa:
```bash
copilot-qwen --phase 0 --mode autonomous
copilot-qwen --phase 1 --mode autonomous
copilot-qwen --phase 2 --mode autonomous
```

### Para Executar Tarefa Específica:
```bash
copilot-qwen --task "Criar modelo User customizado"
copilot-qwen --task "Adicionar testes para ingredientes"
```

### Para Modo Interativo:
```bash
copilot-qwen --interactive
> Task: Criar estrutura de diretórios
> Task: Configurar Tailwind CSS
> done
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

Após cada fase, Qwen deve executar:

```bash
# Verificar código
black . --check
pylint apps/
isort . --check

# Executar testes
pytest --cov=apps --cov-report=html

# Validar documentação
python manage.py spectacular --file schema.yml
```

---

## 📝 TEMPLATE DE DELEGAÇÃO

### Para Copilot delegar para Qwen:

```json
{
  "task_id": "2.6",
  "title": "Criar Testes de Auth",
  "description": "Criar testes unitários completos para autenticação",
  "type": "testing",
  "complexity": "medium",
  "autonomy": "supervised",
  "files": ["apps/users/tests.py"],
  "requirements": [
    "Testar registro de usuários",
    "Testar login",
    "Testar perfil",
    "Cobertura >80%"
  ],
  "validation": "pytest apps/users/tests.py",
  "estimated_time": "1 hour"
}
```

---

**Última atualização:** 2025-01-10  
**Versão:** 1.0.0
