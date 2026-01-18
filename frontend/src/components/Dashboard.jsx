import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRecipes: 0,
    totalIngredients: 0,
    recentProducts: []
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Simulação de dados - será substituído pela API real
      setStats({
        totalProducts: 15,
        totalRecipes: 8,
        totalIngredients: 45,
        recentProducts: [
          { id: 1, name: 'Bolo de Chocolate', price: 25.00, created_at: '2024-01-15' },
          { id: 2, name: 'Torta de Morango', price: 30.00, created_at: '2024-01-14' },
          { id: 3, name: 'Cookie de Baunilha', price: 5.00, created_at: '2024-01-13' }
        ]
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    }
  }

  return (
    <div className="space-y-space-6 animate-in">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-3">
        {/* Produtos */}
        <div className="stat-card">
          <div className="p-space-3">
            <div className="flex items-center">
              <div className="stat-card-icon-primary">
                🍰
              </div>
              <div className="ml-4 flex-1">
                <dt className="text-sm font-medium text-doce-light">
                  Total de Produtos
                </dt>
                <dd className="text-2xl font-bold text-doce-dark font-display">
                  {stats.totalProducts}
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-doce-secondary/50 px-space-3 py-2">
            <Link to="/products" className="link text-sm">
              Ver todos →
            </Link>
          </div>
        </div>

        {/* Receitas */}
        <div className="stat-card">
          <div className="p-space-3">
            <div className="flex items-center">
              <div className="stat-card-icon-success">
                📖
              </div>
              <div className="ml-4 flex-1">
                <dt className="text-sm font-medium text-doce-light">
                  Total de Receitas
                </dt>
                <dd className="text-2xl font-bold text-doce-dark font-display">
                  {stats.totalRecipes}
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-doce-secondary/50 px-space-3 py-2">
            <Link to="/recipes" className="link text-sm">
              Ver todas →
            </Link>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="stat-card">
          <div className="p-space-3">
            <div className="flex items-center">
              <div className="stat-card-icon-accent">
                🥄
              </div>
              <div className="ml-4 flex-1">
                <dt className="text-sm font-medium text-doce-light">
                  Total de Ingredientes
                </dt>
                <dd className="text-2xl font-bold text-doce-dark font-display">
                  {stats.totalIngredients}
                </dd>
              </div>
            </div>
          </div>
          <div className="bg-doce-secondary/50 px-space-3 py-2">
            <Link to="/ingredients" className="link text-sm">
              Ver todos →
            </Link>
          </div>
        </div>
      </div>

      {/* Produtos Recentes */}
      <div className="card">
        <div className="border-b border-doce-border pb-space-2 mb-space-3">
          <h3 className="text-lg font-display font-bold text-doce-dark">
            🍪 Produtos Recentes
          </h3>
          <p className="text-sm text-doce-light mt-1">
            Últimos produtos cadastrados no sistema
          </p>
        </div>

        <ul className="divide-y divide-doce-border/50">
          {stats.recentProducts.map((product, index) => (
            <li
              key={product.id}
              className="py-space-2 flex items-center justify-between hover:bg-doce-secondary/30 -mx-space-4 px-space-4 transition-colors duration-micro"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-doce-primary/20 flex items-center justify-center">
                  <span className="text-doce-accent font-bold">
                    {product.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="font-medium text-doce-dark">
                    {product.name}
                  </div>
                  <div className="text-sm text-doce-light">
                    Criado em {new Date(product.created_at).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
              <div className="font-mono font-medium text-doce-accent">
                R$ {product.price.toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Ações Rápidas */}
      <div className="card-accent">
        <div className="border-b border-doce-border pb-space-2 mb-space-3">
          <h3 className="text-lg font-display font-bold text-doce-dark">
            ⚡ Ações Rápidas
          </h3>
          <p className="text-sm text-doce-light mt-1">
            Acesso rápido às principais funcionalidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-2">
          <Link to="/products/new" className="btn-primary text-center">
            🍰 Novo Produto
          </Link>
          <Link to="/recipes/new" className="btn-success text-center">
            📖 Nova Receita
          </Link>
          <Link to="/ingredients/new" className="btn-secondary text-center">
            🥄 Novo Ingrediente
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard