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
    // TODO: Carregar estatísticas da API
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
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">P</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total de Produtos
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalProducts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/products" className="font-medium text-blue-600 hover:text-blue-500">
                Ver todos
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">R</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total de Receitas
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalRecipes}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/recipes" className="font-medium text-green-600 hover:text-green-500">
                Ver todas
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">I</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total de Ingredientes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalIngredients}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/ingredients" className="font-medium text-yellow-600 hover:text-yellow-500">
                Ver todos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos Recentes */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Produtos Recentes
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Últimos produtos cadastrados no sistema
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {stats.recentProducts.map((product) => (
            <li key={product.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {product.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Criado em {new Date(product.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    R$ {product.price.toFixed(2)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Ações Rápidas
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Acesso rápido às principais funcionalidades
          </p>
        </div>
        <div className="px-4 py-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/products/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Novo Produto
            </Link>
            <Link
              to="/recipes/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              Nova Receita
            </Link>
            <Link
              to="/ingredients/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
            >
              Novo Ingrediente
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard