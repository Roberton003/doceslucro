import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadIngredients()
  }, [])

  const loadIngredients = async () => {
    try {
      setLoading(true)
      // TODO: Implementar chamada para API Django
      // const response = await api.get('/ingredients/')
      // setIngredients(response.data)

      // Dados simulados por enquanto
      const mockIngredients = [
        {
          id: 1,
          name: 'Farinha de Trigo',
          unit: 'kg',
          price_per_unit: 4.50,
          stock_quantity: 25.0,
          min_stock: 5.0,
          category: 'Farináceos',
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          name: 'Açúcar Refinado',
          unit: 'kg',
          price_per_unit: 3.20,
          stock_quantity: 15.0,
          min_stock: 3.0,
          category: 'Açúcares',
          created_at: '2024-01-14T10:00:00Z'
        },
        {
          id: 3,
          name: 'Chocolate em Pó',
          unit: 'g',
          price_per_unit: 0.85,
          stock_quantity: 2000.0,
          min_stock: 500.0,
          category: 'Chocolates',
          created_at: '2024-01-13T10:00:00Z'
        },
        {
          id: 4,
          name: 'Ovos',
          unit: 'unidade',
          price_per_unit: 0.80,
          stock_quantity: 120.0,
          min_stock: 24.0,
          category: 'Ovos e Lácteos',
          created_at: '2024-01-12T10:00:00Z'
        }
      ]
      setIngredients(mockIngredients)
    } catch (error) {
      console.error('Erro ao carregar ingredientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteIngredient = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este ingrediente?')) {
      return
    }

    try {
      // TODO: Implementar chamada para API Django
      // await api.delete(`/ingredients/${id}/`)
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
    } catch (error) {
      console.error('Erro ao deletar ingrediente:', error)
      alert('Erro ao deletar ingrediente')
    }
  }

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStockStatus = (quantity, minStock) => {
    if (quantity <= minStock) {
      return { status: 'low', color: 'text-red-600', bgColor: 'bg-red-100' }
    } else if (quantity <= minStock * 1.5) {
      return { status: 'warning', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
    }
    return { status: 'good', color: 'text-green-600', bgColor: 'bg-green-100' }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Ingredientes</h1>
        <Link
          to="/ingredients/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
        >
          Novo Ingrediente
        </Link>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Buscar ingredientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
        />
      </div>

      {/* Ingredients List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredIngredients.map((ingredient) => {
            const stockStatus = getStockStatus(ingredient.stock_quantity, ingredient.min_stock)
            return (
              <li key={ingredient.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {ingredient.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Categoria: {ingredient.category}
                          </p>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <span className="mr-4">
                              Preço: R$ {ingredient.price_per_unit.toFixed(2)}/{ingredient.unit}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.bgColor} ${stockStatus.color}`}>
                              Estoque: {ingredient.stock_quantity} {ingredient.unit}
                            </span>
                            <span className="ml-4">
                              Mínimo: {ingredient.min_stock} {ingredient.unit}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/ingredients/${ingredient.id}/edit`}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => deleteIngredient(ingredient.id)}
                            className="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        {filteredIngredients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'Nenhum ingrediente encontrado para a busca.' : 'Nenhum ingrediente cadastrado.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Ingredients