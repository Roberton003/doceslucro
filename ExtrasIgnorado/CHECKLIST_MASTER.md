# ✅ CHECKLIST MASTER - Sistema Doces GIamor

## 🎯 Modelo de Trabalho

```
┌──────────────────────────────────────────────────────────────┐
│              COPILOT: Orquestrador e Revisor                 │
│                                                              │
│  ✅ Analisa requisitos                                       │
│  ✅ Define arquitetura                                       │
│  ✅ Delega 100% para Qwen                                    │
│  ✅ Revisa qualidade                                         │
│  ✅ Aprova/Rejeita                                           │
│  ❌ NÃO implementa código                                    │
└──────────────────────────────────────────────────────────────┘
                           │
                           │ Delegação Total
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                  QWEN: Executor Total                        │
│                                                              │
│  ✅ Implementa TODO código                                   │
│  ✅ Cria TODOS testes                                        │
│  ✅ Escreve TODA documentação                                │
│  ✅ Faz TODAS configurações                                  │
│  ✅ Pergunta quando tem dúvidas                              │
│  ✅ Corrige baseado em feedback                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 ESTATÍSTICAS GLOBAIS

**Total de Tarefas:** 128  
**Executor:** Qwen 100%  
**Revisor:** Copilot 100%

### Progresso Geral
```
Concluídas: 0/128 (0%)
Pendentes: 128/128 (100%)

┌────────────────────────────────────────────────────┐
│ [                                               ] │
│ 0%                                                │
└────────────────────────────────────────────────────┘
```

### Por Fase
- **Fase 0 (Preparação):** 0/10 tarefas → Qwen executa
- **Fase 1 (Backend Setup):** 0/10 tarefas → Qwen executa
- **Fase 2 (Autenticação):** 0/9 tarefas → Qwen executa
- **Fase 3 (Ingredientes):** 0/8 tarefas → Qwen executa
- **Fase 4 (Produtos):** 0/10 tarefas → Qwen executa
- **Fase 5 (Cálculos):** 0/8 tarefas → Qwen executa
- **Fase 6 (Templates):** 0/6 tarefas → Qwen executa
- **Fase 7 (Dashboard):** 0/7 tarefas → Qwen executa
- **Fase 8 (Shopping):** 0/6 tarefas → Qwen executa
- **Fase 9 (Frontend Setup):** 0/8 tarefas → Qwen executa
- **Fase 10 (Frontend Auth):** 0/7 tarefas → Qwen executa
- **Fase 11 (Frontend Ingredientes):** 0/6 tarefas → Qwen executa
- **Fase 12 (Frontend Produtos):** 0/8 tarefas → Qwen executa
- **Fase 13 (Frontend Dashboard):** 0/6 tarefas → Qwen executa
- **Fase 14 (Frontend Features):** 0/6 tarefas → Qwen executa
- **Fase 15 (Testes):** 0/8 tarefas → Qwen executa
- **Fase 16 (Deploy):** 0/8 tarefas → Qwen executa

---

## 📋 FASE 0: Preparação (0/10) - 0%

**Executor:** Qwen | **Revisor:** Copilot

### Tarefas
- [ ] **0.1** - Verificar pré-requisitos (5 min)
  - Status: ⏸️ Pendente
  - Qwen: Criar script de verificação
  - Copilot: Validar que cobre tudo

- [ ] **0.2** - Criar estrutura de diretórios (10 min)
  - Status: ⏸️ Pendente
  - Qwen: Criar script create_structure.sh
  - Copilot: Revisar estrutura criada

- [ ] **0.3** - Configurar Git (15 min)
  - Status: ⏸️ Pendente
  - Qwen: Criar .gitignore completo
  - Copilot: Validar que nada sensível será commitado

- [ ] **0.4** - Criar .env.example (10 min)
  - Status: ⏸️ Pendente
  - Qwen: Criar template com todas variáveis
  - Copilot: Revisar se falta alguma variável

- [ ] **0.5** - Setup Python venv (15 min)
  - Status: ⏸️ Pendente
  - Qwen: Criar script de setup
  - Copilot: Testar em ambiente limpo

- [ ] **0.6** - Criar requirements.txt (15 min)
  - Status: ⏸️ Pendente
  - Qwen: Listar todas dependências com versões
  - Copilot: Validar compatibilidade de versões

- [ ] **0.7** - Setup Frontend Vite (20 min)
  - Status: ⏸️ Pendente
  - Qwen: Criar projeto e configurar
  - Copilot: Testar se `npm run dev` funciona

- [ ] **0.8** - Instalar deps Frontend (15 min)
  - Status: ⏸️ Pendente
  - Qwen: Criar script setup_dependencies.sh
  - Copilot: Validar todas deps instaladas

- [ ] **0.9** - Configurar Tailwind CSS (20 min)
  - Status: ⏸️ Pendente
  - Qwen: Config completa do Tailwind
  - Copilot: Testar se classes funcionam

- [ ] **0.10** - Criar README.md (25 min)
  - Status: ⏸️ Pendente
  - Qwen: README completo com badges
  - Copilot: Revisar clareza e completude

**Critérios de Aprovação Copilot:**
- ✅ Todos scripts funcionam
- ✅ Estrutura correta criada
- ✅ Documentação clara
- ✅ Sem erros de instalação

---

## 📋 FASE 1: Setup Backend (0/10) - 0%

**Executor:** Qwen | **Revisor:** Copilot

### Orientações Copilot (antes da execução)
```yaml
Arquitetura:
  - Settings separados: base, development, production
  - PostgreSQL em prod, SQLite em dev
  - Variáveis via python-decouple
  - DRF com JWT padrão
  - CORS para localhost:5173 (dev)
  - Spectacular para docs
```

### Tarefas
- [ ] **1.1** - Criar projeto Django (30 min)
  - Status: ⏸️ Pendente
  - Qwen: django-admin startproject config .
  - Copilot: Validar estrutura criada

- [ ] **1.2** - Reestruturar settings (45 min)
  - Status: ⏸️ Pendente
  - Qwen: Implementar base/dev/prod conforme orientação
  - Copilot: Revisar separação e segurança

- [ ] **1.3** - Configurar variáveis env (20 min)
  - Status: ⏸️ Pendente
  - Qwen: Implementar decouple em settings
  - Copilot: Validar que nada está hardcoded

- [ ] **1.4** - Configurar PostgreSQL (30 min)
  - Status: ⏸️ Pendente
  - Qwen: Config DB com dj-database-url
  - Copilot: Testar conexão

- [ ] **1.5** - Configurar DRF (45 min)
  - Status: ⏸️ Pendente
  - Qwen: Implementar REST_FRAMEWORK settings
  - Copilot: Revisar auth e paginação

- [ ] **1.6** - Configurar CORS (15 min)
  - Status: ⏸️ Pendente
  - Qwen: django-cors-headers completo
  - Copilot: Testar requisições do frontend

- [ ] **1.7** - Configurar Spectacular (20 min)
  - Status: ⏸️ Pendente
  - Qwen: Setup Swagger docs
  - Copilot: Acessar /api/docs/ e validar

- [ ] **1.8** - Criar apps (35 min)
  - Status: ⏸️ Pendente
  - Qwen: Criar 7 apps + estrutura
  - Copilot: Validar imports funcionando

- [ ] **1.9** - Configurar Core (30 min)
  - Status: ⏸️ Pendente
  - Qwen: BaseModel + utils + permissions
  - Copilot: Revisar padrões

- [ ] **1.10** - Executar migrações (15 min)
  - Status: ⏸️ Pendente
  - Qwen: makemigrations + migrate
  - Copilot: Validar DB criado

**Critérios de Aprovação Copilot:**
- ✅ Server roda sem erros
- ✅ Settings seguros (prod)
- ✅ PostgreSQL conectado
- ✅ Swagger acessível
- ✅ CORS funcionando

---

## 📋 FASE 2: Autenticação (0/9) - 0%

**Executor:** Qwen | **Revisor:** Copilot

### Orientações Copilot
```yaml
Modelo User:
  - AbstractBaseUser + PermissionsMixin + BaseModel
  - EMAIL como login (não username)
  - Campos: name, phone, default_margin
  - UUID como PK
  - Soft delete

API:
  - POST /register/ (com validação senha)
  - POST /login/ (retorna JWT + user data)
  - POST /token/refresh/
  - GET/PUT /profile/
  - POST /change-password/
```

### Tarefas
- [ ] **2.1** - Criar User model (1h)
  - Status: ⏸️ Pendente
  - Qwen: UserManager + User model completo
  - Copilot: Revisar campos e validações

- [ ] **2.2** - Criar serializers (45 min)
  - Status: ⏸️ Pendente
  - Qwen: 5 serializers (User, Register, Token, etc)
  - Copilot: Validar validações

- [ ] **2.3** - Criar views (1h)
  - Status: ⏸️ Pendente
  - Qwen: Register, Login, Profile, ChangePassword
  - Copilot: Revisar lógica de auth

- [ ] **2.4** - Configurar URLs (15 min)
  - Status: ⏸️ Pendente
  - Qwen: Todas rotas de auth
  - Copilot: Testar endpoints

- [ ] **2.5** - Configurar Admin (20 min)
  - Status: ⏸️ Pendente
  - Qwen: UserAdmin completo
  - Copilot: Testar interface admin

- [ ] **2.6** - Migrações (20 min)
  - Status: ⏸️ Pendente
  - Qwen: makemigrations + migrate
  - Copilot: Validar tabelas criadas

- [ ] **2.7** - Criar testes (1.5h)
  - Status: ⏸️ Pendente
  - Qwen: Testes completos (>80% cobertura)
  - Copilot: Revisar casos de teste

- [ ] **2.8** - Documentar (30 min)
  - Status: ⏸️ Pendente
  - Qwen: Docstrings + API_AUTH.md
  - Copilot: Revisar clareza

- [ ] **2.9** - Testes manuais (30 min)
  - Status: ⏸️ Pendente
  - Qwen: Criar script de testes curl
  - Copilot: Executar e validar

**Critérios de Aprovação Copilot:**
- ✅ Registro funciona
- ✅ Login retorna JWT
- ✅ Token válido funciona
- ✅ Testes >80% cobertura
- ✅ Documentação clara

---

## 📋 FASE 3: Ingredientes (0/8) - 0%

**Executor:** Qwen | **Revisor:** Copilot

### Orientações Copilot
```yaml
Modelo:
  - Campos: name, unit (choices), cost_per_unit, category
  - FK User (isolamento por usuário)
  - Validação: custo > 0
  - Unique: (user, name)

API:
  - CRUD via ViewSet
  - Filtros: category, busca por name
  - Permissão: IsAuthenticated + IsOwner
```

### Tarefas
- [ ] **3.1** - Criar Ingredient model (45 min)
  - Status: ⏸️ Pendente
  - Qwen: Model com validações
  - Copilot: Revisar estrutura

- [ ] **3.2** - Criar serializer (30 min)
  - Status: ⏸️ Pendente
  - Qwen: IngredientSerializer
  - Copilot: Validar campos

- [ ] **3.3** - Criar ViewSet (45 min)
  - Status: ⏸️ Pendente
  - Qwen: CRUD + filtros
  - Copilot: Testar endpoints

- [ ] **3.4** - URLs (10 min)
  - Status: ⏸️ Pendente
  - Qwen: Router DRF
  - Copilot: Validar rotas

- [ ] **3.5** - Filtros e busca (30 min)
  - Status: ⏸️ Pendente
  - Qwen: Implementar filterset
  - Copilot: Testar filtros

- [ ] **3.6** - Admin (20 min)
  - Status: ⏸️ Pendente
  - Qwen: IngredientAdmin
  - Copilot: Testar interface

- [ ] **3.7** - Testes (1h)
  - Status: ⏸️ Pendente
  - Qwen: CRUD + filtros + permissões
  - Copilot: Revisar cobertura

- [ ] **3.8** - Documentar (25 min)
  - Status: ⏸️ Pendente
  - Qwen: Docstrings + exemplos
  - Copilot: Revisar docs

**Critérios de Aprovação Copilot:**
- ✅ CRUD completo funciona
- ✅ Filtros funcionam
- ✅ Usuário só vê seus dados
- ✅ Testes passam
- ✅ Swagger atualizado

---

## 📋 FASE 4: Produtos (0/10) - 0%

**Executor:** Qwen | **Revisor:** Copilot

### Orientações Copilot
```yaml
Modelos:
  - Product: name, yield_qty, image, category, user
  - ProductIngredient: product, ingredient, quantity
  - Properties calculadas: total_cost, unit_cost

Serializer:
  - Aninhado com ingredientes
  - Create/Update com lista de ingredientes
  - Retornar custos calculados

Features:
  - Upload imagem (Pillow)
  - Duplicar produto (action)
  - Filtros avançados
```

### Tarefas
- [ ] **4.1** - Criar models (1.5h)
  - Status: ⏸️ Pendente
  - Qwen: Product + ProductIngredient
  - Copilot: Revisar relacionamentos

- [ ] **4.2** - Serializers aninhados (1.5h)
  - Status: ⏸️ Pendente
  - Qwen: Serializers complexos
  - Copilot: Validar create/update

- [ ] **4.3** - ViewSet (1h)
  - Status: ⏸️ Pendente
  - Qwen: CRUD + actions
  - Copilot: Testar endpoints

- [ ] **4.4** - Upload imagem (30 min)
  - Status: ⏸️ Pendente
  - Qwen: Configurar upload
  - Copilot: Testar upload

- [ ] **4.5** - Duplicar produto (30 min)
  - Status: ⏸️ Pendente
  - Qwen: Action duplicate
  - Copilot: Testar duplicação

- [ ] **4.6** - URLs (15 min)
  - Status: ⏸️ Pendente
  - Qwen: Router + actions
  - Copilot: Validar rotas

- [ ] **4.7** - Admin (40 min)
  - Status: ⏸️ Pendente
  - Qwen: ProductAdmin com inline
  - Copilot: Testar admin

- [ ] **4.8** - Testes (2h)
  - Status: ⏸️ Pendente
  - Qwen: Testes completos
  - Copilot: Revisar casos

- [ ] **4.9** - Documentar (45 min)
  - Status: ⏸️ Pendente
  - Qwen: Docs + exemplos complexos
  - Copilot: Revisar clareza

- [ ] **4.10** - Validar (30 min)
  - Status: ⏸️ Pendente
  - Qwen: Script de validação
  - Copilot: Executar testes

**Critérios de Aprovação Copilot:**
- ✅ CRUD funciona
- ✅ Relacionamentos corretos
- ✅ Upload funciona
- ✅ Duplicação funciona
- ✅ Cálculos corretos
- ✅ Testes >80%

---

## 🚀 COMANDOS DE DELEGAÇÃO

### Para Copilot Delegar Fase Completa
```bash
# Copilot analisa e delega fase 0
copilot-qwen --delegate-phase 0 --to qwen

# Formato da delegação:
{
  "phase": 0,
  "tasks": [
    {
      "id": "0.1",
      "title": "Verificar pré-requisitos",
      "executor": "qwen",
      "spec": "...",
      "acceptance": "..."
    },
    ...
  ],
  "review_criteria": "..."
}
```

### Para Qwen Executar Tarefa
```bash
# Qwen recebe e executa
qwen --execute-task 0.1

# Processo do Qwen:
1. Ler especificação
2. Analisar requisitos
3. Perguntar se tiver dúvida
4. Implementar código
5. Criar testes
6. Documentar
7. Formatar
8. Submeter para revisão
```

### Para Copilot Revisar
```bash
# Copilot revisa entrega
copilot-qwen --review-task 0.1

# Processo de revisão:
1. Verificar código
2. Executar testes
3. Validar documentação
4. Aprovar OU solicitar correções
```

---

## 📊 MÉTRICAS DE QUALIDADE

### Para Aprovação do Copilot
Cada tarefa deve atender:

**Código:**
- ✅ Segue PEP8 (Python) ou ESLint (JS)
- ✅ Sem erros de linting
- ✅ Formatado (black, prettier)
- ✅ Type hints (Python) ou TypeScript

**Testes:**
- ✅ Cobertura >80%
- ✅ Todos testes passam
- ✅ Casos edge cobertos
- ✅ Mocks apropriados

**Documentação:**
- ✅ Docstrings em funções
- ✅ README atualizado
- ✅ Comentários em lógica complexa
- ✅ Swagger/OpenAPI atualizado

**Funcionalidade:**
- ✅ Atende todos requisitos
- ✅ Sem bugs conhecidos
- ✅ Performance adequada
- ✅ Segurança validada

---

## 🔄 PROCESSO DE FEEDBACK

### Quando Qwen Entrega:
```yaml
Qwen submete:
  - Código implementado
  - Testes criados
  - Documentação escrita
  - Checklist de auto-validação

Copilot recebe e:
  1. Executa checklist automático
  2. Revisa código manualmente
  3. Testa funcionalidade
  4. Decide: Aprovar OU Corrigir
```

### Se Aprovado:
```yaml
Copilot:
  - ✅ Marca tarefa como completa
  - 📊 Atualiza progresso
  - ➡️ Delega próxima tarefa
  
Qwen:
  - 🎉 Recebe confirmação
  - 📥 Aguarda próxima tarefa
```

### Se Precisa Correção:
```yaml
Copilot:
  - 📝 Lista problemas específicos
  - 💡 Sugere soluções
  - 🔄 Re-delega para Qwen
  
Qwen:
  - 📖 Lê feedback
  - 🔧 Aplica correções
  - ✅ Re-submete
  - ⏳ Aguarda nova revisão
```

---

## 📈 TRACKING DE PROGRESSO

### Atualização Automática
Após cada aprovação:
```bash
# Qwen atualiza checklist
✅ Task 2.1 - Criar User model - COMPLETO
  - Executado por: Qwen
  - Revisado por: Copilot  
  - Aprovado em: 2025-01-10 14:30
  - Tempo: 55min (estimado: 1h)
  - Qualidade: ⭐⭐⭐⭐⭐ (5/5)
```

### Relatórios
```bash
# Gerar relatório de progresso
copilot-qwen --report

# Output:
Fase 0: ✅ 10/10 (100%) - COMPLETA
Fase 1: ⏳ 7/10 (70%) - EM ANDAMENTO
  - Task 1.8: ✅ Completa
  - Task 1.9: 🔄 Em revisão
  - Task 1.10: ⏸️ Pendente

Total: 17/128 (13.3%)
```

---

**Última atualização:** 2025-01-10  
**Versão:** 2.0.0 (Qwen Executor Total)  
**Status:** 📋 Pronto para Execução
