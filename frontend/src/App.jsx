import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Dashboard from './components/Dashboard'
import Products from './components/Products'
import Recipes from './components/Recipes'
import Ingredients from './components/Ingredients'
import ProductForm from './components/ProductForm'
import RecipeForm from './components/RecipeForm'
import RecipeDetail from './components/RecipeDetail'
import IngredientForm from './components/IngredientForm'
import SinglePage from './components/SinglePage'
import './App.css'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/products', label: 'Produtos', icon: '📦' },
    { path: '/recipes', label: 'Receitas', icon: '📋' },
    { path: '/ingredients', label: 'Ingredientes', icon: '🥕' }
  ]

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Doces GIamor
              </h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Routes>
              {/* Página única modernizada final */}
              <Route path="/" element={<SinglePage />} />
              {/* rota curta compatível com build antigo */}
              <Route path="/calcular" element={<SinglePage />} />
              {/* Rotas auxiliares (mantidas) */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/new" element={<RecipeForm />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/recipes/:id/edit" element={<RecipeForm />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/ingredients/new" element={<IngredientForm />} />
              <Route path="/ingredients/:id/edit" element={<IngredientForm />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App