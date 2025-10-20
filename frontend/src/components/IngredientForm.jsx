import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const IngredientForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit: 'kg',
    cost_per_unit: '',
    stock_quantity: '',
    minimum_stock: '',
    supplier: '',
    category: ''
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const unitOptions = [
    { value: 'kg', label: 'Quilograma (kg)' },
    { value: 'g', label: 'Grama (g)' },
    { value: 'litro', label: 'Litro (L)' },
    { value: 'ml', label: 'Mililitro (ml)' },
    { value: 'unidade', label: 'Unidade' },
    { value: 'pacote', label: 'Pacote' },
    { value: 'caixa', label: 'Caixa' },
    { value: 'lata', label: 'Lata' }
  ]

  const categoryOptions = [
    'Farinha e Grãos',
    'Açúcares e Doces',
    'Lácteos',
    'Ovos',
    'Frutas',
    'Verduras',
    'Carnes',
    'Temperos e Especiarias',
    'Óleos e Gorduras',
    'Conservas',
    'Bebidas',
    'Outros'
  ]

  useEffect(() => {
    if (isEditing) {
      loadIngredient()
    }
  }, [id])

  const loadIngredient = async () => {
    try {
      setLoading(true)
      // TODO: Implementar chamada para API Django
      // const response = await api.get(`/ingredients/${id}/`)
      // const ingredient = response.data

      // Dados simulados por enquanto
      const mockIngredient = {
        id: parseInt(id),
        name: 'Farinha de Trigo',
        description: 'Farinha de trigo tipo 1 para confeitaria',
        unit: 'kg',
        cost_per_unit: 5.50,
        stock_quantity: 25.0,
        minimum_stock: 5.0,
        supplier: 'Moinho São João',
        category: 'Farinha e Grãos'
      }

      setFormData({
        name: mockIngredient.name,
        description: mockIngredient.description,
        unit: mockIngredient.unit,
        cost_per_unit: mockIngredient.cost_per_unit.toString(),
        stock_quantity: mockIngredient.stock_quantity.toString(),
        minimum_stock: mockIngredient.minimum_stock.toString(),
        supplier: mockIngredient.supplier,
        category: mockIngredient.category
      })
    } catch (error) {
      console.error('Erro ao carregar ingrediente:', error)
      alert('Erro ao carregar ingrediente')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)

      const ingredientData = {
        ...formData,
        cost_per_unit: parseFloat(formData.cost_per_unit),
        stock_quantity: parseFloat(formData.stock_quantity),
        minimum_stock: parseFloat(formData.minimum_stock)
      }

      if (isEditing) {
        // TODO: Implementar chamada para API Django
        // await api.put(`/ingredients/${id}/`, ingredientData)
        console.log('Ingrediente atualizado:', ingredientData)
      } else {
        // TODO: Implementar chamada para API Django
        // await api.post('/ingredients/', ingredientData)
        console.log('Ingrediente criado:', ingredientData)
      }

      navigate('/ingredients')
    } catch (error) {
      console.error('Erro ao salvar ingrediente:', error)
      alert('Erro ao salvar ingrediente')
    } finally {
      setSaving(false)
    }
  }

  const getStockStatus = () => {
    const stock = parseFloat(formData.stock_quantity || 0)
    const minStock = parseFloat(formData.minimum_stock || 0)

    if (stock <= 0) return { status: 'Esgotado', color: 'text-red-600 bg-red-100' }
    if (stock <= minStock) return { status: 'Baixo', color: 'text-yellow-600 bg-yellow-100' }
    return { status: 'Disponível', color: 'text-green-600 bg-green-100' }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const stockStatus = getStockStatus()

  return (
    <div className="max-w-2xl mx-auto">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {isEditing ? 'Editar Ingrediente' : 'Novo Ingrediente'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Informações do Ingrediente
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Preencha os dados do ingrediente.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome do Ingrediente *
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
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                    Unidade *
                  </label>
                  <select
                    name="unit"
                    id="unit"
                    required
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {unitOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="cost_per_unit" className="block text-sm font-medium text-gray-700">
                    Custo por Unidade (R$) *
                  </label>
                  <input
                    type="number"
                    name="cost_per_unit"
                    id="cost_per_unit"
                    step="0.01"
                    min="0"
                    required
                    value={formData.cost_per_unit}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Categoria
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categoryOptions.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700">
                    Quantidade em Estoque *
                  </label>
                  <input
                    type="number"
                    name="stock_quantity"
                    id="stock_quantity"
                    step="0.01"
                    min="0"
                    required
                    value={formData.stock_quantity}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="minimum_stock" className="block text-sm font-medium text-gray-700">
                    Estoque Mínimo *
                  </label>
                  <input
                    type="number"
                    name="minimum_stock"
                    id="minimum_stock"
                    step="0.01"
                    min="0"
                    required
                    value={formData.minimum_stock}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status do Estoque
                  </label>
                  <div className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
                    {stockStatus.status}
                  </div>
                </div>

                <div className="col-span-6">
                  <label htmlFor="supplier" className="block text-sm font-medium text-gray-700">
                    Fornecedor
                  </label>
                  <input
                    type="text"
                    name="supplier"
                    id="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/ingredients')}
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

export default IngredientForm