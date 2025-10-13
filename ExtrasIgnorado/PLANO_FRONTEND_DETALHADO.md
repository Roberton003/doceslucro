# 🎨 PLANO DETALHADO - FRONTEND REACT
## Visual Inspirado no Instagram

---

## 📊 VISÃO GERAL

**Tecnologias:**
- React 18 + Vite
- TailwindCSS (estilo Instagram)
- Axios (API)
- React Router v6
- Context API (estado global)
- React Hook Form (formulários)

**Estrutura de Delegação:**
- 🎯 **Copilot (Orquestrador):** Planeja, delega, revisa
- 🤖 **Qwen CLI (Executor):** Implementa código

---

## 📋 FASE 9: SETUP FRONTEND (1-2h)

### 9.1 Inicializar Projeto React + Vite
**Delegação Qwen:**
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

**Instalações:**
```bash
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Revisar Copilot:**
- ✅ package.json tem todas deps
- ✅ vite.config.js configurado
- ✅ tailwind.config.js criado

---

### 9.2 Configurar TailwindCSS (Tema Instagram)
**Delegação Qwen:**

**tailwind.config.js:**
```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta Instagram
        'ig-primary': '#405DE6',
        'ig-pink': '#E1306C', 
        'ig-orange': '#FD1D1D',
        'ig-yellow': '#FCAF45',
        'ig-bg': '#FAFAFA',
        'ig-border': '#DBDBDB',
        'ig-text': '#262626',
        'ig-text-light': '#8E8E8E',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-ig {
    @apply bg-ig-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition;
  }
  .card-ig {
    @apply bg-white border border-ig-border rounded-lg shadow-sm;
  }
  .input-ig {
    @apply w-full px-3 py-2 border border-ig-border rounded-md focus:border-ig-primary focus:ring-1 focus:ring-ig-primary;
  }
}
```

**Revisar Copilot:**
- ✅ Cores Instagram aplicadas
- ✅ Componentes utilitários criados
- ✅ App renderiza com tema

---

### 9.3 Estrutura de Pastas
**Delegação Qwen:**
```
frontend/src/
├── assets/          # Imagens, ícones
├── components/      # Componentes reutilizáveis
│   ├── common/      # Button, Input, Card, Modal
│   └── layout/      # Navbar, Sidebar, Footer
├── contexts/        # Context API (Auth, Data)
├── hooks/           # Custom hooks
├── pages/           # Páginas/rotas
├── services/        # API calls (axios)
├── utils/           # Helpers, formatters
└── routes/          # Configuração rotas
```

**Revisar Copilot:**
- ✅ Pastas criadas
- ✅ index.js em cada pasta

---

### 9.4 Configurar Axios + API Service
**Delegação Qwen:**

**src/services/api.js:**
```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Logout ou refresh token
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**src/services/auth.service.js:**
```js
import api from './api';

export const authService = {
  login: (email, password) => api.post('/token/', { email, password }),
  register: (data) => api.post('/users/register/', data),
  getProfile: () => api.get('/users/profile/'),
  updateProfile: (data) => api.put('/users/profile/', data),
};
```

**Revisar Copilot:**
- ✅ API configurada com interceptors
- ✅ Auth service criado

---

## 📋 FASE 10: AUTENTICAÇÃO + LAYOUT (2-3h)

### 10.1 Context de Autenticação
**Delegação Qwen:**

**src/contexts/AuthContext.jsx:**
```jsx
import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      authService.getProfile()
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('access_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Revisar Copilot:**
- ✅ Context funcional
- ✅ Login/Logout implementado
- ✅ Proteção de rotas preparada

---

### 10.2 Layout Principal (Estilo Instagram)
**Delegação Qwen:**

**src/components/layout/Navbar.jsx:**
```jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-ig-border fixed top-0 w-full z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-ig-pink to-ig-orange bg-clip-text text-transparent">
          GiDoces
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/produtos" className="hover:text-ig-text-light transition">
            <HomeIcon />
          </Link>
          <Link to="/calcular" className="hover:text-ig-text-light transition">
            <CalculatorIcon />
          </Link>
          <button onClick={logout} className="hover:text-ig-text-light transition">
            <LogoutIcon />
          </button>
          <img 
            src={user?.avatar || '/default-avatar.png'} 
            className="w-8 h-8 rounded-full border-2 border-ig-primary"
          />
        </div>
      </div>
    </nav>
  );
}
```

**Revisar Copilot:**
- ✅ Navbar estilo Instagram
- ✅ Links funcionais
- ✅ Avatar do usuário

---

### 10.3 Páginas de Auth (Login/Register)
**Delegação Qwen:**

**src/pages/Login.jsx:**
```jsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen bg-ig-bg flex items-center justify-center">
      <div className="card-ig p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-ig-pink to-ig-orange bg-clip-text text-transparent">
          GiDoces
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input-ig"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="input-ig"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-ig w-full">
            Entrar
          </button>
        </form>
        
        <p className="text-center text-ig-text-light mt-4">
          Não tem conta? <Link to="/register" className="text-ig-primary">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}
```

**Revisar Copilot:**
- ✅ Login funcional
- ✅ Design Instagram
- ✅ Validação básica

---

## 📋 FASE 11: INGREDIENTES (2h)

### 11.1 Service de Ingredientes
**Delegação Qwen:**

**src/services/ingredients.service.js:**
```js
import api from './api';

export const ingredientsService = {
  list: (params) => api.get('/ingredients/ingredients/', { params }),
  create: (data) => api.post('/ingredients/ingredients/', data),
  update: (id, data) => api.put(`/ingredients/ingredients/${id}/`, data),
  delete: (id) => api.delete(`/ingredients/ingredients/${id}/`),
};
```

---

### 11.2 Página Ingredientes (Grid Instagram)
**Delegação Qwen:**

**src/pages/Ingredientes.jsx:**
```jsx
import { useState, useEffect } from 'react';
import { ingredientsService } from '../services/ingredients.service';

export default function Ingredientes() {
  const [ingredients, setIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async () => {
    const res = await ingredientsService.list();
    setIngredients(res.data.results);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ingredientes</h1>
        <button onClick={() => setShowModal(true)} className="btn-ig">
          + Adicionar
        </button>
      </div>

      {/* Grid estilo Instagram */}
      <div className="grid grid-cols-3 gap-1">
        {ingredients.map(ing => (
          <div key={ing.id} className="card-ig p-4 hover:shadow-lg transition cursor-pointer">
            <h3 className="font-semibold text-ig-text">{ing.name}</h3>
            <p className="text-sm text-ig-text-light">
              R$ {ing.cost_per_unit} / {ing.unit}
            </p>
          </div>
        ))}
      </div>

      {/* Modal para adicionar */}
      {showModal && <IngredientModal onClose={() => setShowModal(false)} onSave={loadIngredients} />}
    </div>
  );
}
```

**Revisar Copilot:**
- ✅ Grid 3 colunas (Instagram)
- ✅ Cards responsivos
- ✅ Modal funcional

---

## 📋 FASE 12: PRODUTOS (3h)

### 12.1 Cards Estilo Instagram Stories
**Delegação Qwen:**

**src/pages/Produtos.jsx:**
```jsx
export default function Produtos() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      {/* Stories horizontais */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
        {templates.map(t => (
          <div key={t.id} className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full border-2 border-ig-pink p-1">
              <img src={t.image} className="w-full h-full rounded-full object-cover" />
            </div>
            <p className="text-xs text-center mt-1">{t.name}</p>
          </div>
        ))}
      </div>

      {/* Feed de produtos */}
      <div className="space-y-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
```

**Revisar Copilot:**
- ✅ Stories horizontais
- ✅ Feed vertical
- ✅ Cards bonitos

---

## 📋 FASE 13: CÁLCULOS + DASHBOARD (2h)

### 13.1 Calculadora de Preços
**Delegação Qwen:**
- Form com produto + margem
- Exibir custo/preço/lucro
- Visual clean Instagram

### 13.2 Dashboard com Métricas
**Delegação Qwen:**
- Cards com estatísticas
- Gráficos simples (opcional)
- Grid responsivo

---

## 📋 FASE 14: LISTA DE COMPRAS + FINALIZAÇÃO (2h)

### 14.1 Lista de Compras Consolidada
**Delegação Qwen:**
- Selecionar produtos + quantidade
- Gerar lista automática
- Exportar (opcional)

### 14.2 Polimento Final
**Delegação Qwen:**
- Loading states
- Error handling
- Responsividade mobile
- Animações sutis

---

## 🎯 CHECKLIST FINAL FRONTEND

**Funcionalidades:**
- ✅ Login/Register
- ✅ CRUD Ingredientes
- ✅ CRUD Produtos (com ingredientes)
- ✅ Calculadora preços
- ✅ Dashboard stats
- ✅ Lista de compras
- ✅ 10 receitas templates (stories)

**UI/UX:**
- ✅ Design Instagram
- ✅ Responsivo mobile
- ✅ Animações suaves
- ✅ Loading/Error states

**Performance:**
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Otimizações Vite

---

## 📦 SCRIPTS NPM

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx"
  }
}
```

---

## 🚀 EXECUÇÃO DO PLANO

**Modelo de Delegação (cada fase):**

1. **Copilot analisa** requisitos da fase
2. **Copilot cria prompt** detalhado para Qwen
3. **Qwen executa** código (npm, criar arquivos, etc)
4. **Copilot revisa** código do Qwen
5. **Copilot aprova** ou pede correção
6. **Git commit** ao final de cada fase

**Estimativa Total:** 10-12 horas
**Fases:** 6 fases (9-14)
**Commits:** 1 por fase

---

Pronto para começar a **Fase 9**? 🚀
