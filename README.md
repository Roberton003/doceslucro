# 🍰 ChefLuz v2.0 - Sistema de Gestão de Receitas com IA

**ChefLuz** é uma aplicação web inteligente que utiliza IA (Groq/LLM) para analisar receitas, calcular custos, margens de lucro e otimizar preços em tempo real.

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)]()
[![Python](https://img.shields.io/badge/Python-3.12+-blue)]()
[![Django](https://img.shields.io/badge/Django-5.2.7-darkgreen)]()
[![React](https://img.shields.io/badge/React-18+-61dafb)]()
[![License](https://img.shields.io/badge/License-Proprietário-red)]()

## 🎯 Funcionalidades Principais

✅ **Análise de Receitas com IA**
- Identifica qual receita é mais lucrativa
- Calcula custos unitários e totais
- Analisa margens de lucro
- Sugere otimização de preços

✅ **Chat Inteligente (ChefLuz Bot)**
- Interface flutuante e responsiva
- Bolha de saudação que reaparece a cada 5 segundos
- Mensagem de boas-vindas fixa no chat
- Respostas em tempo real com análise de dados

✅ **Gestão de Receitas**
- 20+ receitas pré-cadastradas
- Dados de custos, preços e rendimento
- Cálculo automático de margens
- Dashboard com análises completas

✅ **API RESTful**
- Endpoints para chat e análise de receitas
- Health check para monitoramento
- Autenticação opcional (AllowAny para desenvolvimento)
- Rate limiting configurável

## 📋 Requisitos do Sistema

### Backend
- Python 3.12+
- Django 5.2.7
- PostgreSQL (produção) / SQLite (desenvolvimento)
- pip/venv

### Frontend
- Node.js 18+
- npm ou yarn
- React 18+
- Vite (dev server)

## 🚀 Instalação e Setup

### 1. Clonar o Repositório

```bash
git clone https://github.com/Roberton003/doceslucro.git
cd doceslucro
```

### 2. Setup do Backend

```bash
# Criar ambiente virtual
python3 -m venv .venv
source .venv/bin/activate  # Linux/Mac
# ou
.venv\Scripts\activate  # Windows

# Instalar dependências
cd backend
pip install -r requirements.txt

# Criar arquivo .env
cat > .env << EOF
DEBUG=True
SECRET_KEY=sua-chave-secreta-aqui
DATABASE_URL=sqlite:///db.sqlite3
GROQ_API_KEY=sua-api-key-groq-aqui
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
EOF

# Executar migrações
python manage.py migrate

# Carregar receitas
python manage.py loaddata initial_recipes
# ou
python manage.py seed_recipes

# Iniciar servidor
python manage.py runserver 0.0.0.0:8000
```

### 3. Setup do Frontend

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Frontend estará disponível em: `http://localhost:5173`

## 🔧 Modo Desenvolvimento Rápido

Use o script de inicialização:

```bash
# Linux/Mac
bash START_CHEFLU.sh

# Ou manualmente em dois terminais
# Terminal 1 - Backend
cd backend && source ../.venv/bin/activate && python manage.py runserver

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## 📦 Estrutura do Projeto

```
doceslucro/
├── backend/                 # Django API
│   ├── config/             # Configurações Django
│   ├── apps/               # Aplicações
│   │   ├── products/       # Modelo de receitas
│   │   ├── chat/           # Endpoints de chat
│   │   └── ...
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   │   └── FloatingChefBot.jsx
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── README.md
└── docs/                   # Documentação adicional
```

## 🌐 Endpoints da API

### Health Check
```
GET /api/chat/health/
```
Retorna status do backend, database e número de receitas.

### Chat/Análise
```
POST /api/chat/nutrition/
Content-Type: application/json

{
  "message": "Qual receita é mais lucrativa?"
}
```

### Listar Receitas
```
GET /api/products/
```

## 🚢 Deploy em Produção (Render)

A aplicação está configurada para deploy automático no **Render**.

### Arquivos de Configuração
- `Procfile` - Comando para iniciar a aplicação
- `render-build.sh` - Script de build
- `render-init.sh` - Script de inicialização pós-build

### Variáveis de Ambiente Necessárias
```
DATABASE_URL=postgresql://...
GROQ_API_KEY=sk-...
SECRET_KEY=sua-chave-secreta
DEBUG=False
```

### Deploy Automático
Todo commit em `master` triggers rebuild automático no Render.

**URL de Produção**: https://doceslucro.onrender.com

## 🔐 Segurança

### Recomendações de Produção

⚠️ **IMPORTANTE - Executar antes de produção:**

1. **Rotacionar GROQ_API_KEY**
   ```bash
   # Gerar nova chave em console.groq.com/keys
   # Atualizar em Render Environment Variables
   ```

2. **Desabilitar CORS_ALLOW_ALL_ORIGINS**
   ```python
   # backend/config/settings/production.py
   CORS_ALLOWED_ORIGINS = [
       "https://seu-dominio.com",
   ]
   ```

3. **Usar HTTPS**
   - Render já configura automaticamente
   - Verificar certificado SSL

4. **Limpar histórico de Git** (se exposto anteriormente)
   ```bash
   git filter-repo --path .env --invert-paths
   ```

5. **Configurar backup do banco de dados**
   - PostgreSQL em Render com backups automáticos

## 📊 Banco de Dados

### Schema Principal

**Recipe Model**
```python
- id: Integer (PK)
- name: String
- cost: Decimal (custo total do lote)
- price: Decimal (preço de venda)
- yield: Integer (quantidade produzida)
- ingredients: JSON (ingredientes)
- created_at: DateTime
- updated_at: DateTime
```

Campos calculados automaticamente:
- `cost_per_unit`: cost / yield
- `profit_per_unit`: price - cost_per_unit
- `profit_margin`: (profit_per_unit / price) * 100

## 🧪 Testes

```bash
# Backend
cd backend
python manage.py test

# Frontend (se implementado)
cd frontend
npm test
```

## 📝 Logging

### Backend Logs
- Arquivo: `/tmp/django.log`
- Nível: DEBUG (desenvolvimento) / INFO (produção)

### Frontend Logs
- Console do navegador (F12)
- Vite logs: `/tmp/vite.log`

## 🐛 Troubleshooting

### Erro: "TemplateDoesNotExist at /"
- Solução: Acessar frontend em `http://localhost:5173` (não em porta 8000)

### Erro: "Module not found" no frontend
- Solução: `npm install --legacy-peer-deps && npm run dev`

### Erro: "Connection refused" na API
- Solução: Verificar se backend está rodando em `http://localhost:8000`

### Erro: "GROQ_API_KEY not configured"
- Solução: Criar arquivo `.env` com chave válida

## 📚 Documentação Adicional

- [PLANO_EXECUCAO_COMPLETO.md](./PLANO_EXECUCAO_COMPLETO.md) - Histórico de execução
- [ESTRUTURA_COMPLETA.md](./ESTRUTURA_COMPLETA.md) - Detalhes técnicos
- [GUIA_RAPIDO_USO.md](./GUIA_RAPIDO_USO.md) - Quick start

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 Email: support@example.com
- 🐙 GitHub Issues: [Issues](https://github.com/Roberton003/doceslucro/issues)

## 📄 Licença

Proprietário - Todos os direitos reservados © 2025

---

## 🎯 Roadmap v2.1

- [ ] Exportar relatórios em PDF
- [ ] Integração com sistemas de POS
- [ ] Histórico de análises
- [ ] Controle de ingredientes em tempo real
- [ ] Dashboard com gráficos avançados
- [ ] Suporte multi-usuário com autenticação
- [ ] Mobile app nativa

---

**Made with ❤️ by ChefLuz Team**

*Última atualização: 26 de outubro de 2025*
