# 🍰 Doces GIamor - Sistema de Gestão para Confeitaria

[![Django](https://img.shields.io/badge/Django-5.2.7-green.svg)](https://djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.20-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Sistema completo de gestão para confeitarias com controle de custos, ingredientes, produtos e dashboard analítico.

## 📋 Sobre o Projeto

**Doces GIamor** é uma solução completa para gestão de confeitarias que combina tecnologia moderna com praticidade operacional. O sistema oferece controle total sobre custos de produção, gestão de ingredientes, precificação de produtos e análise de lucratividade.

### ✨ Funcionalidades Principais

- 🔐 **Autenticação JWT** - Sistema seguro de login e controle de acesso
- 📊 **Dashboard Analítico** - Métricas em tempo real e relatórios detalhados
- 🧾 **Controle de Ingredientes** - Gestão completa do estoque e custos
- 🍪 **Gestão de Produtos** - Cadastro, precificação e controle de produção
- 🧮 **Cálculos Automáticos** - Precificação inteligente baseada em custos
- 📱 **Interface Responsiva** - Funciona perfeitamente em desktop e mobile
- 🚀 **PWA** - Instalável como aplicativo nativo
- 🐳 **Docker** - Containerização completa para fácil deploy
- 🔒 **Segurança Avançada** - Proteções contra ataques e vulnerabilidades

## 🏗️ Arquitetura

```
Doces GIamor/
├── backend/                 # API Django REST Framework
│   ├── config/             # Configurações Django
│   ├── apps/               # Aplicações Django
│   │   ├── users/         # Autenticação e usuários
│   │   ├── ingredients/   # Gestão de ingredientes
│   │   ├── products/      # Gestão de produtos
│   │   ├── calculations/  # Lógica de cálculos
│   │   └── dashboard/     # Dashboard e métricas
│   ├── core/              # Utilitários e segurança
│   └── requirements.txt   # Dependências Python
├── frontend/               # Interface React + Vite
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── hooks/        # Hooks customizados
│   │   └── services/     # Integração com API
│   └── package.json      # Dependências Node.js
└── docs/                  # Documentação completa
```

## 🚀 Tecnologias Utilizadas

### Backend
- **Django 5.2.7** - Framework web Python
- **Django REST Framework** - API REST poderosa
- **JWT Authentication** - Autenticação segura
- **PostgreSQL/SQLite** - Banco de dados
- **CORS Headers** - Controle de acesso cross-origin
- **Django Spectacular** - Documentação automática da API

### Frontend
- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **Vite 5.4.20** - Build tool ultrarrápido
- **Tailwind CSS 3.4.18** - Framework CSS utilitário
- **React Router DOM** - Roteamento SPA
- **Axios** - Cliente HTTP para APIs
- **jsPDF** - Geração de relatórios em PDF

### DevOps & Qualidade
- **Docker** - Containerização
- **CI/CD** - Integração e deploy contínuos
- **Playwright** - Testes end-to-end
- **ESLint/Prettier** - Qualidade de código
- **Git Hooks** - Controle de qualidade pré-commit

## 📦 Instalação e Configuração

### Pré-requisitos

- **Python 3.8+** instalado
- **Node.js 16+** instalado
- **Git** para controle de versão
- **Docker** (opcional, para containerização)

### 🚀 Setup Rápido

#### 1. Clone o repositório
```bash
git clone https://github.com/Roberton003/doceslucro.git
cd doceslucro
```

#### 2. Backend - Configuração automática
```bash
cd backend
./secure_setup.sh
# OU manualmente:
# python3 -m venv venv
# source venv/bin/activate  # Linux/Mac
# pip install -r requirements.txt
# python manage.py migrate
# python manage.py createsuperuser
```

#### 3. Frontend - Instalação e execução
```bash
cd frontend
npm install
npm run dev
```

#### 4. Executar o sistema
```bash
# Terminal 1 - Backend
cd backend && ./run.sh

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### 🐳 Docker (Alternativa)

```bash
# Build e execução com Docker Compose
docker-compose up --build
```

## 🔧 Scripts Disponíveis

### Backend
```bash
./run.sh              # Inicia servidor Django
./security_check.sh   # Verifica segurança do sistema
./secure_setup.sh     # Setup completo e seguro
./migrate.sh          # Executa migrações
./test.sh            # Roda testes
```

### Frontend
```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run preview      # Preview do build
npm run test         # Executa testes
```

## 🔒 Segurança

O sistema implementa múltiplas camadas de segurança:

- ✅ **SECRET_KEY** via variáveis de ambiente
- ✅ **Rate Limiting** (100 req/hora anônimos, 1000 req/hora usuários)
- ✅ **Headers de Segurança** (HSTS, CSP, X-Frame-Options)
- ✅ **Autenticação JWT** com refresh tokens
- ✅ **Validação de entrada** rigorosa
- ✅ **Middleware de segurança** personalizado
- ✅ **Logs de auditoria** para atividades suspeitas

Para mais detalhes, consulte [`backend/SECURITY_README.md`](backend/SECURITY_README.md).

## 📚 Documentação da API

### Endpoints Principais

```
POST   /api/token/           # Autenticação JWT
POST   /api/token/refresh/   # Refresh token
GET    /api/users/profile/   # Perfil do usuário
GET    /api/ingredients/     # Lista ingredientes
POST   /api/ingredients/     # Cria ingrediente
GET    /api/products/        # Lista produtos
POST   /api/products/        # Cria produto
POST   /api/products/{id}/calculate/  # Calcula custos
GET    /api/dashboard/       # Dados do dashboard
```

### Documentação Interativa

Acesse `http://localhost:8000/api/docs/` para a documentação completa da API gerada automaticamente pelo Django Spectacular.

## 🎨 Interface do Usuário

### Dashboard
- 📈 Métricas de vendas e custos
- 📊 Gráficos de lucratividade
- 🎯 Indicadores de performance
- 📱 Interface responsiva

### Gestão de Ingredientes
- 📝 Cadastro completo de insumos
- 💰 Controle de custos por unidade
- 📦 Gestão de estoque
- 🔄 Atualização automática de preços

### Gestão de Produtos
- 🍰 Cadastro de receitas e produtos
- 🧮 Cálculo automático de custos
- 💵 Precificação inteligente
- 📊 Análise de margem de lucro

## 🧪 Testes

### Backend
```bash
cd backend
python manage.py test
# OU
./test.sh
```

### Frontend
```bash
cd frontend
npm run test
```

### Testes E2E (Playwright)
```bash
cd frontend
npx playwright test
```

## 🚀 Deploy em Produção

### Configuração de Produção

1. **Variáveis de Ambiente**:
```bash
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://user:pass@host:port/db
ALLOWED_HOSTS=yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

2. **Banco de Dados**:
   - Migre de SQLite para PostgreSQL
   - Configure backups automáticos
   - Otimize índices para performance

3. **Servidor Web**:
   - Use Gunicorn + Nginx
   - Configure SSL/TLS
   - Implemente CDN para assets estáticos

4. **Monitoramento**:
   - Configure logs estruturados
   - Implemente health checks
   - Configure alertas

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- **Backend**: PEP 8, Black para formatação
- **Frontend**: ESLint, Prettier
- **Commits**: Conventional Commits
- **Testes**: Cobertura mínima de 80%

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

**Roberton003** - *Desenvolvimento completo*

- GitHub: [@Roberton003](https://github.com/Roberton003)
- LinkedIn: [Seu LinkedIn]
- Email: seu-email@exemplo.com

## 🙏 Agradecimentos

- Django Community pela documentação excepcional
- React Team pela biblioteca incrível
- Comunidade Open Source pelas ferramentas utilizadas
- Todos os contribuidores que ajudam a melhorar o projeto

---

<div align="center">

**🍰 Feito com ❤️ para confeitarias que buscam excelência e eficiência**

⭐ **Dê uma estrela se este projeto te ajudou!**

[📖 Documentação Completa](docs/) • [🐛 Reportar Bug](https://github.com/Roberton003/doceslucro/issues) • [💡 Sugerir Feature](https://github.com/Roberton003/doceslucro/issues)

</div>