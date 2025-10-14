# 🍰 DocesGIamor - Backend API

Sistema de gerenciamento para confeitaria com cálculo de custos, precificação e controle de estoque.

## 🚀 Quick Start

### Instalação

```bash
# 1. Clone o repositório
cd backend/

# 2. Execute o script de setup
chmod +x setup_noninteractive.sh
./setup_noninteractive.sh
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
| `./setup_noninteractive.sh` | Configuração inicial | `./setup_noninteractive.sh` |
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
./shell.sh
>>> from django.contrib.auth.models import User
>>> User.objects.create_superuser('username', 'email@example.com', 'password')
```

## 🧪 Testes

```bash
# Todos os testes
./test.sh

# Testes de uma app
./test.sh products

# Testes com cobertura
PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages coverage run --source='.' manage.py test
coverage report
```

## 🐛 Troubleshooting

### Problema: "ModuleNotFoundError"

**Solução:** Verifique se as dependências estão instaladas:
```bash
python3 -m pip install --user --break-system-packages -r requirements.txt
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

### Problema: PYTHONPATH não configurado

**Solução:** Execute os comandos com PYTHONPATH:
```bash
PYTHONPATH=/home/rob3rto88/.local/lib/python3.12/site-packages ./run.sh
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

## 📝 API Endpoints

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

## 🌐 Configuração de Produção

Para produção, use as configurações em `config/settings/production.py`:

```python
# production.py
DEBUG = False
DATABASES = {
    'default': dj_database_url.config(default=os.getenv('DATABASE_URL'))
}
```

## 📝 Licença

Este projeto é privado e confidencial.