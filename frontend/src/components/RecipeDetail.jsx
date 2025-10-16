import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const RecipeDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRecipe()
  }, [id])

  const loadRecipe = async () => {
    try {
      setLoading(true)
      // fetch from API (mock running on :8001 via index.html rewrite)
      const res = await fetch(`/api/products/${id}/`)
      if (!res.ok) throw new Error('Produto não encontrado')
      const data = await res.json()

      // adapt the backend product shape to the UI shape expected here
      const mapped = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        instructions: data.instructions || '',
        preparation_time: data.preparation_time || data.prep_time || 0,
        servings: data.serves || data.servings || 1,
        total_cost: data.total_cost || data.total_cost === 0 ? data.total_cost : 0,
        cost_per_serving: (data.total_cost && (data.serves ? (data.total_cost / data.serves) : 0)) || 0,
        ingredients: (data.ingredients || []).map(ing => ({
          ingredient_id: ing.id || ing.ingredient_id || null,
          ingredient_name: ing.name || ing.ingredient_name || ing.ingredient || '',
          quantity: ing.quantity || 0,
          unit: ing.unit || ing.unit_name || '',
          cost_per_unit: ing.cost_per_unit || ing.cost || 0,
          total_cost: (parseFloat(ing.quantity || 0) * parseFloat(ing.cost_per_unit || ing.cost || 0)) || 0
        })),
        created_at: data.created_at,
        updated_at: data.updated_at
      }

      setRecipe(mapped)
    } catch (error) {
      console.error('Erro ao carregar receita:', error)
      alert('Erro ao carregar receita')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    navigate(`/recipes/${id}/edit`)
  }

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir esta receita?')) {
      return
    }

    try {
      // TODO: Implementar chamada para API Django
      // await api.delete(`/recipes/${id}/`)
      console.log('Receita excluída:', id)
      navigate('/recipes')
    } catch (error) {
      console.error('Erro ao excluir receita:', error)
      alert('Erro ao excluir receita')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Receita não encontrada</h3>
        <p className="mt-2 text-sm text-gray-500">A receita que você está procurando não existe.</p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/recipes')}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Voltar para Receitas
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {recipe.name}
          </h2>
          {recipe.description && (
            <p className="mt-1 text-sm text-gray-500">{recipe.description}</p>
          )}
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={handleEdit}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Excluir
          </button>
        </div>
      </div>

      {/* Informações Gerais */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Tempo de Preparo</dt>
                  <dd className="text-lg font-medium text-gray-900">{recipe.preparation_time} min</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Porções</dt>
                  <dd className="text-lg font-medium text-gray-900">{recipe.servings}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Custo Total</dt>
                  <dd className="text-lg font-medium text-gray-900">R$ {recipe.total_cost.toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Custo por Porção</dt>
                  <dd className="text-lg font-medium text-gray-900">R$ {recipe.cost_per_serving.toFixed(2)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredientes */}
      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Ingredientes</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Lista completa de ingredientes necessários para esta receita.
            </p>
          </div>
          <ul className="divide-y divide-gray-200">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {ingredient.ingredient_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {ingredient.quantity} {ingredient.unit}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    R$ {ingredient.total_cost.toFixed(2)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modo de Preparo */}
      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Modo de Preparo</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Instruções passo a passo para preparar a receita.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose prose-sm max-w-none">
              {recipe.instructions.split('\n').map((step, index) => (
                <p key={index} className="mb-2">{step}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="mt-8 flex justify-end space-x-3">
        <button
          onClick={() => navigate('/recipes')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Voltar para Receitas
        </button>
        <button
          onClick={handleEdit}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Editar Receita
        </button>
      </div>
    </div>
  )
}

export default RecipeDetail