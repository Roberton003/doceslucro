# Guia de Testes - GiDoces

## Backend

### Pré-requisitos
```bash
cd backend
source venv/bin/activate  # ou venv\Scripts\activate no Windows
```

### Executar Testes
```bash
python manage.py check
python manage.py test
python test_integration.py
```

### Criar Superuser
```bash
python manage.py createsuperuser
```

## Frontend

### Pré-requisitos
```bash
cd frontend
npm install
```

### Executar Testes
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
```

### Variáveis de Ambiente
Copie .env.example para .env e configure:
```
VITE_API_URL=http://localhost:8000/api
```

## Integração Completa

### 1. Backend
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

### 2. Frontend (outro terminal)
```bash
cd frontend
npm run dev
```

### 3. Acessar
- Frontend: http://localhost:5173
- Backend Admin: http://localhost:8000/admin
- API: http://localhost:8000/api

## Checklist de Funcionalidades

- [x] Autenticação JWT
- [x] CRUD Ingredientes
- [x] CRUD Produtos
- [x] Cálculo de Custos
- [x] Templates de Receitas
- [x] Dashboard
- [x] Calculadora de Preços
- [x] Lista de Compras Consolidada

## Endpoints Principais

### Auth
- POST /api/token/ - Login
- POST /api/token/refresh/ - Refresh token

### Ingredientes
- GET/POST /api/ingredients/ingredients/
- GET/PUT/DELETE /api/ingredients/ingredients/{id}/

### Produtos
- GET/POST /api/products/
- GET/PUT/DELETE /api/products/{id}/
- POST /api/products/{id}/calculate/

### Dashboard
- GET /api/dashboard/stats/

### Shopping
- POST /api/shopping-list/generate/
