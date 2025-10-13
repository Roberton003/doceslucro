# 🎯 PLANO MESTRE - Sistema Doces GIamor

## 📋 Índice Geral

- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Fases de Desenvolvimento](#fases-de-desenvolvimento)
- [Checklist Geral](#checklist-geral)
- [Como Usar Este Plano](#como-usar-este-plano)

---

## 🎯 Visão Geral

**Objetivo:** Sistema web completo para controle de custos de confeitaria

**Stack Tecnológico:**
- **Backend:** Django 5.x + Django REST Framework
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Banco de Dados:** PostgreSQL (produção) / SQLite (desenvolvimento)
- **Autenticação:** JWT (SimpleJWT)
- **Deploy:** Railway/Render (backend) + Vercel (frontend)

**Duração Estimada:** 10 semanas (full-time) ou 4-5 meses (part-time)

---

## 📁 Estrutura do Projeto

```
DocesGIamor/
│
├── docs/                           # Documentação
│   ├── MASTER_PLAN.md             # Este arquivo
│   ├── FASE_*.md                  # Detalhamento de cada fase
│   └── API_DOCUMENTATION.md       # Documentação da API
│
├── backend/                       # Django + DRF
│   ├── config/                    # Configurações do projeto
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── apps/                      # Aplicações Django
│   │   ├── users/                 # Autenticação e usuários
│   │   ├── ingredients/           # Gestão de ingredientes
│   │   ├── products/              # Gestão de produtos/receitas
│   │   ├── calculations/          # Motor de cálculos
│   │   ├── templates/             # Produtos pré-configurados
│   │   ├── shopping/              # Lista de compras
│   │   └── dashboard/             # Dashboard e relatórios
│   │
│   ├── core/                      # Funcionalidades compartilhadas
│   │   ├── models.py              # Models base
│   │   ├── permissions.py         # Permissões customizadas
│   │   └── utils.py               # Utilitários
│   │
│   ├── tests/                     # Testes
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/                      # React + Vite
│   ├── src/
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── pages/                 # Páginas
│   │   ├── services/              # Serviços API
│   │   ├── contexts/              # Context API
│   │   ├── hooks/                 # Custom hooks
│   │   ├── utils/                 # Utilitários
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── tools/                         # Ferramentas de automação
│   ├── orchestrator/              # Sistema de agentes
│   └── scripts/                   # Scripts auxiliares
│
└── README.md
```

---

## 🚀 Fases de Desenvolvimento

### ✅ Fase 0: Preparação (Semana 0 - 2 dias)
**Arquivo:** `docs/FASE_00_PREPARACAO.md`
- [ ] Configurar ambiente de desenvolvimento
- [ ] Criar estrutura de pastas
- [ ] Configurar Git e .gitignore
- [ ] Preparar ferramentas

### ✅ Fase 1: Setup Backend (Semana 1 - 5 dias)
**Arquivo:** `docs/FASE_01_SETUP_BACKEND.md`
- [ ] Criar projeto Django
- [ ] Configurar settings (dev/prod)
- [ ] Configurar PostgreSQL
- [ ] Instalar dependências
- [ ] Configurar CORS e variáveis de ambiente

### ✅ Fase 2: Autenticação (Semana 2 - 5 dias)
**Arquivo:** `docs/FASE_02_AUTENTICACAO.md`
- [ ] Criar app users
- [ ] Implementar modelo User customizado
- [ ] Configurar JWT
- [ ] Endpoints: login, register, refresh, logout
- [ ] Recuperação de senha

### ✅ Fase 3: Gestão de Ingredientes (Semana 3 - 5 dias)
**Arquivo:** `docs/FASE_03_INGREDIENTES.md`
- [ ] Criar app ingredients
- [ ] Modelo Ingredient
- [ ] Serializers
- [ ] ViewSets (CRUD completo)
- [ ] Filtros e busca
- [ ] Validações

### ✅ Fase 4: Gestão de Produtos (Semana 4-5 - 10 dias)
**Arquivo:** `docs/FASE_04_PRODUTOS.md`
- [ ] Criar app products
- [ ] Modelo Product e ProductIngredient
- [ ] Serializers aninhados
- [ ] ViewSets com relacionamentos
- [ ] Upload de imagens
- [ ] Duplicação de produtos

### ✅ Fase 5: Sistema de Cálculos (Semana 6 - 5 dias)
**Arquivo:** `docs/FASE_05_CALCULOS.md`
- [ ] Criar app calculations
- [ ] Lógica de cálculo de custos
- [ ] Cálculo de margem de lucro
- [ ] Simulador de preços
- [ ] Endpoints de cálculo

### ✅ Fase 6: Produtos Pré-configurados (Semana 7 - 3 dias)
**Arquivo:** `docs/FASE_06_TEMPLATES.md`
- [ ] Criar app templates
- [ ] 10 receitas pré-cadastradas
- [ ] Sistema de clonagem
- [ ] Fixtures para popular dados

### ✅ Fase 7: Dashboard (Semana 7-8 - 5 dias)
**Arquivo:** `docs/FASE_07_DASHBOARD.md`
- [ ] Criar app dashboard
- [ ] Estatísticas agregadas
- [ ] Endpoints de métricas
- [ ] Gráficos de dados

### ✅ Fase 8: Lista de Compras (Semana 8 - 4 dias)
**Arquivo:** `docs/FASE_08_LISTA_COMPRAS.md`
- [ ] Criar app shopping
- [ ] Consolidação de ingredientes
- [ ] Cálculo de quantidades
- [ ] Exportação PDF

### ✅ Fase 9: Setup Frontend (Semana 9 - 3 dias)
**Arquivo:** `docs/FASE_09_SETUP_FRONTEND.md`
- [ ] Criar projeto Vite + React
- [ ] Configurar Tailwind CSS
- [ ] Configurar React Router
- [ ] Configurar Axios
- [ ] Estrutura de pastas

### ✅ Fase 10: Frontend - Autenticação (Semana 9 - 2 dias)
**Arquivo:** `docs/FASE_10_FRONTEND_AUTH.md`
- [ ] Telas de login/registro
- [ ] Context de autenticação
- [ ] Rotas protegidas
- [ ] Interceptors Axios

### ✅ Fase 11: Frontend - CRUD Ingredientes (Semana 10 - 2 dias)
**Arquivo:** `docs/FASE_11_FRONTEND_INGREDIENTES.md`
- [ ] Listagem de ingredientes
- [ ] Formulário de criação/edição
- [ ] Busca e filtros
- [ ] Confirmação de exclusão

### ✅ Fase 12: Frontend - CRUD Produtos (Semana 10-11 - 3 dias)
**Arquivo:** `docs/FASE_12_FRONTEND_PRODUTOS.md`
- [ ] Listagem de produtos
- [ ] Formulário complexo (ingredientes)
- [ ] Upload de imagem
- [ ] Visualização de cálculos

### ✅ Fase 13: Frontend - Dashboard (Semana 11 - 2 dias)
**Arquivo:** `docs/FASE_13_FRONTEND_DASHBOARD.md`
- [ ] Dashboard principal
- [ ] Gráficos (Recharts)
- [ ] Estatísticas visuais
- [ ] Exportação de relatórios

### ✅ Fase 14: Frontend - Features Finais (Semana 11 - 2 dias)
**Arquivo:** `docs/FASE_14_FRONTEND_FEATURES.md`
- [ ] Lista de compras
- [ ] Produtos pré-configurados
- [ ] Simulador de preços
- [ ] Responsividade mobile

### ✅ Fase 15: Testes (Semana 12 - 5 dias)
**Arquivo:** `docs/FASE_15_TESTES.md`
- [ ] Testes unitários backend (pytest)
- [ ] Testes de integração
- [ ] Testes frontend (Vitest)
- [ ] Testes E2E (Cypress - opcional)

### ✅ Fase 16: Deploy (Semana 12 - 3 dias)
**Arquivo:** `docs/FASE_16_DEPLOY.md`
- [ ] Deploy backend (Railway/Render)
- [ ] Deploy frontend (Vercel)
- [ ] Configurar PostgreSQL produção
- [ ] Configurar domínio
- [ ] Documentação final

---

## 📊 Checklist Geral de Progresso

### Backend
- [ ] Django configurado
- [ ] PostgreSQL configurado
- [ ] JWT funcionando
- [ ] CRUD Ingredientes completo
- [ ] CRUD Produtos completo
- [ ] Sistema de cálculos funcionando
- [ ] 10 receitas pré-configuradas
- [ ] Dashboard com métricas
- [ ] Lista de compras funcionando
- [ ] API documentada (Swagger)
- [ ] Testes com >80% cobertura

### Frontend
- [ ] React + Vite configurado
- [ ] Tailwind CSS funcionando
- [ ] Autenticação completa
- [ ] CRUD Ingredientes (UI)
- [ ] CRUD Produtos (UI)
- [ ] Dashboard visual
- [ ] Lista de compras (UI)
- [ ] Responsivo (mobile/tablet/desktop)
- [ ] Performance otimizada

### DevOps
- [ ] Backend em produção
- [ ] Frontend em produção
- [ ] Banco de dados produção
- [ ] CI/CD configurado (opcional)
- [ ] Monitoring (opcional)

---

## 🎯 Como Usar Este Plano

### Para Desenvolvedores Humanos:
1. Siga as fases sequencialmente
2. Complete todos os itens de uma fase antes de avançar
3. Marque os checkboxes conforme completa
4. Consulte os arquivos `FASE_*.md` para detalhes

### Para Agentes AI (Copilot/Qwen):
1. **Copilot:** Leia a fase completa e decida delegações
2. **Qwen:** Execute tarefas delegadas conforme instruções
3. **Ambos:** Atualize checkboxes ao completar tarefas
4. **Comunicação:** Use message bus para dúvidas

### Priorização:
- **P0 (Crítico):** Fases 1-5 (MVP funcional)
- **P1 (Importante):** Fases 6-8 (Features principais)
- **P2 (Desejável):** Fases 9-14 (Frontend completo)
- **P3 (Opcional):** Fases 15-16 (Qualidade e Deploy)

---

## 📞 Convenções de Commit

Use Conventional Commits:
```
feat: adiciona endpoint de ingredientes
fix: corrige cálculo de margem de lucro
docs: atualiza README com instruções
test: adiciona testes para produto model
refactor: melhora estrutura de serializers
style: formata código com black
chore: atualiza dependências
```

---

## 🔗 Links Rápidos

- [Requisitos Completos](project_requirements_md.md)
- [Guia de Integração Agentes](integration_guide.md)
- [Arquitetura Visual](visual_architecture.md)
- [Configuração Orquestrador](orchestrator_config.txt)

---

## 📝 Notas Importantes

1. **Cada fase tem seu próprio arquivo detalhado**
2. **Siga a ordem das fases para evitar dependências quebradas**
3. **Teste após cada fase antes de avançar**
4. **Mantenha documentação atualizada**
5. **Use os agentes para automatizar tarefas repetitivas**

---

**Última Atualização:** 2025-01-10
**Versão:** 1.0.0
**Status:** 🚀 Pronto para Iniciar
