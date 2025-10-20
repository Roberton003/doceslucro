import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadRecipes()
  }, [])

  const loadRecipes = async () => {
    try {
      setLoading(true)
      // TODO: Implementar chamada para API Django
      // const response = await api.get('/calculations/recipes/')
      // setRecipes(response.data)

      // Dados simulados por enquanto
      const mockRecipes = [
        {
          id: 1,
          name: 'Bolo de Chocolate Clássico',
          description: 'Receita tradicional de bolo de chocolate',
          servings: 12,
          ingredients_count: 8,
          total_cost: 45.50,
          cost_per_serving: 3.79,
          created_at: '2024-01-15T10:00:00Z'
        },
        {
          id: 2,
          name: 'Torta de Morango',
          description: 'Torta fresca com morangos',
          servings: 8,
          ingredients_count: 6,
          total_cost: 32.00,
          cost_per_serving: 4.00,
          created_at: '2024-01-14T10:00:00Z'
        },
        {
          id: 3,
          name: 'Cookies de Chocolate',
          description: 'Cookies crocantes com gotas de chocolate',
          servings: 24,
          ingredients_count: 5,
          total_cost: 18.75,
          cost_per_serving: 0.78,
          created_at: '2024-01-13T10:00:00Z'
        }
      ]
      setRecipes(mockRecipes)
    } catch (error) {
      console.error('Erro ao carregar receitas:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteRecipe = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta receita?')) {
      return
    }

    try {
      // TODO: Implementar chamada para API Django
      // await api.delete(`/calculations/recipes/${id}/`)
      setRecipes(recipes.filter(recipe => recipe.id !== id))
    } catch (error) {
      console.error('Erro ao deletar receita:', error)
      alert('Erro ao deletar receita')
    }
  }

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Receitas</h1>
        <Link
          to="/recipes/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Nova Receita
        </Link>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="Buscar receitas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      {/* Recipes List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {recipe.name}
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {recipe.description}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span className="mr-4">
                            Porções: {recipe.servings}
                          </span>
                          <span className="mr-4">
                            Ingredientes: {recipe.ingredients_count}
                          </span>
                          <span className="mr-4">
                            Custo Total: R$ {recipe.total_cost.toFixed(2)}
                          </span>
                          <span>
                            Custo/Porção: R$ {recipe.cost_per_serving.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/recipes/${recipe.id}`}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Ver
                        </Link>
                        <Link
                          to={`/recipes/${recipe.id}/edit`}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => deleteRecipe(recipe.id)}
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
          ))}
        </ul>
        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'Nenhuma receita encontrada para a busca.' : 'Nenhuma receita cadastrada.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Recipes