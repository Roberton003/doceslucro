# 📦 FASE 0: Preparação do Ambiente

**Duração:** 2 dias  
**Prioridade:** P0 (Crítico)  
**Responsável:** Desenvolvedor (com ajuda dos agentes para scripts)

---

## 🎯 Objetivos

- [ ] Configurar ambiente de desenvolvimento local
- [ ] Criar estrutura de diretórios do projeto
- [ ] Configurar Git e controle de versão
- [ ] Preparar ferramentas e dependências
- [ ] Configurar sistema de agentes (Copilot + Qwen)

---

## 📋 Checklist de Tarefas

### 1️⃣ Verificar Pré-requisitos

**Tarefa para: DESENVOLVEDOR**

```bash
# Verificar instalações necessárias
python --version          # Python 3.10+
node --version           # Node.js 18+
npm --version            # npm 9+
git --version            # Git 2.30+
postgresql --version     # PostgreSQL 14+
```

**Checklist:**
- [ ] Python 3.10 ou superior instalado
- [ ] Node.js 18 ou superior instalado
- [ ] PostgreSQL 14+ instalado e rodando
- [ ] Git configurado (nome e email)
- [ ] Editor de código instalado (VS Code recomendado)

**Se faltar algo:** Instalar conforme sistema operacional

---

### 2️⃣ Criar Estrutura de Diretórios

**Tarefa para: QWEN (automação)**

**Prompt para Qwen:**
```
Crie a seguinte estrutura de diretórios no projeto DocesGIamor:

DocesGIamor/
├── docs/
├── backend/
│   ├── config/
│   ├── apps/
│   ├── core/
│   └── tests/
├── frontend/
│   ├── src/
│   └── public/
└── tools/
    └── scripts/

Crie um script shell que gere toda essa estrutura automaticamente.
Inclua um README.md em cada pasta principal explicando seu propósito.
```

**Script esperado:** `tools/scripts/create_structure.sh`

**Checklist:**
- [ ] Script de criação de estrutura criado
- [ ] Estrutura de diretórios criada
- [ ] README.md em cada pasta principal
- [ ] Estrutura validada

**Comando de validação:**
```bash
tree -L 2 DocesGIamor/
```

---

### 3️⃣ Configurar Git

**Tarefa para: DESENVOLVEDOR + QWEN**

**Parte 1 - DESENVOLVEDOR: Criar repositório**
```bash
cd DocesGIamor
git init
git branch -M main
```

**Parte 2 - QWEN: Criar .gitignore**

**Prompt para Qwen:**
```
Crie um arquivo .gitignore completo para um projeto Django + React com:
- Python (Django, venv, __pycache__, etc)
- Node.js (node_modules, build, dist, etc)
- IDEs (VS Code, PyCharm, etc)
- Banco de dados (SQLite, PostgreSQL dumps)
- Variáveis de ambiente (.env)
- Arquivos de sistema (macOS, Windows, Linux)

Salve em: DocesGIamor/.gitignore
```

**Parte 3 - QWEN: Criar .env.example**

**Prompt para Qwen:**
```
Crie um arquivo .env.example com variáveis de ambiente necessárias:

Backend:
- SECRET_KEY
- DEBUG
- DATABASE_URL
- ALLOWED_HOSTS
- CORS_ALLOWED_ORIGINS

Frontend:
- VITE_API_URL

Adicione comentários explicativos em cada variável.
Salve em: DocesGIamor/.env.example
```

**Checklist:**
- [ ] Git inicializado
- [ ] .gitignore criado
- [ ] .env.example criado
- [ ] Primeiro commit realizado

**Comando de validação:**
```bash
git status
git log --oneline
```

---

### 4️⃣ Configurar Python Virtual Environment

**Tarefa para: DESENVOLVEDOR**

```bash
# No diretório backend/
cd backend
python -m venv venv

# Ativar venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Verificar
which python  # Deve mostrar caminho do venv
```

**Checklist:**
- [ ] Virtual environment criado
- [ ] venv ativado
- [ ] pip atualizado: `pip install --upgrade pip`

---

### 5️⃣ Criar requirements.txt Base

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Crie um arquivo requirements.txt para Django com as seguintes dependências:

Core:
- Django==5.0.0
- djangorestframework==3.14.0
- djangorestframework-simplejwt==5.3.1

Banco de dados:
- psycopg2-binary==2.9.9
- dj-database-url==2.1.0

Utilidades:
- python-decouple==3.8
- django-cors-headers==4.3.1
- pillow==10.1.0

Dev/Qualidade:
- pytest==7.4.3
- pytest-django==4.7.0
- black==23.12.1
- pylint==3.0.3
- isort==5.13.2

Documentação:
- drf-spectacular==0.27.0

Salve em: backend/requirements.txt
Organize por categorias com comentários.
```

**Checklist:**
- [ ] requirements.txt criado
- [ ] Categorias organizadas
- [ ] Versões especificadas

---

### 6️⃣ Configurar Frontend Base

**Tarefa para: DESENVOLVEDOR**

```bash
cd frontend
npm create vite@latest . -- --template react
npm install
```

**Checklist:**
- [ ] Projeto Vite criado
- [ ] Dependências instaladas
- [ ] Teste: `npm run dev` funciona

---

### 7️⃣ Instalar Dependências Frontend Adicionais

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Crie um script que instale as seguintes dependências no frontend:

Roteamento e Estado:
npm install react-router-dom@6
npm install zustand  # ou npm install @reduxjs/toolkit react-redux

HTTP e Formulários:
npm install axios
npm install react-hook-form

Estilo:
npm install -D tailwindcss postcss autoprefixer
npm install @headlessui/react
npm install @heroicons/react

Gráficos:
npm install recharts

Utilitários:
npm install date-fns
npm install clsx

Crie um script: frontend/setup_dependencies.sh
```

**Checklist:**
- [ ] Script de instalação criado
- [ ] Dependências instaladas
- [ ] package.json atualizado

---

### 8️⃣ Configurar Tailwind CSS

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Configure Tailwind CSS no projeto Vite:

1. Execute: npx tailwindcss init -p

2. Crie tailwind.config.js com:
   - Content paths corretos para React
   - Tema customizado com cores do projeto
   - Plugins necessários

3. Crie src/index.css com diretivas Tailwind

4. Importe index.css no main.jsx

Gere os arquivos necessários.
```

**Checklist:**
- [ ] Tailwind configurado
- [ ] Arquivo de config criado
- [ ] CSS importado
- [ ] Teste: usar classe Tailwind em componente

---

### 9️⃣ Configurar Sistema de Agentes

**Tarefa para: DESENVOLVEDOR**

```bash
# Executar setup do orquestrador
cd tools
bash ../setup_script.sh

# Configurar aliases
source ~/.bashrc  # ou ~/.zshrc
```

**Checklist:**
- [ ] Sistema de agentes instalado
- [ ] Aliases configurados
- [ ] Teste: `copilot-qwen --help`

---

### 🔟 Criar Documentação Inicial

**Tarefa para: QWEN**

**Prompt para Qwen:**
```
Crie um README.md principal para o projeto com:

1. Título e descrição do projeto
2. Badges (Build, License, Version)
3. Tecnologias utilizadas
4. Pré-requisitos
5. Instalação passo a passo
6. Como rodar o projeto
7. Estrutura de pastas
8. Contribuição
9. Licença

Use Markdown bem formatado com emojis.
Salve em: DocesGIamor/README.md
```

**Checklist:**
- [ ] README.md criado
- [ ] Badges adicionados
- [ ] Instruções claras
- [ ] Links funcionando

---

## ✅ Critérios de Aceitação

Fase 0 completa quando:

- [ ] Todos os pré-requisitos instalados
- [ ] Estrutura de diretórios criada
- [ ] Git configurado com .gitignore
- [ ] Python venv criado e ativado
- [ ] requirements.txt criado
- [ ] Frontend Vite + React funcionando
- [ ] Tailwind CSS configurado
- [ ] Sistema de agentes funcionando
- [ ] README.md criado
- [ ] Primeiro commit realizado

**Comando de validação final:**
```bash
# Backend
cd backend
source venv/bin/activate
pip list | grep Django  # Deve mostrar Django se instalado

# Frontend
cd frontend
npm run dev  # Deve iniciar sem erros

# Git
git log --oneline  # Deve ter commits
```

---

## 🚀 Próximos Passos

Após completar Fase 0:
→ **Avançar para FASE_01_SETUP_BACKEND.md**

---

## 📝 Notas

- **Tempo estimado:** 4-6 horas
- **Dificuldade:** Baixa
- **Pode ser automatizado:** 80% (com agentes)
- **Depende de:** Nada (primeira fase)
- **Requerido para:** Todas as outras fases

---

## 🆘 Troubleshooting

### Problema: Python não encontrado
```bash
# Instalar Python (Ubuntu/Debian)
sudo apt update
sudo apt install python3.10 python3.10-venv python3-pip
```

### Problema: Node.js versão antiga
```bash
# Instalar via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### Problema: PostgreSQL não rodando
```bash
# Iniciar PostgreSQL
sudo service postgresql start  # Linux
brew services start postgresql  # macOS
```

### Problema: Permissão negada nos scripts
```bash
chmod +x tools/scripts/*.sh
```

---

**Status:** ⏸️ Aguardando execução  
**Última atualização:** 2025-01-10
