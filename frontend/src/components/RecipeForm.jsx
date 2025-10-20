import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const RecipeForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    instructions: '',
    preparation_time: '',
    servings: '',
    ingredients: []
  })
  const [availableIngredients, setAvailableIngredients] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    loadIngredients()
    if (isEditing) {
      loadRecipe()
    }
  }, [id])

  useEffect(() => {
    calculateTotalCost()
  }, [formData.ingredients])

  const loadIngredients = async () => {
    try {
      // TODO: Implementar chamada para API Django
      // const response = await api.get('/ingredients/')
      // setAvailableIngredients(response.data)

      // Dados simulados por enquanto
      const mockIngredients = [
        { id: 1, name: 'Farinha de Trigo', unit: 'kg', cost_per_unit: 5.50 },
        { id: 2, name: 'Açúcar', unit: 'kg', cost_per_unit: 4.20 },
        { id: 3, name: 'Ovos', unit: 'unidade', cost_per_unit: 0.80 },
        { id: 4, name: 'Leite', unit: 'litro', cost_per_unit: 3.50 },
        { id: 5, name: 'Chocolate em Pó', unit: 'kg', cost_per_unit: 15.00 },
        { id: 6, name: 'Manteiga', unit: 'kg', cost_per_unit: 12.00 }
      ]
      setAvailableIngredients(mockIngredients)
    } catch (error) {
      console.error('Erro ao carregar ingredientes:', error)
    }
  }

  const loadRecipe = async () => {
    try {
      setLoading(true)
      // TODO: Implementar chamada para API Django
      // const response = await api.get(`/recipes/${id}/`)
      // const recipe = response.data

      // Dados simulados por enquanto
      const mockRecipe = {
        id: parseInt(id),
        name: 'Bolo de Chocolate Clássico',
        description: 'Receita tradicional de bolo de chocolate',
        instructions: '1. Pré-aqueça o forno a 180°C\n2. Misture os ingredientes secos\n3. Adicione os líquidos\n4. Asse por 35 minutos',
        preparation_time: 60,
        servings: 12,
        ingredients: [
          { ingredient_id: 1, quantity: 0.3, unit: 'kg', cost: 1.65 },
          { ingredient_id: 2, quantity: 0.2, unit: 'kg', cost: 0.84 },
          { ingredient_id: 3, quantity: 4, unit: 'unidade', cost: 3.20 },
          { ingredient_id: 5, quantity: 0.1, unit: 'kg', cost: 1.50 }
        ]
      }

      setFormData({
        name: mockRecipe.name,
        description: mockRecipe.description,
        instructions: mockRecipe.instructions,
        preparation_time: mockRecipe.preparation_time.toString(),
        servings: mockRecipe.servings.toString(),
        ingredients: mockRecipe.ingredients
      })
    } catch (error) {
      console.error('Erro ao carregar receita:', error)
      alert('Erro ao carregar receita')
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalCost = () => {
    const cost = formData.ingredients.reduce((sum, item) => sum + (item.cost || 0), 0)
    setTotalCost(cost)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredient_id: '', quantity: '', unit: '', cost: 0 }]
    }))
  }

  const removeIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }))
  }

  const updateIngredient = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, [field]: value }

          // Calcular custo automaticamente quando quantidade ou ingrediente mudam
          if (field === 'quantity' || field === 'ingredient_id') {
            const ingredient = availableIngredients.find(ing => ing.id === parseInt(updatedItem.ingredient_id))
            if (ingredient && updatedItem.quantity) {
              const quantity = parseFloat(updatedItem.quantity)
              updatedItem.cost = quantity * ingredient.cost_per_unit
              updatedItem.unit = ingredient.unit
            } else {
              updatedItem.cost = 0
            }
          }

          return updatedItem
        }
        return item
      })
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)

      const recipeData = {
        ...formData,
        preparation_time: parseInt(formData.preparation_time),
        servings: parseInt(formData.servings),
        total_cost: totalCost,
        cost_per_serving: totalCost / parseInt(formData.servings || 1)
      }

      if (isEditing) {
        // call mock/backend API for products
        const res = await fetch(`/api/products/${id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData)
        })
  const updated = await res.json()
  console.log('Receita atualizada (server):', updated)
  // navigate to the updated recipe detail page and pass the updated object
  // so the detail page can show changes immediately while it re-fetches
  navigate(`/recipes/${updated.id || id}`, { state: { product: updated } })
      } else {
        const res = await fetch('/api/products/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData)
        })
  const created = await res.json()
  console.log('Receita criada (server):', created)
  navigate(`/recipes/${created.id}`, { state: { product: created } })
      }

      // navigation already performed above
    } catch (error) {
      console.error('Erro ao salvar receita:', error)
      alert('Erro ao salvar receita')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {isEditing ? 'Editar Receita' : 'Nova Receita'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Informações Básicas */}
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Informações Básicas
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Dados principais da receita.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome da Receita *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={2}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="preparation_time" className="block text-sm font-medium text-gray-700">
                    Tempo de Preparo (min) *
                  </label>
                  <input
                    type="number"
                    name="preparation_time"
                    id="preparation_time"
                    min="1"
                    required
                    value={formData.preparation_time}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="servings" className="block text-sm font-medium text-gray-700">
                    Porções *
                  </label>
                  <input
                    type="number"
                    name="servings"
                    id="servings"
                    min="1"
                    required
                    value={formData.servings}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Custo Total
                  </label>
                  <div className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 sm:text-sm">
                    R$ {totalCost.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Ingredientes
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Adicione os ingredientes necessários.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="space-y-4">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-md">
                    <div className="flex-1">
                      <select
                        value={ingredient.ingredient_id}
                        onChange={(e) => updateIngredient(index, 'ingredient_id', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="">Selecione um ingrediente</option>
                        {availableIngredients.map(ing => (
                          <option key={ing.id} value={ing.id}>
                            {ing.name} (R$ {ing.cost_per_unit.toFixed(2)}/{ing.unit})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Qtd"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="w-16 text-sm text-gray-500">
                      {ingredient.unit}
                    </div>
                    <div className="w-20 text-sm font-medium text-gray-900">
                      R$ {ingredient.cost?.toFixed(2) || '0.00'}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Adicionar Ingrediente
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Modo de Preparo
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Instruções detalhadas da receita.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <textarea
                name="instructions"
                id="instructions"
                rows={6}
                value={formData.instructions}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Descreva o passo a passo da receita..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/recipes')}
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RecipeForm